import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getRankingStorage } from '../services/localStorageAPI';

class Ranking extends Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    const ranking = getRankingStorage();
    const byOrder = ranking.sort(({ score }, { score: nextScore }) => nextScore - score);
    console.log(ranking, byOrder);
    this.setState({ ranking: byOrder });
  }

  render() {
    const { props: { history }, state: { ranking } } = this;
    return (
      <div>
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
            <div key={ `${e.name}-${index}` } role="listitem">
              <img src={ e.email } alt={ `gravatar${e.name}-${index}` } />
              <p data-testid={ `player-name-${index}` }>{e.name}</p>
              <p>
                {'Score: '}
                <span data-testid={ `player-score-${index}` }>{e.score}</span>
              </p>
            </div>
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
