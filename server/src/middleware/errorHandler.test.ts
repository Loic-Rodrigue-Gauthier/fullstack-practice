import { beforeEach, describe, expect, it, vi } from "vitest";
import errorHandler from "./errorHandler.js";

vi.spyOn(console, "error").mockImplementation(() => {}); // spyOn : mocks an existing JS function

describe("errorHandler", () => {
  let err: Error;
  let req: any;
  let res: any;
  let next: any;

  beforeEach(() => {
    vi.clearAllMocks();

    err = new Error("Something went wrong");

    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
  });

  it("logs the error and returns a 500 response", () => {
    errorHandler(err, req, res, next);

    expect(console.error).toHaveBeenCalledWith(err);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Internal server error" });
  });
});
