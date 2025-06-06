// types/agenda.ts

export type ViewMode = "week" | "month";

export type NavigateDirection = "prev" | "next";

export interface HeaderProps {
  currentDate: string; // exemple : "Juin 2025" ou "Semaine 23"
  onNavigate: (direction: NavigateDirection) => void;
  viewMode: ViewMode;
  onSwitchView: (view: ViewMode) => void;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  date: Date;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Expense {
  id: string;
  title: string;
  amount: number;
  date: Date;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}
