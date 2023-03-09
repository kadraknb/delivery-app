import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import LocalStorage from '../utils/localStorage.utils';

function NavBar() {
  const nav = useNavigate();
  const data = LocalStorage.getUser();
  const path = useLocation();

  const handleLogOut = () => {
    LocalStorage.logOut();
    nav('/login');
  };

  const handleProducts = () => {
    nav('/customer/products');
  };

  const handleOrders = () => {
    if (data.role === 'seller') return nav('/seller/orders');
    nav('/customer/orders');
  };

  return (
    <nav>
      {
        path.pathname.includes('customer') && (
          <button
            type="button"
            data-testid="customer_products__element-navbar-link-products"
            onClick={ () => handleProducts() }
          >
            PRODUTOS
          </button>
        )
      }

      {path.pathname.includes('admin')
        ? (<span>GERENCIAR USUÁRIOS</span>)
        : (
          <button
            type="button"
            data-testid="customer_products__element-navbar-link-orders"
            onClick={ () => handleOrders() }
          >
            {path.pathname.includes('customer') ? 'MEUS PEDIDOS' : 'PEDIDOS'}
          </button>
        )}

      <span
        type="button"
        data-testid="customer_products__element-navbar-user-full-name"
      >
        { data.name }
      </span>

      <button
        type="button"
        data-testid="customer_products__element-navbar-link-logout"
        onClick={ () => handleLogOut() }
      >
        SAIR
      </button>
    </nav>
  );
}

export default NavBar;
