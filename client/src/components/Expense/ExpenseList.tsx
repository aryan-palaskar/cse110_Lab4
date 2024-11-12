import React, { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { fetchExpenses } from "../../utils/expense-utils";
import ExpenseItem from "./ExpenseItem";

const ExpenseList = () => {
  const { expenses, setExpenses } = useContext(AppContext);

  // Fetch expenses on component mount
  useEffect(() => {
    loadExpenses();
  }, []);

  // Function to load expenses and handle errors
  const loadExpenses = async () => {
    try {
      const expenseList = await fetchExpenses();
      setExpenses(expenseList);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <ul className="list-group">
      {expenses.map((expense) => (
        <ExpenseItem key={expense.id} {...expense} />
      ))}
    </ul>
  );
};

export default ExpenseList;
