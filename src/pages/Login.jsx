import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userInfo } from '../redux/actions';
import { getTokenAPI } from '../services/api';
import { saveRanking, saveToken } from '../services/localStorageAPI';
import Header from '../components/Header';

class Login extends React.Component {
  state = {
    loginName: '',
    gravatarEmail: '',
    isDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { loginName, gravatarEmail } = this.state;
      const re = /\S+@\S+\.\S+/;
      const result = re.test(gravatarEmail);

      if (loginName.length > 0 && gravatarEmail.length > 0 && result === true) {
        this.setState({
          isDisabled: false,
        });
      } else {
        this.setState({
          isDisabled: true,
        });
      }
    });
  };

  handleClick = async () => {
    const { dispatch, history } = this.props;
    dispatch(userInfo(this.state));
    const response = await getTokenAPI();
    // dispatch(userToken(response.token));
    // const { loginName, gravatarEmail } = this.state;
    // this.setState({
    //   ranking: [
    //     {
    //       name: loginName,
    //       gravatarEmail,
    //     },
    //   ],
    // }, () => {
    //   const { ranking } = this.state;
    //   console.log(ranking);
    //   saveRanking(ranking);
    // });
    // saveRanking({ ranking: [{ name: loginName, score: 0, email: gravatarEmail }] });
    saveToken(response.token);
    history.push('/game');
  };

  render() {
    const { loginName, gravatarEmail, isDisabled } = this.state;
    const { history } = this.props;
    return (
      <div className="login-container">
        <Header />
        <input
          type="text"
          data-testid="input-player-name"
          onChange={ this.handleChange }
          value={ loginName }
          name="loginName"
          className="input-player-name"
          placeholder="Nome"
        />
        <input
          type="email"
          data-testid="input-gravatar-email"
          onChange={ this.handleChange }
          value={ gravatarEmail }
          name="gravatarEmail"
          className="email-input"
          placeholder="E-mail"
        />

        <button
          type="button"
          disabled={ isDisabled }
          onClick={ this.handleClick }
          className="login-button-submit"
          data-testid="btn-play"
        >
          Play
        </button>

        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => history.push('/settings') }
        >
          Configurações
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Login);
