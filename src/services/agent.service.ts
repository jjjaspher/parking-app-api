import { Agent } from "../interfaces/agent.interface";
import { hashPassword } from "./password.service";

export const hashAgentPassword = async (reqAgentBody: Agent): Promise<Agent> => {
  const agentPassword = reqAgentBody.agent_password;
  const updatedReqAgentBody = {
    ...reqAgentBody,
    agent_password: await hashPassword(agentPassword)
  };
  
  return updatedReqAgentBody;
};