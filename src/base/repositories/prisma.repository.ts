import { PrismaClient, Prisma } from '@prisma/client';
import { BaseRepositoryInterface, id, parseId } from './base.repository';
import prisma from '../config/prisma';

export default class PrismaRepository<T> implements BaseRepositoryInterface<T> {
    private validateKey = "enabled";
    private prisma: PrismaClient;
    private model: keyof PrismaClient;
    private query: Prisma.InputJsonObject | Prisma.InputJsonObject[] = {};
    private orderBy: Record<string, Prisma.SortOrder> | undefined;
    private take: number | undefined;
    private skip: number | undefined;
    private include: Record<string, any> = {};
    private selectInclude: Record<string, boolean> = {};
    private isSelectCalled: boolean = false;

    constructor(model: keyof PrismaClient) {
        this.model = model;
        this.prisma = prisma;
    }

    forceResetQuery(): void {
        this.query = {};
        this.orderBy = undefined;
        this.take = undefined;
        this.skip = undefined;
        this.include = {};
        this.selectInclude = {};
        this.isSelectCalled = false;
    }

    all(query: Prisma.InputJsonObject = {}): this {
        this.query = query;
        return this;
    }

    async count(query: Prisma.InputJsonObject = {}, distinct?: string): Promise<number> {
        this.query = this.getFormattedQuery(query);

        if (distinct) {
            const result = await (this.prisma[this.model] as any).groupBy({
                by: [distinct],
                where: this.query,
                _count: {
                    [distinct]: true
                }
            });
            return result.length;
        } else {
            return (this.prisma[this.model] as any).count({ where: this.query });
        }
    }

    find(query: Prisma.InputJsonObject = {}): this {
        this.query = this.getFormattedQuery(query);
        return this;
    }

    first(query: Prisma.InputJsonObject = {}): this {
        this.query = this.getFormattedQuery(query);
        this.take = 1;
        return this;
    }

    findById(id: id | string | undefined): this {
        this.query = this.getFormattedQuery({ id });
        this.take = 1;
        return this;
    }

    startAt(startAt: number): this {
        this.skip = startAt;
        return this;
    }

    sort(sort: Record<string, Prisma.SortOrder>): this {
        this.orderBy = sort;
        return this;
    }

    size(size: number): this {
        this.take = size;
        return this;
    }

    with(...relations: (string | Record<string, any>)[]): this {
        relations.forEach((relation) => {
            if (typeof relation === 'string') {
                const nestedRelations = relation.split('.');
                let currentInclude = this.include;

                nestedRelations.forEach((rel, index) => {
                    if (!currentInclude[rel]) {
                        currentInclude[rel] = index === nestedRelations.length - 1 ? true : { include: {} };
                    } else if (typeof currentInclude[rel] === 'object' && !currentInclude[rel].include) {
                        currentInclude[rel].include = {};
                    }
                    currentInclude = currentInclude[rel].include || {};
                });
            } else if (typeof relation === 'object') {
                Object.keys(relation).forEach((key) => {
                    const nestedRelations = key.split('.');
                    let currentInclude = this.include;

                    nestedRelations.forEach((rel, index) => {
                        if (!currentInclude[rel]) {
                            currentInclude[rel] = index === nestedRelations.length - 1
                                ? { select: relation[key] }
                                : { include: {} };
                        } else if (typeof currentInclude[rel] === 'object' && !currentInclude[rel].select) {
                            currentInclude[rel].select = {};
                        }
                        currentInclude = currentInclude[rel].include || {};
                    });
                });
            }
        });

        return this;
    }

    getFormattedQuery(query: Record<string, unknown> = {}, validateKey = true): Prisma.InputJsonObject {
        const shouldValidateKey = validateKey && query._excludeValidateKey !== true;
        delete query._excludeValidateKey;

        if (this.validateKey && shouldValidateKey && !Object.prototype.hasOwnProperty.call(query, this.validateKey)) {
            query[this.validateKey] = true;
        }

        return this.formatQuery(Object.assign(query, this.query));
    }

