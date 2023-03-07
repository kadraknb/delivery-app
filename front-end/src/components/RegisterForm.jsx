import React, { useState, useEffect } from 'react';
import api from '../services/api';
import LocalStorage from '../utils/localStorage.utils';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('seller');
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorMsg, setErrorMsg] = useState(false);

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
    const authorization = LocalStorage.getToken();

    try {
      await api.post('/admin/manage', {
        name,
        email,
        password,
        role,
      }, { headers: { authorization } });
    } catch (error) {
      setErrorMsg([true, `${error}`]);
    }
  };

  return (
    <div>
      <h2>Cadastrar novo usuário</h2>
      <form>
        <label htmlFor="input-name">
          Name
          <input
            type="text"
            name="input-name"
            onChange={ (e) => setName(e.target.value) }
            data-testid="admin_manage__input-name"
          />
        </label>
        <label htmlFor="input-email">
          E-mail
          <input
            type="email"
            name="input-email"
            onChange={ (e) => setEmail(e.target.value) }
            data-testid="admin_manage__input-email"
          />
        </label>
        <label htmlFor="input-password">
          Password
          <input
            type="password"
            name="input-password"
            onChange={ (e) => setPassword(e.target.value) }
            data-testid="admin_manage__input-password"
          />
        </label>
        <label htmlFor="select-type">
          Type
          <select
            name="role"
            value={ role }
            onChange={ (e) => setRole(e.target.value) }
            data-testid="admin_manage__select-role"
          >
            <option disabled value=""> Selecione </option>
            <option value="seller">Seller</option>
            <option value="customer">Customer</option>
            <option value="administrator">Administrator</option>
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
      { errorMsg
        ? <p data-testid="admin_manage__element-invalid-register">Mensagem de erro</p>
        : undefined }
    </div>
  );
}

export default RegisterForm;
