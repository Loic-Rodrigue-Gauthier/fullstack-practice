import { beforeEach, describe, expect, it, vi } from "vitest";
import { pool } from "../config/database.js";
import { signupService, signinService, meService } from "./authService.js";

vi.mock("../config/database.js");

describe("signupService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates a user and returns the user id", async () => {
    vi.mocked(pool.query).mockResolvedValue({
      rows: [{ id: 1 }],
    } as any);

    const result = await signupService("test@example.com", "hashed-password");

    expect(pool.query).toHaveBeenCalledWith(expect.stringContaining("INSERT INTO users"), [
      "test@example.com",
      "hashed-password",
    ]);

    expect(result).toBe(1);
  });
});

describe("signinService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns the user with corresponding email", async () => {
    vi.mocked(pool.query).mockResolvedValue({
      rows: [{ id: 1, email: "test@example.com", password_hash: "hashed-password" }],
    } as any);

    const result = await signinService("test@example.com");

    expect(pool.query).toHaveBeenCalledWith(expect.stringContaining("FROM users"), [
      "test@example.com",
    ]);

    expect(result).toEqual({ id: 1, email: "test@example.com", password_hash: "hashed-password" });
  });

  it("returns undefined when email is not found", async () => {
    vi.mocked(pool.query).mockResolvedValue({
      rows: [],
    } as any);

    const result = await signinService("test@example.com");

    expect(pool.query).toHaveBeenCalledWith(expect.stringContaining("FROM users"), [
      "test@example.com",
    ]);

    expect(result).toBeUndefined();
  });
});

describe("meService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns the authenticated user's information", async () => {
    vi.mocked(pool.query).mockResolvedValue({
      rows: [{ id: 1, email: "test@example.com" }],
    } as any);

    const result = await meService(1);

    expect(pool.query).toHaveBeenCalledWith(expect.stringContaining("SELECT id, email"), [1]);

    expect(result).toEqual({ id: 1, email: "test@example.com" });
  });
});
