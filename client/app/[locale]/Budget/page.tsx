"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Expense } from "@/type/agenda";
import { DollarSign, Plus, Minus } from "lucide-react";

const CATEGORIES = [
  "Alimentation",
  "Transport",
  "Logement",
  "Loisirs",
  "Santé",
  "Éducation",
  "Salaire",
  "Investissement",
  "Autre",
];

const DEVICES = [
  { code: "CAD", symbol: "C$", name: "Dollar canadien" },
  { code: "USD", symbol: "$", name: "Dollar américain" },
  { code: "EUR", symbol: "€", name: "Euro" },
];

const BudgetPage = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [type, setType] = useState<"expense" | "income">("expense");
  const [selectedDevice, setSelectedDevice] = useState(DEVICES[0]);

  const totalIncome = expenses
    .filter((e) => e.category === "Salaire" || e.category === "Investissement")
    .reduce((sum, e) => sum + e.amount, 0);

  const totalExpenses = expenses
    .filter((e) => e.category !== "Salaire" && e.category !== "Investissement")
    .reduce((sum, e) => sum + e.amount, 0);

  const balance = totalIncome - totalExpenses;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newExpense: Expense = {
      id: Date.now().toString(),
      title,
      amount: type === "expense" ? -Number(amount) : Number(amount),
      date: new Date(date),
      category,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setExpenses([...expenses, newExpense]);
    setTitle("");
    setAmount("");
    setCategory("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 w-full">
      <div className="w-full max-w-4xl mx-auto bg-[#f9fafb] rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Gestion du Budget
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-4 bg-green-50">
            <h3 className="text-sm font-medium text-green-700">Revenus</h3>
            <p className="text-2xl font-bold text-green-600">
              {selectedDevice.symbol}
              {totalIncome.toFixed(2)}
            </p>
          </Card>
          <Card className="p-4 bg-red-50">
            <h3 className="text-sm font-medium text-red-700">Dépenses</h3>
            <p className="text-2xl font-bold text-red-600">
              {selectedDevice.symbol}
              {Math.abs(totalExpenses).toFixed(2)}
            </p>
          </Card>
          <Card className="p-4 bg-blue-50">
            <h3 className="text-sm font-medium text-blue-700">Solde</h3>
            <p
              className={`text-2xl font-bold ${
                balance >= 0 ? "text-blue-600" : "text-red-600"
              }`}
            >
              {selectedDevice.symbol}
              {balance.toFixed(2)}
            </p>
          </Card>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Description</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Courses, Salaire..."
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Montant</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    {selectedDevice.symbol}
                  </span>
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-8"
                    placeholder="0.00"
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={type === "expense" ? "default" : "outline"}
                    onClick={() => setType("expense")}
                    className="flex-1"
                  >
                    <Minus className="w-4 h-4 mr-2" />
                    Dépense
                  </Button>
                  <Button
                    type="button"
                    variant={type === "income" ? "default" : "outline"}
                    onClick={() => setType("income")}
                    className="flex-1"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Revenu
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Catégorie</Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <Label htmlFor="device">Devise</Label>
                <Select
                  value={selectedDevice.code}
                  onValueChange={(value) =>
                    setSelectedDevice(
                      DEVICES.find((d) => d.code === value) || DEVICES[0]
                    )
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sélectionner une devise" />
                  </SelectTrigger>
                  <SelectContent>
                    {DEVICES.map((device) => (
                      <SelectItem key={device.code} value={device.code}>
                        {device.code} - {device.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="mt-6">
                <DollarSign className="w-4 h-4 mr-2" />
                Ajouter
              </Button>
            </div>
          </form>
        </Card>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">
            Historique des transactions
          </h2>
          <div className="space-y-2">
            {expenses.map((expense) => (
              <Card
                key={expense.id}
                className={`p-4 ${
                  expense.amount >= 0 ? "bg-green-50" : "bg-red-50"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{expense.title}</h3>
                    <p className="text-sm text-gray-500">
                      {expense.category} -{" "}
                      {new Date(expense.date).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                  <p
                    className={`font-bold ${
                      expense.amount >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {expense.amount >= 0 ? "+" : ""}
                    {selectedDevice.symbol}
                    {Math.abs(expense.amount).toFixed(2)}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetPage;
