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
    } catch (error) {
      setErrorMsg([true, `${error}`]);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div>
      <NavBar type="main" />
      <Register
        handleRegister={ handleSubmit }
        showError={ errorMsg }
        type="adm"
      />
      {!isLoading
        && usersData.map((user, index) => (
          <UsersTable
            key={ user.id }
            id={ user.id }
            itemNumber={ index + 1 }
            name={ user.name }
            email={ user.email }
            role={ user.role }
          />
        ))}
    </div>
  );
}

export default Manage;
