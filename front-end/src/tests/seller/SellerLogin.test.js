import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import App from '../../App';
import renderWithRouter from '../helpers/renderWithRouter';

/* jest.mock('axios'); */

describe('Testa o login do usuário vendedor', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('Deve mostrar uma mensagem de erro no caso de dados inválidos', async () => {
    const { user } = renderWithRouter(<App />);

    await waitFor(async () => {
      const emailInput = screen.getByTestId('common_login__input-email');
      await user.type(emailInput, 'fulanaaaa@deliveryapp.com');

      const passwordInput = screen.getByTestId('common_login__input-password');
      await user.type(passwordInput, 'fulana@123');

      const loginBtn = screen.getByTestId('common_login__button-login');
      await user.click(loginBtn);

      const errorMsg = screen.getByTestId('common_login__element-invalid-email');
      expect(errorMsg).toBeInTheDocument();
    });
  });

  it('Deve realizar o login com sucesso', async () => {
    const { user } = renderWithRouter(<App />);

    /* const mockUser = {
      name: 'Fulaninha da Silva',
      email: 'fulana@deliveryapp.com',
      role: 'seller',
      token: 'grupo23B',
    }; */


    const emailInput = screen.getByTestId('common_login__input-email');
    await user.type(emailInput, 'fulana@deliveryapp.com');

    const passwordInput = screen.getByTestId('common_login__input-password');
    await user.type(passwordInput, 'fulana@123');

    const loginBtn = screen.getByTestId('common_login__button-login');
    await user.click(loginBtn);

    /* axios.post.mockResolvedValueOnce(mockUser); */
  });

  it('Redireciona automaticamente o usuário caso ele já esteja logado', () => {
    localStorage.setItem('user', JSON.stringify({ role: 'seller' }));
    renderWithRouter(<App />);

    const ordersText = screen.getByText(/PEDIDOS/);
    expect(ordersText).toBeInTheDocument();
  });
});
