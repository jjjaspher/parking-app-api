import { Request, Response } from "express";
import { queryAllLogs, queryAllLogsByLoggedByAgentID, queryCreateLog, queryLogByPlateNumber, queryUpdateLogByPlateNumber } from "../services/logs.service";
import { queryAgentByAgentID } from "../services/agent.service";

// Get all Logs
export async function getAllLogs(_req: Request, res: Response) {
  try {
    const logs = await queryAllLogs();
    res.json({
      status: true,
      message: "Logs Successfully fetched",
      data: logs,
    });
    
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Something went wrong...',
      error: error
    });
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

    const logs = await queryAllLogsByLoggedByAgentID(loggedByAgentID);
    res.status(200).json({
      status: true,
      message: `Successfully Fetch All Logs by Agent ID ${loggedByAgentID}`,
      data: logs
    })
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Something went wrong...',
      error: error
    });
  }
  
}

export async function createLog(req: Request, res: Response) {
  try {
    const body = req.body;
    const agentID = req.body.agent_id
    const logData = await generateAgentCredsForTimeIn(agentID);
    if (!logData.status) {
      res.status(400).json({
        status: false,
        message: logData.message
      });
      return;
    }
    const loggedTimeOutData = {...logData.data, ...body}
    const log = queryCreateLog(loggedTimeOutData);
    res.status(201).json({
      status: true,
      message: "Data Logged Successfully",
      data: log,
    });
    
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Something went wrong...',
      error: error
    });
  }
  
}

// Update time out log by log id **
export async function updateTimeoutLogByPlateNumber(req: Request, res: Response) {
  try {
    const plateNumber = req.body.plate_number;
    const timeOut = req.body.time_out;
    const agentID = req.body.logged_by_agent_id

    const loggedTimeOutData = await generateAgentCredsAndTimeout(agentID, timeOut);
    if (loggedTimeOutData.status !== true) {
      res.status(400).json({
        status: false,
        message: loggedTimeOutData.message
      })
      return;
    }

    const existingLog = await queryLogByPlateNumber(plateNumber);

    if (!existingLog) {
      res.status(400).json({
        status: false,
        message: "Log Not Found"
      })
      return;
    }
    console.log(existingLog.time_out !== "")
    console.log(existingLog.time_out !== null)
    if (existingLog.time_out !== "" && existingLog.time_out !== null) {
      res.status(400).json({
        status: false,
        data: existingLog,
        message: "Car is already logged out"
      });
      return;
    }

    const updatedLog = await queryUpdateLogByPlateNumber(existingLog.id, loggedTimeOutData.data);

    res.status(201).json({
      status: true,
      message: `Log Time Out Successfully Updated`,
      data: updatedLog,
    });
  } catch (error) {
    console.log('may error', error)
    res.status(400).json({
      status: false,
      message: `Something went wrong...`,
      error: error
    });
  }
};

const generateAgentCredsForTimeIn = async (agentID: string) => {
  try {
    const agent = await queryAgentByAgentID(agentID);
    if (!agent) {
      return {
        status: false,
        message: "No Agent Found",
        data: {}
      }
    };
    return {
      status: true,
      message: "Agent Successfully Fetched",
      data: {
        logged_by_name: agent.agent_name,
        logged_by_surname: agent.agent_surname,
        logged_by_agent_id: agent.agent_id
      }
    }
  } catch (error) {
    console.log(error)
    return {
      status: false,
      message: `Something went wrong... ${error}`,
      data: {}
    }
  }
};


// Generate object with agent credentials and time out
const generateAgentCredsAndTimeout = async (agentID: string, timeOut: string) => {
  try {
    const agent = await queryAgentByAgentID(agentID);

    if (!agent) {
      return {
        status: false,
        message: "No Agent Found",
        data: {}
      }
    };
    return {
      status: true,
      message: "Agent Successfully Fetched",
      data: {
        logged_out_by_name: agent.agent_name,
        logged_out_by_surname: agent.agent_surname,
        logged_out_by_agent_id: agent.agent_id,
        time_out: timeOut
      }
    }
  } catch (error) {
    console.log(error)
    return {
      status: false,
      message: `Something went wrong... ${error}`,
      data: {}
    }
  }
};
