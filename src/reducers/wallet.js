// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  REQUEST_API,
  ADD_CURRENCY_SUCCESS,
  ADD_CURRENCY_FAIL,
  ADD_EXPENSE,
  GET_TOTAL_VALUE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
  error: '',
};

function wallet(state = INITIAL_STATE, { type, value }) {
  switch (type) {
  case REQUEST_API:
    return { ...state };
  case ADD_CURRENCY_SUCCESS:
    return {
      ...state,
      currencies: Object.entries(value)
        .map((item) => item[0])
        .filter((item) => item !== 'USDT'),

    };
  case ADD_CURRENCY_FAIL:
    return { ...state, error: value };

  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, value],
    };

  case GET_TOTAL_VALUE:
    return {
      ...state,
      total: value,
    };

  default:
    return state;
  }
}

export default wallet;
