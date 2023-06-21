import React from 'react';
import PropTypes from 'prop-types';

function UsersTable({ array, deleteUser }) {
  return (
    <>
      {array.map(({ id, name, email, role }) => (

        <tr className="text-center border-b-[3px] h-14" key={ id }>
          <td>
            { id }
          </td>
          <td>
            { name }
          </td>
          <td>
            { email }
          </td>
          <td>
            { role }
          </td>
          <td>
            <button
              className="relative top-1"
              type="button"
              onClick={ () => deleteUser(id) }
            >
              Excluir
            </button>
          </td>
        </tr>
      ))}

    </>

  );
}

UsersTable.propTypes = {
  array: PropTypes.array,
  deleteUser: PropTypes.func,
}.isRequired;

export default UsersTable;
