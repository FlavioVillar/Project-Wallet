import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI } from '../actions/index';

class Header extends Component {
  componentDidMount() {
    const { getExchangeRate } = this.props;
    getExchangeRate();
  }

  render() {
    const { userEmail, currencies } = this.props;
    return (
      <header>
        <p data-testid="email-field">{userEmail}</p>
        <p data-testid="total-field">0</p>
        <p data-testid="header-currency-field">BRL</p>
        <select>
          {currencies.map((currency) => (
            <option key={ currency }>{currency}</option>
          ))}
        </select>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getExchangeRate: (currencies) => dispatch(fetchAPI(currencies)),
});

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  getExchangeRate: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
