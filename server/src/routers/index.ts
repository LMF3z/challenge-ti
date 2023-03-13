import { Router } from 'express';

const router = Router();

import authRoutes from './auth/auth.routes';
import datosRoutes from './datos/datos.routes';

router.use('/auth', authRoutes);
router.use('/datos', datosRoutes);

export default router;
