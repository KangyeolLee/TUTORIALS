import React, { useContext } from 'react'
import { GlobalContext } from './../contexts/GlobalState';
import CountUpMemo from './CountUpMemo';

const Balance = () => {
  const { incomeTransactions, expenseTransactions } = useContext(GlobalContext);
  const incomeAmounts = incomeTransactions.map(income => income.incomeAmount);
  const expenseAmounts = expenseTransactions.map(expense => expense.expenseAmount);
  const totalIncome = incomeAmounts.reduce((prev, next) => (prev += next), 0);
  const totalExpense = expenseAmounts.reduce((prev, next) => (prev += next), 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="balance">
      <h2>Your Balance</h2>
      <h3><CountUpMemo end={balance} /></h3>
      <div className="income-expense">
        <div className="plus">
          <h3>Income</h3>
          <p>+ <CountUpMemo end={totalIncome} /></p>
        </div>

        <div className="minus">
          <h3>Expenses</h3>
          <p>- <CountUpMemo end={totalExpense} /></p>
        </div>
      </div>

    </div>
  )
}

export default Balance
