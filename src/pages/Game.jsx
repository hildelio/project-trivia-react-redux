import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';
import Header from '../components/Header';
import { getQuestions } from '../services/api';
import QuestionCard from '../components/QuestionCard';
import { getToken, saveRanking } from '../services/localStorageAPI';
import { gameAlternatives,
  nextQuestionAction, timerOverAction } from '../redux/actions/index';

class Game extends Component {
  state = {
    questions: [],
    index: 0,
  };

  async componentDidMount() {
    const { props: { history } } = this;
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
    const { props: { allQuestions } } = this;
    const num = 0.5;
    const newArr = questions.map((question) => {
      const informations = {
        category: question.category,
        type: question.type,
        difficulty: question.difficulty,
        question: question.question,
      };
      // criado novo parâmetro informations, reformulando os dados
      const allAnswers = [{ text: question.correct_answer,
        data: 'correct-answer',
        isCorrect: true,
        difficulty: question.difficulty,
      },
      ...question.incorrect_answers.map((ans, idx) => ({
        text: ans,
        data: `wrong-answer-${idx}`,
        isCorrect: false,
        difficulty: question.difficulty,
      }))];
      return {
        informations,
        allAnswers: allAnswers.sort(() => num - Math.random()),
        // sort agora fica direto no all answers para não atrapalhar o did update do timer
      };
    });
    // as alternativas vão para o Redux
    this.setState({
      questions: newArr,
    });
    allQuestions(newArr);
  };

  nextQuestion = () => {
    const maxIndex = 4;
    const { state: { index }, props: { nextQuestionDispatch, timeOver, history,
      gravatarEmail, score, loginName } } = this;
    if (index < maxIndex) {
      this.setState((prevState) => ({
        ...prevState,
        index: prevState.index + 1,
      }), () => nextQuestionDispatch());
      timeOver({ timeOver: false, seconds: 30 });
    }
    if (index === maxIndex) {
      saveRanking({
        name: loginName,
        score,
        email: `https://www.gravatar.com/avatar/${MD5(gravatarEmail).toString()}` });
      nextQuestionDispatch();
      history.push('/feedback');
    }
  };

  render() {
    const { state: { questions, index }, props: { isDisabled, history } } = this;
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
            questions.length > 0 && <QuestionCard index={ index } />
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
  allQuestions: (questions) => dispatch(gameAlternatives(questions)),
  timeOver: (payload) => dispatch(timerOverAction(payload)),
  nextQuestionDispatch: () => dispatch(nextQuestionAction()),
});

const mapStateToProps = ({ game, player }) => ({
  isDisabled: game.isDisabled,
  gravatarEmail: player.gravatarEmail,
  loginName: player.loginName,
  score: player.score,
});

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  isDisabled: PropTypes.bool.isRequired,
  nextQuestionDispatch: PropTypes.func.isRequired,
  allQuestions: PropTypes.func.isRequired,
  timeOver: PropTypes.func.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  loginName: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
