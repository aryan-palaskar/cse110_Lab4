import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { deleteExpense as deleteExpenseAPI } from "../../utils/expense-utils";
import { Expense } from "../../types/types"; // Import the Expense type

// Define the props type for the component
const ExpenseItem: React.FC<Expense> = ({ id, description, cost }) => {
    const { expenses, setExpenses } = useContext(AppContext);

    const handleDeleteExpense = async () => {
        try {
            // Call the API to delete from the backend
            await deleteExpenseAPI(id);

            // Update the local context state
            const updatedExpenses = expenses.filter(expense => expense.id !== id);
            setExpenses(updatedExpenses);
        } catch (error) {
            console.error("Failed to delete expense:", error);
        }
    };

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <div>{description}</div>
            <div>${cost}</div>
            <button onClick={handleDeleteExpense}>x</button>
        </li>
    );
};

export default ExpenseItem;
