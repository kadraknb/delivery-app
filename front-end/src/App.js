import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';

import DeliveryProvider from './context/DeliveryProvider';

import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Customer/Products';
import Orders from './pages/Customer/Orders';
import Checkout from './pages/Customer/Checkout';
import Manage from './pages/Admin/Manage';
import OrdersDatails from './pages/Customer/OrderDatails';

function App() {
  return (
    <DeliveryProvider>
      <Routes>
        <Route
          exact
          path="/"
          element={ <Navigate to="/login" replace /> }
        />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/customer/products" element={ <Products /> } />
        <Route path="/customer/orders/" element={ <Orders /> } />
        <Route path="/customer/orders/:id" element={ <OrdersDatails /> } />
        <Route path="/customer/checkout" element={ <Checkout /> } />
        <Route path="/admin/manage" element={ <Manage /> } />
      </Routes>
    </DeliveryProvider>
  );
}

export default App;
