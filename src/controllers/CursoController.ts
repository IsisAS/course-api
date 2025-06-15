import { Request, Response } from 'express';
import { CursoModel } from '../models/Curso';
import { InscricaoModel } from '../models/Inscricao';

interface AuthenticatedRequest extends Request {
  userId?: number;
}

export class CursoController {
  static async listarCursos(req: Request, res: Response): Promise<void> {
    try {
      const { filtro } = req.query;
      const cursos = await CursoModel.findAll(filtro as string);

      res.status(200).json(cursos);
    } catch (error) {
      console.error('Erro ao listar cursos:', error);
      res.status(500).json({
        message: 'Erro interno do servidor'
      });
    }
  }

  static async fazerInscricao(req: AuthenticatedRequest, res: Response): Promise<void> {
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
      const curso = await CursoModel.findById(cursoId);
      if (!curso) {
        res.status(404).json({
          message: 'Curso não encontrado'
        });
        return;
      }

      // Verificar se usuário já está inscrito
      const inscricaoExistente = await InscricaoModel.findByUserAndCourse(userId, cursoId);
      
      if (inscricaoExistente) {
        if (!inscricaoExistente.inscricao_cancelada) {
          res.status(400).json({
            message: 'Usuário já está inscrito neste curso'
          });
          return;
        } else {
          // Reativar inscrição cancelada
          await InscricaoModel.reativarInscricao(userId, cursoId);
          await CursoModel.incrementInscricoes(cursoId);
        }
      } else {
        // Criar nova inscrição
        await InscricaoModel.create(userId, cursoId);
        await CursoModel.incrementInscricoes(cursoId);
      }

      res.status(200).json({
        success: true,
        message: 'Inscrição realizada com sucesso'
      });
    } catch (error) {
      console.error('Erro ao fazer inscrição:', error);
      res.status(400).json({
        message: 'Erro interno do servidor'
      });
    }
  }

  static async cancelarInscricao(req: AuthenticatedRequest, res: Response): Promise<void> {
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
      const curso = await CursoModel.findById(cursoId);
      if (!curso) {
        res.status(404).json({
          message: 'Curso não encontrado'
        });
        return;
      }

      // Cancelar inscrição
      const cancelado = await InscricaoModel.cancelInscricao(userId, cursoId);
      
      if (!cancelado) {
        res.status(404).json({
          message: 'Inscrição não encontrada ou já cancelada'
        });
        return;
      }

      await CursoModel.decrementInscricoes(cursoId);

      res.status(200).json({
        success: true,
        message: 'Inscrição cancelada com sucesso'
      });
    } catch (error) {
      console.error('Erro ao cancelar inscrição:', error);
      res.status(400).json({
        message: 'Erro interno do servidor'
      });
    }
  }

  static async listarCursosInscritos(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.userId;

      if (!userId) {
        res.status(403).json({
          message: 'Usuário não autenticado'
        });
        return;
      }

      const cursos = await CursoModel.findByUserId(userId);

      res.status(200).json(cursos);
    } catch (error) {
      console.error('Erro ao listar cursos inscritos:', error);
      res.status(500).json({
        message: 'Erro interno do servidor'
      });
    }
  }
}

