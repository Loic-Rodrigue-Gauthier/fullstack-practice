import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TestProviders } from "../test/TestProviders";
import Header from "./Header";
import LanguageSwitcher from "./LanguageSwitcher";

test("changes language on click", async () => {
  const user = userEvent.setup();

  render(
    <TestProviders>
      <Header />
      <LanguageSwitcher />
    </TestProviders>
  );

  await user.click(screen.getByRole("button", { name: /français/i }));

  expect(await screen.findByRole("button", { name: /déconnexion/i })).toBeInTheDocument();
});
