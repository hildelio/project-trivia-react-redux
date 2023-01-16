import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getRankingStorage } from '../services/localStorageAPI';

class Ranking extends Component {
  render() {
    const { ranking } = getRankingStorage() || [];
    const { history } = this.props;
    return (
      <div>
        <Header />
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Início
        </button>
        {
          ranking && ranking.map((e, index) => (
            <p
              key={ e.name }
              data-testid={ `player-name-${index}` }
            >
              {e.name}
            </p>
          ))
        }
        {
          ranking && ranking.map((e, index) => (
            <p key={ e.name } data-testid={ `player-score-${index}` }>{e.score}</p>
          ))
        }
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Ranking;
