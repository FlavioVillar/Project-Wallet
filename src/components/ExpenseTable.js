import React, { Component } from 'react';
import { connect } from 'react-redux';

class ExpenseTable extends Component {
  render() {
    const { expenses } = this.props;
    // console.log(expenses.map((item) => item.value));
    // console.log(expenses.map((item) => item.exchangeRates[item.currency].ask));
    // console.log(expenses.map((item) => item.value * item.exchangeRates[item.currency].ask));
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
                <button type="button">Editar</button>
                <button type="button">Excluir</button>
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

export default connect(mapStateToProps)(ExpenseTable);
