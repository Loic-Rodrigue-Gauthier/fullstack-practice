import type { CurrentUser } from "@app/shared";
import { mockUser } from "../fixtures/authUser";

let currentUser: CurrentUser | null = mockUser;

export function mockSignedInUser() {
  currentUser = mockUser;
}

export function mockSignedOutUser() {
  currentUser = null;
}

export function getMockUser() {
  return currentUser;
}
