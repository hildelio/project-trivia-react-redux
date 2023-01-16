import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';
import { Redirect } from 'react-router-dom';
import { questionResultAction, addScore, nextQuestionAction } from '../redux/actions';
import '../App.css';
import { saveRanking } from '../services/localStorageAPI';

class QuestionCard extends Component {
  state = {
    isRunning: true,
    index: 0,
    seconds: 30,
    next: false,
  };

  componentDidMount() {
    this.handleTimer();
  }

  componentDidUpdate() {
    const { state: { seconds, isRunning }, props: { questionResultDispatch } } = this;
    if (!isRunning) {
      clearInterval(this.timerID);
    }
    if (seconds === 0) {
      clearInterval(this.timerID);
      questionResultDispatch();
    }
  }

  componentWillUnmount() {
    this.handleTimer();
  }

  handleTimer = () => {
    const ONE_SECOND = 1000;
    this.timerID = setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
    }, ONE_SECOND);
  };

  handleClickAnswer = (e) => {
    const { props: { questionResultDispatch, addScorePoints },
      state: { seconds } } = this;
    if (e.target.attributes['data-testid'].value.includes('correct-answer')) {
      const difficulty = e.target.attributes.difficulty.value;
      const basePoints = 10;
      const barrier = { hard: 3, medium: 2, easy: 1 };
      addScorePoints({ score: basePoints
        + (Number(seconds) * barrier[difficulty]),
      assertions: barrier.easy,
      });
    }
    this.setState({ isRunning: false });
    questionResultDispatch();
  };

  nextQuestion = () => {
    const maxIndex = 4;
    const { state: { index }, props: { nextQuestionDispatch,
      gravatarEmail, score, loginName } } = this;
    if (index < maxIndex) {
      this.setState({ seconds: 30, isRunning: true }, () => {
        clearInterval(this.timerID);
        this.handleTimer();
      });
      this.setState((prevState) => ({ ...prevState, index: prevState.index + 1,
      }), () => nextQuestionDispatch());
    }
    if (index === maxIndex) {
      saveRanking({ name: loginName,
        score,
        email: `https://www.gravatar.com/avatar/${MD5(gravatarEmail).toString()}`,
      });
      nextQuestionDispatch();
      this.setState({ next: true });
    }
  };

  render() {
    const { props: { questions, isDisabled }, state: { index, seconds, next } } = this;
    return (
      <div>
        {seconds}
        {next && <Redirect to="/feedback" />}
        <h3 data-testid="question-category">{questions[index].informations.category}</h3>
        <p data-testid="question-text">
          {questions[index].informations.question}
        </p>
        <section data-testid="answer-options">
          {/* Agora o index vem do Redux */}
          { questions[index].allAnswers.map((answer) => (
            <button
              data-testid={ answer.data }
              key={ answer.text }
              type="button"
              difficulty={ answer.difficulty }
              disabled={ isDisabled }
              className={ isDisabled ? `btn-answer ${answer.data}` : 'all-btn' }
              onClick={ (e) => this.handleClickAnswer(e) }
            >
              {answer.text}

            </button>
          ))}
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
  questionResultDispatch: () => dispatch(questionResultAction()),
  addScorePoints: (score) => dispatch(addScore(score)),
  nextQuestionDispatch: () => dispatch(nextQuestionAction()),
});

const mapStateToProps = ({ game, player }) => ({
  isDisabled: game.isDisabled,
  questions: game.alternatives,
  loginName: player.loginName,
  score: player.score,
  gravatarEmail: player.gravatarEmail,
});

QuestionCard.propTypes = {}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCard);
