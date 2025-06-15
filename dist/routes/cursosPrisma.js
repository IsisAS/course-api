"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CursoControllerPrisma_1 = require("../controllers/CursoControllerPrisma");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Rota para listar cursos (pública)
router.get('/cursos', CursoControllerPrisma_1.CursoControllerPrisma.listarCursos);
// Rotas protegidas por autenticação
router.post('/cursos/:idCurso', auth_1.authenticateToken, CursoControllerPrisma_1.CursoControllerPrisma.fazerInscricao);
router.delete('/cursos/:idCurso', auth_1.authenticateToken, CursoControllerPrisma_1.CursoControllerPrisma.cancelarInscricao);
router.get('/:idUsuario', auth_1.authenticateToken, CursoControllerPrisma_1.CursoControllerPrisma.listarCursosInscritos);
exports.default = router;
//# sourceMappingURL=cursosPrisma.js.map