import React from 'react';
import { useDispatch } from 'react-redux';
import propTypes from 'prop-types';
import { actionDeleteExpense } from '../actions';

function TableRow({ expense, handleEditClick }) {
  const dispatch = useDispatch();
  return (
    <tr key={ expense.id }>
      <td>{expense.description}</td>
      <td>{expense.tag}</td>
      <td>{expense.method}</td>
      <td>{Number(expense.value).toFixed(2)}</td>
      <td>
        {(expense.exchangeRates[expense.currency].name
          .split('/Real Brasileiro'))}
      </td>
      <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
      <td>
        {Number(expense.value * expense.exchangeRates[expense.currency].ask)
          .toFixed(2)}
      </td>
      <td>Real</td>
      <td>
        <button
          className="btn-edit"
          type="button"
          data-testid="edit-btn"
          // name=" Editar despesa"
          onClick={ (event) => handleEditClick(event, expense) }
        >
          Editar despesa
        </button>
        <button
          className="delete-btn"
          type="button"
          data-testid="delete-btn"
          onClick={ () => dispatch(actionDeleteExpense(expense.id)) }
        >
          .
        </button>
      </td>
    </tr>
  );
}

TableRow.propTypes = {
  expense: propTypes.shape({
    id: propTypes.number.isRequired,
    description: propTypes.string.isRequired,
    tag: propTypes.string.isRequired,
    method: propTypes.string.isRequired,
    value: propTypes.string.isRequired,
    currency: propTypes.string.isRequired,
    exchangeRates: propTypes.shape({
      name: propTypes.string.isRequired,
      ask: propTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  handleEditClick: propTypes.func.isRequired,
};

export default TableRow;
