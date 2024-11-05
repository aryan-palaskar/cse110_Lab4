import { Response } from "express";

// Function to update the budget
export function updateBudget(res: Response, body: any, budget: { amount: number }) {
  const { amount } = body;
  
  if (typeof amount !== "number" || amount < 0) {
    return res.status(400).json({ error: "Invalid budget amount" });
  }

  // Update the budget value
  budget.amount = amount;
  
  res.status(200).json({ message: "Budget updated successfully", amount });
}
