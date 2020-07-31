import React, { useContext } from 'react'
import { GlobalContext } from './../contexts/GlobalState';
import IncomeTransactions from './IncomeTransactions';

const IncomeList = () => {
  const { incomeTransactions } = useContext(GlobalContext);

  return (
    <div className="transactions transactions-income">
      <h2>Transaction History</h2>
      <ul className="transaction-list">
        {incomeTransactions.map(income => {
          return (
            <IncomeTransactions income={income} key={income.id}/>
          )
        })}
      </ul>
    </div>
  )
}

export default IncomeList
