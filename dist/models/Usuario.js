"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioModel = void 0;
const database_1 = __importDefault(require("../config/database"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UsuarioModel {
    static async create(userData) {
        const hashedPassword = await bcryptjs_1.default.hash(userData.senha, 10);
        const query = `
      INSERT INTO usuarios (nome, email, senha, nascimento)
      VALUES ($1, $2, $3, $4)
      RETURNING id, nome, email, nascimento, created_at, updated_at
    `;
        const values = [userData.nome, userData.email, hashedPassword, userData.nascimento];
        const result = await database_1.default.query(query, values);
        return result.rows[0];
    }
    static async findByEmail(email) {
        const query = 'SELECT * FROM usuarios WHERE email = $1';
        const result = await database_1.default.query(query, [email]);
        return result.rows[0] || null;
    }
    static async findById(id) {
        const query = 'SELECT id, nome, email, nascimento, created_at, updated_at FROM usuarios WHERE id = $1';
        const result = await database_1.default.query(query, [id]);
        return result.rows[0] || null;
    }
    static async validatePassword(plainPassword, hashedPassword) {
        return bcryptjs_1.default.compare(plainPassword, hashedPassword);
    }
}
exports.UsuarioModel = UsuarioModel;
//# sourceMappingURL=Usuario.js.map