    formatQuery(query: Record<string, any> = {}): Prisma.InputJsonObject {
        const formattedQuery: Record<string, any> = { ...query };

        const processConditions = (conditions: Record<string, any>[]) => {
            return conditions.map((q: Record<string, any>) => {
                if (Object.prototype.hasOwnProperty.call(q, "id")) {
                    q.id = Array.isArray(q.id) ? q.id.map(ids => typeof ids == "string" ? parseId(ids) : ids) : (typeof q.id == "string" ? parseId(q.id) : q.id);
                }
                for (const key in q) {
                    const value = q[key];

                    if (typeof value == "undefined") {
                        delete q[key];
                        continue;
                    }

                    if (Array.isArray(value) && key.charAt(0) !== "$") {
                        q[key] = { in: value };
                    }

                    if (typeof value == "object" && value != null) {
                        if (Object.prototype.hasOwnProperty.call(value, "lt")) {
                            q[key] = { ...q[key], lt: value.lt };
                            delete value.lt;
                        }

                        if (Object.prototype.hasOwnProperty.call(value, "lte")) {
                            q[key] = { ...q[key], lte: value.lte };
                            delete value.lte;
                        }

                        if (Object.prototype.hasOwnProperty.call(value, "gte")) {
                            q[key] = { ...q[key], gte: value.gte };
                            delete value.gte;
                        }

                        if (Object.prototype.hasOwnProperty.call(value, "gt")) {
                            q[key] = { ...q[key], gt: value.gt };
                            delete value.gt;
                        }
                    }
                }

                return q;
            });
        };

        if (Object.prototype.hasOwnProperty.call(formattedQuery, "OR")) {
            formattedQuery.OR = processConditions(formattedQuery.OR as Record<string, any>[]);
        }

        for (const key in formattedQuery) {
            const value = formattedQuery[key];

            if (typeof value == "undefined") {
                delete formattedQuery[key];
                continue;
            }

            if (Array.isArray(value) && key.charAt(0) !== "$" && key !== "OR") {
                formattedQuery[key] = { in: value };
            }

            if (typeof value == "object" && value != null && key !== "OR") {
                if (Object.prototype.hasOwnProperty.call(value, "lt")) {
                    formattedQuery[key] = { ...formattedQuery[key], lt: value.lt };
                    delete value.lt;
                }

                if (Object.prototype.hasOwnProperty.call(value, "lte")) {
                    formattedQuery[key] = { ...formattedQuery[key], lte: value.lte };
                    delete value.lte;
                }

                if (Object.prototype.hasOwnProperty.call(value, "gte")) {
                    formattedQuery[key] = { ...formattedQuery[key], gte: value.gte };
                    delete value.gte;
                }

                if (Object.prototype.hasOwnProperty.call(value, "gt")) {
                    formattedQuery[key] = { ...formattedQuery[key], gt: value.gt };
                    delete value.gt;
                }
            }
        }

        return formattedQuery as Prisma.InputJsonObject;
    }


    logQuery() {
        console.log('Query:', JSON.stringify(this.query, null, 2));
    }


    select(fields: Record<string, boolean>): this {
        this.isSelectCalled = true;
        Object.keys(fields).forEach((key) => {
            if (fields[key]) {
                this.selectInclude[key] = true;
            }
        });
        return this;
    }

    group(fields: Prisma.InputJsonObject): this {
        return this;
    }

    async firstOrCreate(props: T): Promise<T | undefined> {
        const found = await (this.prisma[this.model] as any).findFirst({ where: props });
        if (found) {
            return found as T;
        }
        return this.create(props);
    }

    async upsert(id: id | string | undefined, props: T): Promise<T | undefined> {
        if (id === undefined) {
            return this.create(props);
        } else {
            return (this.prisma[this.model] as any).upsert({
                where: { id: String(id) },
                update: props,
                create: props,
            }) as Promise<T>;
        }
    }

    async create(props: T): Promise<T | undefined> {
        return (this.prisma[this.model] as any).create({ data: props }) as Promise<T>;
    }

