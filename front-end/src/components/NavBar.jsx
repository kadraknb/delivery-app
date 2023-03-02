import React from 'react';
import { useNavigate } from 'react-router';
import LocalStorage from '../utils/localStorage.utils';

function NavBar() {
  const nav = useNavigate();
  const { name } = LocalStorage.getUser();

  const handleLogOut = () => {
    LocalStorage.logOut();
    nav('/login');
  };

  const handleProducts = () => {
    nav('/customer/products');
  };

  const handleOrders = () => {
    nav('/customer/orders');
  };

  return (
    <nav>
      <button
        type="button"
        data-testid="customer_products__element-navbar-link-products"
        onClick={ () => handleProducts() }
      >
        PRODUCTS
      </button>

      <button
        type="button"
        data-testid="customer_products__element-navbar-link-orders"
        onClick={ () => handleOrders() }
      >
        MY ORDERS
      </button>

      <button
        type="button"
        data-testid="customer_products__element-navbar-user-full-name"
      >
        { name }
      </button>

      <button
        type="button"
        data-testid="customer_products__element-navbar-link-logout"
        onClick={ () => handleLogOut() }
      >
        LOG OUT
      </button>
    </nav>
  );
}

export default NavBar;
