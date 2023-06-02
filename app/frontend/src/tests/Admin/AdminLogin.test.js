import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import App from '../../App';
import renderWithRouter from '../helpers/renderWithRouter';
import api from '../../services/api';


describe('Testa o login do usuário Admin', () => {
  afterEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  it('Deve realizar o login com sucesso', async () => {
    const { user } = renderWithRouter(<App />);

    const mockUser = { data: {
      id: 1,
      name: 'Delivery App Admin',
      email: 'adm@deliveryapp.com',
      role: 'administrator',
      token: 'grupo23B',
    } };

    const mockUsers ={ data: [
      {
        "id": 2,
        "name": "Fulana Pereira",
        "email": "fulana@deliveryapp.com",
        "password": "3c28d2b0881bf46457a853e0b07531c6",
        "role": "seller"
      },
      {
        "id": 3,
        "name": "Cliente Zé Birita",
        "email": "zebirita@email.com",
        "password": "1c37466c159755ce1fa181bd247cb925",
        "role": "customer"
      }
    ] }

    jest.spyOn(api,'post').mockResolvedValue(mockUser)
    jest.spyOn(api,'get').mockResolvedValue(mockUsers)

    const loginBtn = screen.getByTestId('common_login__button-login');
    expect(loginBtn).toBeDisabled();

    const emailInput = screen.getByTestId('common_login__input-email');
    await user.type(emailInput, 'adm@deliveryapp.com');
    expect(emailInput).toHaveProperty('value', 'adm@deliveryapp.com');

    const passwordInput = screen.getByTestId('common_login__input-password');
    await user.type(passwordInput, '--adm2@21!!--');
    expect(passwordInput).toHaveProperty('value', '--adm2@21!!--');

    expect(loginBtn).not.toBeDisabled();
    await user.click(loginBtn);

    await waitFor(() => {
      const path = window.location.pathname;
      expect(path).toBe('/admin/manage')
    })
    
  });
});
