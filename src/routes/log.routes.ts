import { Router } from 'express';
import {
  getAllLogs,
  getAllLogsByLoggedByAgentID,
  createLog,
  updateTimeoutLogByPlateNumber
} from '../controllers/log.controller';
import { validateSchema } from '../middlewares/log.middleware';
import { createLogSchema } from '../schema/log.schema';

// Users layout Route
const logRoute = Router();
logRoute.get('', getAllLogs);
logRoute.get('/logs', getAllLogsByLoggedByAgentID);
logRoute.post('/create',validateSchema(createLogSchema), createLog);
logRoute.post('/update', updateTimeoutLogByPlateNumber);


export default logRoute;