import { Request, Response } from "express";
import prisma from "../client";

// Creating a agent
export async function createAgent(req: Request, res: Response) {
  try {
    console.log(req.body);
    const user = await prisma.agent.create({
      data: req.body,
    });
    res.status(201).json({
      status: true,
      message: "Agent Successfully Created",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'server error'
    });
  }
}

// Get all Users
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
  const { employeeID } = req.params;
  const agent = await prisma.agent.findFirst({
    where: {
      employee_id: employeeID,
    },
  });
  res.json({
    status: true,
    message: "User Successfully fetched",
    data: agent,
  });
}