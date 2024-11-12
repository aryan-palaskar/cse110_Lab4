import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { fetchBudget, updateBudget } from "../../utils/budget-utils";

const Budget = () => {
  const { budget, setBudget } = useContext(AppContext); // Access context for budget
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(budget);

  // Load budget from backend on mount
  useEffect(() => {
    const loadBudget = async () => {
      try {
        const fetchedBudget = await fetchBudget();
        setBudget(fetchedBudget);  // Update context with fetched budget
      } catch (error) {
        console.error("Failed to fetch budget:", error);
      }
    };
    loadBudget();
  }, [setBudget]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const updatedBudget = await updateBudget(newBudget);
      setBudget(updatedBudget);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update budget:", error);
    }
  };

  const handleCancelClick = () => {
    setNewBudget(budget); // Revert to the original budget
    setIsEditing(false);
  };

  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      {isEditing ? (
        <>
          <input
            type="number"
            className="form-control"
            value={newBudget}
            onChange={(e) => setNewBudget(Number(e.target.value))}
            style={{ maxWidth: "100px" }}
          />
          <button className="btn btn-primary ml-2" onClick={handleSaveClick}>
            Save
          </button>
          <button className="btn btn-secondary ml-2" onClick={handleCancelClick}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <div>Budget: ${budget}</div>
          <button className="btn btn-primary" onClick={handleEditClick}>
            Edit
          </button>
        </>
      )}
    </div>
  );
};

export default Budget;
