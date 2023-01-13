import React from 'react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Feedback from '../pages/Feedback';

describe('Testa o componente <Feedback.jsx />', () => {
  test('Testa se a página de feedback é carregada', async () => {
    const { getByTestId, getByText } = renderWithRouterAndRedux(<Feedback />);

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

  });
});