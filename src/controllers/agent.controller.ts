import { Request, Response } from "express";
import prisma from "../client";

const queryAgentByAgentID = async (agentID: string) => {
  try {
    const agent = await prisma.agent.findFirst({
      where: {
        agent_id: agentID,
      },
    });

    if (agent) {
      return agent;
    }
    return null;
    
  } catch (error) {
    console.log('May error', error);
  }
}

// Creating an Agent
export async function createAgent(req: Request, res: Response) {
  try {
    console.log(req.body);
    const agentID = req.body.agent_id;
    const existingAgent = await queryAgentByAgentID(agentID);
    if (existingAgent) {
      res.status(400).json({
        status: false,
        message: 'Agent Already Exist'
      });
      return;
    }

    const agent = await prisma.agent.create({
      data: req.body,
    });
    res.status(201).json({
      status: true,
      message: "Agent Successfully Created",
      data: agent,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: false,
      message: 'server error'
    });
  }
}

// Get All Agent
export async function getAllAgents(_req: Request, res: Response) {
  try {
    const agents = await prisma.agent.findMany();
    res.json({
      status: true,
      message: "Agents Successfully fetched",
      data: agents,
    });
    
  } catch (error) {
    console.log('may error', error)
    res.status(500).json({
      status: false,
      message: 'server error'
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
    console.log(error)
    res.status(500).json({
      status: false,
      message: 'server error'
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


  const updatedAgent = await prisma.agent.update({
    where: {
    agent_id: agentID
    },
    data: filteredBody
  });
  res.status(200).json({
    status: true,
    message: "Agent Successfully Updated",
    data: updatedAgent
  });
  
 } catch (error) {
  console.log('May error', error);
 }
};