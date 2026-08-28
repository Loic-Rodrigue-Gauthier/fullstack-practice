import type { Request, Response, NextFunction } from "express";
import type { AuthRequest } from "@app/shared";
import { DatabaseError } from "pg";
import bcrypt from "bcrypt";
import { signupService, signinService, meService } from "../services/authService.js";

export async function signup(req: Request<{}, {}, AuthRequest>, res: Response) {
  // {}, {}, : skips first two params to type req.body
  const { email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  try {
    const userId = await signupService(email, hash);

    req.session.userId = userId; // to signin instantly after signuping

    return res.status(201).json({
      // sends an HTTP response back to the frontend fetch() (service)
      message: "User created",
    });
  } catch (err) {
    if (err instanceof DatabaseError && err.code === "23505") {
      // 23505 : UNIQUE constraint failure
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    throw err; // if any other error type, error handler middleware will catch it
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

  // no need for .status() since it's "200" (OK) by default
  return res.json({
    message: "Signed in",
  });
}

export function signout(req: Request, res: Response, next: NextFunction) {
  // destroys the whole session (including userId)
  req.session.destroy((err) => {
    if (err) {
      return next(err); // sends it directly to error handler (since it's "500")
    }

    res.clearCookie("connect.sid"); // connect.sid : auto-created when "app.use(session())"

    return res.json({
      message: "Signed out",
    });
  });
}

// checks if a user is signed in/a cookie exists
export async function me(req: Request, res: Response) {
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const currentUser = await meService(userId);

  return res.json(currentUser); // no need for message since something is returned
}
