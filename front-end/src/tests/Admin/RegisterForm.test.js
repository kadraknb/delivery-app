import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import App from '../../App';
import renderWithRouter from '../helpers/renderWithRouter';
import api from '../../services/api';


describe('Testa cadastro se usuario pelo Adim', () => {
  afterEach(() => {
    global.localStorage.clear();
    jest.restoreAllMocks();
  });

  it('Deve Cadastrar um usario com sucesso', async () => {
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

    const mockUserRegisterAdmin = { data: {
      id: 5,
      name: 'Cliente gropo 23',
      email: 'grupo23@email.com',
      role: 'customer',
      token: 'grupo23B',
    } };

    jest.spyOn(api,'post').mockResolvedValue(mockUser)
    jest.spyOn(api,'get').mockResolvedValue(mockUsers)

    const loginBtn = screen.getByTestId('common_login__button-login');
    expect(loginBtn).toBeDisabled();

    const emailInputLogin = screen.getByTestId('common_login__input-email');
    await user.type(emailInputLogin, 'adm@deliveryapp.com');
    expect(emailInputLogin).toHaveProperty('value', 'adm@deliveryapp.com');

    const passwordInputLogin = screen.getByTestId('common_login__input-password');
    await user.type(passwordInputLogin, '--adm2@21!!--');
    expect(passwordInputLogin).toHaveProperty('value', '--adm2@21!!--');

    expect(loginBtn).not.toBeDisabled();
    await user.click(loginBtn);

    await waitFor(() => {
      const path = window.location.pathname;
      expect(path).toBe('/admin/manage')
    })

    // Cadastro

    const nameInput = screen.getByTestId('admin_manage__input-name');
    await user.type(nameInput, 'Cliente gropo 23');
    expect(nameInput).toHaveProperty('value', 'Cliente gropo 23');


    const emailInput = screen.getByTestId('admin_manage__input-email');
    await user.type(emailInput, 'grupo23@email.com');
    expect(emailInput).toHaveProperty('value', 'grupo23@email.com');

    const passwordInput = screen.getByTestId('admin_manage__input-password');
    await user.type(passwordInput, '$#grupo23#$');
    expect(passwordInput).toHaveProperty('value', '$#grupo23#$');

    const selectInput = screen.getByTestId('admin_manage__select-role');
    await user.selectOptions(selectInput, ['Cliente']);
    expect(selectInput).toHaveValue('customer');

    const cadastrarBtn = screen.getByTestId('admin_manage__button-register')
    expect(cadastrarBtn).not.toBeDisabled();
    await user.click(cadastrarBtn);

    jest.spyOn(api,'post').mockResolvedValue(mockUserRegisterAdmin)

  });
  /* it('Deve mostrar uma mensagem de erro', async () => {
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

    const emailInputLogin = screen.getByTestId('common_login__input-email');
    await user.type(emailInputLogin, 'adm@deliveryapp.com');
    expect(emailInputLogin).toHaveProperty('value', 'adm@deliveryapp.com');

    const passwordInputLogin = screen.getByTestId('common_login__input-password');
    await user.type(passwordInputLogin, '--adm2@21!!--');
    expect(passwordInputLogin).toHaveProperty('value', '--adm2@21!!--');

    expect(loginBtn).not.toBeDisabled();
    await user.click(loginBtn);

    await waitFor(() => {
      const path = window.location.pathname;
      expect(path).toBe('/admin/manage')
    })

    // Cadastro

    const nameInput = screen.getByTestId('admin_manage__input-name');
    await user.type(nameInput, 'Cliente gropo 23');
    expect(nameInput).toHaveProperty('value', 'Cliente gropo 23');


    const emailInput = screen.getByTestId('admin_manage__input-email');
    await user.type(emailInput, 'grupo23@email.com');
    expect(emailInput).toHaveProperty('value', 'grupo23@email.com');

    const passwordInput = screen.getByTestId('admin_manage__input-password');
    await user.type(passwordInput, '$#grupo23#$');
    expect(passwordInput).toHaveProperty('value', '$#grupo23#$');

    const selectInput = screen.getByTestId('admin_manage__select-role');
    await user.selectOptions(selectInput, ['Cliente']);
    expect(selectInput).toHaveValue('customer');
    
    const cadastrarBtn = screen.getByTestId('admin_manage__button-register')
    expect(cadastrarBtn).not.toBeDisabled();

    jest.spyOn(api,'post').mockRejectedValue(new Error('erro no teste da api mock'));
      
    await user.click(cadastrarBtn);
    
    await waitFor(() => {  
      const errorMsg = screen.getByTestId('common_register__element-invalid_register');
      expect(errorMsg).toBeInTheDocument();
    });
  }); */
});
