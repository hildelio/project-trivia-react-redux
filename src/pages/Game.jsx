import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { getQuestions } from '../services/api';
import QuestionCard from '../components/QuestionCard';
import { getToken } from '../services/localStorageAPI';
import { gameAlternatives, timerOverAction } from '../redux/actions/index';

class Game extends Component {
  state = {
    questions: [],
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

  render() {
    const { state: { questions }, props: { history } } = this;
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
          { questions.length > 0 && <QuestionCard /> }
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  allQuestions: (questions) => dispatch(gameAlternatives(questions)),
  timeOver: (payload) => dispatch(timerOverAction(payload)),
});

const mapStateToProps = ({ game, player }) => ({
  isDisabled: game.isDisabled,
  gravatarEmail: player.gravatarEmail,
  loginName: player.loginName,
  score: player.score,
});

Game.propTypes = {}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
