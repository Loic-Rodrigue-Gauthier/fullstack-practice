import { render, screen } from "@testing-library/react";
import { Routes, Route } from "react-router-dom";
import { TestProviders } from "../test/TestProviders";
import GuestRoutes from "./GuestRoutes";

test("redirects authenticated users away from auth page", async () => {
  render(
    <TestProviders initialEntries={["/auth"]}>
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route element={<GuestRoutes />}>
          <Route path="/auth" element={<div>Auth Page</div>} />
        </Route>
      </Routes>
    </TestProviders>
  );

  expect(await screen.findByText("Home Page")).toBeInTheDocument();
});
