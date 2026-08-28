import { STORAGE_KEYS } from "../constants/storage";
import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import enCommon from "./locales/en/common.json";
import enAuth from "./locales/en/auth.json";
import enHeader from "./locales/en/header.json";
import enHome from "./locales/en/home.json";
import frCommon from "./locales/fr/common.json";
import frAuth from "./locales/fr/auth.json";
import frHeader from "./locales/fr/header.json";
import frHome from "./locales/fr/home.json";

const supportedLanguages = ["en", "fr"];

const getInitialLanguage = () => {
  const storedLang = localStorage.getItem(STORAGE_KEYS.language);

  if (storedLang) {
    return storedLang;
  }

  const navigatorLang = navigator.language.split("-")[0];

  return supportedLanguages.includes(navigatorLang) ? navigatorLang : "en";
};

const initialLanguage = getInitialLanguage();

localStorage.setItem(STORAGE_KEYS.language, initialLanguage);

i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: enCommon,
      auth: enAuth,
      header: enHeader,
      home: enHome,
    },
    fr: {
      common: frCommon,
      auth: frAuth,
      header: frHeader,
      home: frHome,
    },
  },

  lng: initialLanguage,
  fallbackLng: "en",
  defaultNS: "common",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
