import { z } from 'zod';

export const createAdminSchema = z.object({
    employee_id: z.string().min(6, { message: "Min 6 character" }),
    admin_name: z.string().min(1, { message: "Cannot be empty" }),
    admin_username: z.string().min(1, { message: "Cannot be empty" }),
    admin_password: z.string().min(1, { message: "Cannot be empty" }),
    admin_surname: z.string().min(1, { message: "Cannot be empty" }),
  })
  .strict(); //strict prevents the schema from validating payloads with properties not in the schema

export const updateaAdminSchema = createAdminSchema.partial(); //creates a partial schema from createUserSchema where all properties are optional
