import { SET_ALERT, REMOVE_ALERT } from '../types';

export default (state, action) => {
  switch (action.typ) {
    case SET_ALERT:
      return [...state, action.payload];

    case SET_ALERT:
      return state.filter(alert => alert.id !== action.payload);

    default:
      return state;
  }
};
