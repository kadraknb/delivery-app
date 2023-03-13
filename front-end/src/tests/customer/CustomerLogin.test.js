import React from 'react';
import { screen } from '@testing-library/react';
import App from '../../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testa o login do usuário cliente', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('Deve realizar o login com sucesso', async () => {
    const { user } = renderWithRouter(<App />);

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
