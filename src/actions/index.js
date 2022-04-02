import fetchAPI from '../services/economiaAPI';

export const LOGIN = 'LOGIN';
export const REQUEST_API = 'REQUEST_API';
export const ADD_CURRENCY_SUCCESS = 'ADD_CURRENCY_SUCCESS';
export const ADD_CURRENCY_FAIL = 'ADD_CURRENCY_FAIL';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const GET_TOTAL_VALUE = 'GET_TOTAL_VALUE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const loginAction = (value) => ({
  type: LOGIN,
  value,
});

export const requestAPI = () => ({ type: REQUEST_API });

export const ActionAddCurrency = (value) => ({
  type: ADD_CURRENCY_SUCCESS,
  value,
});

export const addCurrencyFail = (value) => ({
  type: ADD_CURRENCY_FAIL,
  value,
});

export const addExpense = (value) => ({
  type: ADD_EXPENSE,
  value,
});

export const actionDeleteExpense = (value) => ({
  type: DELETE_EXPENSE,
  value,
});

export const getFetchCurrency = () => async (dispatch) => {
  dispatch(requestAPI());
  try {
    dispatch(ActionAddCurrency(await fetchAPI()));
  } catch (error) {
    dispatch(addCurrencyFail(error.message));
  }
};
