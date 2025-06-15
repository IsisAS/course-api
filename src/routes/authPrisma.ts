import { Router } from 'express';
import { AuthControllerPrisma } from '../controllers/AuthControllerPrisma';

const router = Router();
router.post('/usuarios', AuthControllerPrisma.register);
router.post('/login', AuthControllerPrisma.login);

export default router;

