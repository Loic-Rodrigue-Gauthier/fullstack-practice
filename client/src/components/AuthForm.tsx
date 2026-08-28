import { STORAGE_KEYS } from "../constants/storage";
import ApiError from "../errors/ApiError";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { signup, signin } from "../services/authService";
import { useAuth } from "../hooks/useAuth";
import Button from "./Button";
import logo from "../assets/react.svg";

export default function AuthForm() {
  const { refreshUser } = useAuth();
  const location = useLocation(); // contains values (URL, custom state, etc.) attached to page
  const { t: tCommon } = useTranslation("common");
  const { t: tAuth } = useTranslation("auth");

  const [mode, setMode] = useState<"signin" | "signup">(location.state?.mode ?? "signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<ApiError | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const language = localStorage.getItem(STORAGE_KEYS.language)!;

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
        <p className="font-lexend text-3xl dark:text-white">{tCommon("app")}</p>
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
            className={`${mode === "signup" ? (language === "fr" ? "translate-x-26" : "translate-x-20") : "translate-x-0"} ${language === "fr" ? "w-26" : "w-20"} bg-primary absolute rounded-full py-2 text-center font-medium text-white transition-transform select-none`}
          >
            {mode === "signup" ? tCommon("signUp") : tCommon("signIn")}
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
            className={`${language === "fr" ? "w-26" : "w-20"} ring-primary-hover cursor-pointer rounded-full py-2 text-center font-medium transition-shadow select-none ring-inset hover:ring-2`}
          >
            {tCommon("signIn")}
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
            className={`${language === "fr" ? "w-26" : "w-20"} ring-primary-hover cursor-pointer rounded-full py-2 text-center font-medium transition-shadow select-none ring-inset hover:ring-2`}
          >
            {tCommon("signUp")}
          </label>
        </div>
        <div className="flex w-56 flex-col gap-2">
          <div className="flex flex-col">
            <label htmlFor="email">{tCommon("email")}</label>
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
                {tAuth(error.fieldErrors.email)}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="password">{tCommon("password")}</label>
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
          <Button type="submit">{tCommon("submit")}</Button>
          {
            error && !error.fieldErrors && (
              <p className="text-danger mt-2">{tAuth(error.message)}</p>
            ) /* if (error && !error.fieldErrors) { ... } */
          }
        </div>
      </form>
    </div>
  );
}
