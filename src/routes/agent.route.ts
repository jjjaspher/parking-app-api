import { Router } from 'express';
import {
  createAgent,
  getAllAgents,
  getAgentByAgentID,
  updateAgentByAgentID,
} from '../controllers/agent.controller';
import { validateSchema } from '../middlewares/agent.middleware';
import { createAgentSchema, updateAgentSchema } from '../schema/agent.schema';

// Users layout Route
const agentRoute = Router();
// Get Method
agentRoute.get('', getAllAgents);
agentRoute.get('/:agentID', getAgentByAgentID);

// POST Method
agentRoute.post('/create', validateSchema(createAgentSchema), createAgent);
agentRoute.post('/update', validateSchema(updateAgentSchema), updateAgentByAgentID);


export default agentRoute;