import { beforeEach, describe, expect, it, vi } from "vitest";
import { validationResult } from "express-validator";
import { validateRequest } from "./validateRequest.js";

vi.mock("express-validator");

describe("validateRequest", () => {
  let req: any;
  let res: any;
  let next: any;

  beforeEach(() => {
    vi.clearAllMocks();

    req = {};

    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };

    next = vi.fn();
  });

  it("calls next when the validation is successful", () => {
    vi.mocked(validationResult).mockReturnValue({
      isEmpty: () => true,
    } as any);

    validateRequest(req, res, next);

    expect(validationResult).toHaveBeenCalledWith(req);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledOnce();
  });

  it("returns 400 when the validation fails", () => {
    vi.mocked(validationResult).mockReturnValue({
      isEmpty: () => false,
      mapped: () => ({
        email: {
          msg: "Invalid email",
        },
      }),
    } as any);

    validateRequest(req, res, next);

    expect(validationResult).toHaveBeenCalledWith(req);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Validation failed",
      fieldErrors: { email: "Invalid email" },
    });
    expect(next).not.toHaveBeenCalled();
  });
});
