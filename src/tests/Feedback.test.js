import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Feedback from '../pages/Feedback';
import App from '../App';

const initialEntries = '/feedback';
const INITIAL_STATE = {
  player: {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  }
};

describe('Testa o componente <Feedback.jsx />', () => {
  test('Testa se a página de feedback é carregada', async () => {
    const { getByTestId, getByText, getByRole } = renderWithRouterAndRedux(<Feedback />);

    const text = getByTestId('feedback-text');
    expect(text).toBeInTheDocument();

    const text1 = getByText(/Total de pontos:/i);
    const text2 = getByText(/Respostas corretas:/i);
    expect(text1).toBeInTheDocument();
    expect(text2).toBeInTheDocument();

    const score = getByTestId('feedback-total-score');
    expect(score).toBeInTheDocument();
    const total = getByTestId('feedback-total-question');
    expect(total).toBeInTheDocument();

    const rankingBtn = getByRole('button', { name: 'Ranking' })
    expect(rankingBtn).toBeInTheDocument();
    const againBtn = getByRole('button', { name: 'Play Again!' })
    expect(againBtn).toBeInTheDocument();
  });

  test('Testa se o botão de Ranking redireciona para a página de Ranking', async () => {
    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, initialEntries);
    const rankingBtn = screen.getByTestId('btn-ranking');
    expect(rankingBtn).toBeInTheDocument(); 

    userEvent.click(rankingBtn);
    
    await waitFor(() => {
      expect(history.location.pathname).toEqual('/ranking');
    });

    const ranking = screen.getByText(/Ranking/i);
    expect(ranking).toBeInTheDocument();
  });

  test('Testa se o botão de Play Again redireciona para a página inicial', async () => {
    const initialEntries = '/feedback';
    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, initialEntries);
    const homeBtn = screen.getByTestId('btn-play-again');
    expect(homeBtn).toBeInTheDocument(); 

    userEvent.click(homeBtn);
  
    await waitFor(() => {
      expect(history.location.pathname).toEqual('/');
    });
  });
});