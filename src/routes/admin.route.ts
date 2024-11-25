import { Router } from 'express';
import {
  getAllAdmin,
  createAdmin,
  getAdminByAdminID,
  updateAdmin
} from '../controllers/admin.controller';
import { validateSchema } from '../middlewares/admin.middleware';
import { createAdminSchema, updateaAdminSchema } from '../schema/admin.schema';

// Users layout Route
const adminRoute = Router();
adminRoute.get('', getAllAdmin);
adminRoute.get('/employee', getAdminByAdminID);
adminRoute.post('/create', validateSchema(createAdminSchema), createAdmin);
adminRoute.post('/update', validateSchema(updateaAdminSchema), updateAdmin);


export default adminRoute;