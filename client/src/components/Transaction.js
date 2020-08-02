import React, { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

const Transaction = ({ transaction }) => {
  const [text, setText] = useState(transaction.text);
  const [amount, setAmount] = useState(transaction.amount);
  const [editStatus, setEditStatus] = useState(false);
  const { deleteTransaction, updateTranaction } = useContext(GlobalContext);
  const sign = transaction.amount < 0 ? '-' : '+';
  const onSubmit = (e) => {
    e.preventDefault();
    const updatedTransaction = {
      _id: transaction._id,
      text,
      amount: +amount,
    };

    updateTranaction(transaction._id, updatedTransaction);
    setEditStatus(false);
  };

  return (
    <>
      <li className={sign === '-' ? 'minus' : 'plus'}>
        {transaction.text}
        <span>￦{numberWithCommas(Math.abs(transaction.amount))}</span>
        <button
          onClick={() => deleteTransaction(transaction._id)}
          className='btn delete-btn'>
          <FaTrashAlt />
        </button>

        <button
          onClick={() => setEditStatus((prevEditStatus) => !prevEditStatus)}
          className='btn update-btn'>
          <FaEdit />
        </button>
      </li>

      {editStatus ? (
        <form className='edit-page'>
          <h3 className='edit-title'>수정</h3>
          <label htmlFor=''>항목</label>
          <input
            type='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <label htmlFor=''>비용</label>
          <input
            type='number'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button className='btn-edit' onClick={(e) => onSubmit(e)}>
            수정
          </button>
        </form>
      ) : null}
    </>
  );
};

export default Transaction;
