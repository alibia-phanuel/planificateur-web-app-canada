import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export const taskService = {
  // Récupérer toutes les tâches
  getTasks: async () => {
    const response = await api.get("/tasks");
    return response.data;
  },

  // Récupérer les tâches pour une date spécifique
  getTasksByDate: async (date: Date) => {
    const response = await api.get(`/tasks/date/${date.toISOString()}`);
    return response.data;
  },

  // Créer une nouvelle tâche
  createTask: async (task: {
    title: string;
    description: string;
    tags: string[];
    date: Date;
    time: Date;
    completed: boolean;
  }) => {
    const response = await api.post("/tasks", {
      ...task,
      date: task.date.toISOString(),
      time: task.time.toISOString(),
    });
    return response.data;
  },

  // Mettre à jour une tâche
  updateTask: async (
    taskId: string,
    task: {
      title?: string;
      description?: string;
      tags?: string[];
      date?: Date;
      time?: Date;
      completed?: boolean;
    }
  ) => {
    const response = await api.put(`/tasks/${taskId}`, {
      ...task,
      date: task.date?.toISOString(),
      time: task.time?.toISOString(),
    });
    return response.data;
  },

  // Supprimer une tâche
  deleteTask: async (taskId: string) => {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
  },

  // Marquer une tâche comme complétée
  toggleTaskCompletion: async (taskId: string, completed: boolean) => {
    const response = await api.patch(`/tasks/${taskId}/complete`, {
      completed,
    });
    return response.data;
  },
};

export default api;
