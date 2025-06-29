"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findById = exports.create = exports.getAllCourses = void 0;
const course_service_1 = __importDefault(require("./course.service"));
const getAllCourses = async (req, res) => {
    const courseService = new course_service_1.default();
    const data = await courseService.getAll();
    return res.send(data);
};
exports.getAllCourses = getAllCourses;
const create = async (req, res) => {
    const courseService = new course_service_1.default();
    const props = req.body;
    await courseService.create(props);
    res.status(201).send({ message: "Curso criado com sucesso!" });
};
exports.create = create;
const findById = async (req, res) => {
    const courseService = new course_service_1.default();
    const { id } = req.params;
    const data = await courseService.findById(id);
    return res.send(data);
};
exports.findById = findById;
//# sourceMappingURL=course.controller.js.map