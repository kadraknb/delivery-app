import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import DeliveryContext from '../context/DeliveryContext';
import api from '../services/api';
import LocalStorage from '../utils/localStorage';
import InputValidations from '../utils/inputsValidations';

import NavBar from '../components/NavBar';
import DefaultInput from '../components/stylizedElement/DefaultInput';
import SmallButton from '../components/stylizedElement/SmallButton';
import AccountErrorMessage from '../components/stylizedElement/AccountErrorMessage';
import Footer from '../components/Footer';

function Register() {
  const { email, password, setEmail, setPassword } = useContext(DeliveryContext);
  const [name, setName] = useState('');
  const [showError, setShowError] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [termsOfService, setTermsOfService] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const enabledButton = InputValidations.validateRegister(email, password, name)
      && termsOfService;
    setButtonDisabled(!enabledButton);
  }, [name, email, password, termsOfService]);

  const handleRegister = async () => {
    const HTTP_CREATED = 201;

    try {
      const responseCreatedUserData = await api.post('/register', {
        email,
        password,
        name,
      });
      if (responseCreatedUserData.status === HTTP_CREATED) {
        setShowError(false);
        LocalStorage.setLogin(responseCreatedUserData.data);
        navigate('/customer/products');
        return;
      }
    } catch (err) {
      setShowError(true);
    }
  };

  const linkOfTerms = (
    <a
      className="hover:underline"
      href="https://offline-dino-game.firebaseapp.com/"
      target="_blank"
      rel="noreferrer"
    >
      Terms and Services
    </a>
  );

  const checkboxSpan = (
    <span className="text-default_light_accent">{linkOfTerms}</span>
  );

  return (
    <div>
      <NavBar type="other" />
      <div
        className="h-[550px] w-[925px]
        fixed inset-0 border-[1px] border-default_light_gray
        rounded-[20px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        flex items-center justify-center gap-12 pl-4 pr-2"
      >
        <div className="flex flex-col items-end gap-8 pl-8">
          <div className="w-64">
            <h1 className="text-5xl font-bold text-right">Register</h1>
          </div>

          <div className="w-64">
            <h2 className="font-normal text-4xl text-right leading-snug">
              Create a new account and start shopping
            </h2>
          </div>

          <label
            htmlFor="termsOfService"
            className="flex items-center leading-4 cursor-pointer font-semibold text-xs
      w-64 h-8 text-default_dark_gray gap-4"
          >
            <input
              id="termsOfService"
              type="checkbox"
              className="h-10 w-10 accent-default_dark_accent cursor-pointer"
              onChange={ ({ target: { checked } }) => setTermsOfService(checked) }
            />
            <div>
              By creating a new account, you agree with our
              {' '}
              {checkboxSpan}
              .
            </div>
          </label>
        </div>

        <hr className="w-[3px] h-60 p-[1px] bg-default_light_gray" />

        <form className="flex flex-col gap-1 p-0 h-[376px]">
          <DefaultInput
            setShowError={ setShowError }
            type="string"
            dataTestId="common_register__input-name"
            placeholder="Daniel Orivaldo da Silva"
            title="Name"
            value={ name }
            setState={ setName }
          />

          <DefaultInput
            setShowError={ setShowError }
            type="email"
            dataTestId="common_register__input-email"
            placeholder="danielsilva@gmail.com"
            title="Email"
            value={ email }
            setState={ setEmail }
          />

          <DefaultInput
            setShowError={ setShowError }
            type="password"
            dataTestId="common_register__input-password"
            placeholder="Your password"
            title="Password"
            value={ password }
            setState={ setPassword }
          />

          <div className="flex justify-center items-start h-[8px] top-0">
            {showError && (
              <AccountErrorMessage
                testid="common_register__element-invalid_register"
                content="User or email already registered."
              />
            )}
          </div>

          <div className="flex gap-10 mt-10">
            <SmallButton
              button={ 1 }
              dataTestId="common_register__button-register"
              content="Sign in"
              handleOnClick={ handleRegister }
              disabled={ buttonDisabled }
            />

            <SmallButton
              button={ 0 }
              content="Go back"
              handleOnClick={ () => navigate('/login') }
            />
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
