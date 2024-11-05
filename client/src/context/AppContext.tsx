import { createContext, useState, ReactNode } from "react";
import { Expense } from "../types/types";

// Define the shape of the context data
interface AppContextType {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  budget: number;
  setBudget: React.Dispatch<React.SetStateAction<number>>;
}

// Initial state with default budget value
const initialState: AppContextType = {
  expenses: [],
  setExpenses: () => {},
  budget: 2000,
  setBudget: () => {},
};

// Create the context
export const AppContext = createContext<AppContextType>(initialState);

// Provider component to wrap the application
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [expenses, setExpenses] = useState<Expense[]>(initialState.expenses);
  const [budget, setBudget] = useState<number>(initialState.budget);

  return (
    <AppContext.Provider
      value={{
        expenses,
        setExpenses,
        budget,
        setBudget,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
