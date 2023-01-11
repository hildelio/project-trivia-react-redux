import React, { Component } from 'react';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const score = 11;
    const totalQuestion = 5;
    const minNumber = 3;
    return (
      <div>
        <Header />
        <div>
          <span data-testid="feedback-text">
            { totalQuestion >= minNumber ? 'Well Done!' : 'Could be better...' }
          </span>
        </div>
        <div>
          <span>Total de pontos: </span>
          <span data-testid="feedback-total-score">{ score }</span>
        </div>
        <div>
          <span>Respostas corretas: </span>
          <span data-testid="feedback-total-question">{ totalQuestion }</span>
        </div>
      </div>
    );
  }
}

export default Feedback;
