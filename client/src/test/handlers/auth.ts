import { http, HttpResponse } from "msw";
import { getMockUser, mockSignedOutUser } from "../helpers/authUserState";

// success response as default
export const authHandlers = [
  http.post("/api/auth/signup", () => {
    return HttpResponse.json({ message: "User created" }, { status: 201 });
  }),
  http.post("/api/auth/signin", () => {
    return HttpResponse.json({ message: "Signed in" });
  }),
  http.post("/api/auth/signout", () => {
    mockSignedOutUser();

    return HttpResponse.json({ message: "Signed out" });
  }),
  http.get("/api/auth/me", () => {
    if (!getMockUser()) {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    return HttpResponse.json(getMockUser());
  }),
];
