import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { questionResultAction } from '../redux/actions';
import '../App.css';

class QuestionCard extends Component {
  handleClickAnswer = () => {
    const { questionResultDispatch } = this.props;
    questionResultDispatch();
  };

  render() {
    const { question, allAnswers, isDisabled } = this.props;
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
                disabled={ isDisabled }
                className={ isDisabled ? `btn-answer ${answer.data}` : 'all-btn' }
                onClick={ () => this.handleClickAnswer() }
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

const mapDispatchToProps = (dispatch) => ({
  questionResultDispatch: () => dispatch(questionResultAction()),
});

const mapStateToProps = (state) => ({
  isDisabled: state.game.isDisabled,
});

QuestionCard.propTypes = {
  question: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  allAnswers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isDisabled: PropTypes.bool.isRequired,
  questionResultDispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCard);
