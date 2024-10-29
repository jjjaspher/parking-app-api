import { Router } from 'express';
import {
  getAllAdmin,
  createAdmin,
} from '../controllers/admin.controller';
import { validateSchema } from '../middlewares/admin.middleware';
import { createAdminSchema } from '../schema/admin.schema';

// Users layout Route
const adminRoute = Router();
adminRoute.get('', getAllAdmin);
adminRoute.post('/create', validateSchema(createAdminSchema), createAdmin);


export default adminRoute;