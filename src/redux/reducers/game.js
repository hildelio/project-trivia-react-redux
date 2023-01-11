import { ALTERNATIVES, QUESTIONS } from '../actions';

const INITIAL_STATE = {
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
  default: return state;
  }
};

export default gameReducer;
