import React, { Component } from 'react';

class ExpenseTable extends Component {
  render() {
    return (
      <table>
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
        {/* <tbody>
          <tr>
            <td>{this.props.value}</td>
            <td>{this.props.description}</td>
            <td>{this.props.currency}</td>
            <td>{this.props.method}</td>
            <td>{this.props.tag}</td>
          </tr>
        </tbody> */}
      </table>

    );
  }
}

export default ExpenseTable;
