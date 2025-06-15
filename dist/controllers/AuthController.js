"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const Usuario_1 = require("../models/Usuario");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthController {
    static async register(req, res) {
        try {
            const { nome, email, senha, nascimento } = req.body;
            // Validar dados obrigatórios
            if (!nome || !email || !senha || !nascimento) {
                res.status(400).json({
                    message: 'Todos os campos são obrigatórios'
                });
                return;
            }
            // Verificar se usuário já existe
            const existingUser = await Usuario_1.UsuarioModel.findByEmail(email);
            if (existingUser) {
                res.status(400).json({
                    message: 'Email já está em uso'
                });
                return;
            }
            // Criar usuário
            const user = await Usuario_1.UsuarioModel.create({ nome, email, senha, nascimento });
            res.status(200).json({
                success: true,
                data: {
                    id: user.id,
                    nome: user.nome,
                    email: user.email,
                    nascimento: user.nascimento
                }
            });
        }
        catch (error) {
            console.error('Erro no registro:', error);
            res.status(400).json({
                message: 'Erro interno do servidor'
            });
        }
    }
    static async login(req, res) {
        try {
            const { email, senha } = req.body;
            // Validar dados obrigatórios
            if (!email || !senha) {
                res.status(400).json({
                    message: 'Email e senha são obrigatórios'
                });
                return;
            }
            // Buscar usuário
            const user = await Usuario_1.UsuarioModel.findByEmail(email);
            if (!user) {
                res.status(400).json({
                    message: 'Credenciais inválidas'
                });
                return;
            }
            // Validar senha
            const isValidPassword = await Usuario_1.UsuarioModel.validatePassword(senha, user.senha);
            if (!isValidPassword) {
                res.status(400).json({
                    message: 'Credenciais inválidas'
                });
                return;
            }
            // Gerar JWT
            const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET || 'default-secret', { expiresIn: '24h' });
            // Configurar cookie
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000 // 24 horas
            });
            res.status(200).json({
                success: true,
                data: {
                    id: user.id,
                    nome: user.nome,
                    email: user.email
                }
            });
        }
        catch (error) {
            console.error('Erro no login:', error);
            res.status(400).json({
                message: 'Erro interno do servidor'
            });
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map