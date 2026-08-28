import { http, HttpResponse } from "msw";
import { server } from "../test/server";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TestProviders } from "../test/TestProviders";
import { mockSignedOutUser } from "../test/helpers/authUserState";
import AuthForm from "./AuthForm";

test("shows an error when email is already exists", async () => {
  const user = userEvent.setup();

  mockSignedOutUser();

  server.use(
    http.post("/api/auth/signup", () => {
      return HttpResponse.json({ message: "Email already exists" }, { status: 409 });
    })
  );

  render(
    <TestProviders>
      <AuthForm />
    </TestProviders>
  );

  await user.click(screen.getByRole("radio", { name: /sign up/i }));
  await user.type(screen.getByRole("textbox", { name: /email/i }), "test@example.com");
  await user.type(screen.getByLabelText(/password/i), "password1234");
  await user.click(screen.getByRole("button", { name: /submit/i }));

  expect(await screen.findByText("Email already exists")).toBeInTheDocument();
});

test.each([
  ["signup", "/api/auth/signup"],
  ["signin", "/api/auth/signin"],
])("%s shows an error when email is invalid", async (mode, route) => {
  const user = userEvent.setup();

  mockSignedOutUser();

  server.use(
    http.post(route, () => {
      return HttpResponse.json(
        {
          message: "Validation failed",
          fieldErrors: {
            email: "Invalid email",
          },
        },
        { status: 400 }
      );
    })
  );

  render(
    <TestProviders>
      <AuthForm />
    </TestProviders>
  );

  if (mode === "signup") {
    await user.click(screen.getByRole("radio", { name: /sign up/i }));
  } else {
    await user.click(screen.getByRole("radio", { name: /sign in/i }));
  }
  await user.type(screen.getByRole("textbox", { name: /email/i }), "test@example");
  await user.type(screen.getByLabelText(/password/i), "password1234");
  await user.click(screen.getByRole("button", { name: /submit/i }));

  expect(await screen.findByText("Invalid email")).toBeInTheDocument();
});

test("shows an error when signin credentials are invalid", async () => {
  const user = userEvent.setup();

  mockSignedOutUser();

  server.use(
    http.post("/api/auth/signin", () => {
      return HttpResponse.json({ message: "Invalid credentials" }, { status: 401 });
    })
  );

  render(
    <TestProviders>
      <AuthForm />
    </TestProviders>
  );

  await user.click(screen.getByRole("radio", { name: /sign in/i }));
  await user.type(screen.getByRole("textbox", { name: /email/i }), "tset@example.com");
  await user.type(screen.getByLabelText(/password/i), "password4321");
  await user.click(screen.getByRole("button", { name: /submit/i }));

  expect(await screen.findByText("Invalid credentials")).toBeInTheDocument();
});

test("shows an error after too many signin attempts", async () => {
  const user = userEvent.setup();

  mockSignedOutUser();

  server.use(
    http.post("/api/auth/signin", () => {
      return HttpResponse.json({ message: "Too many signin attempts" }, { status: 429 });
    })
  );

  render(
    <TestProviders>
      <AuthForm />
    </TestProviders>
  );

  await user.click(screen.getByRole("radio", { name: /sign in/i }));
  await user.type(screen.getByRole("textbox", { name: /email/i }), "tset@example.com");
  await user.type(screen.getByLabelText(/password/i), "password4321");
  await user.click(screen.getByRole("button", { name: /submit/i }));

  expect(await screen.findByText("Too many signin attempts")).toBeInTheDocument();
});
