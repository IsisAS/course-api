import prisma from '../base/config/prisma';
import { Inscricao } from '../types';

export class InscricaoModelPrisma {
  static async create(usuarioId: number, cursoId: number): Promise<Inscricao> {
    const inscricao = await prisma.inscricao.create({
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

  static async findByUserAndCourse(usuarioId: number, cursoId: number): Promise<Inscricao | null> {
    const inscricao = await prisma.inscricao.findUnique({
      where: {
        usuarioId_cursoId: {
          usuarioId,
          cursoId
        }
      }
    });
    
    if (!inscricao) return null;
    
    return {
      id: inscricao.id,
      usuario_id: inscricao.usuarioId,
      curso_id: inscricao.cursoId,
      inscricao_cancelada: inscricao.inscricaoCancelada,
      created_at: inscricao.createdAt,
      updated_at: inscricao.updatedAt
    };
  }

  static async cancelInscricao(usuarioId: number, cursoId: number): Promise<boolean> {
    try {
      const inscricao = await prisma.inscricao.updateMany({
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
    } catch (error) {
      return false;
    }
  }

  static async reativarInscricao(usuarioId: number, cursoId: number): Promise<boolean> {
    try {
      const inscricao = await prisma.inscricao.updateMany({
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
    } catch (error) {
      return false;
    }
  }

  static async isUserEnrolled(usuarioId: number, cursoId: number): Promise<boolean> {
    const inscricao = await prisma.inscricao.findFirst({
      where: {
        usuarioId,
        cursoId,
        inscricaoCancelada: false
      }
    });
    
    return inscricao !== null;
  }
}

