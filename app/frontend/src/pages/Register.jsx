import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Api from '../services/api';
import LocalStorage from '../utils/localStorage';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Register from '../components/Register';

function RegisterClient() {
  const [showError, setShowError] = useState(false);
  const [termsOfService, setTermsOfService] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (newUser) => {
    const HTTP_CREATED = 201;

    try {
      const response = await Api.postRegister(newUser);
      if (response.status === HTTP_CREATED) {
        setShowError(false);
        LocalStorage.setLogin(response.data);
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
        <Register
          handleRegister={ handleRegister }
          showError={ showError }
          isDisabled={ termsOfService }
          type="common"
        />
      </div>
      <Footer />
    </div>
  );
}

export default RegisterClient;
