import { Request, Response } from "express";
import { hashPasswordFromObject } from "../services/password.service";
import { Agent } from "../interfaces/agent.interface";
import { Credentials } from "../interfaces/password.interface";
import { queryAgentByAgentID, queryAllAgents, queryCreateAgent, queryUpdateAgentbyAgentID } from "../services/agent.service";

export const hashAgentPassword = async (reqAgentBody: Agent): Promise<Agent> => {
  const passwordCredentials: Credentials = {
    agent_password: reqAgentBody.agent_password
    };
  const hashedCredentials = await hashPasswordFromObject(passwordCredentials, 'agent_password');
  const updatedReqAgentBody = {
    ...reqAgentBody,
    agent_password: hashedCredentials.agent_password
  };
  
  return updatedReqAgentBody;
};

// Creating an Agent
export async function createAgent(req: Request, res: Response) {
  try {
    const agentID = req.body.agent_id;
    const existingAgent = await queryAgentByAgentID(agentID);
    if (existingAgent) {
      res.status(400).json({
        status: false,
        message: 'Agent Already Exist'
      });
      return;
    }
    const agentReqBody = await hashAgentPassword(req.body)
    const agent = await queryCreateAgent(agentReqBody);

    res.status(201).json({
      status: true,
      message: "Agent Successfully Created",
      data: agent,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Something went wrong...',
      error: error
    });
  }
}

// Get All Agent
export async function getAllAgents(_req: Request, res: Response) {
  try {
    const agents = await queryAllAgents();
    res.json({
      status: true,
      message: "Agents Successfully fetched",
      data: agents,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Something went wrong...',
      error: error
    });
  }
}

// Get Agent by AgentID
export async function getAgentByAgentID(req: Request, res: Response) {
  const agentID = req.query.agentID as string;
  if (!agentID) {
    res.status(400).json({
      status: false,
      message: 'Agent ID is required'
    });
  }
  try {
    const agent = await queryAgentByAgentID(agentID);
    if (!agent) {
      res.status(400).json({
        status: false,
        message: 'Agent not exist'
      });
      return;
    }
    res.json({
      status: true,
      message: "Agent Successfully fetched",
      data: agent,
    });
    
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Something went wrong...',
      error: error
    });
  }
}

// Update Agent using employeeID
export async function updateAgentByAgentID(req: Request, res: Response) {
  const agentID = req.body.agent_id;

  try {
    const existingAgent = await queryAgentByAgentID(agentID);
    if (!existingAgent) {agentID
      res.status(400).json({
        status: false,
        message: 'Agent not exist'
      });
      return;
    }
  const filteredBody = Object.assign({}, req.body);
  delete filteredBody.admin_id;


  const updatedAgent = await queryUpdateAgentbyAgentID(agentID, filteredBody);
  res.status(200).json({
    status: true,
    message: "Agent Successfully Updated",
    data: updatedAgent
  });
  
 } catch (error) {
  res.status(500).json({
    status: false,
    message: 'Something went wrong...',
    error: error
  });
 }
};