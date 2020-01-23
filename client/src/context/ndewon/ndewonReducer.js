import {
  GET_CATEGORY,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  GET_BANK,
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
  CLEAR_STATE,
  ERRORS
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_CATEGORY:
      return {
        ...state,
        categories: action.payload,
        loading: false
      };

    case ADD_CATEGORY:
      return {
        ...state,
        categories: [action.payload, ...state.categories],
        loading: false
      };

    case UPDATE_CATEGORY:
      return {
        ...state,
        categories: state.categories.map(category =>
          category._id === action.payload._id ? action.payload : category
        ),
        loading: false
      };

    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          category => category._id !== action.payload
        ),
        loading: false
      };

    case GET_BANK:
      return {
        ...state,
        banks: action.payload,
        loading: false
      };

    case ADD_BANK:
      return {
        ...state,
        banks: [action.payload, ...state.banks],
        loading: false
      };

    case UPDATE_BANK:
      return {
        ...state,
        banks: state.banks.map(bank =>
          bank._id === action.payload._id ? action.payload : bank
        ),
        loading: false
      };

    case DELETE_BANK:
      return {
        ...state,
        banks: state.banks.filter(bank => bank._id !== action.payload),
        loading: false
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

    case ERRORS:
      return {
        ...state,
        errors: action.payload
      };

    case CLEAR_STATE:
      return {
        ...state,
        categories: null,
        banks: null,
        // transactions: null,
        filtered: null,
        errors: null,
        current: null
      };

    default:
      return state;
  }
};
