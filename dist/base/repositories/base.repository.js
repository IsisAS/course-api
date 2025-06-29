"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseId = void 0;
const prisma_repository_1 = __importDefault(require("./prisma.repository"));
const BaseRepository = prisma_repository_1.default;
const parseId = function (value) {
    return typeof value === 'string' ? value : String(value);
};
exports.parseId = parseId;
exports.default = BaseRepository;
//# sourceMappingURL=base.repository.js.map