"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const format_date_1 = require("../utils/format-date");
class BaseService {
    constructor(repository) {
        this.repository = new repository();
    }
    async getAll(enabled = true, user) {
        if (enabled) {
            return await this.repository.find().exec();
        }
        else {
            return await this.repository.all().exec();
        }
    }
    async findById(id) {
        return await this.repository.findById(id).exec();
    }
    async paginate(page = 1, perPage = 10, sortBy = "createdAt", sort = "desc", query, user) {
        const prismaQuery = query;
        const total = await this.repository.count(prismaQuery);
        const countPage = Math.floor(total / perPage) + (total % perPage == 0 ? 0 : 1);
        page = page <= countPage ? page : countPage;
        if (!page) {
            page = 1;
        }
        const sortQuery = {};
        sortQuery[sortBy] = sort;
        const items = await this.repository
            .find(prismaQuery)
            .sort(sortQuery)
            .startAt((page - 1) * perPage)
            .size(perPage)
            .exec();
        const formattedItems = (0, format_date_1.formatDates)(items);
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
    async search(query) {
        const prismaQuery = query;
        return await this.repository.find(prismaQuery).exec();
    }
    async first(query) {
        const prismaQuery = query;
        return await this.repository.first(prismaQuery).exec();
    }
    async create(props) {
        return await this.repository.create(props);
    }
    async updateById(id, props) {
        await this.repository.updateById(id, props);
        return await this.repository.findById(id).exec();
    }
    async upsert(id, props) {
        await this.repository.upsert(id, props);
        return await this.repository.findById(id).exec();
    }
    async archiveById(id) {
        return await this.repository.updateById(id, { enabled: false });
    }
    async insertMany(props) {
        return await this.repository.insertMany(props);
    }
    async archiveManyById(ids, enabled) {
        return await this.repository.updateManyById(ids, { enabled });
    }
    async archiveManyByQuery(query = {}) {
        const listIds = [];
        const prismaQuery = query;
        const data = await this.repository.find(prismaQuery).exec();
        if (data?.length) {
            data?.forEach((item) => {
                if (item.id) {
                    listIds.push(item.id);
                }
            });
        }
        return await this.repository.updateManyById(listIds, { enabled: false });
    }
    async find(query) {
        const prismaQuery = query;
        return this.repository.find(prismaQuery).exec();
    }
    async deleteById(id) {
        return await this.repository.deleteById(id);
    }
}
exports.default = BaseService;
//# sourceMappingURL=base.service.js.map