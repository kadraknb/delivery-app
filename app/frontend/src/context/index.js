import React, { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const Context = createContext();

function Provider({ children }) {
  const [quantityGlobal, setQuantityGlobal] = useState(0);
  const [totalPricesGlobal, setTotalPricesGlobal] = useState(0);
  const [sellerOrders, setSellerOrders] = useState([]);

  const provider = useMemo(() => (
    {
      quantityGlobal,
      setQuantityGlobal,
      totalPricesGlobal,
      setTotalPricesGlobal,
      sellerOrders,
      setSellerOrders,
    }), [
    quantityGlobal,
    setQuantityGlobal,
    totalPricesGlobal,
    setTotalPricesGlobal,
    sellerOrders,
    setSellerOrders]);

  return (
    <Context.Provider
      value={ provider }
    >
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  quantity: PropTypes.number,
  setQuantity: PropTypes.func.isRequired,
}.isRequired;

export default Provider;
