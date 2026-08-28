import type { User } from "../models/user.js";
import type { CurrentUser } from "@app/shared";
import express from "express";
import session from "express-session";
import { describe, expect, it, vi, beforeEach } from "vitest";
import request from "supertest";
import { DatabaseError } from "pg";
import bcrypt from "bcrypt";
import authRoutes from "./authRoutes.js";
import { signupService, signinService, meService } from "../services/authService.js";

vi.mock("bcrypt");
vi.mock("../services/authService.js");

beforeEach(() => {
  vi.clearAllMocks();
});

const app = express();

app.use(express.json());
app.use(
  session({
    secret: "test-secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/auth", authRoutes);

describe("signup route", () => {
  it("POST /auth/signup creates a user", async () => {
    vi.mocked(bcrypt.hash).mockResolvedValue("hashed-password" as never);
    vi.mocked(signupService).mockResolvedValue(1);

    const response = await request(app).post("/auth/signup").send({
      email: "test@example.com",
      password: "password1234",
    });

    expect(bcrypt.hash).toHaveBeenCalledWith("password1234", 10);
    expect(signupService).toHaveBeenCalledWith("test@example.com", "hashed-password");
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: "User created" });
  });

  it("POST /auth/signup returns 409 for duplicate email", async () => {
    const err = new DatabaseError("duplicate key value violates unique constraint", 0, "error");

    err.code = "23505";

    vi.mocked(bcrypt.hash).mockResolvedValue("hashed-password" as never);
    vi.mocked(signupService).mockRejectedValue(err);

    const response = await request(app).post("/auth/signup").send({
      email: "test@example.com",
      password: "password1234",
    });

    expect(bcrypt.hash).toHaveBeenCalledWith("password1234", 10);
    expect(signupService).toHaveBeenCalledWith("test@example.com", "hashed-password");
    expect(response.status).toBe(409);
    expect(response.body).toEqual({ message: "Email already exists" });
  });

  it("POST /auth/signup returns 400 when the validation fails", async () => {
    const response = await request(app).post("/auth/signup").send({
      email: "test@example",
      password: "password1234",
    });

    expect(bcrypt.hash).not.toHaveBeenCalled();
    expect(signupService).not.toHaveBeenCalled();
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Validation failed",
      fieldErrors: { email: "Invalid email" },
    });
  });
});

describe("signin route", () => {
  it("POST /auth/signin logs in the user", async () => {
    const user: User = {
      id: 1,
      email: "test@example.com",
      password_hash: "hashed-password",
    };

    vi.mocked(signinService).mockResolvedValue(user);
    vi.mocked(bcrypt.compare).mockResolvedValue(true as never);

    const response = await request(app).post("/auth/signin").send({
      email: "test@example.com",
      password: "password1234",
    });

    expect(signinService).toHaveBeenCalledWith("test@example.com");
    expect(bcrypt.compare).toHaveBeenCalledWith("password1234", "hashed-password");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Signed in" });
  });

  it("POST /auth/signin returns 401 when credentials are invalid", async () => {
    vi.mocked(signinService).mockResolvedValue(undefined);

    const response = await request(app).post("/auth/signin").send({
      email: "test@example.com",
      password: "password1234",
    });

    expect(signinService).toHaveBeenCalledWith("test@example.com");
    expect(bcrypt.compare).not.toHaveBeenCalled();
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: "Invalid credentials" });
  });

  it("POST /auth/signin returns 400 when the validation fails", async () => {
    const response = await request(app).post("/auth/signin").send({
      email: "test@example",
      password: "password1234",
    });

    expect(signinService).not.toHaveBeenCalled();
    expect(bcrypt.compare).not.toHaveBeenCalled();
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Validation failed",
      fieldErrors: { email: "Invalid email" },
    });
  });
});

describe("signout route", () => {
  it("POST /auth/signout logs out the user", async () => {
    const user: User = {
      id: 1,
      email: "test@example.com",
      password_hash: "hashed-password",
    };

    vi.mocked(signinService).mockResolvedValue(user);
    vi.mocked(bcrypt.compare).mockResolvedValue(true as never);

    const agent = request.agent(app);

    const signinResponse = await agent.post("/auth/signin").send({
      email: "test@example.com",
      password: "password1234",
    });

    expect(signinResponse.status).toBe(200);
    expect(signinResponse.body).toEqual({ message: "Signed in" });

    const response = await agent.post("/auth/signout");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Signed out" });
  });

  it("POST /auth/signout returns 401 when user is not authenticated", async () => {
    const response = await request(app).post("/auth/signout");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: "Unauthorized" });
  });
});

describe("me route", () => {
  it("GET /auth/me returns the authenticated user", async () => {
    const user: User = {
      id: 1,
      email: "test@example.com",
      password_hash: "hashed-password",
    };

    vi.mocked(signinService).mockResolvedValue(user);
    vi.mocked(bcrypt.compare).mockResolvedValue(true as never);

    const agent = request.agent(app);

    const signinResponse = await agent.post("/auth/signin").send({
      email: "test@example.com",
      password: "password1234",
    });

    expect(signinResponse.status).toBe(200);
    expect(signinResponse.body).toEqual({ message: "Signed in" });

    const currentUser: CurrentUser = {
      id: 1,
      email: "test@example.com",
    };

    vi.mocked(meService).mockResolvedValue(currentUser);

    const response = await agent.get("/auth/me");

    expect(meService).toHaveBeenCalledWith(1);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(currentUser);
  });

  it("GET /auth/me returns 401 when user is not authenticated", async () => {
    const response = await request(app).get("/auth/me");

    expect(meService).not.toHaveBeenCalled();
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: "Unauthorized" });
  });
});
