import { profile } from 'console';
import { z } from 'zod';

export const createAgentSchema = z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Date must be in the format 'YYYY-MM-DD'",
    }),
    agent_id: z.string().regex(/^\d{3}-\d{3}-\d{3}$/, {
      message: "employee_id must be in the format '000-000-000'",
    }),
    agent_name: z.string().min(1, { message: "Cannot be empty" }),
    agent_surname: z.string().min(1, { message: "Cannot be empty" }),
    agent_username: z.string().min(1, { message: "Cannot be empty" }),
    agent_password: z.string().min(1, { message: "Cannot be empty" }),
    profile_img: z.string().nullable(),
  })
  .strict(); //strict prevents the schema from validating payloads with properties not in the schema

export const updateAgentSchema = createAgentSchema.partial();  //creates a partial schema from createUserSchema where all properties are optional

// export const updateaAgentSchema = createAgentSchema.partial()
//   .refine((data) => !data.agent_id, {
//     message: "agent_id cannot be updated",
//     path: ["agent_id"], // path for where the error will show up in the error object
//   }); //creates a partial schema from createUserSchema where all properties are optional

