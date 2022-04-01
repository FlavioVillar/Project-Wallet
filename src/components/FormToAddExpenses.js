import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getFetchCurrency, addExpense, actionTotalValue } from '../actions/index';
import fetchAPI from '../services/economiaAPI';

class FormToAddExpenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: '',
      tag: '',
      exchangeRates: {},
    };
  }

  componentDidMount() {
    const { getCurrency } = this.props;
    getCurrency();
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  getValue = (expenses, exchangeRates) => {
    const { value, currency } = this.state;

    return (expenses.reduce(
      (acc, curr) => acc
      + (parseFloat(curr.value) * curr.exchangeRates[curr.currency].ask), 0,
    ) + (parseFloat(value) * exchangeRates[currency].ask)).toFixed(2);
  }

  getExpenses = async () => {
    const { getExpense, expenses, getTotal } = this.props;
    this.setState({ id: expenses.length, exchangeRates: await fetchAPI() }, () => {
      const { exchangeRates } = this.state;
      getExpense(this.state);
      getTotal(this.getValue(expenses, exchangeRates));
      this.setState({ value: 0, description: '', currency: 'USD', method: '', tag: '' });
    });
  }

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="value-input">
            Valor:
            <input
              id="value-input"
              type="number"
              name="value"
              value={ value }
              placeholder="Valor"
              data-testid="value-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description-input">
            Descrição:
            <input
              id="description-input"
              type="text"
              name="description"
              value={ description }
              placeholder="Valor"
              data-testid="description-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency-select">
            Moeda:
            <select
              id="currency-select"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              {currencies.map((itemCurrency) => (
                <option key={ itemCurrency }>{itemCurrency}</option>
              ))}
            </select>
          </label>
          <label htmlFor="method-input">
            Método de pagamento:
            <select
              id="method-input"
              name="method"
              value={ method }
              data-testid="method-input"
              onChange={ this.handleChange }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            Categoria:
            <select
              id="tag-input"
              name="tag"
              value={ tag }
              data-testid="tag-input"
              onChange={ this.handleChange }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ this.getExpenses }
          >
            Adicionar despesa

          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrency: () => dispatch(getFetchCurrency()),
  getExpense: (item) => dispatch(addExpense(item)),
  getTotal: (total) => dispatch(actionTotalValue(total)),
});

FormToAddExpenses.propTypes = {
  getExpense: PropTypes.func.isRequired,
  getCurrency: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
  })).isRequired,
  getTotal: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormToAddExpenses);
