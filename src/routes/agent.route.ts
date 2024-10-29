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
agentRoute.post('', validateSchema(createAgentSchema), createAgent);
agentRoute.get('', getAllAgents);
agentRoute.get('/:employeeID', getAgentByEmployeeID);


export default agentRoute;