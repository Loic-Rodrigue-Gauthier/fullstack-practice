import type { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export function validateRequest(req: Request, res: Response, next: NextFunction) {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    const fieldErrors = Object.fromEntries(
      Object.entries(result.mapped()).map(([field, error]) => [field, error.msg])
      // field: 1st element, error: 1st nested element
    );

    return res.status(400).json({
      message: "Validation failed",
      fieldErrors,
    });
  }

  next();
}
