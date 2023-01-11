import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import logo from '../trivia.png';

class Header extends Component {
  render() {
    const { gravatarEmail, name, score } = this.props;
    return (
      <header className="App-header">
        {
          gravatarEmail
        && <img
          src={ `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}` }
          alt="gravatar"
          data-testid="header-profile-picture"
        />
        }
        {
          name && <p data-testid="header-player-name">{name}</p>
        }
        <img src={ logo } className="App-logo" alt="logo" />
        {
          score
            ? <p data-testid="header-score">{score}</p>
            : <p data-testid="header-score">{0}</p>
        }
      </header>
    );
  }
}

Header.propTypes = {
  gravatarEmail: PropTypes.string,
  name: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.user.name,
  gravatarEmail: state.user.gravatarEmail,
});

export default connect(mapStateToProps)(Header);