    async insertMany(props: T[]): Promise<T[] | undefined> {
        return (this.prisma[this.model] as any).createMany({ data: props, skipDuplicates: true }) as Promise<T[]>;
    }

    async updateById(id: id | string | undefined, props: Prisma.InputJsonObject): Promise<T | undefined> {
        return (this.prisma[this.model] as any).update({ where: { id: String(id) }, data: props }) as Promise<T>;
    }

    async updateManyById(ids: id[] | string[] | undefined, props: Prisma.InputJsonObject): Promise<unknown> {
        return (this.prisma[this.model] as any).updateMany({
            where: { id: { in: ids?.map((id) => String(id)) } },
            data: props,
        });
    }

    async distinctFind(query: Prisma.InputJsonObject = {}, distinct: string, skip: number = 0, take: number = 10, orderBy: Record<string, Prisma.SortOrder> = {}, mode: 'all' | 'specific' = 'all'): Promise<T[]> {
        if (!distinct) {
            throw new Error("Distinct field is required");
        }

        const byFields = [distinct, ...Object.keys(orderBy)];

        const result = await (this.prisma[this.model] as any).groupBy({
            by: byFields,
            where: query,
            orderBy,
            skip,
            take,
        });

        const distinctValues = result.map((item: any) => item[distinct]);

        if (mode === 'all') {
            return (this.prisma[this.model] as any).findMany({
                where: {
                    [distinct]: {
                        in: distinctValues
                    }
                }
            });
        } else {
            return distinctValues.map((value: any) => ({ [distinct]: value }));
        }
    }

    async distinctSpecificFind(query: Prisma.InputJsonObject = {}, distinct: string, orderBy: Record<string, Prisma.SortOrder> = {}): Promise<T[]> {
        if (!distinct) {
            throw new Error("Distinct field is required");
        }

        const byFields = [distinct, ...Object.keys(orderBy)];

        const result = await (this.prisma[this.model] as any).groupBy({
            by: byFields,
            where: query,
            orderBy
        });

        const distinctValues = result.map((item: any) => item[distinct]);

        return distinctValues.map((value: any) => ({ [distinct]: value }));
    }


    async deleteById(id: id | string | undefined): Promise<T | undefined> {
        return (this.prisma[this.model] as any).delete({ where: { id: String(id) } }) as Promise<T>;
    }

    async deleteMany(query: Prisma.InputJsonObject = {}): Promise<void> {
        await (this.prisma[this.model] as any).deleteMany({ where: query });
    }

    async deleteManyById(ids: id[] | string[] | undefined): Promise<void> {
        if (ids && ids.length > 0) {
            await (this.prisma[this.model] as any).deleteMany({
                where: {
                    id: {
                        in: ids.map(id => String(id)),
                    },
                },
            });
        }
    }

    unwind(unwind: string): this {
        // Not directly supported by Prisma, so you might need to handle it differently
        return this;
    }

    async clear(): Promise<void> {
        await (this.prisma[this.model] as any).deleteMany({});
    }

    async exec(): Promise<T[] | T | undefined> {
        const includeFields = {} as Record<string, any>;
        let findManyWhere = {} as Record<string, any>;

        if (this.isSelectCalled) {
            for (const field of Object.keys(this.selectInclude)) {
                includeFields[field] = this.selectInclude[field];
            }
        }

        if (Object.keys(this.include).length > 0) {
            for (const field of Object.keys(this.include)) {
                includeFields[field] = this.include[field];
            }
        }

        if (!this.isSelectCalled) {
            findManyWhere['include'] = includeFields;
        } else {
            findManyWhere['select'] = includeFields;
        }

        try {
            const result = await (this.prisma[this.model] as any).findMany({
                orderBy: this.orderBy,
                take: this.take,
                skip: this.skip,
                ...findManyWhere
            });

            return this.take === 1 ? result[0] : result;
        } finally {
            this.forceResetQuery();
        }
    }

    async nativeSQL(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Promise<T[] | T | undefined> {
        return await this.prisma.$queryRaw(query, ...values);
    }
}