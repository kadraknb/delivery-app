import React, { useEffect, useState } from 'react';

import NavBar from '../../components/NavBar';
import RegisterForm from '../../components/RegisterForm';
import UsersTable from '../../components/UsersTable';
import api from '../../services/api';

function Manage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllUsers = async () => {
    try {
      const { data } = await api.get('admin/manage');

      setUsers(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <NavBar />
      <RegisterForm />
      <UsersTable />
    </div>
  );
}

export default Manage;
