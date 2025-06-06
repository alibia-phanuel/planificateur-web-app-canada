import axios from 'axios';
import { Task } from '@/type/agenda';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const agendaService = {
  // Récupérer toutes les tâches
  getAllTasks: async (): Promise<Task[]> => {
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des tâches:', error);
      throw error;
    }
  },

  // Créer une nouvelle tâche
  createTask: async (task: Omit<Task, 'id'>): Promise<Task> => {
    try {
      const response = await axios.post(`${API_URL}/tasks`, task);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de la tâche:', error);
      throw error;
    }
  },

  // Mettre à jour une tâche
  updateTask: async (id: string, task: Partial<Task>): Promise<Task> => {
    try {
      const response = await axios.put(`${API_URL}/tasks/${id}`, task);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la tâche:', error);
      throw error;
    }
  },

  // Supprimer une tâche
  deleteTask: async (id: string): Promise<void> => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`);
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche:', error);
      throw error;
    }
  }
}; 