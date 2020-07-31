import React, { useState, useContext } from "react";
import { v4 as uuid } from "uuid";
import { GlobalContext } from "./../contexts/GlobalState";

const AddTransaction = () => {
  const { addIncome, addExpense } = useContext(GlobalContext);
  const [income, setIncome] = useState({
    incomeText: "",
    incomeAmount: 0,
  });
  const [expense, setExpense] = useState({
    expenseText: "",
    expenseAmount: 0,
  });
  const { incomeText, incomeAmount } = income;
  const { expenseText, expenseAmount } = expense;

  const onChangeIncome = (e) => {
    setIncome({
      ...income,
      [e.target.name]: e.target.value,
    });
  };
  const onChangeExpense = (e) => {
    setExpense({
      ...expense,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitIncome = (e) => {
    e.preventDefault();
    if (incomeText !== "" && incomeAmount !== 0) {
      const newIncomeTransaction = {
        id: uuid(),
        incomeText,
        incomeAmount: incomeAmount * 1,
      };
      addIncome(newIncomeTransaction);
      setIncome({
        incomeText: "",
        incomeAmount: 0,
      });
    }
  };

  const onSubmitExpense = (e) => {
    e.preventDefault();
    if (expenseText !== "" && expenseAmount !== 0) {
      const newExpenseTransaction = {
        id: uuid(),
        expenseText,
        expenseAmount: expenseAmount * 1,
      };
      addExpense(newExpenseTransaction);
      setExpense({
        expenseText: "",
        expenseAmount: 0,
      });
    }
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={onSubmitIncome}>
        <div className="input-group income">
          <input
            value={incomeText}
            type="text"
            placeholder="Add Income..."
            autoComplete="off"
            onChange={onChangeIncome}
            name="incomeText"
          />
          <input
            value={incomeAmount ? incomeAmount : ""}
            type="number"
            placeholder="Add Amount"
            autoComplete="off"
            onChange={onChangeIncome}
            name="incomeAmount"
          />
          <input type="submit" value="Submit" />
        </div>
      </form>

      <form onSubmit={onSubmitExpense}>
        <div className="input-group expense">
          <input
            value={expenseText}
            type="text"
            placeholder="Add Expense..."
            autoComplete="off"
            onChange={onChangeExpense}
            name="expenseText"
          />
          <input
            value={expenseAmount ? expenseAmount : ""}
            type="number"
            placeholder="Add Amount"
            autoComplete="off"
            onChange={onChangeExpense}
            name="expenseAmount"
          />
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default AddTransaction;
