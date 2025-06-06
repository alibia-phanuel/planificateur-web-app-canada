"use client";

import React, { useState } from "react";
// import ProtectedRoute from "@/components/ProtectedRoute";
import { TaskForm } from "@/components/TaskForm";
import { useAgenda } from "@/hooks/useAgenda";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AgendaHeader } from "@/components/AgendaHeader";
import { Task, ViewMode } from "@/type/agenda";
import {
  addDays,
  addMonths,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  isWithinInterval,
} from "date-fns";

const AgendaPage = () => {
  const { tasks, loading, error, addTask, updateTask, deleteTask } =
    useAgenda();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>("week");

  const handleAddTask = async (taskData: Omit<Task, "id">) => {
    try {
      await addTask(taskData);
    } catch (error) {
      console.error("Erreur lors de l'ajout de la tâche:", error);
    }
  };

  const handleNavigate = (direction: "prev" | "next") => {
    if (viewMode === "week") {
      setCurrentDate((prev) => addDays(prev, direction === "next" ? 7 : -7));
    } else {
      setCurrentDate((prev) => addMonths(prev, direction === "next" ? 1 : -1));
    }
  };

  const getVisibleTasks = () => {
    if (viewMode === "week") {
      const weekStart = startOfWeek(currentDate);
      const weekEnd = endOfWeek(currentDate);
      return tasks.filter((task) =>
        isWithinInterval(new Date(task.date), {
          start: weekStart,
          end: weekEnd,
        })
      );
    } else {
      const monthStart = startOfMonth(currentDate);
      const monthEnd = endOfMonth(currentDate);
      return tasks.filter((task) =>
        isWithinInterval(new Date(task.date), {
          start: monthStart,
          end: monthEnd,
        })
      );
    }
  };

  return (

      <div className="min-h-screen flex flex-col items-center justify-center p-4  w-full">
        <div className="w-full max-w-7xl mx-auto bg-[#f9fafb] rounded-lg   p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Agenda</h1>

          <AgendaHeader
            currentDate={currentDate}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onNavigate={handleNavigate}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Liste des tâches */}
            <Card className="p-4 order-2 lg:order-1">
              <h2 className="text-xl font-semibold mb-4 text-center">
                {viewMode === "week"
                  ? "Tâches de la semaine"
                  : "Tâches du mois"}
              </h2>
              {loading ? (
                <p className="text-center">Chargement...</p>
              ) : error ? (
                <p className="text-red-500 text-center">{error}</p>
              ) : (
                <div className="space-y-4">
                  {getVisibleTasks().map((task) => (
                    <Card key={task.id} className="p-4">
                      <h3 className="font-medium text-center ">{task.title}</h3>
                      <p className="text-sm text-gray-600 text-center">
                        {task.description}
                      </p>
                      <p className="text-sm text-gray-500 text-center">
                        {new Date(task.date).toLocaleString()}
                      </p>
                      <div className="flex justify-center space-x-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateTask(task.id, { completed: !task.completed })
                          }
                        >
                          {task.completed
                            ? "Marquer comme non terminé"
                            : "Marquer comme terminé"}
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteTask(task.id)}
                        >
                          Supprimer
                        </Button>
                      </div>
                    </Card>
                  ))}
                  {getVisibleTasks().length === 0 && (
                    <p className="text-center text-gray-500">
                      Aucune tâche pour cette période
                    </p>
                  )}
                </div>
              )}
            </Card>

            {/* Formulaire d'ajout de tâche */}
            <Card className="p-4 order-1 lg:order-2">
              <h2 className="text-xl font-semibold mb-4 text-center">
                Nouvelle tâche
              </h2>
              <TaskForm onSubmit={handleAddTask} />
            </Card>
          </div>
        </div>
      </div>
    
  );
};

export default AgendaPage;
