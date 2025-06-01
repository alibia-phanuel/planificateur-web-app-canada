import React from "react";
import { useTranslations } from "next-intl";
import ProtectedRoute from "@/components/ProtectedRoute";
const Page = () => {
  const t = useTranslations("HomePage");
  return (
    <ProtectedRoute>
      <div className="flex justify-center items-center h-screen flex-col w-full">
        <h1>{t("title")}</h1>
      </div>
    </ProtectedRoute>
  );
};

export default Page;
