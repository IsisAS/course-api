import { BaseRepositoryInterface, id } from "./repositories/base.repository";
import { PaginateInterface } from "./interfaces/paginate.interface";
export default class BaseService<Type> {
    repository: BaseRepositoryInterface<Type>;
    constructor(repository: new () => BaseRepositoryInterface<Type>);
    getAll(enabled?: boolean, user?: any): Promise<Array<Type>>;
    findById(id: id | string | undefined): Promise<Type | Type[]>;
    paginate(page?: number, perPage?: number, sortBy?: string, sort?: string, query?: Record<string, unknown>, user?: any): Promise<PaginateInterface<Type>>;
    search(query?: Record<string, unknown>): Promise<Type[]>;
    first(query?: Record<string, unknown>): Promise<Type>;
    create(props: Type): Promise<Type | undefined>;
    updateById(id: id | string | undefined, props: any): Promise<Type | undefined>;
    upsert(id: id | string, props: Type): Promise<Type | undefined>;
    archiveById(id: id | string | undefined): Promise<Type>;
    insertMany(props: Type[]): Promise<Type[] | undefined>;
    archiveManyById(ids: id[] | string[] | undefined, enabled: boolean): Promise<unknown>;
    archiveManyByQuery(query?: Record<string, unknown>): Promise<unknown>;
    find(query?: Record<string, unknown>): Promise<Type | Type[] | undefined>;
    deleteById(id: id | string | undefined): Promise<Type | undefined>;
}
//# sourceMappingURL=base.service.d.ts.map