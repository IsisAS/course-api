import { Prisma } from '@prisma/client';
import PrismaRepository from './prisma.repository';
export interface BaseRepositoryInterface<T> {
    all: (query?: Prisma.InputJsonObject) => this;
    count: (query?: Prisma.InputJsonObject, distinct?: string) => Promise<number>;
    find: (query?: Prisma.InputJsonObject) => this;
    first: (query?: Prisma.InputJsonObject) => this;
    findById: (id: id | string | undefined) => this;
    startAt: (startAt: number) => this;
    sort: (sort: Record<string, Prisma.SortOrder>) => this;
    size: (size: number) => this;
    with: (...relations: (string | Record<string, any>)[]) => this;
    upsert: (id: id | string, props: T) => Promise<T | undefined>;
    select: (fields: Record<string, boolean>) => this;
    group: (fields: Prisma.InputJsonObject) => this;
    firstOrCreate: (props: T) => Promise<T | undefined>;
    create: (props: T) => Promise<T | undefined>;
    insertMany: (props: T[]) => Promise<T[] | undefined>;
    updateById: (id: id | string | undefined, props: Prisma.InputJsonObject) => Promise<T | undefined>;
    updateManyById: (ids: id[] | string[] | undefined, props: Prisma.InputJsonObject) => Promise<unknown>;
    distinctFind: (query: Prisma.InputJsonObject, distinct: string, skip: number, take: number, orderBy: Record<string, Prisma.SortOrder>, mode: 'all' | 'specific') => Promise<T[]>;
    distinctSpecificFind: (query: Prisma.InputJsonObject, distinct: string, orderBy: Record<string, Prisma.SortOrder>) => Promise<T[]>;
    deleteById: (id: id | string | undefined) => Promise<T | undefined>;
    deleteMany: (query?: Prisma.InputJsonObject) => Promise<void>;
    deleteManyById: (ids: id[] | string[] | undefined) => Promise<void>;
    unwind: (unwind: string) => this;
    clear: () => Promise<void>;
    exec: () => Promise<T[] | T | undefined>;
    nativeSQL: (query: TemplateStringsArray | Prisma.Sql, ...values: any[]) => Promise<T[] | T | undefined>;
    forceResetQuery: () => void;
}
declare const BaseRepository: typeof PrismaRepository;
export type id = string;
export declare const parseId: (value: any) => string;
export default BaseRepository;
//# sourceMappingURL=base.repository.d.ts.map