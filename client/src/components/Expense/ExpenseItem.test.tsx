import { render, screen, fireEvent } from '@testing-library/react';
import { AppContext } from '../../context/AppContext';
import ExpenseItem from './ExpenseItem';

test('renders an expense item and deletes it', () => {
  const mockSetExpenses = jest.fn();

  // Update to use 'description' instead of 'name'
  render(
    <AppContext.Provider value={{ expenses: [{ id: '1', description: 'Groceries', cost: 100 }], setExpenses: mockSetExpenses, budget: 2000, setBudget: jest.fn() }}>
      <ExpenseItem id="1" description="Groceries" cost={100} />
    </AppContext.Provider>
  );

  // Check if the expense item renders correctly
  expect(screen.getByText('Groceries')).toBeInTheDocument();
  expect(screen.getByText('$100')).toBeInTheDocument();

  // Simulate delete action
  fireEvent.click(screen.getByText('x'));

  // Verify setExpenses was called with the updated list (empty array)
  expect(mockSetExpenses).toHaveBeenCalledWith([]);
});
