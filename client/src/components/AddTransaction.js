import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const AddTransaction = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);
  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = (e) => {
    e.preventDefault();

    if (text === '') {
      alert('항목을 적어주세요!');
      return;
    }
    if (amount === 0) {
      alert('0보다 크거나 작은 비용을 입력하셔야 합니다.');
      return;
    }

    const newTransaction = {
      text,
      amount: +amount,
    };

    addTransaction(newTransaction);
    setText('');
    setAmount(0);
  };

  return (
    <>
      <h3>새로 등록하기</h3>
      <form>
        <div className='form-control'>
          <label htmlFor='text'>항목</label>
          <input
            id='text'
            type='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='항목을 기입하세요...'
          />
        </div>
        <div className='form-control'>
          <label htmlFor='amount'>
            비용 <br />
            <span className='helper-text'>
              (마이너스 값 - 지출, 플러스 값 - 소득)
            </span>
          </label>
          <input
            id='amount'
            type='number'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder='비용을 기입하세요...'
          />
        </div>
        <button onClick={(e) => onSubmit(e)} className='btn-add'>
          등록
        </button>
      </form>
    </>
  );
};

export default AddTransaction;
