import React from 'react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Ranking from '../pages/Ranking';

describe('Testa o componente <Ranking.jsx />', () => {
  const fakeLocalStorage = (function() {
    let store = {
      ranking: [
        {name: "Hildélio Júnior", score: 100, email: "hildelio@gmail.com" },
        {name: "Luiza Ogura", score: 99, email: "luizaogura@mail.com"}
      ]
    };

    return {
      getItem: function(key) {
        return store[key] || null;
      },
      setItem: function(key, value) {
        store[key] = value.toString();
      },
      removeItem: function(key) {
        delete store[key];
      },
      clear: function() {
        store = {};
      }
    };
  })();
  test('Testa se a página de Ranking é carregada', async () => {

    renderWithRouterAndRedux(<Ranking />);
    const title = await screen.getByRole('heading', {  name: /ranking/i})
    expect(title).toBeInTheDocument();
    
    // const avatarPlayer = screen.getByRole('img', {  name: /foto de perfil do usuário/i})
    const namePlayer = screen.getByTestId(/player-name/i)
    const scorePlayer = screen.getByTestId(/player-score/i)
    expect(avatarPlayer).toBeInTheDocument()
    expect(namePlayer).toBeInTheDocument()
    expect(scorePlayer).toBeInTheDocument()
    
    const buttonStart = screen.getByRole('button', {  name: /início/i})
    userEvent.click(buttonStart)
    expect(history.location.pathname).toBe('/');
  });
});