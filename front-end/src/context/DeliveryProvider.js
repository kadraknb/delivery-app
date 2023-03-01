import { shape } from 'prop-types';
import React, { useMemo, useState } from 'react';
import DeliveryContext from './DeliveryContext';

function DeliveryProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const foo = useMemo(
    () => ({ email, password, setEmail, setPassword }),
    [email, setEmail, password, setPassword],
  );

  return (
    <DeliveryContext.Provider value={ foo }>
      { children }
    </DeliveryContext.Provider>
  );
}

DeliveryProvider.propTypes = {
  children: shape().isRequired,
};

export default DeliveryProvider;
