import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { getQuestions } from '../services/api';
import QuestionCard from '../components/QuestionCard';
import { getToken } from '../services/localStorageAPI';
import { nextQuestionAction } from '../redux/actions/index';

class Game extends Component {
  state = {
    questions: [],
    index: 0,
  };

  async componentDidMount() {
    const { history } = this.props;
    const token = getToken();
    const { results } = await getQuestions(token);
    if (results.length === 0) {
      localStorage.removeItem('token');
      history.push('/');
    } else {
      this.makeRandomAnswersList(results);
    }
  }

  makeRandomAnswersList = (questions) => {
    const newArr = questions.map((question) => {
      const allAnswers = [{ text: question.correct_answer,
        data: 'correct-answer',
        isCorrect: true },
      ...question.incorrect_answers.map((ans, idx) => ({
        text: ans, data: `wrong-answer-${idx}`, isCorrect: false }))];
      return {
        ...question,
        allAnswers,
      };
    });
    this.setState({
      questions: newArr,
    });
  };

  nextQuestion = () => {
    const maxIndex = 4;
    const { index } = this.state;
    const { nextQuestionDispatch } = this.props;
    nextQuestionDispatch();
    if (index < maxIndex) {
      this.setState((prevState) => ({
        ...prevState,
        index: prevState.index + 1,
      }));
    }
  };

  render() {
    const { questions, index } = this.state;
    const { isDisabled, history } = this.props;
    return (
      <div>
        <Header />
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
        </button>
        <section>
          {
            questions.length > 0 && <QuestionCard
              question={ questions[index] }
              allAnswers={ questions[index].allAnswers }
            />
          }

        </section>
        <div>
          { isDisabled && (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ () => this.nextQuestion() }
            >
              Next
            </button>
          )}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  nextQuestionDispatch: () => dispatch(nextQuestionAction()),
});

const mapStateToProps = (state) => ({
  isDisabled: state.game.isDisabled,
});

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  isDisabled: PropTypes.bool.isRequired,
  nextQuestionDispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
