import React from 'react';
import { getByTestId, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

const initialEntries = '/game';
const INITIAL_STATE = {
  player: {
  name: 'Luiza',
  assertions: 0,
  score: 0,
  gravatarEmail: 'luizapogura@gmail.com',
  }
};

const mock = {
  response_code: 0,
  results: [
    {category:"Geography",
      type:"multiple",
      difficulty:"easy",
      question:"How many federal states does Germany have?",
      correct_answer:"16",
      incorrect_answers:["13","32","25"]},
    {category:"Geography",
      type:"multiple",
      difficulty:"medium",
      question:"Which of the following countries is within the Eurozone but outside of the Schengen Area?",
      correct_answer:"Cyprus",
      incorrect_answers:["Malta","Greece","Portugal"]},
    {category:"Entertainment: Japanese Anime & Manga",
      type:"multiple",
      difficulty:"easy",
      question:"Who is the true moon princess in Sailor Moon?",
      correct_answer:"Sailor Moon",
      incorrect_answers:["Sailor Venus","Sailor Mars","Sailor Jupiter"]},
    {category:"Science: Computers",
      type:"boolean",
      difficulty:"medium",
      question:"It&#039;s not possible to format a write-protected DVD-R Hard Disk.",
      correct_answer:"True",
      incorrect_answers:["False"]},
    {category:"Entertainment: Video Games",
      type:"multiple",
      difficulty:"medium",
      question:"Who is the main villain of Kirby&#039;s Return to Dreamland?",
      correct_answer:"Magolor",
      incorrect_answers:["Landia","King Dedede","Queen Sectonia "]}
    ]
    }

describe('Testa a página <Game.js />', () => {
  test('Testa se a página de game é carregada', async () => {
    jest.spyOn(global, 'fetch')
      global.fetch.mockResolvedValue({
          json: jest.fn().mockResolvedValue(mock)
      })

    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, initialEntries);
    expect(history.location.pathname).toBe('/game');
    expect(global.fetch).toHaveBeenCalled();

    const header = await screen.findByText(mock.results[0].category);
    expect(header).toBeInTheDocument();

    const question = await screen.findByText(mock.results[0].question);
    expect(question).toBeInTheDocument();
    expect(question).toHaveTextContent(/How many federal states does Germany have?/i)

    const answer1 = await screen.findByText(mock.results[0].correct_answer);
    expect(answer1).toBeInTheDocument();

    const answer2 = await screen.findByText(mock.results[0].incorrect_answers[0]);
    expect(answer1).toBeInTheDocument();

    const answer3 = await screen.findByText(mock.results[0].incorrect_answers[1]);
    expect(answer1).toBeInTheDocument();

    const answer4 = await screen.findByText(mock.results[0].incorrect_answers[2]);
    expect(answer1).toBeInTheDocument();

    const rankingBtn = screen.getByTestId('btn-ranking');
    expect(rankingBtn).toBeInTheDocument(); 
  });

  test('Testa se ao clicar em uma resposta, o botão de next aparece e mostra a', async () => {
    jest.spyOn(global, 'fetch')
      global.fetch.mockResolvedValue({
          json: jest.fn().mockResolvedValue(mock)
      })

    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, initialEntries);
    expect(history.location.pathname).toBe('/game');
    expect(global.fetch).toHaveBeenCalled();

    const question = await screen.findByText(mock.results[0].question);
    expect(question).toBeInTheDocument();

    const answer1 = await screen.findByText(mock.results[0].correct_answer);
    expect(answer1).toBeInTheDocument();

    userEvent.click(answer1);

    const nextBtn = await screen.getByTestId('btn-next');
    expect(nextBtn).toBeInTheDocument(); 
  });

  test('Testa se o botão do ranking está funcionando', async () => {
    jest.spyOn(global, 'fetch')
      global.fetch.mockResolvedValue({
          json: jest.fn().mockResolvedValue(mock)
      })

    const { history, store } = renderWithRouterAndRedux(<App />, INITIAL_STATE, initialEntries);
    expect(history.location.pathname).toBe('/game');

    const rankingBtn = screen.getByTestId('btn-ranking');
    expect(rankingBtn).toBeInTheDocument(); 

    userEvent.click(rankingBtn);

    await waitFor(() => {
      expect(history.location.pathname).toEqual('/ranking');
    });

    const ranking = await screen.findByText(/Ranking/i);
    expect(ranking).toBeInTheDocument();
})

});