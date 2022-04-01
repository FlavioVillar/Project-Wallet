import React from 'react';
import Header from '../components/Header';
import FormToAddExpenses from '../components/FormToAddExpenses';
import ExpenseTable from '../components/ExpenseTable';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <FormToAddExpenses />
        <ExpenseTable />
      </div>);
  }
}

export default Wallet;
