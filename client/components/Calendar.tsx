"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Task, Expense } from "@/type/agenda";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isSameMonth,
  isToday,
  isSameDay,
} from "date-fns";
import { DollarSign } from "lucide-react";

interface CalendarProps {
  currentDate: Date;
  tasks: Task[];
  expenses: Expense[];
  onDateClick: (date: Date) => void;
}

export const Calendar: React.FC<CalendarProps> = ({
  currentDate,
  tasks,
  expenses,
  onDateClick,
}) => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Obtenir les jours de la semaine en français
  const weekDays = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

  // Fonction pour obtenir les tâches d'un jour spécifique
  const getTasksForDay = (date: Date) => {
    return tasks.filter((task) => isSameDay(new Date(task.date), date));
  };

  // Fonction pour obtenir les dépenses d'un jour spécifique
  const getExpensesForDay = (date: Date) => {
    return expenses.filter((expense) =>
      isSameDay(new Date(expense.date), date)
    );
  };

  // Fonction pour calculer le total des dépenses d'un jour
  const getTotalExpensesForDay = (date: Date) => {
    return getExpensesForDay(date).reduce(
      (total, expense) => total + expense.amount,
      0
    );
  };

  return (
    <Card className="p-4">
      <div className="grid grid-cols-7 gap-1">
        {/* En-têtes des jours de la semaine */}
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center font-semibold text-sm py-2 text-gray-600"
          >
            {day}
          </div>
        ))}

        {/* Jours du mois */}
        {days.map((day) => {
          const dayTasks = getTasksForDay(day);
          const dayExpenses = getExpensesForDay(day);
          const totalExpenses = getTotalExpensesForDay(day);
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isCurrentDay = isToday(day);

          return (
            <div
              key={day.toString()}
              onClick={() => onDateClick(day)}
              className={`
                min-h-[100px] p-2 border rounded-lg cursor-pointer
                ${isCurrentMonth ? "bg-white" : "bg-gray-50"}
                ${isCurrentDay ? "border-blue-500" : "border-gray-200"}
                hover:border-blue-300 transition-colors
              `}
            >
              <div className="flex justify-between items-start">
                <span
                  className={`
                    text-sm font-medium
                    ${isCurrentDay ? "text-blue-600" : "text-gray-700"}
                    ${!isCurrentMonth && "text-gray-400"}
                  `}
                >
                  {format(day, "d")}
                </span>
                <div className="flex items-center gap-1">
                  {dayTasks.length > 0 && (
                    <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full">
                      {dayTasks.length}
                    </span>
                  )}
                  {totalExpenses > 0 && (
                    <span className="text-xs bg-green-100 text-green-600 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                      <DollarSign className="h-3 w-3" />
                      {totalExpenses.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              {/* Liste des tâches et dépenses du jour */}
              <div className="mt-1 space-y-1">
                {dayTasks.slice(0, 2).map((task) => (
                  <div
                    key={task.id}
                    className={`
                      text-xs p-1 rounded truncate
                      ${
                        task.completed
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }
                    `}
                  >
                    {task.title}
                  </div>
                ))}
                {dayExpenses.slice(0, 2).map((expense) => (
                  <div
                    key={expense.id}
                    className="text-xs p-1 rounded truncate bg-green-50 text-green-700 flex items-center gap-1"
                  >
                    <DollarSign className="h-3 w-3" />
                    {expense.title} ({expense.amount.toFixed(2)})
                  </div>
                ))}
                {(dayTasks.length > 2 || dayExpenses.length > 2) && (
                  <div className="text-xs text-gray-500 text-center">
                    +{dayTasks.length + dayExpenses.length - 2} autres
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
