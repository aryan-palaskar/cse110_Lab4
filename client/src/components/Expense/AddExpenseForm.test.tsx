import { render, screen, fireEvent } from '@testing-library/react';
import { AppProvider } from '../../context/AppContext';
import AddExpenseForm from '../Expense/AddExpenseForm';
import Remaining from '../Remaining';
import Budget from '../Budget/Budget';

test('should add a new expense and update Remaining and Spent values', () => {
  render(
    <AppProvider>
      <Budget />
      <Remaining />
      <AddExpenseForm />
    </AppProvider>
  );

  const initialBudget = 2000; // Updated to match the initial budget in AppContext
  
  // Verify the initial remaining balance is equal to the budget
  expect(screen.getByText(`Remaining: $${initialBudget}`)).toBeInTheDocument();

  // Simulate adding an expense of $100
  fireEvent.change(screen.getByPlaceholderText('name of expense'), { target: { value: 'Groceries' } });
  fireEvent.change(screen.getByPlaceholderText('cost of expense'), { target: { value: '100' } });
  fireEvent.click(screen.getByText('Save'));

  // Calculate expected remaining budget after expense
  const expectedRemaining = initialBudget - 100;

  // Check updated Remaining balance
  expect(screen.getByText(`Remaining: $${expectedRemaining}`)).toBeInTheDocument();
});
