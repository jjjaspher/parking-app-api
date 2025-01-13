import prisma from "../client";

export const queryAllLogs = async () => {
  return await prisma.log.findMany();
};

export const queryAllLogsByLoggedByAgentID = async (loggedByAgentID: string) => {
  return await prisma.log.findMany({
    where: {
      logged_by_agent_id: loggedByAgentID
    }
  });
}

export const queryCreateLog = async (logData: any) => { 
  return await prisma.log.create({
    data: logData
  });
};

export const queryUpdateLogByPlateNumber = async (logID: string, logData: any) => {
  return await prisma.log.update({
    where: {
      id: logID
    },
    data: logData
  });
}

export const queryLogByPlateNumber = async (plateNumber: string) => {
  return await prisma.log.findFirst({
    where: {
      plate_number: plateNumber
    }
  });
};