import React from 'react';
import Header from '../components/Header';
import FormToAddExpenses from '../components/FormToAddExpenses';
import ExpenseTable from '../components/ExpenseTable';
import './Wallet.css';

function Wallet() {
  return (
    <div className="container-geral-wallet">
      <Header />
      <FormToAddExpenses />
      <ExpenseTable />
    </div>);
}

export default Wallet;
