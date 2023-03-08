import React from 'react';

import NavBar from '../../components/NavBar';
import RegisterForm from '../../components/RegisterForm';
import UsersTable from '../../components/UsersTable';

function Manage() {
  return (
    <div>
      <NavBar />
      <RegisterForm />
      <UsersTable />
    </div>
  );
}

export default Manage;
