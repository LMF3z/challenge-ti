import { Router } from 'express';
import { loginController } from '../../controllers/auth/auth.controllers';

const router = Router();

router.post('/login', loginController);

export default router;
