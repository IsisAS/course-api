"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursoModelPrisma = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
class CursoModelPrisma {
    static async findAll(filtro) {
        const cursos = await prisma_1.default.curso.findMany({
            where: filtro ? {
                OR: [
                    { nome: { contains: filtro, mode: 'insensitive' } },
                    { descricao: { contains: filtro, mode: 'insensitive' } }
                ]
            } : undefined,
            orderBy: { createdAt: 'desc' }
        });
        return cursos.map(curso => ({
            id: curso.id,
            nome: curso.nome,
            descricao: curso.descricao || undefined,
            capa: curso.capa || undefined,
            inscricoes: curso.inscricoes,
            inicio: curso.inicio.toISOString().split('T')[0],
            inscrito: curso.inscrito,
            created_at: curso.createdAt,
            updated_at: curso.updatedAt
        }));
    }
    static async findById(id) {
        const curso = await prisma_1.default.curso.findUnique({
            where: { id }
        });
        if (!curso)
            return null;
        return {
            id: curso.id,
            nome: curso.nome,
            descricao: curso.descricao || undefined,
            capa: curso.capa || undefined,
            inscricoes: curso.inscricoes,
            inicio: curso.inicio.toISOString().split('T')[0],
            inscrito: curso.inscrito,
            created_at: curso.createdAt,
            updated_at: curso.updatedAt
        };
    }
    static async findByUserId(userId) {
        const inscricoes = await prisma_1.default.inscricao.findMany({
            where: {
                usuarioId: userId,
                inscricaoCancelada: false
            },
            include: {
                curso: true
            },
            orderBy: { createdAt: 'desc' }
        });
        return inscricoes.map(inscricao => ({
            id: inscricao.curso.id,
            nome: inscricao.curso.nome,
            descricao: inscricao.curso.descricao || undefined,
            capa: inscricao.curso.capa || undefined,
            inscricoes: inscricao.curso.inscricoes,
            inicio: inscricao.curso.inicio.toISOString().split('T')[0],
            inscrito: true,
            inscricao_cancelada: inscricao.inscricaoCancelada,
            created_at: inscricao.curso.createdAt,
            updated_at: inscricao.curso.updatedAt
        }));
    }
    static async incrementInscricoes(cursoId) {
        await prisma_1.default.curso.update({
            where: { id: cursoId },
            data: {
                inscricoes: {
                    increment: 1
                }
            }
        });
    }
    static async decrementInscricoes(cursoId) {
        await prisma_1.default.curso.update({
            where: { id: cursoId },
            data: {
                inscricoes: {
                    decrement: 1
                }
            }
        });
    }
}
exports.CursoModelPrisma = CursoModelPrisma;
//# sourceMappingURL=CursoPrisma.js.map