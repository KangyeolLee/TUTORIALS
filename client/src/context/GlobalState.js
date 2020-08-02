import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

// DESC: Initial State
const initialState = {
  transactions: [],
  error: null,
  loading: true,
};

// DESC: Create context
export const GlobalContext = createContext(initialState);

// DESC: Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // DESC: Actions
  const getTransactions = async () => {
    try {
      const res = await axios.get('/api/v1/transactions');
      dispatch({
        type: 'GET_TRANSACTIONS',
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: 'TRANSACTIONS_ERROR',
        payload: error.response.data.error,
      });
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`/api/v1/transactions/${id}`);
      dispatch({
        type: 'DELETE_TRANSACTION',
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: 'TRANSACTIONS_ERROR',
        payload: error.response.data.error,
      });
    }
  };

  const updateTranaction = async (id, updatedTransaction) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(
        `/api/v1/transactions/${id}`,
        updatedTransaction,
        config
      );
      dispatch({
        type: 'UPDATE_TRANSACTION',
        payload: {
          id,
          updatedTransaction,
        },
      });
    } catch (error) {
      dispatch({
        type: 'TRANSACTIONS_ERROR',
        payload: error.response.data.error,
      });
    }
  };

  const addTransaction = async (transaction) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/v1/transactions', transaction, config);
      dispatch({
        type: 'ADD_TRANSACTION',
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: 'TRANSACTIONS_ERROR',
        payload: error.response.data.error,
      });
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        deleteTransaction,
        addTransaction,
        getTransactions,
        updateTranaction,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};
