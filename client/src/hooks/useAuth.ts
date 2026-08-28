import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// to be called when needing to access user info (contains AuthContext's values)
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
