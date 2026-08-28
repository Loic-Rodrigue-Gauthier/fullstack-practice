import { STORAGE_KEYS } from "../constants/storage";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "./Button";
import logo from "../assets/react.svg";

export default function AuthForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [mode, setMode] = useState<"signin" | "signup">(location.state?.mode ?? "signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const language = localStorage.getItem(STORAGE_KEYS.language)!;

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!e.currentTarget.reportValidity()) {
      return;
    }

    localStorage.setItem(STORAGE_KEYS.user, email.slice(0, email.indexOf("@")));

    resetFields();
    navigate(0);
  };

  const resetFields = () => {
    setMode("signin");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="m-6 w-84 gap-8">
      <div className="my-6 flex items-center justify-center gap-2">
        <img src={logo} alt="logo" className="h-12 w-auto" />
        <p className="font-lexend text-3xl dark:text-white">{t("app")}</p>
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
            className={`${mode === "signup" ? (language === "fr" ? "translate-x-26" : "translate-x-20") : "translate-x-0"} ${language === "fr" ? "w-26" : "w-20"} bg-primary absolute rounded-full py-2 text-center font-semibold text-white transition-transform select-none`}
          >
            {mode === "signup" ? t("signUp") : t("signIn")}
          </div>
          <input
            id="signin"
            type="radio"
            name="mode"
            checked={mode === "signin"}
            onChange={() => setMode("signin")}
            className="peer/signin sr-only"
          />
          <label
            htmlFor="signin"
            className={`${language === "fr" ? "w-26" : "w-20"} ring-primary-hover cursor-pointer rounded-full py-2 text-center font-semibold transition-shadow select-none ring-inset hover:ring-2`}
          >
            {t("signIn")}
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
            className={`${language === "fr" ? "w-26" : "w-20"} ring-primary-hover cursor-pointer rounded-full py-2 text-center font-semibold transition-shadow select-none ring-inset hover:ring-2`}
          >
            {t("signUp")}
          </label>
        </div>
        <div className="flex w-56 flex-col gap-2">
          <div className="flex flex-col">
            <label htmlFor="email">{t("email")}</label>
            <input
              id="email"
              type="email"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="my-0.5"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password">{t("password")}</label>
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
          <Button type="submit">{t("submit")}</Button>
        </div>
      </form>
    </div>
  );
}
