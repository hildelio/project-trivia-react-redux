import React from 'react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { initialEntries, INITIAL_STATE, mock } from './Game.test';
import App from '../App';

export const INITIAL_STATE_TEST = {
  player: {
  name: 'Hildélio',
  assertions: 2,
  score: 136,
  gravatarEmail: 'luizapogura@gmail.com',
  }
};

const mockRanking = [
{
  name: "Hildélio",
  score: 136,
  email: "https://www.gravatar.com/avatar/105228ca9f8582f3d8f596b9634f65b7"
},
{
  name: "Segundo",
  score: 16,
  email: "https://www.gravatar.com/avatar/105228ca9f8582f3d8f596b9634f65b7"
}
]

window.localStorage.setItem('ranking', JSON.stringify(mockRanking))

describe('Testa o componente <Ranking.jsx />', () => {
  
  test('Testa se a página de Ranking é carregada', async () => {
    jest.spyOn(global, 'fetch')
      global.fetch.mockResolvedValue({
          json: jest.fn().mockResolvedValue(mock)
      })

    const {history} = renderWithRouterAndRedux(<App />, INITIAL_STATE_TEST, initialEntries);
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
    
    const listPlayer = screen.getAllByRole('listitem');
    expect(listPlayer).toHaveLength(2);
       
    // const avatarPlayer = screen.getByRole('img', {name: /gravatar/i})
    // const namePlayer = await screen.findByTestId(/player-name/i)
    // const scorePlayer = await screen.findByTestId(/player-score/i)
    // expect(avatarPlayer).toBeInTheDocument()
    // expect(namePlayer).toBeInTheDocument()
    // expect(scorePlayer).toBeInTheDocument()

    // const firstPlace = await screen.findAllByTestId(/player-name-0/i)
    // expect(firstPlace).toEqual('Hildélio'); 
    
    const buttonStart = screen.getByRole('button', {  name: /início/i})
    userEvent.click(buttonStart)
    expect(history.location.pathname).toBe('/');
  });
});