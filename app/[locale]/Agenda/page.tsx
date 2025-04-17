import React from "react";
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("HomePage");
  return (
    <div className="flex justify-center items-center h-screen flex-col w-full">
      <h1>{t("title")}</h1>
    </div>
  );
};

export default Page;
