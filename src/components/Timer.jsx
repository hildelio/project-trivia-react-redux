import React, { Component } from 'react';
import { connect } from 'react-redux';
import { questionResultAction, timerOverAction } from '../redux/actions';

class Timer extends Component {
  state = {
    seconds: 30,
  };

  componentDidMount() {
    this.handleTimer();
  }

  componentDidUpdate(_prevProps, prevState) {
    const { props: { timeOver, questionResultDispatch, isRunning } } = this;
    const TIME_LIMIT = 1;
    if (!isRunning) clearInterval(this.timerID);

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
      <div>
        {seconds}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  idDisabled: state.game.isDisabled,
});

const mapDispatchToProps = (dispatch) => ({
  timeOver: (payload) => dispatch(timerOverAction(payload)),
  questionResultDispatch: () => dispatch(questionResultAction()),
});

Timer.propTypes = {}.isRequired;
export default connect(mapStateToProps, mapDispatchToProps)(Timer);
