import React from 'react';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import LocalStorage from '../../utils/localStorage';

import iHome from '../../images/icons/navBar_home.svg';
import iLogOut from '../../images/icons/navBar_logout.svg';
import iOrders from '../../images/icons/navBar_orders.svg';
import Logo from '../../images/logo32.png';

function NavBar({ type }) {
  const nav = useNavigate();
  const { name } = LocalStorage.getUser() || '';

  const handleLogOut = () => {
    LocalStorage.logOut();
    nav('/login');
  };

  const handleProducts = () => {
    nav('/customer/products');
  };

  const handleOrders = () => {
    const { role } = LocalStorage.getUser();
    nav(`/${role}/orders`);
  };

  const mainContent = (
    <nav className="h-24 w-full bg-default_black flex justify-between px-16">
      <div className="flex items-center">
        <img src={ Logo } alt="Logo" className="w-32" />
      </div>
      <div className="flex gap-6 items-center">

        <div className="flex flex-col items-end pr-4">
          <button
            className="text-white text-2xl"
            type="button"
            data-testid="customer_products__element-navbar-user-full-name"
          >
            Hello,
            {' '}
            <span className="text-default_dark_accent">
              { name || 'Guest' }
            </span>
            !
          </button>

          <hr className="h-[2px] w-5/6 bg-default_white rounded-full" />
        </div>

        <button
          className="h-16 w-16
          bg-default_white rounded-xl flex justify-center items-center"
          type="button"
          data-testid="customer_products__element-navbar-link-products"
          onClick={ () => handleProducts() }
        >
          <img src={ iHome } alt="Home Page" />
        </button>

        <button
          className="h-16 w-16
        bg-default_white rounded-xl flex justify-center items-center"
          type="button"
          data-testid="customer_products__element-navbar-link-orders"
          onClick={ () => handleOrders() }
        >
          <img src={ iOrders } alt="Orders Page" />
        </button>

        <button
          className="h-16 w-16
        bg-default_white rounded-xl flex justify-center items-center"
          type="button"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ () => handleLogOut() }
        >
          <img src={ iLogOut } alt="Log Out" />
        </button>

      </div>
    </nav>
  );

  const otherContent = (
    <div className="h-24 w-full bg-default_black flex justify-center items-center">
      <img src={ Logo } alt="Logo" className="w-32" />
    </div>
  );

  return (
    <div>
      { type === 'main' ? mainContent : otherContent }
    </div>
  );
}

NavBar.propTypes = {
  type: PropTypes.string,
}.isRequired;

export default NavBar;
