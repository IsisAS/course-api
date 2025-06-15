import { Request, Response } from 'express';
import { CursoModelPrisma } from '../models/CursoPrisma';
import { InscricaoModelPrisma } from '../models/InscricaoPrisma';

interface AuthenticatedRequest extends Request {
  userId?: number;
}

export class CursoControllerPrisma {
  static async listarCursos(req: Request, res: Response): Promise<void> {
    try {
      const { filtro } = req.query;
      const cursos = await CursoModelPrisma.findAll(filtro as string);

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
      const curso = await CursoModelPrisma.findById(cursoId);
      if (!curso) {
        res.status(404).json({
          message: 'Curso não encontrado'
        });
        return;
      }

      // Verificar se usuário já está inscrito
      const inscricaoExistente = await InscricaoModelPrisma.findByUserAndCourse(userId, cursoId);
      
      if (inscricaoExistente) {
        if (!inscricaoExistente.inscricao_cancelada) {
          res.status(400).json({
            message: 'Usuário já está inscrito neste curso'
          });
          return;
        } else {
          // Reativar inscrição cancelada
          await InscricaoModelPrisma.reativarInscricao(userId, cursoId);
          await CursoModelPrisma.incrementInscricoes(cursoId);
        }
      } else {
        // Criar nova inscrição
        await InscricaoModelPrisma.create(userId, cursoId);
        await CursoModelPrisma.incrementInscricoes(cursoId);
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
      const curso = await CursoModelPrisma.findById(cursoId);
      if (!curso) {
        res.status(404).json({
          message: 'Curso não encontrado'
        });
        return;
      }

      // Cancelar inscrição
      const cancelado = await InscricaoModelPrisma.cancelInscricao(userId, cursoId);
      
      if (!cancelado) {
        res.status(404).json({
          message: 'Inscrição não encontrada ou já cancelada'
        });
        return;
      }

      await CursoModelPrisma.decrementInscricoes(cursoId);

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

      const cursos = await CursoModelPrisma.findByUserId(userId);

      res.status(200).json(cursos);
    } catch (error) {
      console.error('Erro ao listar cursos inscritos:', error);
      res.status(500).json({
        message: 'Erro interno do servidor'
      });
    }
  }
}

