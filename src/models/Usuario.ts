import pool from '../base/config/database';
import { Usuario } from '../types';
import bcrypt from 'bcryptjs';

export class UsuarioModel {
  static async create(userData: Omit<Usuario, 'id' | 'created_at' | 'updated_at'>): Promise<Usuario> {
    const hashedPassword = await bcrypt.hash(userData.senha, 10);
    
    const query = `
      INSERT INTO usuarios (nome, email, senha, nascimento)
      VALUES ($1, $2, $3, $4)
      RETURNING id, nome, email, nascimento, created_at, updated_at
    `;
    
    const values = [userData.nome, userData.email, hashedPassword, userData.nascimento];
    const result = await pool.query(query, values);
    
    return result.rows[0];
  }

  static async findByEmail(email: string): Promise<Usuario | null> {
    const query = 'SELECT * FROM usuarios WHERE email = $1';
    const result = await pool.query(query, [email]);
    
    return result.rows[0] || null;
  }

  static async findById(id: number): Promise<Usuario | null> {
    const query = 'SELECT id, nome, email, nascimento, created_at, updated_at FROM usuarios WHERE id = $1';
    const result = await pool.query(query, [id]);
    
    return result.rows[0] || null;
  }

  static async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}

