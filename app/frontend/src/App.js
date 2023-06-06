import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';

import DeliveryProvider from './context/DeliveryProvider';

import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Customer/Products';
import CustomerOrders from './pages/Customer/CustomerOrders';
import CustomerOrderDetails from './pages/Customer/CustomerOrderDetails';
import Checkout from './pages/Customer/Checkout';
import Manage from './pages/Admin/Manage';
import SellerOrderDetail from './pages/Seller/SellerOrderDetails';
import SellerOrders from './pages/Seller/SellerOrders';

function App() {
  return (
    <DeliveryProvider>
      <div className="App select-none">
        <Routes>
          <Route exact path="/" element={ <Navigate to="/login" replace /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/register" element={ <Register /> } />
          <Route path="/customer/products" element={ <Products /> } />
          <Route path="/customer/orders/" element={ <CustomerOrders /> } />
          <Route
            path="/customer/orders/:id"
            element={ <CustomerOrderDetails /> }
          />
          <Route path="/customer/checkout" element={ <Checkout /> } />
          <Route path="/seller/orders" element={ <SellerOrders /> } />
          <Route path="/seller/orders/:id" element={ <SellerOrderDetail /> } />
          <Route path="/admin/manage" element={ <Manage /> } />
        </Routes>
      </div>
    </DeliveryProvider>
  );
}

export default App;
