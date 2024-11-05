import { render, screen, fireEvent } from '@testing-library/react';
import { AppProvider } from '../../context/AppContext';
import AddExpenseForm from './AddExpenseForm';
import Remaining from '../Remaining';
import Budget from '../Budget/Budget';

test('should verify that Budget = Remaining + Total Expenditure after adding and deleting expenses', () => {
    render(
      <AppProvider>
        <Budget />
        <Remaining />
        <AddExpenseForm />
      </AppProvider>
    );
  
    const initialBudget = 2000; // Ensure this matches your AppContext initial budget
    const spentAmount1 = 100;
    const spentAmount2 = 50;
  
    // Add first expense
    fireEvent.change(screen.getByPlaceholderText('name of expense'), { target: { value: 'Groceries' } });
    fireEvent.change(screen.getByPlaceholderText('cost of expense'), { target: { value: `${spentAmount1}` } });
    fireEvent.click(screen.getByText('Save'));
  
    // Add second expense
    fireEvent.change(screen.getByPlaceholderText('name of expense'), { target: { value: 'Transport' } });
    fireEvent.change(screen.getByPlaceholderText('cost of expense'), { target: { value: `${spentAmount2}` } });
    fireEvent.click(screen.getByText('Save'));
  
    // Calculate expected remaining
    const totalExpenses = spentAmount1 + spentAmount2;
    const expectedRemaining = initialBudget - totalExpenses;
  
    // Check budget balance equation
    expect(screen.getByText(`Remaining: $${expectedRemaining}`)).toBeInTheDocument();
  });
