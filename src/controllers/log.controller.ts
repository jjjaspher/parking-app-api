import { Request, Response } from "express";
import prisma from "../client";

// Get all Logs
export async function getAllLogs(_req: Request, res: Response) {
  try {
    const logs = await prisma.log.findMany();
    res.json({
      status: true,
      message: "Logs Successfully fetched",
      data: logs,
    });
    
  } catch (error) {
    console.log('may error', error)
  }
};

// Get all logs by 'logged_by_agent_id' **
export async function getAllLogsByLoggedByAgentID(req: Request, res: Response) {
  try {
    const loggedByAgentID = req.query.logged_by_agent_id as string | undefined;
    if (!loggedByAgentID) {
      res.status(400).json({
        status: false,
        message: "Agent ID si required"
      })
      return;
    }

    const logs = await prisma.log.findMany({
      where: {
        logged_by_agent_id: loggedByAgentID || undefined
      }
    });
    res.status(200).json({
      status: true,
      message: `Successfully Fetch All Logs by Agent ID ${loggedByAgentID}`,
      data: logs
    })
  } catch (error) {
    console.log('may error', error)
  }
  
}

// Update time out log by log id **
export async function updateTimeoutLogByID(req: Request, res: Response) {
  try {
    const { log_id, time_out } = req.body;
    const log = await prisma.log.findUniqueOrThrow({
      where: {
        id: log_id
      }
    });
    const updatedLog = await prisma.log.update({
      where: { id: log.id },
      data: {
        time_out: time_out,
      }
    });

    res.status(201).json({
      status: true,
      message: `Log Time Out Successfully Updated`,
      data: updatedLog,
    });
  } catch (error) {
    console.log('may error', error)
  }
};
