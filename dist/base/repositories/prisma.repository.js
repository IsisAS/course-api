"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_repository_1 = require("./base.repository");
const prisma_1 = __importDefault(require("../config/prisma"));
class PrismaRepository {
    constructor(model) {
        this.validateKey = "enabled";
        this.query = {};
        this.include = {};
        this.selectInclude = {};
        this.isSelectCalled = false;
        this.model = model;
        this.prisma = prisma_1.default;
    }
    forceResetQuery() {
        this.query = {};
        this.orderBy = undefined;
        this.take = undefined;
        this.skip = undefined;
        this.include = {};
        this.selectInclude = {};
        this.isSelectCalled = false;
    }
    all(query = {}) {
        this.query = query;
        return this;
    }
    async count(query = {}, distinct) {
        this.query = this.getFormattedQuery(query);
        if (distinct) {
            const result = await this.prisma[this.model].groupBy({
                by: [distinct],
                where: this.query,
                _count: {
                    [distinct]: true
                }
            });
            return result.length;
        }
        else {
            return this.prisma[this.model].count({ where: this.query });
        }
    }
    find(query = {}) {
        this.query = this.getFormattedQuery(query);
        return this;
    }
    first(query = {}) {
        this.query = this.getFormattedQuery(query);
        this.take = 1;
        return this;
    }
    findById(id) {
        this.query = this.getFormattedQuery({ id });
        this.take = 1;
        return this;
    }
    startAt(startAt) {
        this.skip = startAt;
        return this;
    }
    sort(sort) {
        this.orderBy = sort;
        return this;
    }
    size(size) {
        this.take = size;
        return this;
    }
    with(...relations) {
        relations.forEach((relation) => {
            if (typeof relation === 'string') {
                const nestedRelations = relation.split('.');
                let currentInclude = this.include;
                nestedRelations.forEach((rel, index) => {
                    if (!currentInclude[rel]) {
                        currentInclude[rel] = index === nestedRelations.length - 1 ? true : { include: {} };
                    }
                    else if (typeof currentInclude[rel] === 'object' && !currentInclude[rel].include) {
                        currentInclude[rel].include = {};
                    }
                    currentInclude = currentInclude[rel].include || {};
                });
            }
            else if (typeof relation === 'object') {
                Object.keys(relation).forEach((key) => {
                    const nestedRelations = key.split('.');
                    let currentInclude = this.include;
                    nestedRelations.forEach((rel, index) => {
                        if (!currentInclude[rel]) {
                            currentInclude[rel] = index === nestedRelations.length - 1
                                ? { select: relation[key] }
                                : { include: {} };
                        }
                        else if (typeof currentInclude[rel] === 'object' && !currentInclude[rel].select) {
                            currentInclude[rel].select = {};
                        }
                        currentInclude = currentInclude[rel].include || {};
                    });
                });
            }
        });
        return this;
    }
    getFormattedQuery(query = {}, validateKey = true) {
        const shouldValidateKey = validateKey && query._excludeValidateKey !== true;
        delete query._excludeValidateKey;
        if (this.validateKey && shouldValidateKey && !Object.prototype.hasOwnProperty.call(query, this.validateKey)) {
            query[this.validateKey] = true;
        }
        return this.formatQuery(Object.assign(query, this.query));
    }
    formatQuery(query = {}) {
        const formattedQuery = { ...query };
        const processConditions = (conditions) => {
            return conditions.map((q) => {
                if (Object.prototype.hasOwnProperty.call(q, "id")) {
                    q.id = Array.isArray(q.id) ? q.id.map(ids => typeof ids == "string" ? (0, base_repository_1.parseId)(ids) : ids) : (typeof q.id == "string" ? (0, base_repository_1.parseId)(q.id) : q.id);
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
            formattedQuery.OR = processConditions(formattedQuery.OR);
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
        return formattedQuery;
    }
    logQuery() {
        console.log('Query:', JSON.stringify(this.query, null, 2));
    }
    select(fields) {
        this.isSelectCalled = true;
        Object.keys(fields).forEach((key) => {
            if (fields[key]) {
                this.selectInclude[key] = true;
            }
        });
        return this;
    }
    group(fields) {
        return this;
    }
    async firstOrCreate(props) {
        const found = await this.prisma[this.model].findFirst({ where: props });
        if (found) {
            return found;
        }
        return this.create(props);
    }
    async upsert(id, props) {
        if (id === undefined) {
            return this.create(props);
        }
        else {
            return this.prisma[this.model].upsert({
                where: { id: String(id) },
                update: props,
                create: props,
            });
        }
    }
    async create(props) {
        return this.prisma[this.model].create({ data: props });
    }
    async insertMany(props) {
        return this.prisma[this.model].createMany({ data: props, skipDuplicates: true });
    }
    async updateById(id, props) {
        return this.prisma[this.model].update({ where: { id: String(id) }, data: props });
    }
    async updateManyById(ids, props) {
        return this.prisma[this.model].updateMany({
            where: { id: { in: ids?.map((id) => String(id)) } },
            data: props,
        });
    }
    async distinctFind(query = {}, distinct, skip = 0, take = 10, orderBy = {}, mode = 'all') {
        if (!distinct) {
            throw new Error("Distinct field is required");
        }
        const byFields = [distinct, ...Object.keys(orderBy)];
        const result = await this.prisma[this.model].groupBy({
            by: byFields,
            where: query,
            orderBy,
            skip,
            take,
        });
        const distinctValues = result.map((item) => item[distinct]);
        if (mode === 'all') {
            return this.prisma[this.model].findMany({
                where: {
                    [distinct]: {
                        in: distinctValues
                    }
                }
            });
        }
        else {
            return distinctValues.map((value) => ({ [distinct]: value }));
        }
    }
    async distinctSpecificFind(query = {}, distinct, orderBy = {}) {
        if (!distinct) {
            throw new Error("Distinct field is required");
        }
        const byFields = [distinct, ...Object.keys(orderBy)];
        const result = await this.prisma[this.model].groupBy({
            by: byFields,
            where: query,
            orderBy
        });
        const distinctValues = result.map((item) => item[distinct]);
        return distinctValues.map((value) => ({ [distinct]: value }));
    }
    async deleteById(id) {
        return this.prisma[this.model].delete({ where: { id: String(id) } });
    }
    async deleteMany(query = {}) {
        await this.prisma[this.model].deleteMany({ where: query });
    }
    async deleteManyById(ids) {
        if (ids && ids.length > 0) {
            await this.prisma[this.model].deleteMany({
                where: {
                    id: {
                        in: ids.map(id => String(id)),
                    },
                },
            });
        }
    }
    unwind(unwind) {
        // Not directly supported by Prisma, so you might need to handle it differently
        return this;
    }
    async clear() {
        await this.prisma[this.model].deleteMany({});
    }
    async exec() {
        const includeFields = {};
        let findManyWhere = {};
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
        }
        else {
            findManyWhere['select'] = includeFields;
        }
        try {
            const result = await this.prisma[this.model].findMany({
                where: this.query,
                orderBy: this.orderBy,
                take: this.take,
                skip: this.skip,
                ...findManyWhere
            });
            return this.take === 1 ? result[0] : result;
        }
        finally {
            this.forceResetQuery();
        }
    }
    async nativeSQL(query, ...values) {
        return await this.prisma.$queryRaw(query, ...values);
    }
}
exports.default = PrismaRepository;
//# sourceMappingURL=prisma.repository.js.map