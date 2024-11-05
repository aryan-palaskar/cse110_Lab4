import { Request, Response } from "express";
import { Expense } from "../types/types";

// Function to delete an expense by ID
export function deleteExpense(req: Request, res: Response, expenses: Expense[]) {
  const { id } = req.params;

  // Find the expense index to delete
  const expenseIndex = expenses.findIndex((expense) => expense.id === id);
  
  if (expenseIndex === -1) {
    return res.status(404).json({ error: "Expense not found" });
  }

  // Remove the expense from the array
  expenses.splice(expenseIndex, 1);
  
  res.status(200).json({ message: "Expense deleted successfully" });
}
