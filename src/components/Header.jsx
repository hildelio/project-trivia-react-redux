import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import logo from '../trivia.png';

class Header extends Component {
  render() {
    return (
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
      </header>
    );
  }
}

Header.propTypes = {

};

export default Header;
