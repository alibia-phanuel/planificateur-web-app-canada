"use client";

import React, { useState } from "react";
// import ProtectedRoute from "@/components/ProtectedRoute";
import { Calendar } from "@/components/Calendar";
import { AgendaHeader } from "@/components/AgendaHeader";
import { useAgenda } from "@/hooks/useAgenda";
import { addMonths } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TaskForm } from "@/components/TaskForm";
import { Task } from "@/type/agenda";

const CalendarPage = () => {
  const { tasks, loading, error, addTask } = useAgenda();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleNavigate = (direction: "prev" | "next") => {
    setCurrentDate((prev) => addMonths(prev, direction === "next" ? 1 : -1));
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setIsDialogOpen(true);
  };

  const handleAddTask = async (
    taskData: Omit<Task, "id" | "createdAt" | "updatedAt">
  ) => {
    if (!selectedDate) return;

    try {
      await addTask({
        ...taskData,
        date: selectedDate,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      setIsDialogOpen(false);
    } catch (error: unknown) {
      console.error("Erreur lors de l'ajout de la tâche:", error);
    }
  };

  return (
   
      <div className="min-h-screen flex flex-col items-center justify-center p-4 w-full">
        <div className="w-full max-w-7xl mx-auto bg-[#f9fafb] rounded-lg p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Calendrier</h1>

          <AgendaHeader
            currentDate={currentDate}
            viewMode="month"
            onViewModeChange={() => {}}
            onNavigate={handleNavigate}
          />

          {loading ? (
            <p className="text-center">Chargement...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <Calendar
              currentDate={currentDate}
              tasks={tasks}
              expenses={[]}
              onDateClick={handleDateClick}
            />
          )}

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Nouvelle tâche pour le{" "}
                  {selectedDate?.toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </DialogTitle>
              </DialogHeader>
              <TaskForm
                onSubmit={handleAddTask}
                initialData={{ date: selectedDate || new Date() }}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
   
  );
};

export default CalendarPage;
