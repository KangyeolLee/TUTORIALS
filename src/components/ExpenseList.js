import React, { useContext } from 'react'
import { GlobalContext } from './../contexts/GlobalState';
import ExpenseTransactions from './ExpenseTransactions';

const ExpenseList = () => {
  const { expenseTransactions } = useContext(GlobalContext);

  return (
    <div className="transactions transactions-expense">
      <h2>Transaction History</h2>
      <ul className="transaction-list">
        { expenseTransactions.map(expense => {
          return (
            <ExpenseTransactions expense={expense} key={expense.id} />
          )
        })}
      </ul>
    </div>
  )
}

export default ExpenseList
