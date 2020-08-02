import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';

const Balance = () => {
  const { transactions } = useContext(GlobalContext);
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);

  return (
    <>
      <h4 className='title'>합산 비용</h4>
      <h1 className='title'>￦{numberWithCommas(total)}</h1>
    </>
  );
};

export default Balance;
