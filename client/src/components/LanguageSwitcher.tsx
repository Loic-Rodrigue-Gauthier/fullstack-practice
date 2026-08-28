import { STORAGE_KEYS } from "../constants/storage";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const storedLang = localStorage.getItem(STORAGE_KEYS.language)!;

  const { i18n } = useTranslation();

  const [language, setLanguage] = useState(storedLang);

  useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem(STORAGE_KEYS.language, language);
  }, [language]);

  const switchLanguage = () => {
    setLanguage((current) => (current === "en" ? "fr" : "en"));
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={switchLanguage}
        className="bg-primary-light hover:bg-primary-lighter cursor-pointer rounded-sm px-0.5 py-0.5 text-center font-semibold text-black transition-colors select-none"
      >
        <div
          className={`${language === "fr" ? "translate-x-20" : "translate-x-0"} bg-primary absolute w-20 rounded-sm py-1 font-semibold text-white transition-transform`}
        >
          {language === "fr" ? "Français" : "English"}
        </div>
        <div className="flex">
          <span className="w-20 py-1">English</span>
          <span className="w-20 py-1">Français</span>
        </div>
      </button>
    </div>
  );
}
