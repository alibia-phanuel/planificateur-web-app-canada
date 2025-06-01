"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { ModeToggle } from "@/components/mode-toggle";
import { LanguageSelector } from "@/components/language-selector";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProtectedRoute from "@/components/ProtectedRoute";
const Page = () => {
  const t = useTranslations();

  return (
    <ProtectedRoute>
      <div className="w-full flex justify-center items-center md:gap-4 gap-2 px-4">
        <Card className="w-[300px] max-md:w-[150px] max-w-full">
          <CardHeader>
            <CardTitle>{t("appearance")}</CardTitle>
          </CardHeader>
          <CardContent>
            <ModeToggle />
          </CardContent>
        </Card>
        <Card className="w-[300px] max-md:w-[150px] max-w-full">
          <CardHeader>
            <CardTitle>{t("language")}</CardTitle>
          </CardHeader>
          <CardContent>
            <LanguageSelector />
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
};

export default Page;
