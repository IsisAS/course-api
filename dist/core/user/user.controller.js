"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteById = exports.updateById = exports.findById = exports.create = void 0;
const user_service_1 = __importDefault(require("./user.service"));
const create = async (req, res) => {
    const userService = new user_service_1.default();
    const props = req.body;
    const data = await userService.create(props);
    res.send(data);
};
exports.create = create;
const findById = async (req, res) => {
    const userService = new user_service_1.default();
    const { id } = req.params;
    const data = await userService.findById(id);
    res.send(data);
};
exports.findById = findById;
const updateById = async (req, res) => {
    const userService = new user_service_1.default();
    const props = req.body;
    const { id } = req.params;
    const data = await userService.updateById(id, props);
    res.send(data);
};
exports.updateById = updateById;
const deleteById = async (req, res) => {
    const userService = new user_service_1.default();
    const { id } = req.params;
    const data = await userService.deleteById(id);
    res.send(data);
};
exports.deleteById = deleteById;
//# sourceMappingURL=user.controller.js.map