import { Request, Response, NextFunction, RequestHandler } from "express";
import { ZodSchema } from "zod";

export const validateSchema = (schema: ZodSchema): RequestHandler => {
  
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    console.log('validateSchema', req.body);
    
    if (!result.success) {
      console.log(result.error.errors)
      const errorMessages = result.error.errors.map((t) => `${t.path[0] ?? ""}: ${t.message}`).join(", ");
      res.status(400).json({
        status: false,
        message: errorMessages,
      });
      return; // Ensure function exits after sending the response
    }

    next(); // Continue to next middleware if validation succeeds
  };
};
