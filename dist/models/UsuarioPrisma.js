"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioModelPrisma = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UsuarioModelPrisma {
    static async create(userData) {
        const hashedPassword = await bcryptjs_1.default.hash(userData.senha, 10);
        const user = await prisma_1.default.usuario.create({
            data: {
                nome: userData.nome,
                email: userData.email,
                senha: hashedPassword,
                nascimento: new Date(userData.nascimento)
            }
        });
        return {
            id: user.id,
            nome: user.nome,
            email: user.email,
            senha: user.senha,
            nascimento: user.nascimento.toISOString().split('T')[0],
            created_at: user.createdAt,
            updated_at: user.updatedAt
        };
    }
    static async findByEmail(email) {
        const user = await prisma_1.default.usuario.findUnique({
            where: { email }
        });
        if (!user)
            return null;
        return {
            id: user.id,
            nome: user.nome,
            email: user.email,
            senha: user.senha,
            nascimento: user.nascimento.toISOString().split('T')[0],
            created_at: user.createdAt,
            updated_at: user.updatedAt
        };
    }
    static async findById(id) {
        const user = await prisma_1.default.usuario.findUnique({
            where: { id },
            select: {
                id: true,
                nome: true,
                email: true,
                nascimento: true,
                createdAt: true,
                updatedAt: true
            }
        });
        if (!user)
            return null;
        return {
            id: user.id,
            nome: user.nome,
            email: user.email,
            senha: '', // Não retornar senha
            nascimento: user.nascimento.toISOString().split('T')[0],
            created_at: user.createdAt,
            updated_at: user.updatedAt
        };
    }
    static async validatePassword(plainPassword, hashedPassword) {
        return bcryptjs_1.default.compare(plainPassword, hashedPassword);
    }
}
exports.UsuarioModelPrisma = UsuarioModelPrisma;
//# sourceMappingURL=UsuarioPrisma.js.map