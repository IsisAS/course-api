import pool from '../base/config/database';
import { Inscricao } from '../types';

export class InscricaoModel {
  static async create(usuarioId: number, cursoId: number): Promise<Inscricao> {
    const query = `
      INSERT INTO inscricoes (usuario_id, curso_id, inscricao_cancelada)
      VALUES ($1, $2, false)
      RETURNING *
    `;
    
    const values = [usuarioId, cursoId];
    const result = await pool.query(query, values);
    
    return result.rows[0];
  }

  static async findByUserAndCourse(usuarioId: number, cursoId: number): Promise<Inscricao | null> {
    const query = 'SELECT * FROM inscricoes WHERE usuario_id = $1 AND curso_id = $2';
    const result = await pool.query(query, [usuarioId, cursoId]);
    
    return result.rows[0] || null;
  }

  static async cancelInscricao(usuarioId: number, cursoId: number): Promise<boolean> {
    const query = `
      UPDATE inscricoes 
      SET inscricao_cancelada = true, updated_at = CURRENT_TIMESTAMP
      WHERE usuario_id = $1 AND curso_id = $2 AND inscricao_cancelada = false
      RETURNING *
    `;
    
    const result = await pool.query(query, [usuarioId, cursoId]);
    return result.rows.length > 0;
  }

  static async reativarInscricao(usuarioId: number, cursoId: number): Promise<boolean> {
    const query = `
      UPDATE inscricoes 
      SET inscricao_cancelada = false, updated_at = CURRENT_TIMESTAMP
      WHERE usuario_id = $1 AND curso_id = $2 AND inscricao_cancelada = true
      RETURNING *
    `;
    
    const result = await pool.query(query, [usuarioId, cursoId]);
    return result.rows.length > 0;
  }

  static async isUserEnrolled(usuarioId: number, cursoId: number): Promise<boolean> {
    const query = `
      SELECT id FROM inscricoes 
      WHERE usuario_id = $1 AND curso_id = $2 AND inscricao_cancelada = false
    `;
    
    const result = await pool.query(query, [usuarioId, cursoId]);
    return result.rows.length > 0;
  }
}

