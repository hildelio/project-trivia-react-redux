import { TOKEN, USER_INFO } from '../actions';

const INITIAL_STATE = {
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
  default: return state;
  }
};

export default userReducer;
