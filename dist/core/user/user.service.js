"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_service_1 = __importDefault(require("../../base/base.service"));
const user_repository_1 = __importDefault(require("./user.repository"));
class UserService extends base_service_1.default {
    constructor() {
        super(user_repository_1.default);
    }
}
exports.default = UserService;
//# sourceMappingURL=user.service.js.map