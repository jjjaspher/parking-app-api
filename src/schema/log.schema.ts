import { z } from 'zod';

export const createLogSchema = z.object({
    logged_by_agent_id: z.string(),
    driver_firstname: z.string(),
    driver_surname: z.string(),
    date: z.string(),
    vehicle_type: z.string(),
    plate_number: z.string(),
    no_of_passenger: z.number(),
    time_in: z.string(),
  }).strict();
