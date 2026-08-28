import { useEffect } from "react";
import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

export default function PageTitle() {
  const location = useLocation();
  const { t } = useTranslation();

  const getTitle = () => {
    const slicedPathName = location.pathname.slice(1);

    if (!i18n.exists(slicedPathName)) {
      return slicedPathName.length > 0 ? t("notFound") : `${t("app")} — ${t("home")}`;
    }

    return t(slicedPathName);
  };

  useEffect(() => {
    document.title = getTitle();
  }, [location.pathname, i18n.language]);

  return null;
}
