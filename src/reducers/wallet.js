// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  ADD_CURRENCY_SUCCESS,
  ADD_EXPENSE,
  DELETE_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, { type, value }) {
  switch (type) {
  case ADD_CURRENCY_SUCCESS:
    return {
      ...state,
      currencies: Object.entries(value)
        .map((item) => item[0])
        .filter((item) => item !== 'USDT'),
    };

  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, value],
    };

  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((item) => item.id !== value),
    };

  default:
    return state;
  }
}

export default wallet;
