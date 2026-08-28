import ApiError from "../errors/ApiError";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { signup, signin } from "../services/authService";
import { useAuth } from "../hooks/useAuth";
import Button from "./Button";
import logo from "../assets/react.svg";

export default function AuthForm() {
  const { refreshUser } = useAuth();
  const location = useLocation(); // contains values (URL, custom state, etc.) attached to page

  const [mode, setMode] = useState<"signin" | "signup">(location.state?.mode ?? "signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<ApiError | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!e.currentTarget.reportValidity()) {
      // re-enables native HTML validation
      return;
    }

    try {
      if (mode === "signup") {
        await signup({
          email,
          password,
        });
      } else if (mode === "signin") {
        await signin({
          email,
          password,
        });
      }

      await refreshUser(); // sets user after logging in

      resetFields();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err);
      }
    }
  };

  const resetFields = () => {
    setMode("signin");
    setEmail("");
    setPassword("");
    setError(null);
  };

  return (
    <div className="m-6 w-84 gap-8">
      <div className="my-6 flex items-center justify-center gap-2">
        <img src={logo} alt="logo" className="h-12 w-auto" />
        <p className="font-lexend text-3xl dark:text-white">Appname</p>
      </div>

      <form
        autoComplete="on"
        onSubmit={handleSubmit}
        style={
          {
            "--base-color": "var(--color-primary-lighter)",
            "--pulse-color": "var(--color-primary-lightest)",
          } as React.CSSProperties
        }
        className={`${isPlaying ? "animate-pulse-color" : ""} bg-primary-lighter border-primary-light flex flex-col items-center gap-4 rounded-sm border-2 p-4`}
      >
        <div className="bg-primary-light flex rounded-full">
          <div
            onTransitionStart={() => setIsPlaying(false)}
            onTransitionEnd={() => setIsPlaying(true)}
            className={`${mode === "signup" ? "translate-x-20" : "translate-x-0"} bg-primary absolute w-20 rounded-full px-3 py-2 text-center font-medium text-white transition-transform select-none`}
          >
            {mode === "signup" ? "Sign up" : "Sign in"}
          </div>
          <input
            id="signin"
            type="radio"
            name="mode"
            checked={mode === "signin"}
            onChange={() => setMode("signin")}
            className="peer/signin sr-only" // screen-reader only = hidden, but accessible
          />
          <label
            htmlFor="signin"
            className="ring-primary-hover w-20 cursor-pointer rounded-full px-3 py-2 text-center font-medium transition-shadow select-none ring-inset hover:ring-2"
          >
            Sign in
          </label>

          <input
            id="signup"
            type="radio"
            name="mode"
            checked={mode === "signup"}
            onChange={() => setMode("signup")}
            className="peer/signup sr-only"
          />
          <label
            htmlFor="signup"
            className="ring-primary-hover w-20 cursor-pointer rounded-full px-3 py-2 text-center font-medium transition-shadow select-none ring-inset hover:ring-2"
          >
            Sign up
          </label>
        </div>
        <div className="flex w-56 flex-col gap-2">
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="my-0.5"
            />
            {error?.fieldErrors && (
              <p className="text-danger">
                <span>* </span>
                {error.fieldErrors.email}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              required
              minLength={mode === "signup" ? 12 : undefined}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="my-0.5"
            />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <Button type="submit">Submit</Button>
          {
            !error?.fieldErrors && (
              <p className="text-danger mt-1">{error?.message}</p>
            ) /* if (!error.fieldErrors) {...} */
          }
        </div>
      </form>
    </div>
  );
}
