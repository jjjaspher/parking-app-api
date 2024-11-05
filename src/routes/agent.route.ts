import { Router } from 'express';
import {
  createAgent,
  getAllAgents,
  getAgentByEmployeeID,
} from '../controllers/agent.controller';
import { validateSchema } from '../middlewares/agent.middleware';
import { createAgentSchema } from '../schema/agent.schema';

// Users layout Route
const agentRoute = Router();
// Get Method
agentRoute.get('', getAllAgents);
agentRoute.get('/:employeeID', getAgentByEmployeeID);

// POST Method
agentRoute.post('/create', validateSchema(createAgentSchema), createAgent);


export default agentRoute;