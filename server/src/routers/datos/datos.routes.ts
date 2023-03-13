import { Router } from 'express';
import {
  createNewDatoController,
  deletedDatoController,
  getDatoByIdController,
  getDatosListController,
  updatedDatoController,
} from '../../controllers/data/data.controllers';
import { validateRoleAccess } from '../../middleware/validateRole.middleware';
import { validateToken } from '../../middleware/validateToken.middleware';

const router = Router();

router.post('/', validateToken, validateRoleAccess, createNewDatoController);
router.get('/', validateToken, validateRoleAccess, getDatosListController);
router.get('/by-id', validateToken, validateRoleAccess, getDatoByIdController);
router.put('/', validateToken, validateRoleAccess, updatedDatoController);
router.delete('/', validateToken, validateRoleAccess, deletedDatoController);

export default router;
