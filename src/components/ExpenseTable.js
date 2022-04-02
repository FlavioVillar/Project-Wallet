import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actionDeleteExpense } from '../actions';

// refatorado usando hooks

function ExpenseTable() {
  const { wallet: { expenses } } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <table className="customers">
      <caption>Monthly expenses</caption>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>

      {
        !expenses ? ''
          : (
            <tbody>
              {
                expenses.map((item) => (
                  <tr key={ item.id }>
                    <td>{item.description}</td>
                    <td>{item.tag}</td>
                    <td>{item.method}</td>
                    <td>{Number(item.value).toFixed(2)}</td>
                    <td>
                      {(item.exchangeRates[item.currency].name
                        .split('/Real Brasileiro'))}
                    </td>
                    <td>{Number(item.exchangeRates[item.currency].ask).toFixed(2)}</td>
                    <td>
                      {Number(item.value * item.exchangeRates[item.currency].ask)
                        .toFixed(2)}
                    </td>
                    <td>Real</td>
                    <td>
                      <button
                        type="button"
                        data-testid="edit-btn"
                        name="edit"
                        // onClick={ () => dispatch(actionEditExpense(item.id)) }
                      >
                        Editar despesa
                      </button>
                      <button
                        type="button"
                        data-testid="delete-btn"
                        onClick={ () => dispatch(actionDeleteExpense(item.id)) }
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>))
              }
            </tbody>
          )
      }
    </table>
  );
}

export default ExpenseTable;
