import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    // Dica dada em ajuda, colocar 0 quando chama a props para parar de dar erro no teste
    const { userEmail, totalExpenses = 0 } = this.props;
    return (
      <header>
        <p data-testid="email-field">{userEmail}</p>
        <p data-testid="total-field">{totalExpenses}</p>
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
  totalExpenses: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
