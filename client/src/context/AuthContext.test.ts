import { renderHook, waitFor } from "@testing-library/react";
import { AuthProvider } from "./AuthContext";
import { getMockUser, mockSignedOutUser } from "../test/helpers/authUserState";
import { useAuth } from "../hooks/useAuth";

test("loads current user on mount", async () => {
  const { result } = renderHook(() => useAuth(), {
    wrapper: AuthProvider,
  });

  await waitFor(() => {
    expect(result.current?.user).toEqual(getMockUser());
  });
});

test("sets user to null when fetching current user fails", async () => {
  mockSignedOutUser();

  const { result } = renderHook(() => useAuth(), {
    wrapper: AuthProvider,
  });

  await waitFor(() => {
    expect(result.current?.user).toBeNull();
  });
});
