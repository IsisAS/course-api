import { Prisma } from "@prisma/client";
import { BaseInterface } from "./interfaces/base.interface";
import { BaseRepositoryInterface, id } from "./repositories/base.repository";
import { PaginateInterface } from "./interfaces/paginate.interface";
import { formatDates } from "../utils/format-date";

export default class BaseService<Type> {
    repository: BaseRepositoryInterface<Type>;
    constructor(
        repository: new () => BaseRepositoryInterface<Type>,
    ) {
        this.repository = new repository();
    }
    async getAll(enabled = true, user?: any): Promise<Array<Type>> {
        if (enabled) {
            return <Type[]>await this.repository.find().exec();
        } else {
            return <Type[]>await this.repository.all().exec();
        }
    }
    async findById(id: id | string | undefined): Promise<Type | Type[]> {
        return <Type>await this.repository.findById(id).exec();
    }
    async paginate(page = 1, perPage = 10, sortBy = "createdAt", sort = "desc", query?: Record<string, unknown>, user?: any): Promise<PaginateInterface<Type>> {
        const prismaQuery: Prisma.InputJsonObject | undefined = query as Prisma.InputJsonObject;
        const total = <number>await this.repository.count(prismaQuery);
        const countPage = Math.floor(total / perPage) + (total % perPage == 0 ? 0 : 1);

        page = page <= countPage ? page : countPage;

        if (!page) {
            page = 1;
        }

        const sortQuery: Record<string, Prisma.SortOrder> = {};
        sortQuery[sortBy] = sort as Prisma.SortOrder;

        const items = <Type[]>await this.repository
            .find(prismaQuery)
            .sort(sortQuery)
            .startAt((page - 1) * perPage)
            .size(perPage)
            .exec();

        const formattedItems = formatDates(items) as Type[];

        return {
            page,
            perPage,
            countPage,
            sortBy,
            sort,
            total,
            items: formattedItems,
        };
    }
    async search(query?: Record<string, unknown>): Promise<Type[]> {
        const prismaQuery: Prisma.InputJsonObject | undefined = query as Prisma.InputJsonObject;
        return <Type[]>await this.repository.find(prismaQuery).exec();
    }
    async first(query?: Record<string, unknown>): Promise<Type> {
        const prismaQuery: Prisma.InputJsonObject | undefined = query as Prisma.InputJsonObject;
        return <Type>await this.repository.first(prismaQuery).exec();
    }
    async create(props: Type): Promise<Type | undefined> {

        return <Type>await this.repository.create(props);
    }
    async updateById(id: id | string | undefined, props: any): Promise<Type | undefined> {
        await this.repository.updateById(id, props);

        return <Type>await this.repository.findById(id).exec();
    }
    async upsert(id: id | string, props: Type): Promise<Type | undefined> {
        await this.repository.upsert(id, props);
        return <Type>await this.repository.findById(id).exec();
    }
    async archiveById(id: id | string | undefined) {
        return <Type>await this.repository.updateById(id, { enabled: false });

    }
    async insertMany(props: Type[]) {
        return await this.repository.insertMany(props);
    }
    async archiveManyById(ids: id[] | string[] | undefined, enabled: boolean) {
        return await this.repository.updateManyById(ids, { enabled });
    }
    async archiveManyByQuery(query: Record<string, unknown> = {}) {
        const listIds: id[] = [];

        const prismaQuery: Prisma.InputJsonObject = query as Prisma.InputJsonObject;

        const data: any = await this.repository.find(prismaQuery).exec();

        if (data?.length) {
            data?.forEach((item: BaseInterface) => {
                if (item.id) {
                    listIds.push(item.id);
                }
            });
        }

        return await this.repository.updateManyById(listIds, { enabled: false });
    }
    async find(query?: Record<string, unknown>) {
        const prismaQuery: Prisma.InputJsonObject | undefined = query as Prisma.InputJsonObject;
        return this.repository.find(prismaQuery).exec();
    }
    async deleteById(id: id | string | undefined): Promise<Type | undefined> {
        return <Type>await this.repository.deleteById(id);
    }
}