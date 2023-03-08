import React from 'react';
import PropTypes from 'prop-types';

function UsersTable({ itemNumber, name, email, role }) {
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
        <td>{ itemNumber }</td>
        <td>{ name }</td>
        <td>{ email }</td>
        <td>{ role }</td>
        <td>
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
