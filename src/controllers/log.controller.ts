import { Request, Response } from "express";
import prisma from "../client";

// Get all Logs
export async function getAllLogs(_req: Request, res: Response) {
  console.log('pumasok here getAllLogs')
  try {
    console.log(_req)
    const logs = await prisma.log.findMany();
    console.log(logs)
    res.json({
      status: true,
      message: "Logs Successfully fetched",
      data: logs,
    });
    
  } catch (error) {
    console.log('may error', error)
  }
};

// Get all logs by 'logged_by_id' **
export async function getAllLogsByLoggedByID(req: Request, res: Response) {
  try {
    const loggedByID = req.query.logged_by_id as string | undefined;

    const logs = await prisma.log.findMany({
      where: {
        logged_by_id: loggedByID || undefined
      }
    });
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
