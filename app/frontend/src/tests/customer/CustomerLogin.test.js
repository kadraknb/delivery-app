import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import App from '../../App';
import renderWithRouter from '../helpers/renderWithRouter';
import api from '../../services/api';


describe('Testa o login do usuário cliente', () => {
  afterEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  it('Deve realizar o login com sucesso', async () => {
    const { user } = renderWithRouter(<App />);

    const mockUser = { data: {
      id: 3,
      name: 'Cliente Zé Birita',
      email: 'zebirita@email.com',
      role: 'customer',
      token: 'grupo23B',
    } };

    const mockProducts = { data: [
      {
        "id": 1,
        "name": "Skol Lata 250ml",
        "price": "2.20",
        "urlImage": "http://localhost:3001/images/skol_lata_350ml.jpg"
      },
      {
        "id": 2,
        "name": "Heineken 600ml",
        "price": "7.50",
        "urlImage": "http://localhost:3001/images/heineken_600ml.jpg"
      },
    ] }

    jest.spyOn(api,'post').mockResolvedValue(mockUser)
    jest.spyOn(api,'get').mockResolvedValue(mockProducts)

    const loginBtn = screen.getByTestId('common_login__button-login');
    expect(loginBtn).toBeDisabled();

    const emailInput = screen.getByTestId('common_login__input-email');
    await user.type(emailInput, 'zebirita@email.com');
    expect(emailInput).toHaveProperty('value', 'zebirita@email.com');

    const passwordInput = screen.getByTestId('common_login__input-password');
    await user.type(passwordInput, '$#zebirita#$');
    expect(passwordInput).toHaveProperty('value', '$#zebirita#$');

    expect(loginBtn).not.toBeDisabled();
    await user.click(loginBtn);

    await waitFor(() => {
      const path = window.location.pathname;
      expect(path).toBe('/customer/products')
    })
    
  });

  it('Deve redirecionar o usuário para a página de registro', async () => {
    const { user } = renderWithRouter(<App />);

    const registerBtn = screen.getByTestId('common_login__button-register');
    await user.click(registerBtn);
  });

  it('Redireciona automaticamente o usuário caso ele já esteja logado', () => {
    localStorage.setItem('user', JSON.stringify({ role: 'customer' }));
    renderWithRouter(<App />);

    const cartTotalValue = screen.getByTestId('customer_products__checkout-bottom-value');
    expect(cartTotalValue).toBeInTheDocument();
  });

  it('Redireciona automaticamente o usuário vendedor caso ele já esteja logado', () => {
    localStorage.setItem('user', JSON.stringify({ role: 'seller' }));
    renderWithRouter(<App />);

    const ordersText = screen.getByText(/PEDIDOS/);
    expect(ordersText).toBeInTheDocument();
  });
});
