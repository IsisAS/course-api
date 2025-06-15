"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    try {
        // Tentar obter token do cookie primeiro
        let token = req.cookies?.token;
        // Se não houver cookie, tentar obter do header Authorization
        if (!token) {
            const authHeader = req.headers.authorization;
            token = authHeader && authHeader.startsWith('Bearer ')
                ? authHeader.substring(7)
                : null;
        }
        if (!token) {
            res.status(403).json({
                message: 'Token de acesso requerido'
            });
            return;
        }
        // Verificar token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'default-secret');
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        console.error('Erro na autenticação:', error);
        res.status(403).json({
            message: 'Token inválido'
        });
        return;
    }
};
exports.authenticateToken = authenticateToken;
//# sourceMappingURL=auth.js.map