import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI } from '../actions/index';

class FormToAddExpenses extends Component {
  componentDidMount() {
    const { getExchangeRate } = this.props;
    getExchangeRate();
  }

  render() {
    const { currencies } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="value-input">
            Valor:
            <input
              type="text"
              name="value-input"
              placeholder="Valor"
              data-testid="value-input"
            />
          </label>
          <label htmlFor="description-input">
            Descrição:
            <input
              type="text"
              name="description-input"
              placeholder="Valor"
              data-testid="description-input"
            />
          </label>
          <label htmlFor="currency-select">
            Moeda:
            <select name="currency" id="currency-select">
              {currencies.map((currency) => (
                <option key={ currency }>{currency}</option>
              ))}
            </select>
          </label>
          <label htmlFor="method-input">
            Método de pagamento:
            <select
              data-testid="method-input"
              name="method-input"
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            Categoria:
            <select
              data-testid="tag-input"
              name="tag-input"
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getExchangeRate: (currencies) => dispatch(fetchAPI(currencies)),
});

FormToAddExpenses.propTypes = {
  getExchangeRate: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormToAddExpenses);
