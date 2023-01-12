import React, { Component } from 'react';
import PropTypes from 'prop-types';

class QuestionCard extends Component {
  render() {
    const { question, allAnswers } = this.props;
    const num = 0.5;
    return (
      <div>
        <h3 data-testid="question-category">{question.category}</h3>
        <p data-testid="question-text">
          {question.question}
        </p>
        <section data-testid="answer-options">
          {
            allAnswers.sort(() => num - Math.random()).map((answer) => (
              <button
                data-testid={ answer.data }
                key={ answer.text }
                type="button"
              >
                {answer.text}

              </button>
            ))
          }
        </section>
      </div>
    );
  }
}

QuestionCard.propTypes = {
  question: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  allAnswers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default QuestionCard;
