import React from 'react';
import PropTypes from 'prop-types';
import api from '../services/api';

function UsersTable({ id, itemNumber, name, email, role }) {
  const indexLine = itemNumber - 1;

  const deleteUser = async () => {
    await api.delete(`admin/manage/${id}`);
  };

  return (
    <table>
      <tr>
        <th>Item</th>
        <th>Nome</th>
        <th>E-mail</th>
        <th>Tipo</th>
        <th>Excluir</th>
      </tr>
      <tr>
        <td
          data-testid={ `admin_manage__element-user-table-item-number-${indexLine}` }
        >
          { itemNumber }
        </td>
        <td
          data-testid={ `admin_manage__element-user-table-name-${indexLine}` }
        >
          { name }
        </td>
        <td
          data-testid={ `admin_manage__element-user-table-email-${indexLine}` }
        >
          { email }
        </td>
        <td
          data-testid={ `admin_manage__element-user-table-role-${indexLine}` }
        >
          { role }
        </td>
        <td
          data-testid={ `admin_manage__element-user-table-remove-${indexLine}` }
        >
          <button
            type="button"
            onClick={ deleteUser }
          >
            Excluir
          </button>
        </td>
      </tr>
    </table>
  );
}

UsersTable.propTypes = {
  itemNumber: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string,
  role: PropTypes.string,
}.isRequired;

export default UsersTable;
