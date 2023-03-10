import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testa a página de Login', () => {
  it('Deve realizar o login com sucesso', () => {
    renderWithRouter(<App />);

    const loginBtn = screen.getByTestId('common_login__button-login');
    expect(loginBtn).toBeDisabled();

    const emailInput = screen.getByTestId('common_login__input-email');
    userEvent.type(emailInput, 'zebirita@email.com');
    expect(emailInput).toHaveProperty('value', 'zebirita@email.com');

    const passwordInput = screen.getByTestId('common_login__input-password');
    userEvent.type(passwordInput, '$#zebirita#$');
    expect(passwordInput).toHaveProperty('value', '$#zebirita#$');

    expect(loginBtn).not.toBeDisabled();
    userEvent.click(loginBtn);
  });
});
