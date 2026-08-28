import type { Request, Response, NextFunction } from "express";

export default function auth(req: Request, res: Response, next: NextFunction) {
  if (!req.session.userId) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  next();
}
