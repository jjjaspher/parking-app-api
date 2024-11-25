import { Router } from 'express';
import {
  getAllLogs,
  getAllLogsByLoggedByAgentID,
  createLog
} from '../controllers/log.controller';
import { validateSchema } from '../middlewares/log.middleware';
import { createLogSchema } from '../schema/log.schema';

// Users layout Route
const logRoute = Router();
logRoute.get('', getAllLogs);
logRoute.post('/create',validateSchema(createLogSchema), createLog);
logRoute.get('/logs', getAllLogsByLoggedByAgentID);


export default logRoute;