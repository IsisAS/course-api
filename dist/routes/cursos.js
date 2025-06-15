"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CursoController_1 = require("../controllers/CursoController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Rota para listar cursos (pública)
router.get('/cursos', CursoController_1.CursoController.listarCursos);
// Rotas protegidas por autenticação
router.post('/cursos/:idCurso', auth_1.authenticateToken, CursoController_1.CursoController.fazerInscricao);
router.delete('/cursos/:idCurso', auth_1.authenticateToken, CursoController_1.CursoController.cancelarInscricao);
router.get('/:idUsuario', auth_1.authenticateToken, CursoController_1.CursoController.listarCursosInscritos);
exports.default = router;
//# sourceMappingURL=cursos.js.map