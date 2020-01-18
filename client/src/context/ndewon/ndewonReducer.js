import {
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  ADD_BANK,
  UPDATE_BANK,
  DELETE_BANK,
  ADD_TRANSACTION,
  UPDATE_TRANSACTION,
  DELETE_TRANSACTION,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER,
  CLEAR_FILTER
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.payload]
      };

    case UPDATE_CATEGORY:
      return {
        ...state,
        categories: state.categories.map(category =>
          category.id === action.payload.id ? action.payload : category
        )
      };

    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          category => category.id !== action.payload
        )
      };

    case ADD_BANK:
      return {
        ...state,
        banks: [...state.banks, action.payload]
      };

    case UPDATE_BANK:
      return {
        ...state,
        banks: state.banks.map(bank =>
          bank.id === action.payload.id ? action.payload : bank
        )
      };

    case DELETE_BANK:
      return {
        ...state,
        banks: state.banks.filter(bank => bank.id !== action.payload)
      };

    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };

    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: [...state.transactions, action.payload]
      };

    case UPDATE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.map(transaction =>
          transaction.id === action.payload.id ? action.payload : transaction
        )
      };

    case DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(
          transaction => transaction.id !== action.payload
        )
      };

    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };

    case FILTER:
      return {
        ...state,
        filtered: state.categories.filter(category => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return category.name.match(regex);
        })
      };

    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };

    default:
      return state;
  }
};
