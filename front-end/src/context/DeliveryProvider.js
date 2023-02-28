import { shape } from 'prop-types';
import React, { useState } from 'react';
import DeliveryContext from './DeliveryContext';

function DeliveryProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const contextValue = {
    email,
    password,
    setEmail,
    setPassword,
  };

  return (
    <DeliveryContext.Provider value={ contextValue }>
      { children }
    </DeliveryContext.Provider>
  );
}

DeliveryProvider.propTypes = {
  children: shape().isRequired,
};

export default DeliveryProvider;
