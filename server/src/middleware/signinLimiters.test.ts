import { beforeEach, describe, expect, it, vi } from "vitest";
import rateLimit from "express-rate-limit";

describe("ipLimiter", () => {
  let req: any;
  let res: any;
  let next: any;
  let limiter: ReturnType<typeof rateLimit>;

  beforeEach(() => {
    vi.clearAllMocks();

    req = {
      ip: "127.0.0.1",
      headers: {},
    };

    res = {
      setHeader: vi.fn(),
      getHeader: vi.fn(),
      status: vi.fn().mockReturnThis(),
      send: vi.fn().mockReturnThis(),
    };

    next = vi.fn();

    limiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 25,
      standardHeaders: true,
      legacyHeaders: false,
      message: {
        message: "Too many signin attempts",
      },
    });
  });

  it("allows the first 25 requests", async () => {
    for (let i = 0; i < 25; i++) {
      await limiter(req, res, next);
    }

    expect(next).toHaveBeenCalledTimes(25);
  });

  it("blocks the 26th request", async () => {
    for (let i = 0; i < 26; i++) {
      await limiter(req, res, next);
    }

    expect(next).toHaveBeenCalledTimes(25);
    expect(res.status).toHaveBeenCalledWith(429);
    expect(res.send).toHaveBeenCalledWith({ message: "Too many signin attempts" });
  });
});

describe("emailLimiter", () => {
  let res: any;
  let next: any;
  let limiter: ReturnType<typeof rateLimit>;

  beforeEach(() => {
    vi.clearAllMocks();

    res = {
      setHeader: vi.fn(),
      getHeader: vi.fn(),
      status: vi.fn().mockReturnThis(),
      send: vi.fn().mockReturnThis(),
    };

    next = vi.fn();

    limiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 5,
      keyGenerator: (req) => req.body.email,
      standardHeaders: true,
      legacyHeaders: false,
      message: {
        message: "Too many signin attempts",
      },
    });
  });

  it("gives different emails separate limits", async () => {
    const req1: any = {
      body: { email: "one@example.com" },
      headers: {},
    };

    const req2: any = {
      body: { email: "two@example.com" },
      headers: {},
    };

    for (let i = 0; i < 5; i++) {
      await limiter(req1, res, next);
    }

    await limiter(req2, res, next);

    expect(next).toHaveBeenCalledTimes(6);
  });

  it("limits requests per email", async () => {
    const req: any = {
      body: { email: "test@example.com" },
      headers: {},
    };

    for (let i = 0; i < 6; i++) {
      await limiter(req, res, next);
    }

    expect(next).toHaveBeenCalledTimes(5);
    expect(res.status).toHaveBeenCalledWith(429);
    expect(res.send).toHaveBeenCalledWith({ message: "Too many signin attempts" });
  });
});
