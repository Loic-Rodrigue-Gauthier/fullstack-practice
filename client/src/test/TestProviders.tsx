import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";

export function TestProviders({
  children,
  initialEntries = ["/"],
}: {
  children: React.ReactNode;
  initialEntries?: string[];
}) {
  return (
    <MemoryRouter initialEntries={initialEntries}>
      <AuthProvider>{children}</AuthProvider>
    </MemoryRouter>
  );
}
