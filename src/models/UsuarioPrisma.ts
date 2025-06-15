import prisma from '../base/config/prisma';
import { Usuario } from '../types';
import bcrypt from 'bcryptjs';

export class UsuarioModelPrisma {
  static async create(userData: Omit<Usuario, 'id' | 'created_at' | 'updated_at'>): Promise<Usuario> {
    const hashedPassword = await bcrypt.hash(userData.senha, 10);
    
    const user = await prisma.usuario.create({
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

  static async findByEmail(email: string): Promise<Usuario | null> {
    const user = await prisma.usuario.findUnique({
      where: { email }
    });
    
    if (!user) return null;
    
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

  static async findById(id: number): Promise<Usuario | null> {
    const user = await prisma.usuario.findUnique({
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
    
    if (!user) return null;
    
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

  static async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}

