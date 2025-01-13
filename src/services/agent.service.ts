import prisma from "../client";
import { Agent } from "../interfaces/agent.interface";


export const queryAgentByAgentID = async (agentID: string) => {
  return await prisma.agent.findFirst({
    where: {
      agent_id: agentID,
    },
  });
};

export const queryCreateAgent = async (agent: Agent) => {
  return await prisma.agent.create({
    data: agent,
  });
}

export const queryAllAgents = async () => {
  return await prisma.agent.findMany();
}

export const queryUpdateAgentbyAgentID = async (agentID: string, agent: Agent) => {
  return await prisma.agent.update({
    where: {
      agent_id: agentID,
    },
    data: agent,
  });
};