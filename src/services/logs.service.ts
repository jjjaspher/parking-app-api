import prisma from "../client";

export const generateAgentCredsForTimeIn = async (agentID: string) => {
  try {
    const agent = await prisma.agent.findFirst({
      where: {
        agent_id: agentID
      }
    });

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

export const generateAgentCredsAndTimeout = async (agentID: string, timeOut: string) => {
  try {
    const agent = await prisma.agent.findFirst({
      where: {
        agent_id: agentID
      }
    });

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