import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import logo from '../trivia.png';

class Header extends Component {
  render() {
    const { gravatarEmail, loginName, score } = this.props;
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
          loginName && <p data-testid="header-player-name">{loginName}</p>
        }
        <img src={ logo } className="App-logo" alt="logo" />
        {
          score
            ? <p data-testid="header-score">{ score }</p>
            : <p data-testid="header-score">{ 0 }</p>
        }
      </header>
    );
  }
}

Header.propTypes = {
  gravatarEmail: PropTypes.string,
  loginName: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = ({ player }) => ({
  loginName: player.loginName,
  gravatarEmail: player.gravatarEmail,
  score: player.score,
});

export default connect(mapStateToProps)(Header);
