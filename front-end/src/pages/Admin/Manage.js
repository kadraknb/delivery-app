import React, { useEffect, useState } from 'react';

import NavBar from '../../components/NavBar';
import RegisterForm from '../../components/RegisterForm';
import UsersTable from '../../components/UsersTable';
import api from '../../services/api';
import formatUsersRole from '../../utils/formatUsersData';

function Manage() {
  const [usersData, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllUsers = async () => {
    try {
      const { data } = await api.get('admin/manage');

      formatUsersRole(data);

      setUsers(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div>
      <NavBar />
      <RegisterForm />
      {!isLoading
        && usersData.map((user, index) => (
          <UsersTable
            key={ user.id }
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
