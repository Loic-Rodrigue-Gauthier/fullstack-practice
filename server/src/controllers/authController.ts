import type { Request, Response, NextFunction } from "express";
import type { AuthRequest } from "@app/shared";
import { DatabaseError } from "pg";
import bcrypt from "bcrypt";
import { signupService, signinService, meService } from "../services/authService.js";

export async function signup(req: Request<{}, {}, AuthRequest>, res: Response) {
  const { email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  try {
    const userId = await signupService(email, hash);

    req.session.userId = userId;

    return res.status(201).json({
      message: "User created",
    });
  } catch (err) {
    if (err instanceof DatabaseError && err.code === "23505") {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    throw err;
  }
}

export async function signin(req: Request<{}, {}, AuthRequest>, res: Response) {
  const { email, password } = req.body;

  const user = await signinService(email);

  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const valid = await bcrypt.compare(password, user.password_hash);

  if (!valid) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  req.session.userId = user.id;

  return res.json({
    message: "Signed in",
  });
}

export function signout(req: Request, res: Response, next: NextFunction) {
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }

    res.clearCookie("connect.sid");

    return res.json({
      message: "Signed out",
    });
  });
}

export async function me(req: Request, res: Response) {
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const currentUser = await meService(userId);

  return res.json(currentUser);
}
