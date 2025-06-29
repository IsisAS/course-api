"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_repository_1 = __importDefault(require("../../base/repositories/base.repository"));
class CourseRepository extends base_repository_1.default {
    constructor() {
        super('course');
    }
}
exports.default = CourseRepository;
//# sourceMappingURL=course.repository.js.map