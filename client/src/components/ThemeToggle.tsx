import { STORAGE_KEYS } from "../constants/storage";
import { useState, useEffect } from "react";

function getInitialTheme() {
  const storedTheme = localStorage.getItem(STORAGE_KEYS.darkMode);

  if (storedTheme !== null) {
    return storedTheme === "true";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem(STORAGE_KEYS.darkMode, String(isDark));
  }, [isDark]);

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => setIsDark((current) => !current)}
        className="bg-secondary-light hover:bg-secondary-lighter cursor-pointer rounded-sm px-0.5 py-0.5 text-center font-semibold text-black transition-colors select-none"
      >
        <div
          className={`${isDark ? "translate-x-10" : "translate-x-0"} bg-secondary absolute h-9 w-10 rounded-sm py-1.5 font-semibold text-white transition-transform`}
        >
          <span className="material-symbols-rounded">{isDark ? "dark_mode" : "light_mode"}</span>
        </div>
        <div className="flex">
          <span className="material-symbols-rounded w-10 py-1.5">light_mode</span>
          <span className="material-symbols-rounded w-10 py-1.5">dark_mode</span>
        </div>
      </button>
    </div>
  );
}
