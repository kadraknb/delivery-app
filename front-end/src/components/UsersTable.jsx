import React from 'react';
import PropTypes from 'prop-types';
import api from '../services/api';
import LocalStorage from '../utils/localStorage.utils';

function UsersTable({ id, itemNumber, name, email, role }) {
  const indexLine = itemNumber - 1;

  const deleteUser = async (e) => {
    e.preventDefault();
    const authorization = LocalStorage.getToken();

    try {
      await api.delete(
        `admin/manage/${id}`,
        { headers: { authorization } },
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Tipo</th>
          <th>Excluir</th>
        </tr>
      </thead>
      <tbody>
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
      </tbody>
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
