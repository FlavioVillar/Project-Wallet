import React from 'react';
import { useSelector } from 'react-redux';
import propTypes from 'prop-types';

//  visto em https://www.youtube.com/watch?v=dYjdzpZv5yc

function EditableRow({ editFormData, handleEditChange, handleSaveEdit }) {
  const { wallet: { currencies } } = useSelector((state) => state);
  return (
    <tr>

      <td>
        <input
          className="input-description"
          id="description-input"
          type="text"
          name="description"
          placeholder={ editFormData.description }
          onChange={ handleEditChange }
          value={ editFormData.description }
          data-testid="description-input"
        />
      </td>
      <td>
        <select
          className="select-tag"
          id="tag-input"
          name="tag"
          onChange={ handleEditChange }
          value={ editFormData.tag }
          data-testid="tag-input"
        >
          <option>Selecione</option>
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </td>
      <td>
        <select
          className="select-method"
          id="method-input"
          name="method"
          onChange={ handleEditChange }
          value={ editFormData.method }
          data-testid="method-input"
        >
          <option>Selecione</option>
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
      </td>
      <td>
        <input
          className="input-value"
          id="value-input"
          type="text"
          name="value"
          placeholder={ editFormData.value }
          onChange={ handleEditChange }
          value={ editFormData.value }
          data-testid="value-input"
        />
      </td>
      <td>
        <select
          className="select-currency"
          id="currency-select"
          name="currency"
          onChange={ handleEditChange }
          value={ editFormData.currency }
          data-testid="currency-input"
        >
          {currencies.map((itemCurrency) => (
            <option key={ itemCurrency }>{itemCurrency}</option>
          ))}
        </select>
      </td>
      <td />
      <td />
      <td />
      <td>
        <button
          className="button-save"
          type="button"
          onClick={ handleSaveEdit }
          data-testid="edit-btn"

        >
          Salvar
        </button>
      </td>
    </tr>
  );
}

EditableRow.propTypes = {
  editFormData: propTypes.shape({
    description: propTypes.string,
    tag: propTypes.string,
    method: propTypes.string,
    value: propTypes.string,
    currency: propTypes.string,
  }).isRequired,
  handleEditChange: propTypes.func.isRequired,
  handleSaveEdit: propTypes.func.isRequired,
};

export default EditableRow;
