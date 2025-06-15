"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InscricaoModelPrisma = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
class InscricaoModelPrisma {
    static async create(usuarioId, cursoId) {
        const inscricao = await prisma_1.default.inscricao.create({
            data: {
                usuarioId,
                cursoId,
                inscricaoCancelada: false
            }
        });
        return {
            id: inscricao.id,
            usuario_id: inscricao.usuarioId,
            curso_id: inscricao.cursoId,
            inscricao_cancelada: inscricao.inscricaoCancelada,
            created_at: inscricao.createdAt,
            updated_at: inscricao.updatedAt
        };
    }
    static async findByUserAndCourse(usuarioId, cursoId) {
        const inscricao = await prisma_1.default.inscricao.findUnique({
            where: {
                usuarioId_cursoId: {
                    usuarioId,
                    cursoId
                }
            }
        });
        if (!inscricao)
            return null;
        return {
            id: inscricao.id,
            usuario_id: inscricao.usuarioId,
            curso_id: inscricao.cursoId,
            inscricao_cancelada: inscricao.inscricaoCancelada,
            created_at: inscricao.createdAt,
            updated_at: inscricao.updatedAt
        };
    }
    static async cancelInscricao(usuarioId, cursoId) {
        try {
            const inscricao = await prisma_1.default.inscricao.updateMany({
                where: {
                    usuarioId,
                    cursoId,
                    inscricaoCancelada: false
                },
                data: {
                    inscricaoCancelada: true,
                    updatedAt: new Date()
                }
            });
            return inscricao.count > 0;
        }
        catch (error) {
            return false;
        }
    }
    static async reativarInscricao(usuarioId, cursoId) {
        try {
            const inscricao = await prisma_1.default.inscricao.updateMany({
                where: {
                    usuarioId,
                    cursoId,
                    inscricaoCancelada: true
                },
                data: {
                    inscricaoCancelada: false,
                    updatedAt: new Date()
                }
            });
            return inscricao.count > 0;
        }
        catch (error) {
            return false;
        }
    }
    static async isUserEnrolled(usuarioId, cursoId) {
        const inscricao = await prisma_1.default.inscricao.findFirst({
            where: {
                usuarioId,
                cursoId,
                inscricaoCancelada: false
            }
        });
        return inscricao !== null;
    }
}
exports.InscricaoModelPrisma = InscricaoModelPrisma;
//# sourceMappingURL=InscricaoPrisma.js.map