"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursoModel = void 0;
const database_1 = __importDefault(require("../config/database"));
class CursoModel {
    static async findAll(filtro) {
        let query = `
      SELECT id, nome, descricao, capa, inscricoes, inicio, inscrito
      FROM cursos
    `;
        let values = [];
        if (filtro) {
            query += ' WHERE nome ILIKE $1 OR descricao ILIKE $1';
            values = [`%${filtro}%`];
        }
        query += ' ORDER BY created_at DESC';
        const result = await database_1.default.query(query, values);
        return result.rows;
    }
    static async findById(id) {
        const query = 'SELECT * FROM cursos WHERE id = $1';
        const result = await database_1.default.query(query, [id]);
        return result.rows[0] || null;
    }
    static async findByUserId(userId) {
        const query = `
      SELECT c.id, c.nome, c.descricao, c.capa, c.inscricoes, c.inicio,
             CASE WHEN i.inscricao_cancelada = false THEN true ELSE false END as inscrito,
             i.inscricao_cancelada
      FROM cursos c
      INNER JOIN inscricoes i ON c.id = i.curso_id
      WHERE i.usuario_id = $1 AND i.inscricao_cancelada = false
      ORDER BY i.created_at DESC
    `;
        const result = await database_1.default.query(query, [userId]);
        return result.rows;
    }
    static async incrementInscricoes(cursoId) {
        const query = 'UPDATE cursos SET inscricoes = inscricoes + 1 WHERE id = $1';
        await database_1.default.query(query, [cursoId]);
    }
    static async decrementInscricoes(cursoId) {
        const query = 'UPDATE cursos SET inscricoes = GREATEST(inscricoes - 1, 0) WHERE id = $1';
        await database_1.default.query(query, [cursoId]);
    }
}
exports.CursoModel = CursoModel;
//# sourceMappingURL=Curso.js.map