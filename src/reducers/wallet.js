// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ADD_CURRENCY_SUCCESS } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  // expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_CURRENCY_SUCCESS:
    return {
      ...state,
      currencies: Object.entries(action.value)
        .map((item) => item[0])
        .filter((item) => item !== 'USDT'),
    };
    // Object.entries(data).map((item) => item[0]).filter((item) => item !== 'USDT')
  // case 'ADD_EXPENSE':
  //   return {
  //     ...state,
  //     expenses: [
  //       ...state.expenses,
  //       action.value,
  //     ],
  //   };
  default:
    return state;
  }
}

export default wallet;
