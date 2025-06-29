"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_repository_1 = __importDefault(require("../../base/repositories/base.repository"));
class UserRepository extends base_repository_1.default {
    constructor() {
        super('user');
    }
}
exports.default = UserRepository;
//# sourceMappingURL=user.repository.js.map