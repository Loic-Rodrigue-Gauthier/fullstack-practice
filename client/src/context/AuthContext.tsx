import type { CurrentUser } from "@app/shared";
import type { AuthContextUser } from "../types/auth";
import { useCallback } from "react";
import ApiError from "../errors/ApiError";
import { createContext, useEffect, useState } from "react";
import { me } from "../services/authService";

export const AuthContext = createContext<AuthContextUser | undefined>(undefined);

// to make logged in user info available app-wide
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<CurrentUser | null>(null);

  const refreshUser = useCallback(async () => {
    try {
      const currentUser: CurrentUser = await me();

      setUser(currentUser);
    } catch (err) {
      if (err instanceof ApiError) {
        console.error(err.message);
      }

      setUser(null);
    }
  }, []);

  useEffect(() => {
    void refreshUser();
  }, []); // [] : executes once whenever app is loaded

  return <AuthContext.Provider value={{ user, refreshUser }}>{children}</AuthContext.Provider>;
}
