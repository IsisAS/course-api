"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const auth_service_1 = __importDefault(require("./auth.service"));
const login = async (req, res) => {
    const authService = new auth_service_1.default();
    const { email, password } = req.body;
    const data = await authService.login(email, password);
    return res.send(data);
};
exports.login = login;
//# sourceMappingURL=auth.controller.js.map