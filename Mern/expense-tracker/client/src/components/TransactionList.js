import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import Transaction from './Transaction';
import Spinner from './Spinner';

const TransactionList = () => {
  const { loading, transactions, getTransactions } = useContext(GlobalContext);

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h3>내역</h3>
      {loading ? (
        <Spinner />
      ) : (
        <ul className='list'>
          {transactions.length ? (
            transactions.map((transaction) => (
              <Transaction key={transaction._id} transaction={transaction} />
            ))
          ) : (
            <div className='no-tranactions-wrapper'>
              <p className='no-transactions'>내역이 없습니다.</p>
            </div>
          )}
        </ul>
      )}
    </>
  );
};

export default TransactionList;
