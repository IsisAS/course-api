"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursoControllerPrisma = void 0;
const CursoPrisma_1 = require("../models/CursoPrisma");
const InscricaoPrisma_1 = require("../models/InscricaoPrisma");
class CursoControllerPrisma {
    static async listarCursos(req, res) {
        try {
            const { filtro } = req.query;
            const cursos = await CursoPrisma_1.CursoModelPrisma.findAll(filtro);
            res.status(200).json(cursos);
        }
        catch (error) {
            console.error('Erro ao listar cursos:', error);
            res.status(500).json({
                message: 'Erro interno do servidor'
            });
        }
    }
    static async fazerInscricao(req, res) {
        try {
            const { idCurso } = req.params;
            const userId = req.userId;
            if (!userId) {
                res.status(403).json({
                    message: 'Usuário não autenticado'
                });
                return;
            }
            const cursoId = parseInt(idCurso);
            // Verificar se curso existe
            const curso = await CursoPrisma_1.CursoModelPrisma.findById(cursoId);
            if (!curso) {
                res.status(404).json({
                    message: 'Curso não encontrado'
                });
                return;
            }
            // Verificar se usuário já está inscrito
            const inscricaoExistente = await InscricaoPrisma_1.InscricaoModelPrisma.findByUserAndCourse(userId, cursoId);
            if (inscricaoExistente) {
                if (!inscricaoExistente.inscricao_cancelada) {
                    res.status(400).json({
                        message: 'Usuário já está inscrito neste curso'
                    });
                    return;
                }
                else {
                    // Reativar inscrição cancelada
                    await InscricaoPrisma_1.InscricaoModelPrisma.reativarInscricao(userId, cursoId);
                    await CursoPrisma_1.CursoModelPrisma.incrementInscricoes(cursoId);
                }
            }
            else {
                // Criar nova inscrição
                await InscricaoPrisma_1.InscricaoModelPrisma.create(userId, cursoId);
                await CursoPrisma_1.CursoModelPrisma.incrementInscricoes(cursoId);
            }
            res.status(200).json({
                success: true,
                message: 'Inscrição realizada com sucesso'
            });
        }
        catch (error) {
            console.error('Erro ao fazer inscrição:', error);
            res.status(400).json({
                message: 'Erro interno do servidor'
            });
        }
    }
    static async cancelarInscricao(req, res) {
        try {
            const { idCurso } = req.params;
            const userId = req.userId;
            if (!userId) {
                res.status(403).json({
                    message: 'Usuário não autenticado'
                });
                return;
            }
            const cursoId = parseInt(idCurso);
            // Verificar se curso existe
            const curso = await CursoPrisma_1.CursoModelPrisma.findById(cursoId);
            if (!curso) {
                res.status(404).json({
                    message: 'Curso não encontrado'
                });
                return;
            }
            // Cancelar inscrição
            const cancelado = await InscricaoPrisma_1.InscricaoModelPrisma.cancelInscricao(userId, cursoId);
            if (!cancelado) {
                res.status(404).json({
                    message: 'Inscrição não encontrada ou já cancelada'
                });
                return;
            }
            await CursoPrisma_1.CursoModelPrisma.decrementInscricoes(cursoId);
            res.status(200).json({
                success: true,
                message: 'Inscrição cancelada com sucesso'
            });
        }
        catch (error) {
            console.error('Erro ao cancelar inscrição:', error);
            res.status(400).json({
                message: 'Erro interno do servidor'
            });
        }
    }
    static async listarCursosInscritos(req, res) {
        try {
            const userId = req.userId;
            if (!userId) {
                res.status(403).json({
                    message: 'Usuário não autenticado'
                });
                return;
            }
            const cursos = await CursoPrisma_1.CursoModelPrisma.findByUserId(userId);
            res.status(200).json(cursos);
        }
        catch (error) {
            console.error('Erro ao listar cursos inscritos:', error);
            res.status(500).json({
                message: 'Erro interno do servidor'
            });
        }
    }
}
exports.CursoControllerPrisma = CursoControllerPrisma;
//# sourceMappingURL=CursoControllerPrisma.js.map