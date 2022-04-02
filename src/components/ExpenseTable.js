import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ExpenseTable extends Component {
  render() {
    const { expenses, deleteExpense } = this.props;
    return (
      <table>
        <caption>Monthly savings</caption>
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
        <tbody>
          {expenses.map((item) => (
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
              <td>{Number(item.value) * item.exchangeRates[item.currency].ask}</td>
              <td>Real</td>
              <td>
                <button type="button" data-testid="edit-btn">Editar</button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => deleteExpense(item.id) }

                >
                  Excluir

                </button>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  value: state.wallet.value,
  description: state.wallet.description,
  currency: state.wallet.currency,
  method: state.wallet.method,
  tag: state.wallet.tag,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (value) => dispatch({ type: 'DELETE_EXPENSE', value }),
});

ExpenseTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
  })).isRequired,
  deleteExpense: PropTypes.func.isRequired,

};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
