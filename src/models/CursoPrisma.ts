import prisma from '../base/config/prisma';
import { Curso } from '../types';

export class CursoModelPrisma {
  static async findAll(filtro?: string): Promise<Curso[]> {
    const cursos = await prisma.curso.findMany({
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

  static async findById(id: number): Promise<Curso | null> {
    const curso = await prisma.curso.findUnique({
      where: { id }
    });
    
    if (!curso) return null;
    
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

  static async findByUserId(userId: number): Promise<Curso[]> {
    const inscricoes = await prisma.inscricao.findMany({
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

  static async incrementInscricoes(cursoId: number): Promise<void> {
    await prisma.curso.update({
      where: { id: cursoId },
      data: {
        inscricoes: {
          increment: 1
        }
      }
    });
  }

  static async decrementInscricoes(cursoId: number): Promise<void> {
    await prisma.curso.update({
      where: { id: cursoId },
      data: {
        inscricoes: {
          decrement: 1
        }
      }
    });
  }
}

