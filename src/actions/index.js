import fetchAPI from '../services/economiaAPI';

export const LOGIN = 'LOGIN';
export const ADD_CURRENCY_SUCCESS = 'ADD_CURRENCY_SUCCESS';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const loginAction = (value) => ({
  type: LOGIN,
  value,
});

export const ActionAddCurrency = (value) => ({
  type: ADD_CURRENCY_SUCCESS,
  value,
});

// value recebe valores dos inputs e data recebe valores da API e coloca em ExchangeRates
export const addExpense = (value, data) => ({
  type: ADD_EXPENSE,
  value: { ...value, exchangeRates: { ...data } },
});

export const actionDeleteExpense = (value) => ({
  type: DELETE_EXPENSE,
  value,
});

export const getFetchCurrency = () => async (dispatch) => {
  dispatch(ActionAddCurrency(await fetchAPI()));
};

//  função que retorna um objeto com os dados da despesa com os valores dos inputs (vindo do FromToAddExpenses) e da API
export const getFetchExpenses = (value) => async (dispatch) => {
  const response = await fetchAPI();
  dispatch(addExpense(value, response));
};
