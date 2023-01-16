import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { resetUser } from '../redux/actions';

class Feedback extends Component {
  render() {
    const { props: { score, assertions, history, dispatch } } = this;
    const minNumber = 3;
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
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => {
            dispatch(resetUser());
            history.push('/');
          } }
        >
          Play Again!
        </button>
        <div>
          <span data-testid="feedback-text">
            { assertions >= minNumber ? 'Well Done!' : 'Could be better...' }
          </span>
        </div>
        <div>
          <span>Total de pontos: </span>
          <span data-testid="feedback-total-score">{ score }</span>
        </div>
        <div>
          <span>Respostas corretas: </span>
          <span data-testid="feedback-total-question">{ assertions }</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  assertions: player.assertions,
  score: player.score,
});

Feedback.propTypes = {}.isRequired;

export default connect(mapStateToProps)(Feedback);
