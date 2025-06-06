"use client";

import { useState, useEffect } from "react";
import { Task } from "@/type/agenda";
import { agendaService } from "@/services/agendaService";

export const useAgenda = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Charger les tâches
  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await agendaService.getAllTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError("Erreur lors du chargement des tâches");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Ajouter une tâche
  const addTask = async (task: Omit<Task, "id">) => {
    try {
      setLoading(true);
      const newTask = await agendaService.createTask(task);
      setTasks((prev) => [...prev, newTask]);
      setError(null);
    } catch (err) {
      setError("Erreur lors de l'ajout de la tâche");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Mettre à jour une tâche
  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      setLoading(true);
      const updatedTask = await agendaService.updateTask(id, updates);
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updatedTask : task))
      );
      setError(null);
    } catch (err) {
      setError("Erreur lors de la mise à jour de la tâche");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Supprimer une tâche
  const deleteTask = async (id: string) => {
    try {
      setLoading(true);
      await agendaService.deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
      setError(null);
    } catch (err) {
      setError("Erreur lors de la suppression de la tâche");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Charger les tâches au montage du composant
  useEffect(() => {
    loadTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
    refreshTasks: loadTasks,
  };
};
