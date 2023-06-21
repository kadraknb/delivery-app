import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';

import Login from './pages/Common/Login';
import Register from './pages/Common/Register';
import Products from './pages/Customer/Products';
import CustomerOrders from './pages/Customer/CustomerOrders';
import OrderDetails from './pages/Customer/CustomerOrderDetails';
import Checkout from './pages/Customer/Checkout';
import Manage from './pages/Admin/Manage';
import NotFound from './pages/Common/Not Found';

import SellerOrders from './pages/Seller/SellerOrders';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={ <Navigate to="/login" replace /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="/customer/products" element={ <Products /> } />
      <Route path="/customer/orders/" element={ <CustomerOrders /> } />
      <Route path="/customer/orders/:id" element={ <OrderDetails /> } />
      <Route path="/customer/checkout" element={ <Checkout /> } />
      <Route path="/seller/orders" element={ <SellerOrders /> } />
      <Route path="/seller/orders/:id" element={ <OrderDetails /> } />
      <Route path="/admin/manage" element={ <Manage /> } />
      <Route path="/*" element={ <NotFound /> } />
    </Routes>
  );
}

export default App;
