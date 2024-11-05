import { Router } from 'express';
import {
  getAllLogs,
  getAllLogsByLoggedByID
} from '../controllers/log.controller';

// Users layout Route
const logRoute = Router();
logRoute.get('', getAllLogs);
logRoute.get('/logs/:logID', getAllLogsByLoggedByID);


export default logRoute;