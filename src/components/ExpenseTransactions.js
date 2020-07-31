import React, {useContext } from 'react'
import { GlobalContext } from './../contexts/GlobalState';

const ExpenseTransactions = ({expense}) => {
  const { deleteTransaction } = useContext(GlobalContext);
  return (
    <li className="transaction">
      <span className="transaction-text">{expense.expenseText}</span>
      <span className="transaction-amount">${expense.expenseAmount}</span>
      <button className="delete-btn" onClick={() => deleteTransaction(expense.id)}><i className="fas fa-trash"></i></button>
    </li>
  )
}

export default ExpenseTransactions
