import {
  REGISTER_SUCCES,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERRORS,
  LOGOUT
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCES:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      };

    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload
      };

    default:
      return state;
  }
};
