import { MemoryRouter } from "react-router-dom";

export function TestProviders({
  children,
  initialEntries = ["/"],
}: {
  children: React.ReactNode;
  initialEntries?: string[];
}) {
  return <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>;
}
