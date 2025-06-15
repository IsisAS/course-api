"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InscricaoModel = void 0;
const database_1 = __importDefault(require("../config/database"));
class InscricaoModel {
    static async create(usuarioId, cursoId) {
        const query = `
      INSERT INTO inscricoes (usuario_id, curso_id, inscricao_cancelada)
      VALUES ($1, $2, false)
      RETURNING *
    `;
        const values = [usuarioId, cursoId];
        const result = await database_1.default.query(query, values);
        return result.rows[0];
    }
    static async findByUserAndCourse(usuarioId, cursoId) {
        const query = 'SELECT * FROM inscricoes WHERE usuario_id = $1 AND curso_id = $2';
        const result = await database_1.default.query(query, [usuarioId, cursoId]);
        return result.rows[0] || null;
    }
    static async cancelInscricao(usuarioId, cursoId) {
        const query = `
      UPDATE inscricoes 
      SET inscricao_cancelada = true, updated_at = CURRENT_TIMESTAMP
      WHERE usuario_id = $1 AND curso_id = $2 AND inscricao_cancelada = false
      RETURNING *
    `;
        const result = await database_1.default.query(query, [usuarioId, cursoId]);
        return result.rows.length > 0;
    }
    static async reativarInscricao(usuarioId, cursoId) {
        const query = `
      UPDATE inscricoes 
      SET inscricao_cancelada = false, updated_at = CURRENT_TIMESTAMP
      WHERE usuario_id = $1 AND curso_id = $2 AND inscricao_cancelada = true
      RETURNING *
    `;
        const result = await database_1.default.query(query, [usuarioId, cursoId]);
        return result.rows.length > 0;
    }
    static async isUserEnrolled(usuarioId, cursoId) {
        const query = `
      SELECT id FROM inscricoes 
      WHERE usuario_id = $1 AND curso_id = $2 AND inscricao_cancelada = false
    `;
        const result = await database_1.default.query(query, [usuarioId, cursoId]);
        return result.rows.length > 0;
    }
}
exports.InscricaoModel = InscricaoModel;
//# sourceMappingURL=Inscricao.js.map