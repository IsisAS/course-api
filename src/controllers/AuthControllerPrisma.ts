import { Request, Response } from 'express';
import { UsuarioModelPrisma } from '../models/UsuarioPrisma';
import { CreateUserRequest, LoginRequest } from '../types';
import jwt from 'jsonwebtoken';

export class AuthControllerPrisma {
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const { nome, email, senha, nascimento }: CreateUserRequest = req.body;

      if (!nome || !email || !senha || !nascimento) {
        res.status(400).json({
          message: 'Todos os campos são obrigatórios'
        });
        return;
      }

      const existingUser = await UsuarioModelPrisma.findByEmail(email);
      if (existingUser) {
        res.status(400).json({
          message: 'Email já está em uso'
        });
        return;
      }

      const user = await UsuarioModelPrisma.create({ nome, email, senha, nascimento });

      res.status(200).json({
        success: true,
        data: {
          id: user.id,
          nome: user.nome,
          email: user.email,
          nascimento: user.nascimento
        }
      });
    } catch (error) {
      console.error('Erro no registro:', error);
      res.status(400).json({
        message: 'Erro interno do servidor'
      });
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, senha }: LoginRequest = req.body;

      if (!email || !senha) {
        res.status(400).json({
          message: 'Email e senha são obrigatórios'
        });
        return;
      }

      const user = await UsuarioModelPrisma.findByEmail(email);
      if (!user) {
        res.status(400).json({
          message: 'Credenciais inválidas'
        });
        return;
      }

      const isValidPassword = await UsuarioModelPrisma.validatePassword(senha, user.senha);
      if (!isValidPassword) {
        res.status(400).json({
          message: 'Credenciais inválidas'
        });
        return;
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || 'default-secret',
        { expiresIn: '24h' }
      );

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1
      });

      res.status(200).json({
        success: true,
        data: {
          id: user.id,
          nome: user.nome,
          email: user.email
        }
      });
    } catch (error) {
      console.error('Erro no login:', error);
      res.status(400).json({
        message: 'Erro interno do servidor'
      });
    }
  }
}

