import React, { useEffect, useState } from 'react';

import NavBar from '../../components/NavBar';
import UsersTable from '../../components/UsersTable';
import formatUsersRole from '../../utils/formatUsersData';
import Api from '../../services/api';
import Register from '../../components/Register';

function Manage() {
  const [usersData, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(false);

  const getAllUsers = async () => {
    try {
      const data = await Api.getAdm();
      formatUsersRole(data);
      setUsers(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (newUser) => {
    try {
      await Api.postAdm(newUser);
      getAllUsers();
    } catch (error) {
      setErrorMsg([true, `${error}`]);
    }
  };

  const deleteUser = async (id) => {
    const idProtegido = 3;
    if (id > idProtegido) {
      await Api.deleteUser(id);
      getAllUsers();
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const tableHeaders = [
    'Item',
    'Nome',
    'Email',
    'Tipo',
    'Excluir',
  ];

  const trsTable = (
    <tr>
      {tableHeaders.map((thName, index) => {
        if (index > 0) {
          return (
            <th className="text-default_white font-normal" key={ thName }>
              {thName}
            </th>
          );
        }
        return (
          <th className="text-default_white font-normal w-40" key={ thName }>
            {thName}
          </th>
        );
      })}
    </tr>
  );

  return (
    <div>
      <NavBar type="main" />
      <table className="w-full">
        <thead className="h-20 bg-default_black">
          {trsTable}
        </thead>
        <tbody>
          {!isLoading
              && <UsersTable
                array={ usersData }
                deleteUser={ deleteUser }
              />}
        </tbody>
      </table>

      <br />
      <div className="flex justify-center">

        <Register
          handleRegister={ handleSubmit }
          showError={ errorMsg }
          type="adm"
        />
      </div>
    </div>
  );
}

export default Manage;
