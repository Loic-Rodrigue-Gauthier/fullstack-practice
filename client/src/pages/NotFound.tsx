import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <>
      <h1 className="text-4xl md:text-5xl dark:text-white">404 - {t("notFound")}</h1>
    </>
  );
}
