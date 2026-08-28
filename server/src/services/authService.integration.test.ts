import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { pool } from "../config/database.js";
import { signupService, signinService, meService } from "../../src/services/authService.js";

beforeEach(async () => {
  await pool.query("TRUNCATE TABLE users RESTART IDENTITY CASCADE");
});

afterAll(async () => {
  await pool.end();
});

describe("signupService integration", () => {
  it("creates a user and returns its id", async () => {
    const result = await signupService("test@example.com", "hashed-password");

    expect(result).toBe(1);
  });

  it("rejects a duplicate email", async () => {
    await signupService("test@example.com", "hashed-password");

    await expect(signupService("test@example.com", "another-hash")).rejects.toThrow();
  });
});

describe("signinService integration", () => {
  it("returns the user when the email exists", async () => {
    await signupService("test@example.com", "hashed-password");

    const result = await signinService("test@example.com");

    expect(result).toEqual({
      id: 1,
      email: "test@example.com",
      password_hash: "hashed-password",
    });
  });

  it("returns undefined when the email does not exist", async () => {
    const result = await signinService("test@example.com");

    expect(result).toBeUndefined();
  });
});

describe("meService integration", () => {
  it("returns the current user", async () => {
    await signupService("test@example.com", "hashed-password");

    const result = await meService(1);

    expect(result).toEqual({
      id: 1,
      email: "test@example.com",
    });
  });
});
