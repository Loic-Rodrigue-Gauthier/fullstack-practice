import { beforeEach, describe, expect, it, vi } from "vitest";
import notFound from "./notFound.js";

describe("notFound", () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    vi.clearAllMocks();

    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
  });

  it("returns 404 when route not found", () => {
    notFound(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Route not found" });
  });
});
