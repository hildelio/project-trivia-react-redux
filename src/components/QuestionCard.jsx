import React, { Component } from 'react';
import { connect } from 'react-redux';
import { questionResultAction, addScore } from '../redux/actions';
import '../App.css';
import Timer from './Timer';

class QuestionCard extends Component {
  state = {
    isRunning: true,
  };

  componentDidMount() {
    const { props: isDisabled } = this;
    if (isDisabled) this.setState({ isRunning: true });
  }

  handleClickAnswer = (e) => {
    const { questionResultDispatch, seconds, addScorePoints } = this.props;
    if (e.target.attributes['data-testid'].value.includes('correct-answer')) {
      const difficulty = e.target.attributes.difficulty.value;
      const basePoints = 10;
      const barrier = {
        hard: 3,
        medium: 2,
        easy: 1,
      };
      addScorePoints({ score: basePoints
        + (Number(seconds) * Number(barrier[difficulty])),
      assertions: barrier.easy,
      });
    }
    this.setState({ isRunning: false });
    questionResultDispatch();
  };

  render() {
    const { props: { questions, isDisabled, index }, state: { isRunning } } = this;
    return (
      <div>
        <h3 data-testid="question-category">{questions[index].informations.category}</h3>
        {console.log('renderizou')}
        <p data-testid="question-text">
          {questions[index].informations.question}
        </p>
        <div><Timer isRunning={ isRunning } /></div>
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
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  questionResultDispatch: () => dispatch(questionResultAction()),
  addScorePoints: (score) => dispatch(addScore(score)),
});

const mapStateToProps = ({ game }) => ({
  isDisabled: game.isDisabled,
  seconds: game.seconds,
  questions: game.alternatives,
});

QuestionCard.propTypes = {}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCard);
