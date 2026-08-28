import { render, screen } from "@testing-library/react";
import { Routes, Route } from "react-router-dom";
import { TestProviders } from "../test/TestProviders";
import { mockSignedOutUser } from "../test/helpers/authUserState";
import ProtectedRoutes from "./ProtectedRoutes";

test("redirects unauthenticated users away from protected pages", async () => {
  mockSignedOutUser();

  render(
    <TestProviders initialEntries={["/profile"]}>
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/profile" element={<div>Profile Page</div>} />
        </Route>
      </Routes>
    </TestProviders>
  );

  expect(await screen.findByText("Home Page")).toBeInTheDocument();
});
