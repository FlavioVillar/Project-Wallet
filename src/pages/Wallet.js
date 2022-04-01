import React from 'react';
import Header from '../components/Header';
import FormToAddExpenses from '../components/FormToAddExpenses';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <FormToAddExpenses />
      </div>);
  }
}

export default Wallet;
