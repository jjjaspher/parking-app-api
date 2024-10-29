import { Router } from 'express';
import {
  getAllLogs,
} from '../controllers/log.controller';

// Users layout Route
const logRoute = Router();
logRoute.get('', getAllLogs);


export default logRoute;