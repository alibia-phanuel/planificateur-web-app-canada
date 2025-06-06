"use client";

import React, { useState } from "react";
import { Task } from "@/type/agenda";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface TaskFormProps {
  onSubmit: (task: Omit<Task, "id">) => Promise<void>;
  initialData?: Partial<Task>;
  onCancel?: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  initialData,
  onCancel,
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Omit<Task, "id">>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    date: initialData?.date || new Date(),
    completed: initialData?.completed || false,
    createdAt: initialData?.createdAt || new Date(),
    updatedAt: initialData?.updatedAt || new Date(),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await onSubmit(formData);
      toast({
        title: "Succès",
        description: "Tâche enregistrée avec succès",
      });
      if (!initialData) {
        setFormData({
          title: "",
          description: "",
          date: new Date(),
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    } catch (error: unknown) {
      console.error(error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title" className="my-4">
          Titre
        </Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          required
          placeholder="Titre de la tâche"
        />
      </div>

      <div>
        <Label htmlFor="description" className="my-4">
          Description
        </Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          placeholder="Description de la tâche"
        />
      </div>

      <div>
        <Label htmlFor="date" className="my-4">
          Date
        </Label>
        <Input
          id="date"
          type="datetime-local"
          value={new Date(formData.date).toISOString().slice(0, 16)}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, date: new Date(e.target.value) }))
          }
          required
        />
      </div>

      <div className="flex justify-end space-x-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Annuler
          </Button>
        )}
        <Button type="submit" disabled={loading}>
          {loading ? "Enregistrement..." : initialData ? "Modifier" : "Ajouter"}
        </Button>
      </div>
    </form>
  );
};
