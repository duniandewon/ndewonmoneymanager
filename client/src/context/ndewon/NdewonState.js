import React, { useReducer } from 'react';
import axios from 'axios';
import uuid from 'uuid';

import NdewonContext from './ndewonContext';
import ndewonReducer from './ndewonReducer';

import {
  GET_CATEGORY,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  CLEAR_CATEGORY,
  ADD_BANK,
  UPDATE_BANK,
  DELETE_BANK,
  ADD_TRANSACTION,
  UPDATE_TRANSACTION,
  DELETE_TRANSACTION,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER,
  CLEAR_FILTER,
  ERRORS
} from '../types';

const NdewonState = props => {
  const initialState = {
    categories: [],
    banks: [
      {
        id: 1,
        name: 'BCA',
        accountNumber: '1234567890',
        accountHolder: 'John Doe',
        balance: 1000
      },
      {
        id: 2,
        name: 'BRI',
        accountNumber: '0987654321',
        accountHolder: 'John Doe',
        balance: 0
      }
    ],
    transactions: [
      {
        id: 1,
        date: '2020-1-12',
        type: 'income',
        trnCategory: 'salary',
        trnBank: 'BCA',
        description: 'SMP Insan Semesta',
        amount: 1000
      }
    ],
    current: null,
    filtered: null,
    errors: null
  };

  const [state, dispatch] = useReducer(ndewonReducer, initialState);

  /** Get Categories */
  const getCategories = async () => {
    try {
      const res = await axios.get('/api/categories');

      dispatch({
        type: GET_CATEGORY,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ERRORS,
        payload: err.response.data.errors
      });
    }
  };

  /** Add category */
  const addCategory = async category => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/categories', category, config);

      dispatch({
        type: ADD_CATEGORY,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ERRORS,
        payload: err.response.data.errors
      });
    }
  };

  /** Udate category */
  const updateCategory = category => {
    dispatch({
      type: UPDATE_CATEGORY,
      payload: category
    });
  };

  /** Delete category */
  const deleteCategory = id => {
    dispatch({
      type: DELETE_CATEGORY,
      payload: id
    });
  };

  /** Add Banks */
  const addBank = bank => {
    bank.id = uuid.v4();

    dispatch({
      type: ADD_BANK,
      payload: bank
    });
  };

  /** Udate bank */
  const updateBank = bank => {
    dispatch({
      type: UPDATE_BANK,
      payload: bank
    });
  };

  /** Delete bank */
  const deleteBank = id => {
    dispatch({
      type: DELETE_BANK,
      payload: id
    });
  };

  /** Add transaction */
  const addTransaction = transaction => {
    transaction.id = uuid.v4();

    dispatch({
      type: ADD_TRANSACTION,
      payload: transaction
    });
  };

  /** Update Transactions */
  const updateTransaction = transaction => {
    dispatch({
      type: UPDATE_TRANSACTION,
      payload: transaction
    });
  };

  /** Delete Transaction */
  const deleteTransaction = id => {
    dispatch({
      type: DELETE_TRANSACTION,
      payload: id
    });
  };

  /** Set current */
  const setCurrent = current => {
    dispatch({
      type: SET_CURRENT,
      payload: current
    });
  };

  /** Clear current */
  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT
    });
  };

  /** Filter */
  const filter = text => {
    dispatch({
      type: FILTER,
      payload: text
    });
  };

  /** Clear filter */
  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER
    });
  };

  return (
    <NdewonContext.Provider
      value={{
        categories: state.categories,
        banks: state.banks,
        transactions: state.transactions,
        current: state.current,
        filtered: state.filtered,
        errors: state.errors,
        getCategories,
        addCategory,
        updateCategory,
        deleteCategory,
        addBank,
        updateBank,
        deleteBank,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        setCurrent,
        clearCurrent,
        filter,
        clearFilter
      }}
    >
      {props.children}
    </NdewonContext.Provider>
  );
};

export default NdewonState;
