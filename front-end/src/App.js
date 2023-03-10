import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';

import DeliveryProvider from './context/DeliveryProvider';

import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Customer/Products';
import Orders from './pages/Customer/Orders';
import Checkout from './pages/Customer/Checkout';
import Manage from './pages/Admin/Manage';
import PersonSallerOrdersDetail from './pages/seller/saleOrder';
import SellerOrders from './pages/seller/orders';
import OrdersDetails from './pages/Customer/OrdersDetails';

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
        <Route path="/customer/orders/:id" element={ <OrdersDetails /> } />
        <Route path="/customer/checkout" element={ <Checkout /> } />
        <Route path="/admin/manage" element={ <Manage /> } />
        <Route path="/seller/orders/:id" element={ <PersonSallerOrdersDetail /> } />
        <Route path="/seller/orders" element={ <SellerOrders /> } />
      </Routes>
    </DeliveryProvider>
  );
}

export default App;
