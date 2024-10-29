import { z } from 'zod';

export const createAgentSchema = z.object({
    date: z.string(),
    admin_name: z.string(),
    employee_id: z.string(),
    agent_name: z.string(),
    agent_surname: z.string(),
    agent_username: z.string(),
    agent_password: z.string(),
  })
  .strict(); //strict prevents the schema from validating payloads with properties not in the schema

export const updateaAgentSchema = createAgentSchema.partial(); //creates a partial schema from createUserSchema where all properties are optional
