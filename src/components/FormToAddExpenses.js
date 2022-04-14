import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFetchCurrency, getFetchExpenses } from '../actions/index';

// refatorado para o hooks

function FormToAddExpenses() {
  const initialComponentState = {
    value: '',
    description: '',
    currency: 'USD',
    method: '',
    tag: '',
  };

  const dispatch = useDispatch();

  // chama função para obter as moedas
  useEffect(() => { dispatch(getFetchCurrency()); }, [dispatch]);

  const [infoInForm, setInfoInForm] = useState(initialComponentState);

  // chama função para obter as despesas
  const { wallet: { currencies, expenses } } = useSelector((state) => state);

  const handleChange = (event) => {
    const { name, value } = event.target;
    // Pega os valores do formulário e atualiza o estado
    setInfoInForm((itemPrev) => ({ ...itemPrev, [name]: value }));
  };

  // chama função para obter as despesas, passando o valor dos inputs e cria id para cada despesa
  const handleClick = () => {
    dispatch(getFetchExpenses({ ...infoInForm, id: expenses.length }));
    setInfoInForm(initialComponentState);
  };

  return (
    <div className="container-form-add">
      <form className="form-input-header">
        <label htmlFor="value-input">
          Valor:
          <input
            className="input-value"
            id="value-input"
            type="text"
            name="value"
            value={ infoInForm.value }
            placeholder="Digite o valor..."
            data-testid="value-input"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="description-input">
          Descrição:
          <input
            className="input-description"
            id="description-input"
            type="text"
            name="description"
            value={ infoInForm.description }
            placeholder="Descreva o gasto..."
            data-testid="description-input"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="currency-select">
          Moeda:
          <select
            className="select-currency"
            id="currency-select"
            name="currency"
            data-testid="currency-input"
            value={ infoInForm.currency }
            onChange={ handleChange }
          >
            {currencies.map((itemCurrency) => (
              <option key={ itemCurrency }>{itemCurrency}</option>
            ))}
          </select>
        </label>
        <label htmlFor="method-input">
          Método de pagamento:
          <select
            className="select-method"
            id="method-input"
            name="method"
            value={ infoInForm.method }
            data-testid="method-input"
            onChange={ handleChange }
          >
            <option>Selecione</option>
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Categoria:
          <select
            className="select-tag"
            id="tag-input"
            name="tag"
            value={ infoInForm.tag }
            data-testid="tag-input"
            onChange={ handleChange }
          >
            <option>Selecione</option>
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button
          className="button-add"
          type="button"
          onClick={ handleClick }
          data-testid="edit-btn"
        >
          Adicionar despesa
        </button>
      </form>
    </div>
  );
}

export default FormToAddExpenses;
