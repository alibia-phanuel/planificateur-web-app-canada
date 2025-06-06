"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ViewMode } from "@/type/agenda";

interface AgendaHeaderProps {
  currentDate: Date;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onNavigate: (direction: "prev" | "next") => void;
  hideWeekButton?: boolean;
}

export const AgendaHeader: React.FC<AgendaHeaderProps> = ({
  currentDate,
  viewMode,
  onViewModeChange,
  onNavigate,
  hideWeekButton = false,
}) => {
  const formatDate = (date: Date, mode: ViewMode) => {
    if (mode === "month") {
      return date.toLocaleDateString("fr-FR", {
        month: "long",
        year: "numeric",
      });
    } else {
      const startOfWeek = new Date(date);
      startOfWeek.setDate(date.getDate() - date.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);

      return `${startOfWeek.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
      })} - ${endOfWeek.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })}`;
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onNavigate("prev")}
          className="h-8 w-8"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold min-w-[200px] text-center">
          {formatDate(currentDate, viewMode)}
        </h2>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onNavigate("next")}
          className="h-8 w-8"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex gap-2">
        {!hideWeekButton && (
          <Button
            variant={viewMode === "week" ? "default" : "outline"}
            onClick={() => onViewModeChange("week")}
            className="h-8"
          >
            Semaine
          </Button>
        )}
        <Button
          variant={viewMode === "month" ? "default" : "outline"}
          onClick={() => onViewModeChange("month")}
          className="h-8"
        >
          Mois
        </Button>
      </div>
    </div>
  );
};
