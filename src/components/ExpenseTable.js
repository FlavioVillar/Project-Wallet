import React, { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TableRow from './TableRow';
import EditableRow from './EditableRow';
import { getFetchActionEditTable } from '../actions/index';

// refatorado usando hooks

function ExpenseTable() {
  const editComponentState = {
    id: '',
    value: '',
    description: '',
    currency: '',
    method: '',
    tag: '',
    exchangeRates: {},
  };

  const { wallet: { expenses } } = useSelector((state) => state);

  const dispatch = useDispatch();

  const [editFormData, setEditFormData] = useState(editComponentState);

  const [editExpenseTable, setEditExpenseTable] = useState(null);

  // função passada para o componente TableRow para editar uma despesa do estado expenses do redux store e atualizar o estado do componente ExpenseTable para mostrar a despesa editada no componente TableRow e o componente EditableRow para mostrar o formulário para editar a despesa editada no componente TableRow e atualizar o estado do componente ExpenseTable para mostrar a despesa editada no componente EditableRow
  const handleEditClick = (event, expense) => {
    event.preventDefault();
    setEditExpenseTable(expense.id);

    const formValue = {
      id: expense.id,
      value: expense.value,
      description: expense.description,
      currency: expense.currency,
      method: expense.method,
      tag: expense.tag,
    };
    setEditFormData(formValue);
  };

  // função passada para o componente EditableRow para atualizar o estado do componente ExpenseTable para mostrar a despesa editada no componente EditableRow e o componente TableRow para mostrar a despesa editada no componente EditableRow e atualizar o estado do componente ExpenseTable para mostrar a despesa editada no componente TableRow
  const handleEditChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setEditFormData((itemPrev) => ({ ...itemPrev, [name]: value }));
  };

  // função passada para o componente EditableRow para atualizar o estado do componente ExpenseTable para mostrar a despesa editada no componente EditableRow e o componente TableRow para mostrar a despesa editada no componente EditableRow e atualizar o estado do componente ExpenseTable para mostrar a despesa editada no componente TableRow
  const handleSaveEdit = (event) => {
    event.preventDefault();
    dispatch(getFetchActionEditTable(editFormData));
    setEditExpenseTable(null);
  };

  return (
    <form>
      <table className="customers">
        <thead className="thead">
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar / Excluir</th>
          </tr>
        </thead>
        {
          !expenses ? ''
            : (
              <tbody>
                {
                  expenses.map((expense) => (
                    // fragmento para não renderizar o componente TableRow quando o componente EditableRow estiver renderizado
                    <Fragment key={ expense.id }>
                      {editExpenseTable === expense.id ? (
                        <EditableRow
                          editFormData={ editFormData }
                          handleEditChange={ handleEditChange }
                          handleSaveEdit={ handleSaveEdit }
                        />)
                        : (
                          <TableRow
                            expense={ expense }
                            handleEditClick={ handleEditClick }
                          />
                        )}
                    </Fragment>
                  ))
                }
              </tbody>
            )
        }
      </table>
    </form>
  );
}

export default ExpenseTable;
