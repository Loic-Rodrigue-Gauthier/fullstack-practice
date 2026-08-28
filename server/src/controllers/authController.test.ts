import type { User } from "../models/user.js";
import type { CurrentUser } from "@app/shared";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { DatabaseError } from "pg";
import bcrypt from "bcrypt";
import { signup, signin, signout, me } from "./authController.js";
import { signupService, signinService, meService } from "../services/authService.js";

// mocks the real imported functions for tests
vi.mock("bcrypt");
vi.mock("../services/authService.js");

describe("signup", () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    vi.clearAllMocks();

    req = {
      body: {
        email: "test@example.com",
        password: "password1234",
      },
      session: {},
    };

    res = {
      status: vi.fn().mockReturnThis(), // mocks a function with that name
      json: vi.fn().mockReturnThis(),
    };
  });

  it("creates a user", async () => {
    vi.mocked(bcrypt.hash).mockResolvedValue("hashed-password" as never); // uses mocked imported function
    vi.mocked(signupService).mockResolvedValue(1);

    await signup(req, res);

    expect(bcrypt.hash).toHaveBeenCalledWith("password1234", 10);
    expect(signupService).toHaveBeenCalledWith("test@example.com", "hashed-password");
    expect(req.session.userId).toBe(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: "User created" });
  });

  it("returns 409 for duplicate email", async () => {
    const err = new DatabaseError("duplicate key value violates unique constraint", 0, "error");

    err.code = "23505";

    vi.mocked(bcrypt.hash).mockResolvedValue("hashed-password" as never);
    vi.mocked(signupService).mockRejectedValue(err);

    await signup(req, res);

    expect(bcrypt.hash).toHaveBeenCalledWith("password1234", 10);
    expect(signupService).toHaveBeenCalledWith("test@example.com", "hashed-password");
    expect(req.session.userId).toBeUndefined();
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ message: "Email already exists" });
  });
});

describe("signin", () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    vi.clearAllMocks();

    req = {
      body: {
        email: "test@example.com",
        password: "password1234",
      },
      session: {},
    };

    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
  });

  it("logs in the user", async () => {
    const user: User = {
      id: 1,
      email: "test@example.com",
      password_hash: "hashed-password",
    };

    vi.mocked(signinService).mockResolvedValue(user);
    vi.mocked(bcrypt.compare).mockResolvedValue(true as never);

    await signin(req, res);

    expect(signinService).toHaveBeenCalledWith("test@example.com");
    expect(bcrypt.compare).toHaveBeenCalledWith("password1234", "hashed-password");
    expect(req.session.userId).toBe(1);
    expect(res.json).toHaveBeenCalledWith({ message: "Signed in" });
  });

  it("returns 401 when email is invalid", async () => {
    vi.mocked(signinService).mockResolvedValue(undefined);

    await signin(req, res);

    expect(signinService).toHaveBeenCalledWith("test@example.com");
    expect(bcrypt.compare).not.toHaveBeenCalled();
    expect(req.session.userId).toBeUndefined();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid credentials" });
  });

  it("returns 401 when password is invalid", async () => {
    const user: User = {
      id: 1,
      email: "test@example.com",
      password_hash: "hashed-password",
    };

    vi.mocked(signinService).mockResolvedValue(user);
    vi.mocked(bcrypt.compare).mockResolvedValue(false as never);

    await signin(req, res);

    expect(signinService).toHaveBeenCalledWith("test@example.com");
    expect(bcrypt.compare).toHaveBeenCalledWith("password1234", "hashed-password");
    expect(req.session.userId).toBeUndefined();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid credentials" });
  });
});

describe("signout", () => {
  let req: any;
  let res: any;
  let next: any;

  beforeEach(() => {
    vi.clearAllMocks();

    req = {
      session: {
        destroy: vi.fn((callback) => callback()),
      },
    };

    res = {
      clearCookie: vi.fn(),
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };

    next = vi.fn();
  });

  it("logs out the user", () => {
    req.session.userId = 1;

    signout(req, res, next);

    expect(req.session.destroy).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
    expect(res.clearCookie).toHaveBeenCalledWith("connect.sid");
    expect(res.json).toHaveBeenCalledWith({ message: "Signed out" });
  });

  it("passes session destruction errors to next", () => {
    const err = new Error("Session destruction failed");

    req.session.destroy = vi.fn((callback) => callback(err));

    signout(req, res, next);

    expect(req.session.destroy).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(err);
    expect(res.clearCookie).not.toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});

describe("me", () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    vi.clearAllMocks();

    req = {
      session: {},
    };

    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
  });

  it("returns the authenticated user", async () => {
    req.session.userId = 1;

    const currentUser: CurrentUser = {
      id: 1,
      email: "test@example.com",
    };

    vi.mocked(meService).mockResolvedValue(currentUser);

    await me(req, res);

    expect(meService).toHaveBeenCalledWith(1);
    expect(res.json).toHaveBeenCalledWith(currentUser);
  });

  it("returns 401 when user is not authenticated", async () => {
    await me(req, res);

    expect(meService).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Unauthorized" });
  });
});
