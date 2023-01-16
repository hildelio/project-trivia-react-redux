import { ALTERNATIVES, QUESTIONS, QUESTION_RESULT,
  NEXT_QUESTION, INIT, FINISHED } from '../actions';

const INITIAL_STATE = {
  isDisabled: false,
  timerOver: false,
  seconds: 30,
  questions: [],
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case QUESTIONS: {
    return {
      ...state,
      questions: action.payload,
    };
  }
  case ALTERNATIVES: {
    return {
      ...state,
      alternatives: action.payload,
    };
  }
  case QUESTION_RESULT:
    return {
      ...state,
      isDisabled: true,
    };
  case NEXT_QUESTION:
    return {
      ...state,
      isDisabled: false,
    };
  case INIT:
    return {
      ...state,
      timerOver: action.payload.timerOver,
    };
  case FINISHED:
    return {
      ...state,
      timerOver: action.payload.timerOver,
      seconds: action.payload.seconds,
    };
  default: return state;
  }
};

export default gameReducer;
