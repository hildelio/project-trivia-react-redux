import React from 'react';
import { getByTestId, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testa o componente <Login.js />', () => {
  test('Testa se a página de login é carregada', () => {
    const { history, getByRole, getByTestId } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');

    const email = getByTestId('input-gravatar-email');
    const nome = getByTestId('input-player-name');
    expect(email).toBeInTheDocument();
    expect(nome).toBeInTheDocument();

    const loginBtn = getByRole('button', { name: 'Play' });
    expect(loginBtn).toBeInTheDocument();

    const settingsBtn = getByRole('button', { name: 'Configurações' });
    expect(settingsBtn).toBeInTheDocument();

    const score = getByTestId('header-score');
    expect(score).toBeInTheDocument();
  });

  test('Testa se é possivel escrever nos inputs', () => {
    const { getByTestId } = renderWithRouterAndRedux(<App />);
    const nameInput = getByTestId('input-player-name');
    userEvent.type(nameInput, 'Luiza');
    expect(nameInput).toHaveDisplayValue('Luiza');

    const emailInput = getByTestId('input-gravatar-email');
    userEvent.type(emailInput, 'luizapogura@gmail.com');
    expect(emailInput).toHaveDisplayValue('luizapogura@gmail.com');
  });

  test('Testa se o botão, quando preenchidos os campos, é hablitado e redireciona para a página de Game', async () => {
    const { getByRole, getByTestId, history } = renderWithRouterAndRedux(<App />);

    const nameInput = getByTestId('input-player-name');
    userEvent.type(nameInput, 'Luiza');
    expect(nameInput).toHaveDisplayValue('Luiza');

    const emailInput = getByTestId('input-gravatar-email');
    userEvent.type(emailInput, 'luizapogura@gmail.com');
    expect(emailInput).toHaveDisplayValue('luizapogura@gmail.com');

    const loginBtn = getByRole('button', { name: 'Play' });
    expect(loginBtn).toBeInTheDocument();
    expect(loginBtn.disabled).toBe(false);
    userEvent.click(loginBtn);
  //  const { pathname } = history.location;

    await waitFor(() => {
      expect(history.location.pathname).toEqual('/game');
    });

    const profilePicture = getByTestId('header-profile-picture');
    expect(profilePicture).toBeInTheDocument();
    const score = getByTestId('header-score');
    expect(score).toBeInTheDocument();
  });

  test('Testa se o botão de Configuração redireciona para a página de Configuração', async () => {
    const { getByRole, getByTestId, history } = renderWithRouterAndRedux(<App />);
    const settingsBtn = getByRole('button', { name: 'Configurações' });
    expect(settingsBtn).toBeInTheDocument(); 

    await waitFor(() => {
      expect(settingsBtn.disabled).toBe(false);
    });

    userEvent.click(settingsBtn);
    const { pathname } = history.location;

    await waitFor(() => {
      expect(pathname).toBe('/settings');
    });
    
    const settings = screen.getByText(/Settings/i);
    expect(settings).toBeInTheDocument();
  });
});