import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import AccountErrorMessage from '../Common/AccountErrorMessage';
import DefaultInput from '../Common/DefaultInput';
import SmallButton from '../Common/SmallButton';
import DefaultDropDown from '../Common/DefaultDropDown';
import InputValidations from '../../utils/inputsValidations';

function Register({
  handleRegister,
  isDisabled = false,
  showError = false,
  type,
}) {
  const roles = [
    { name: 'seller', id: 0 },
    { name: 'customer', id: 1 },
    { name: 'administrator', id: 2 },
  ];
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setSelectedRole] = useState(1);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    const enabledButton = InputValidations.validateRegister(email, password, name)
    && isDisabled;
    setButtonDisabled(!enabledButton);
  }, [name, email, password, isDisabled]);

  return (
    <form className="flex flex-col gap-1 p-0 h-[376px]">
      <DefaultInput
        type="string"
        dataTestId="common_register__input-name"
        placeholder="Fulano Silva"
        title="Name"
        value={ name }
        setState={ setName }
      />

      <DefaultInput
        type="email"
        dataTestId="common_register__input-email"
        placeholder="Fulano@mail.com"
        title="Email"
        value={ email }
        setState={ setEmail }
      />

      <DefaultInput
        type="password"
        dataTestId="common_register__input-password"
        placeholder="Your password"
        title="Password"
        value={ password }
        setState={ setPassword }
      />

      {type === 'adm' && (
        <DefaultDropDown
          title="role"
          dataTestId="admin_manage__button-register"
          value={ role }
          type="number"
          valuesArray={ roles }
          setState={ setSelectedRole }
        />
      )}

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
          handleOnClick={ () => handleRegister({
            name,
            email,
            password,
            role: roles[role].name,
          }) }
          disabled={ buttonDisabled }
        />
        {type === 'common' && (
          <SmallButton
            button={ 0 }
            content="Go back"
            handleOnClick={ () => nav('/login') }
          />
        )}
      </div>
    </form>
  );
}

Register.propTypes = {
  handleRegister: PropTypes.func,
  isDisabled: PropTypes.bool,
  showError: PropTypes.bool,
  type: PropTypes.string,
}.isRequired;

export default Register;
