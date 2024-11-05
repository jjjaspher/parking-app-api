import { Router } from 'express';
import {
  getAllAdmin,
  createAdmin,
  getAdminByEmployeeID
} from '../controllers/admin.controller';
import { validateSchema } from '../middlewares/admin.middleware';
import { createAdminSchema } from '../schema/admin.schema';

// Users layout Route
const adminRoute = Router();
adminRoute.get('', getAllAdmin);
adminRoute.get('/employee', getAdminByEmployeeID);
adminRoute.post('/create', validateSchema(createAdminSchema), createAdmin);


export default adminRoute;