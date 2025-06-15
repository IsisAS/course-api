import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';

const router = Router();

router.post('/usuarios', AuthController.register);

router.post('/login', AuthController.login);

export default router;

