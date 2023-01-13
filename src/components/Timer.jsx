import React, { Component } from 'react';
import { connect } from 'react-redux';
import { questionResultAction, timerOverAction } from '../redux/actions';

class Timer extends Component {
  state = {
    seconds: 30,
  };

  componentDidMount() {
    const ONE_SECOND = 1000;
    this.timerID = setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
    }, ONE_SECOND);
  }

  componentDidUpdate(_prevProps, prevState) {
    const { props: { timeOver, questionResultDispatch } } = this;
    const TIME_LIMIT = 1;

    timeOver({
      timerOver: false,
      seconds: prevState.seconds,
    });

    if (prevState.seconds === TIME_LIMIT) {
      clearInterval(this.timerID);
      timeOver({
        timerOver: true,
        seconds: 0,
      });
      questionResultDispatch();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    const { state: { seconds } } = this;
    return (
      <div data-test>
        Timer
        {seconds}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  idDisabled: state.game.idDisabled,
});

const mapDispatchToProps = (dispatch) => ({
  timeOver: (payload) => dispatch(timerOverAction(payload)),
  questionResultDispatch: () => dispatch(questionResultAction()),
});

Timer.propTypes = {}.isRequired;
export default connect(mapStateToProps, mapDispatchToProps)(Timer);
