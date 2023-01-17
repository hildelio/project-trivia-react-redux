import React from 'react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { initialEntries, INITIAL_STATE, mock } from './Game.test';
import App from '../App';

describe('Testa o componente <Ranking.jsx />', () => {
  
  test('Testa se a página de Ranking é carregada', async () => {
    jest.spyOn(global, 'fetch')
      global.fetch.mockResolvedValue({
          json: jest.fn().mockResolvedValue(mock)
      })

    const {history} = renderWithRouterAndRedux(<App />, INITIAL_STATE, initialEntries);
    expect(history.location.pathname).toBe('/game');
    expect(global.fetch).toHaveBeenCalled();

    const answer = await screen.findByTestId('correct-answer');
    userEvent.click(answer);
    const nextBtn = await screen.getByTestId('btn-next');
    userEvent.click(nextBtn);

    const answer2 = await screen.findByText(mock.results[1].correct_answer);
    userEvent.click(answer);
    userEvent.click(nextBtn);

    // const answer3 = await screen.findByText(mock.results[2].correct_answer);
    userEvent.click(answer);
    userEvent.click(nextBtn);

    // const answer4 = await screen.findByText(mock.results[3].correct_answer);
    userEvent.click(answer);
    userEvent.click(nextBtn);

    // const answer5 = await screen.findByText(mock.results[4].correct_answer);
    userEvent.click(answer);
    userEvent.click(nextBtn);


    const rankingBtn = screen.getByTestId('btn-ranking');
    userEvent.click(rankingBtn);

    const ranking = await screen.findByText(/Ranking/i);
    expect(ranking).toBeInTheDocument();

    const title = screen.getByRole('heading', {  name: /ranking/i})
    expect(title).toBeInTheDocument();
    
    const containerRanking = screen.findByRole('listitem');
    expect(containerRanking).toBeDefined()


    // const avatarPlayer = await screen.findByAltText(/gravatar/i)
    // expect(avatarPlayer).toBeInTheDocument();
    // const avatarPlayer = await screen.findByAltText(/gravatar/i);
    // const namePlayer = await screen.findByTestId(/player-name/i)
    // const scorePlayer = await screen.findByTestId(/player-score/i)
    // expect(avatarPlayer).toBeInTheDocument()
    // expect(namePlayer).toBeInTheDocument()
    // expect(scorePlayer).toBeInTheDocument()
    
    const buttonStart = screen.getByRole('button', {  name: /início/i})
    userEvent.click(buttonStart)
    expect(history.location.pathname).toBe('/');
  });
});