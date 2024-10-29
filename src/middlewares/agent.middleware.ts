import { Request, Response, NextFunction, RequestHandler } from "express";
import { ZodSchema } from "zod";

export const validateSchema = <T>(schema: ZodSchema<T>): RequestHandler => {
  
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errorMessages = result.error.errors
        .map((t) => `${t.path[0] ?? ""}: ${t.message}`)
        .join(", ");
      res.status(400).json({
        status: false,
        message: errorMessages,
      });
      return; // Ensure function exits after sending the response
    }

    next(); // Continue to next middleware if validation succeeds
  };
};
