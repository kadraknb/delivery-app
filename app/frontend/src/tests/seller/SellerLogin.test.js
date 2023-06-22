import React from 'react';
import { screen, waitFor } from '@testing-library/react';
// import axios from 'axios';
import App from '../../App';
import renderWithRouter from '../helpers/renderWithRouter';
import api from '../../services/api';
import { getOrders } from '../../services/apiOrders';

// jest.mock(api);

describe('Testa o login do usuário vendedor', () => {
  afterEach(() => {
    global.localStorage.clear();
    jest.restoreAllMocks();
  });

  it('Deve mostrar uma mensagem de erro no caso de dados inválidos', async () => {
    const { user } = renderWithRouter(<App />);
    jest.spyOn(api,'post').mockResolvedValue(new Error())


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

    const mockUser = { data: {
      id: 1,
      name: 'Fulaninha da Silva',
      email: 'fulana@deliveryapp.com',
      role: 'seller',
      token: 'grupo23B',
    } };

    const mockOrders ={ data: [
      {
        id: 1,
        userId: 3,
        sellerId: 2,
        totalPrice: "11.90",
        deliveryAddress: "Rua gonçalves",
        deliveryNumber: "265",
        saleDate: "2023-03-14T13:12:47.000Z",
        status: "Pendente"
      }
    ] }

    // api.post.mockResolvedValueOnce(mockUser.data);
    jest.spyOn(api,'post').mockResolvedValue(mockUser)
    jest.spyOn(api,'get').mockResolvedValue(mockOrders)

    const emailInput = screen.getByTestId('common_login__input-email');
    await user.type(emailInput, 'fulana@deliveryapp.com');

    const passwordInput = screen.getByTestId('common_login__input-password');
    await user.type(passwordInput, 'fulana@123');

    const loginBtn = screen.getByTestId('common_login__button-login');
    await user.click(loginBtn);

    await waitFor(() => {
      const path = window.location.pathname;
      expect(path).toBe('/seller/orders')
    })

    });

  it('Redireciona automaticamente o usuário caso ele já esteja logado', () => {
    localStorage.setItem('user', JSON.stringify({ role: 'seller' }));
    renderWithRouter(<App />);

    const ordersText = screen.getByText(/PEDIDOS/);
    expect(ordersText).toBeInTheDocument();
  });
});
