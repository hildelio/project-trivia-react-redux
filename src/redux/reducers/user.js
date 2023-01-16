import { TOKEN, USER_INFO, ADD_SCORE, RESET_USER } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_INFO: {
    return {
      ...state,
      ...action.payload,
    };
  }
  case TOKEN: {
    return {
      ...state,
      token: action.payload,
    };
  }
  case ADD_SCORE:
    return {
      ...state,
      score: state.score + action.payload.score,
      assertions: state.assertions + action.payload.assertions,
    };
  case RESET_USER:
    console.log('arroz');
    return {
      name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '',
    };
  default: return state;
  }
};

export default userReducer;
