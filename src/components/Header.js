import React from 'react';
import { useSelector } from 'react-redux';
import wallet from '../img/wallet.png';
import './Header.css';

// refatorado para o hooks
function Header() {
  const { user: { email }, wallet: { expenses } } = useSelector((state) => state);

  // chama função para obter as despesas do usuário logado e retorna o total das mesmas
  const sumTotalValue = () => {
    const sumValue = expenses.map((item) => item)
      .reduce((acc, { value, exchangeRates, currency }) => acc
      // multiplica o valor da despesa pelo valor da cotação da moeda
          + Number(value) * exchangeRates[currency].ask, 0);
    return sumValue.toFixed(2);
  };

  return (
    <header className="header">
      <div className="img-wallet">
        <img src={ wallet } alt="wallet" />
        <p className="header-email" data-testid="email-field">{email}</p>
      </div>
      <div className="container-total-value">
        <p className="text-total-value">Despesa Total: R$ </p>
        <p
          className="header-total-value"
          data-testid="total-field"
        >
          {sumTotalValue()}
        </p>
        <p className="header-BRL" data-testid="header-currency-field">BRL</p>
      </div>
    </header>
  );
}

export default Header;
