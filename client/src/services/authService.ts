import type { AuthRequest, CurrentUser } from "@app/shared";
import api from "./apiService";

export function signup(data: AuthRequest): Promise<void> {
  return api(`/api/auth/signup`, {
    // api: uses fetch() which calls/emits signal to server route (with method below)
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export function signin(data: AuthRequest): Promise<void> {
  return api(`/api/auth/signin`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export function signout(): Promise<void> {
  return api(`/api/auth/signout`, {
    method: "POST",
    credentials: "include",
  });
}

export function me(): Promise<CurrentUser> {
  return api(`/api/auth/me`, {
    credentials: "include",
  });
}
