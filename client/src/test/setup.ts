import "@testing-library/jest-dom/vitest";
import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "./server";
import { mockSignedInUser } from "./helpers/authUserState";
import i18n from "../i18n";

beforeAll(() => {
  i18n.changeLanguage("en");
  server.listen({
    onUnhandledRequest: "error",
  });
});

afterEach(() => {
  mockSignedInUser();
  server.resetHandlers();
});

afterAll(() => server.close());
