import React from 'react';
import PropTypes from 'prop-types';

function UsersTable({ itemNumber, name, email, role }) {
  const indexLine = itemNumber - 1;

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
            onClick=""
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
