import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../services/api';
import LocalStorage from '../utils/localStorage';

import AccountErrorMessage from '../components/stylizedElement/AccountErrorMessage';
import DefaultInput from '../components/stylizedElement/DefaultInput';
import SmallButton from '../components/stylizedElement/SmallButton';
import BigButton from '../components/stylizedElement/BigButton';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    const minLength = 7;
    const emailIsValid = email.match(emailRegEx);

    setIsDisabled(password.length > minLength && emailIsValid);
  }, [email, password]);

  const handleSubmit = async () => {
    try {
      const { data } = await api.post('/login', {
        email,
        password,
      });

      if (data.role) {
        LocalStorage.setLogin(data);
      }
      if (data.role === 'customer') {
        navigate('/customer/products');
      }
      if (data.role === 'administrator') {
        navigate('/admin/manage');
      }
      if (data.role === 'seller') {
        navigate('/seller/orders');
      }
    } catch (error) {
      setErrorMsg([true, `${error}`]);
    }
  };

  return (
    <>
      <NavBar type="other" />
      <div
        className="h-[550px] w-[900px] fixed inset-0 border-[1px]
         border-default_light_gray
        rounded-[20px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        flex items-center justify-center gap-12 pl-1 pr-2"
      >
        <div className="flex flex-col gap-4 pl-8">
          <div className="w-64">
            <h1 className="font-normal text-[38px] text-right">
              Enter your registered email address
            </h1>
          </div>

          <div className="flex flex-col items-end gap-4">
            <BigButton
              button={ 1 }
              content="I don&rsquo;t remember"
              handleOnClick={ () => navigate('/notfound') }
            />

            <BigButton button={ 0 } content="Terms of Service" disabled />

            <BigButton button={ 0 } content="Report a problem" disabled />
          </div>
        </div>

        <hr className="w-[3px] h-60 p-[1px] bg-default_light_gray" />

        <form className="flex flex-col gap-2 p-0 h-[376px]">
          <h1 className="font-extrabold text-[48px]">Login</h1>

          <DefaultInput
            setShowError={ errorMsg[0] }
            type="email"
            dataTestId="common_login__input-email"
            placeholder="email@gmail.com"
            title="Email"
            value={ email }
            setState={ setEmail }
          />

          <DefaultInput
            setShowError={ errorMsg[0] }
            type="password"
            dataTestId="common_login__input-password"
            placeholder="Your password"
            title="Password"
            value={ password }
            setState={ setPassword }
          />

          <div className="flex justify-center items-start h-[11px]">
            {errorMsg[0] && (
              <AccountErrorMessage
                testid="common_login__element-invalid-email"
                content="Invalid email or password. User not found."
              />
            )}
          </div>

          <div className="flex gap-10 mt-11">
            <SmallButton
              button={ 1 }
              dataTestId="common_login__button-login"
              content="Sign in"
              handleOnClick={ handleSubmit }
              disabled={ !isDisabled }
            />

            <SmallButton
              button={ 0 }
              dataTestId="common_login__button-register"
              content="Sign up"
              handleOnClick={ () => navigate('/register') }
            />
          </div>
        </form>
      </div>
      <button
        type="button"
        name="register"
        onClick={ () => {
          setPassword('--adm2@21!!--');
          setEmail('adm@deliveryapp.com');
          handleSubmit();
        } }
      >
        adm
      </button>
      <br />
      <button
        type="button"
        name="register"
        onClick={ () => {
          setPassword('$#zebirita#$');
          setEmail('zebirita@email.com');
          handleSubmit();
        } }
      >
        cliente
      </button>
      <br />
      <button
        type="button"
        name="register"
        onClick={ () => {
          setPassword('fulana@123');
          setEmail('fulana@deliveryapp.com');
          handleSubmit();
        } }
      >
        vendedor
      </button>
      <Footer />
    </>
  );
}

export default Login;
