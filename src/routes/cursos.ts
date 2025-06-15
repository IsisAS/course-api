import { Router } from 'express';
import { CursoController } from '../controllers/CursoController';
import { authenticateToken } from '../core/api/middleware/auth';

const router = Router();

router.get('/cursos', CursoController.listarCursos);

router.post('/cursos/:idCurso', authenticateToken, CursoController.fazerInscricao);
router.delete('/cursos/:idCurso', authenticateToken, CursoController.cancelarInscricao);
router.get('/usuarios/:idUsuario', authenticateToken, CursoController.listarCursosInscritos);

export default router;