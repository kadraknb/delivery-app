import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import App from '../../App';
import renderWithRouter from '../helpers/renderWithRouter';
import api from '../../services/api';


describe('Testa o login do usuário cliente', () => {
  afterEach(() => {
    global.localStorage.clear();
    jest.restoreAllMocks();
  });

  it('Deve realizar o login com sucesso', async () => {
    const { user } = renderWithRouter(<App />);

    const mockUser = { data: {
      id: 4,
      name: 'Cliente gropo 23',
      email: 'grupo23@email.com',
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

    const registerBtn = screen.getByTestId('common_login__button-register');
    await user.click(registerBtn);
    const path = window.location.pathname;
    expect(path).toBe('/register')

    const cadastrarBtn = screen.getByTestId('common_register__button-register');
    expect(cadastrarBtn).toBeDisabled();

    const nameInput = screen.getByTestId('common_register__input-name');
    await user.type(nameInput, 'Cliente gropo 23');
    expect(nameInput).toHaveProperty('value', 'Cliente gropo 23');


    const emailInput = screen.getByTestId('common_register__input-email');
    await user.type(emailInput, 'grupo23@email.com');
    expect(emailInput).toHaveProperty('value', 'grupo23@email.com');

    const passwordInput = screen.getByTestId('common_register__input-password');
    await user.type(passwordInput, '$#grupo23#$');
    expect(passwordInput).toHaveProperty('value', '$#grupo23#$');

    expect(cadastrarBtn).not.toBeDisabled();
    await user.click(cadastrarBtn);

    await waitFor(() => {
      const path = window.location.pathname;
      expect(path).toBe('/customer/products')
    })
  });
  it('Deve mostrar uma mensagem de erro no caso de dados inválidos', async () => {
    const { user } = renderWithRouter(<App />);
    const registerBtn = screen.getByTestId('common_login__button-register');
    await user.click(registerBtn);
    jest.spyOn(api,'post').mockRejectedValue(new Error());

    const nameInput = screen.getByTestId('common_register__input-name');
    await user.type(nameInput, 'Cliente gropo 23');

    const emailInput = screen.getByTestId('common_register__input-email');
    await user.type(emailInput, 'grupo23@email.com');

    const passwordInput = screen.getByTestId('common_register__input-password');
    await user.type(passwordInput, '$#grupo23#$')

    const cadastrarBtn = screen.getByTestId('common_register__button-register');
    await user.click(cadastrarBtn);

    await waitFor(() => {
      const errorMsg = screen.getByTestId('common_register__element-invalid_register');
      expect(errorMsg).toBeInTheDocument();
    });
  });
});
