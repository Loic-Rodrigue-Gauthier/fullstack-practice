import { STORAGE_KEYS } from "../constants/storage";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const language = localStorage.getItem(STORAGE_KEYS.language)!;

  const changeLanguage = (language: "en" | "fr") => {
    i18n.changeLanguage(language);
    localStorage.setItem(STORAGE_KEYS.language, language);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="material-symbols-rounded dark:text-white">language</span>
      <div className="bg-primary-light rounded-sm px-0.5 py-0.5 text-center font-medium">
        <div
          className={`${language === "fr" ? "translate-x-20" : "translate-x-0"} bg-primary absolute w-20 rounded-sm py-1 font-medium text-white transition-transform select-none`}
        >
          {language === "fr" ? "Français" : "English"}
        </div>
        <button
          onClick={() => changeLanguage("en")}
          className="hover:bg-primary-lighter w-20 cursor-pointer rounded-sm py-1 select-none"
        >
          English
        </button>
        <button
          onClick={() => changeLanguage("fr")}
          className="hover:bg-primary-lighter w-20 cursor-pointer rounded-sm py-1 select-none"
        >
          Français
        </button>
      </div>
    </div>
  );
}
