"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_service_1 = __importDefault(require("../../base/base.service"));
const course_repository_1 = __importDefault(require("./course.repository"));
class CourseService extends base_service_1.default {
    constructor() {
        super(course_repository_1.default);
    }
}
exports.default = CourseService;
//# sourceMappingURL=course.service.js.map