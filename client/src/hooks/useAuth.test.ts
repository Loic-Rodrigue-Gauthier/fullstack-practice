import { renderHook } from "@testing-library/react";
import { AuthProvider } from "../context/AuthContext";
import { useAuth } from "./useAuth";

test("throws when used outside AuthProvider", () => {
  expect(() => renderHook(() => useAuth())).toThrow("useAuth must be used inside AuthProvider");
});

test("returns auth context value inside AuthProvider", () => {
  const { result } = renderHook(() => useAuth(), {
    wrapper: AuthProvider,
  });

  expect(result.current).toHaveProperty("user");
  expect(result.current).toHaveProperty("refreshUser");
});
