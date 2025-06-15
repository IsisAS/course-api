"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursoController = void 0;
const Curso_1 = require("../models/Curso");
const Inscricao_1 = require("../models/Inscricao");
class CursoController {
    static async listarCursos(req, res) {
        try {
            const { filtro } = req.query;
            const cursos = await Curso_1.CursoModel.findAll(filtro);
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
            const curso = await Curso_1.CursoModel.findById(cursoId);
            if (!curso) {
                res.status(404).json({
                    message: 'Curso não encontrado'
                });
                return;
            }
            // Verificar se usuário já está inscrito
            const inscricaoExistente = await Inscricao_1.InscricaoModel.findByUserAndCourse(userId, cursoId);
            if (inscricaoExistente) {
                if (!inscricaoExistente.inscricao_cancelada) {
                    res.status(400).json({
                        message: 'Usuário já está inscrito neste curso'
                    });
                    return;
                }
                else {
                    // Reativar inscrição cancelada
                    await Inscricao_1.InscricaoModel.reativarInscricao(userId, cursoId);
                    await Curso_1.CursoModel.incrementInscricoes(cursoId);
                }
            }
            else {
                // Criar nova inscrição
                await Inscricao_1.InscricaoModel.create(userId, cursoId);
                await Curso_1.CursoModel.incrementInscricoes(cursoId);
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
            const curso = await Curso_1.CursoModel.findById(cursoId);
            if (!curso) {
                res.status(404).json({
                    message: 'Curso não encontrado'
                });
                return;
            }
            // Cancelar inscrição
            const cancelado = await Inscricao_1.InscricaoModel.cancelInscricao(userId, cursoId);
            if (!cancelado) {
                res.status(404).json({
                    message: 'Inscrição não encontrada ou já cancelada'
                });
                return;
            }
            await Curso_1.CursoModel.decrementInscricoes(cursoId);
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
            const cursos = await Curso_1.CursoModel.findByUserId(userId);
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
exports.CursoController = CursoController;
//# sourceMappingURL=CursoController.js.map