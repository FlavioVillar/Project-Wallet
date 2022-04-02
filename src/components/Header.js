import React from 'react';
import { useSelector } from 'react-redux';

// refatorado para o hooks
function Header() {
  const { user: { email }, wallet: { expenses } } = useSelector((state) => state);

  const sumTotalValue = () => {
    const sumValue = expenses.map((item) => item)
      .reduce((acc, { value, exchangeRates, currency }) => acc
          + Number(value) * exchangeRates[currency].ask, 0);
    return sumValue.toFixed(2);
  };

  return (
    <header>
      <p data-testid="email-field">{email}</p>
      <p data-testid="total-field">{sumTotalValue()}</p>
      <p data-testid="header-currency-field">BRL</p>
    </header>
  );
}

export default Header;
