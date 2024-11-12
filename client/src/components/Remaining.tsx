import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const Remaining = () => {
  const { expenses, budget } = useContext(AppContext);

  const totalExpenses = expenses.reduce((total, item) => total + item.cost, 0);
  const remaining = budget - totalExpenses;

  const alertType = remaining < 0 ? "alert-danger" : "alert-success";

  // Show an alert when remaining balance is less than 0
  useEffect(() => {
    if (remaining < 0) {
      alert("You have exceeded your budget!");
    }
  }, [remaining]);

  return (
    <div className={`alert ${alertType}`}>
      {remaining < 0 ? (
        <span>You have exceeded your budget!</span>
      ) : (
        <span>Remaining: ${remaining}</span>
      )}
    </div>
  );
};

export default Remaining;
