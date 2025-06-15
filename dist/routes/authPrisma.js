"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthControllerPrisma_1 = require("../controllers/AuthControllerPrisma");
const router = (0, express_1.Router)();
// Rota para criar conta
router.post('/usuarios', AuthControllerPrisma_1.AuthControllerPrisma.register);
// Rota para login
router.post('/login', AuthControllerPrisma_1.AuthControllerPrisma.login);
exports.default = router;
//# sourceMappingURL=authPrisma.js.map