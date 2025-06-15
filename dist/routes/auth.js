"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../controllers/AuthController");
const router = (0, express_1.Router)();
// Rota para criar conta
router.post('/usuarios', AuthController_1.AuthController.register);
// Rota para login
router.post('/login', AuthController_1.AuthController.login);
exports.default = router;
//# sourceMappingURL=auth.js.map