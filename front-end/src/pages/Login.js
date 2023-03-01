import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DeliveryContext from '../context/DeliveryContext';

function Login() {
  const { email, password, setEmail, setPassword } = useContext(DeliveryContext);
  const [error] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const passwordMinLength = 6;
    const emailIsValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{3})$/i);

    if (password.length > passwordMinLength && emailIsValid) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password]);

  return (
    <div>
      <form>
        <h1>Delivery</h1>
        <section>
          <label htmlFor="input-email">
            E-mail
            <input
              type="email"
              name="email"
              onChange={ (e) => setEmail(e.target.value) }
              data-testid="common_login__input-email"
            />
          </label>
          <label htmlFor="label-password">
            Password
            <input
              type="password"
              name="password"
              onChange={ (e) => setPassword(e.target.value) }
              data-testid="common_login__input-password"
            />
          </label>
        </section>
        <div>
          <button
            type="button"
            name="login"
            className="login-button"
            data-testid="common_login__button-login"
            disabled={ isDisabled }
          >
            Login
          </button>
          <button
            type="button"
            name="register"
            data-testid="common_login__button-register"
            onClick={ () => navigate('/register') }
          >
            Register
          </button>
        </div>
      </form>
      { error ? <p data-testid="common_login__element-invalid-email">Mensagem de erro</p>
        : undefined }

    </div>
  );
}

export default Login;
