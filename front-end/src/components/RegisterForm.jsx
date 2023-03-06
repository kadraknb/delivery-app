import React from 'react';

function RegisterForm() {
  return (
    <div>
      <h2>Cadastrar novo usuário</h2>
      <form>
        <label htmlFor="input-email">
          Nome
          <input
            type="text"
            onChange={ () => '' }
            data-testid="admin_manage__input-name"
          />
        </label>
        <label htmlFor="input-email">
          Email
          <input
            type="email"
            onChange={ () => '' }
            data-testid="admin_manage__input-email"
          />
        </label>
        <label htmlFor="label-password">
          Password
          <input
            type="password"
            onChange={ () => '' }
            data-testid="admin_manage__input-password"
          />
        </label>
        <label htmlFor="label-type">
          Tipo
          <select
            data-testid="admin_manage__select-role"
          >
            <option>Vendedor</option>
            <option>Cliente</option>
            <option>Administrador</option>
          </select>
        </label>
        <button
          type="submit"
          data-testid="admin_manage__button-register"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
