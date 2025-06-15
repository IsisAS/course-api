import pool from '../base/config/database';
import { Curso } from '../types';

export class CursoModel {
  static async findAll(filtro?: string): Promise<Curso[]> {
    let query = `
      SELECT id, nome, descricao, capa, inscricoes, inicio, inscrito
      FROM cursos
    `;
    let values: any[] = [];

    if (filtro) {
      query += ' WHERE nome ILIKE $1 OR descricao ILIKE $1';
      values = [`%${filtro}%`];
    }

    query += ' ORDER BY created_at DESC';
    
    const result = await pool.query(query, values);
    return result.rows;
  }

  static async findById(id: number): Promise<Curso | null> {
    const query = 'SELECT * FROM cursos WHERE id = $1';
    const result = await pool.query(query, [id]);
    
    return result.rows[0] || null;
  }

  static async findByUserId(userId: number): Promise<Curso[]> {
    const query = `
      SELECT c.id, c.nome, c.descricao, c.capa, c.inscricoes, c.inicio,
             CASE WHEN i.inscricao_cancelada = false THEN true ELSE false END as inscrito,
             i.inscricao_cancelada
      FROM cursos c
      INNER JOIN inscricoes i ON c.id = i.curso_id
      WHERE i.usuario_id = $1 AND i.inscricao_cancelada = false
      ORDER BY i.created_at DESC
    `;
    
    const result = await pool.query(query, [userId]);
    return result.rows;
  }

  static async incrementInscricoes(cursoId: number): Promise<void> {
    const query = 'UPDATE cursos SET inscricoes = inscricoes + 1 WHERE id = $1';
    await pool.query(query, [cursoId]);
  }

  static async decrementInscricoes(cursoId: number): Promise<void> {
    const query = 'UPDATE cursos SET inscricoes = GREATEST(inscricoes - 1, 0) WHERE id = $1';
    await pool.query(query, [cursoId]);
  }
}

