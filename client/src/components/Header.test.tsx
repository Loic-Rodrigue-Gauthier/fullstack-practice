import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TestProviders } from "../test/TestProviders";
import { mockSignedOutUser } from "../test/helpers/authUserState";
import Header from "./Header";

test("shows sign out button when user is Signed in", async () => {
  // no server.use() here since success response exists in handlers

  render(
    <TestProviders>
      <Header />
    </TestProviders>
  );

  expect(await screen.findByRole("button", { name: /sign out/i })).toBeInTheDocument();
});

test("shows sign in link when user is not authenticated", async () => {
  mockSignedOutUser();

  render(
    <TestProviders>
      <Header />
    </TestProviders>
  );

  expect(await screen.findByRole("link", { name: /sign in/i })).toBeInTheDocument();
});

test("shows sign in link when user clicks signout button", async () => {
  const user = userEvent.setup();

  render(
    <TestProviders>
      <Header />
    </TestProviders>
  );

  await user.click(await screen.findByRole("button", { name: /sign out/i }));

  expect(await screen.findByRole("link", { name: /sign in/i })).toBeInTheDocument();
});
