import { Request, Response } from "express";
import prisma from "../client";
import { json } from "stream/consumers";

const queryAgentByEmployeeID = async (employeeID: string) => {
  try {
    const agent = await prisma.agent.findFirst({
      where: {
        employee_id: employeeID,
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
    const employeeID = req.body.employee_id;
    const existingAgent = await queryAgentByEmployeeID(employeeID);
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
  console.log('pumasok here')
  try {
    const agents = await prisma.agent.findMany();
    console.log(agents)
    res.json({
      status: true,
      message: "Agents Successfully fetched",
      data: agents,
    });
    
  } catch (error) {
    console.log('may error', error)
  }
  
}

// Get Agent by employeeID
export async function getAgentByEmployeeID(req: Request, res: Response) {
  const employeeID = req.query.employeeID as string;
  if (!employeeID) {
    res.status(400).json({
      status: false,
      message: 'Employee ID is required'
    });
  }
  try {
    const agent = await queryAgentByEmployeeID(employeeID);
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
    
  }
  
}

// Update Agent using employeeID
export async function updateAgentByEmployeeID(req: Request, res: Response) {
  const employeeID = req.body.employee_id;

  try {
    const existingAgent = await queryAgentByEmployeeID(employeeID);
    if (!existingAgent) {
      res.status(400).json({
        status: false,
        message: 'Agent not exist'
      });
      return;
    }
  const filteredBody = Object.assign({}, req.body);
  delete filteredBody.employee_id;


  const updatedAgent = await prisma.agent.update({
    where: {
    employee_id: employeeID
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