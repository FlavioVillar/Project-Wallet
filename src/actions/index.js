// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const REQUEST_API = 'REQUEST_API';
export const ADD_CURRENCY_SUCCESS = 'ADD_CURRENCY_SUCCESS';

export const loginAction = (value) => ({
  type: LOGIN,
  value,
});

export const requestAPI = () => ({ type: REQUEST_API });

export const addCurrency = (value) => ({
  type: ADD_CURRENCY_SUCCESS,
  value,
});

// export const addExpense = (value) => ({
//   type: 'ADD_EXPENSE',
//   value,
// });

export function fetchAPI() {
  return async (dispatch) => {
    try {
      dispatch(requestAPI());
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      dispatch(addCurrency(data));
    } catch (error) {
      console.error(error);
    }
  };
}
