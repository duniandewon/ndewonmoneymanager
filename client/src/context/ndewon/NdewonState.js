import React, { useReducer } from 'react';
import axios from 'axios';

import NdewonContext from './ndewonContext';
import ndewonReducer from './ndewonReducer';

import {
  GET_CATEGORY,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  GET_BANK,
  ADD_BANK,
  UPDATE_BANK,
  DELETE_BANK,
  GET_TRANSACTION,
  ADD_TRANSACTION,
  UPDATE_TRANSACTION,
  DELETE_TRANSACTION,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER,
  CLEAR_FILTER,
  CLEAR_STATE,
  ERRORS
} from '../types';

const NdewonState = props => {
  const initialState = {
    categories: null,
    banks: null,
    transactions: null,
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
  const updateCategory = async category => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(
        `/api/categories/${category._id}`,
        category,
        config
      );

      dispatch({
        type: UPDATE_CATEGORY,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ERRORS,
        payload: err.response.data.errors
      });
    }
  };

  /** Delete category */
  const deleteCategory = async id => {
    try {
      await axios.delete(`/api/categories/${id}`);
      dispatch({
        type: DELETE_CATEGORY,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: ERRORS,
        payload: err.response.data.errors
      });
    }
  };

  /** Get banks */
  const getBanks = async () => {
    try {
      const res = await axios.get('/api/banks');

      dispatch({
        type: GET_BANK,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ERRORS,
        payload: err.response.data.errors
      });
    }
  };

  /** Add Banks */
  const addBank = async bank => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/banks', bank, config);

      dispatch({
        type: ADD_BANK,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ERRORS,
        payload: err.response.data.errors
      });
    }
  };

  /** Udate bank */
  const updateBank = async bank => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(`/api/banks/${bank._id}`, bank, config);

      dispatch({
        type: UPDATE_BANK,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ERRORS,
        payload: err.response.data.errors
      });
    }
  };

  /** Delete bank */
  const deleteBank = async id => {
    try {
      await axios.delete(`/api/banks/${id}`);
      dispatch({
        type: DELETE_BANK,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: ERRORS,
        payload: err.response.data.errors
      });
    }
  };

  /** Get transactions */
  const getTransactions = async () => {
    try {
      const res = await axios.get('/api/transactions');

      dispatch({
        type: GET_TRANSACTION,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ERRORS,
        payload: err.response.data.errors
      });
    }
  };

  /** Add transaction */
  const addTransaction = async transaction => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/transactions', transaction, config);

      dispatch({
        type: ADD_TRANSACTION,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ERRORS,
        payload: err.response.data.msg
      });
    }
  };

  /** Update Transactions */
  const updateTransaction = async transaction => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(
        `/api/transactions/${transaction._id}`,
        transaction,
        config
      );

      dispatch({
        type: UPDATE_TRANSACTION,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ERRORS,
        payload: err.response.data.msg
      });
    }
  };

  /** Delete Transaction */
  const deleteTransaction = async id => {
    try {
      await axios.delete(`/api/transactions/${id}`);
      dispatch({
        type: DELETE_TRANSACTION,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: ERRORS,
        payload: err.response.data.msg
      });
    }
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

  /** Clear categories */
  const clearState = () => {
    dispatch({
      type: CLEAR_STATE
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
        getBanks,
        addBank,
        updateBank,
        deleteBank,
        getTransactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        setCurrent,
        clearCurrent,
        filter,
        clearFilter,
        clearState
      }}
    >
      {props.children}
    </NdewonContext.Provider>
  );
};

export default NdewonState;
