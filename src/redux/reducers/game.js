import { ALTERNATIVES, QUESTIONS, QUESTION_RESULT, NEXT_QUESTION } from '../actions';

const INITIAL_STATE = {
  isDisabled: false,
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
  default: return state;
  }
};

export default gameReducer;
