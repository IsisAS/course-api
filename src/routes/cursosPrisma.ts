import { Router } from 'express';
import { CursoControllerPrisma } from '../controllers/CursoControllerPrisma';
import { authenticateToken } from '../core/api/middleware/auth';

const router = Router();
router.get('/cursos', CursoControllerPrisma.listarCursos);
router.post('/cursos/:idCurso', authenticateToken, CursoControllerPrisma.fazerInscricao);
router.delete('/cursos/:idCurso', authenticateToken, CursoControllerPrisma.cancelarInscricao);
router.get('/:idUsuario', authenticateToken, CursoControllerPrisma.listarCursosInscritos);

export default router;

