import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getQuestions } from '../services/api';
import QuestionCard from '../components/QuestionCard';
import { getToken } from '../services/localStorageAPI';

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
    console.log(newArr);
  };

  render() {
    const { questions, index } = this.state;
    return (
      <div>
        <Header />
        <section>
          {
            questions.length > 0 && <QuestionCard
              question={ questions[index] }
              allAnswers={ questions[index].allAnswers }
            />
          }

        </section>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Game;
