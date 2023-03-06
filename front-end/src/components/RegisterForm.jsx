import React, { useContext, useState, useEffect } from 'react';
import DeliveryContext from '../context/DeliveryContext';
import api from '../services/api';

function RegisterForm() {
  const { email, password, setEmail, setPassword } = useContext(DeliveryContext);
  const [name, setName] = useState('');
  const [role, setRole] = useState('customer');
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const emailRegEx = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    const passwordMinLength = 6;
    const nameMinLenght = 12;
    const emailIsValid = email.match(emailRegEx);

    if (password.length >= passwordMinLength && emailIsValid
      && name.length >= nameMinLenght) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password, name]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/manage', {
        name,
        email,
        password,
        role,
      });
    } catch (error) {
      setErrorMsg([true, `${error}`]);
    }
  };

  return (
    <div>
      <h2>Cadastrar novo usuário</h2>
      <form>
        <label htmlFor="input-email">
          Name
          <input
            type="text"
            onChange={ (e) => setName(e.target.value) }
            data-testid="admin_manage__input-name"
          />
        </label>
        <label htmlFor="input-email">
          E-mail
          <input
            type="email"
            onChange={ (e) => setEmail(e.target.value) }
            data-testid="admin_manage__input-email"
          />
        </label>
        <label htmlFor="label-password">
          Password
          <input
            type="password"
            onChange={ (e) => setPassword(e.target.value) }
            data-testid="admin_manage__input-password"
          />
        </label>
        <label htmlFor="label-type">
          Type
          <select
            value={ role }
            onChange={ (e) => setRole(e.target.value) }
            data-testid="admin_manage__select-role"
          >
            <option>Customer</option>
            <option>Seller</option>
            <option>Administrator</option>
          </select>
        </label>
        <button
          type="submit"
          disabled={ isDisabled }
          onClick={ handleSubmit }
          data-testid="admin_manage__button-register"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
