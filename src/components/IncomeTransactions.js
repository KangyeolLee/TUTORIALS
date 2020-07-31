import React, { useContext } from 'react'
import { GlobalContext } from './../contexts/GlobalState';

const IncomeTransactions = ({income}) => {
  const { deleteTransaction } = useContext(GlobalContext);
  return (
    <li className="transaction">
      <span className="transaction-text">{income.incomeText}</span>
      <span className="transaction-amount">${income.incomeAmount}</span>
      <button className="delete-btn" onClick={() => deleteTransaction(income.id)}><i className="fas fa-trash"></i></button>
    </li>
  )
}

export default IncomeTransactions
