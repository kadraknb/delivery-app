import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DeliveryContext from '../context/DeliveryContext';
import api from '../services/api';
import LocalStorage from '../utils/localStorage.utils';

function Login() {
  const { email, password, setEmail, setPassword } = useContext(DeliveryContext);
  const [errorMsg, setErrorMsg] = useState([false, '']);
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = LocalStorage.getUser();
    if (isLoggedIn !== null) {
      if (isLoggedIn.role === 'seller') {
        return navigate('/seller/orders');
      }
      navigate('/customer/products');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const emailRegEx = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    const passwordMinLength = 6;
    const emailIsValid = email.match(emailRegEx);

    if (password.length >= passwordMinLength && emailIsValid) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/login', {
        email,
        password,
      });
      if (data.role === 'customer') {
        LocalStorage.setLogin(data);
        navigate('/customer/products');
      }

      if (data.role === 'administrator') {
        LocalStorage.setLogin(data);
        navigate('/admin/manage');
      }
      if (data.role === 'seller') {
        LocalStorage.setLogin(data);
        navigate('/seller/orders');
      }
    } catch (error) {
      setErrorMsg([true, `${error}`]);
    }
  };

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <section>
          <label htmlFor="input-email">
            <input
              className="form-input"
              type="email"
              name="email"
              placeholder="Email"
              onChange={ (e) => setEmail(e.target.value) }
              data-testid="common_login__input-email"
            />
          </label>
          <label htmlFor="label-password">
            <input
              className="form-input"
              type="password"
              name="password"
              placeholder="Senha"
              onChange={ (e) => setPassword(e.target.value) }
              data-testid="common_login__input-password"
            />
          </label>
        </section>
        <div>
          <button
            type="submit"
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
            Criar conta
          </button>
        </div>
      </form>
      {errorMsg[0] ? (
        <p data-testid="common_login__element-invalid-email">{errorMsg[1]}</p>
      ) : undefined}
      <button
        type="button"
        name="register"
        onClick={ () => {
          setPassword('--adm2@21!!--');
          setEmail('adm@deliveryapp.com');
        } }
      >
        adm
      </button>
      <button
        type="button"
        name="register"
        onClick={ () => {
          setPassword('$#zebirita#$');
          setEmail('zebirita@email.com');
        } }
      >
        cliente
      </button>
      <button
        type="button"
        name="register"
        onClick={ () => {
          setPassword('fulana@123');
          setEmail('fulana@deliveryapp.com');
        } }
      >
        vendedor
      </button>
    </div>
  );
}

export default Login;
