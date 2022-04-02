import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
    sumTotalValue = () => {
      const { expenses } = this.props;
      const sumValue = expenses.map((item) => item)
        .reduce((acc, { value, exchangeRates, currency }) => acc
          + Number(value) * exchangeRates[currency].ask, 0);
      return sumValue.toFixed(2);
    }

    render() {
      const { userEmail } = this.props;
      return (
        <header>
          <p data-testid="email-field">{userEmail}</p>
          <p data-testid="total-field">{this.sumTotalValue()}</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
      );
    }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  totalExpenses: state.wallet.total,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
  })).isRequired,
};

export default connect(mapStateToProps)(Header);
