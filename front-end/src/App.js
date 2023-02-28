import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import DeliveryProvider from './context/DeliveryProvider';
import Login from './pages/Login';
import Register from './pages/Register';

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
      </Routes>
    </DeliveryProvider>
  );
}

export default App;
