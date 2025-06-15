"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
// Importar rotas
const auth_1 = __importDefault(require("./routes/auth"));
const cursos_1 = __importDefault(require("./routes/cursos"));
// Configurar variáveis de ambiente
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT || '3001');
// Middlewares
app.use((0, cors_1.default)({
    origin: true, // Permitir qualquer origem
    credentials: true // Permitir cookies
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// Middleware de logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});
// Rotas
app.use('/', auth_1.default);
app.use('/', cursos_1.default);
// Rota de teste
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'API de Cursos funcionando!',
        timestamp: new Date().toISOString()
    });
});
// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error('Erro não tratado:', err);
    res.status(500).json({
        message: 'Erro interno do servidor'
    });
});
// Middleware para rotas não encontradas
app.use('*', (req, res) => {
    res.status(404).json({
        message: 'Rota não encontrada'
    });
});
// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}/health`);
});
exports.default = app;
//# sourceMappingURL=index.js.map