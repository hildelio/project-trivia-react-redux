export const USER_INFO = 'USER_INFO';

export const userInfo = (info) => ({
  type: USER_INFO,
  payload: info,
});

export const TOKEN = 'TOKEN';

export const userToken = (token) => ({
  type: TOKEN,
  payload: token,
});

export const QUESTIONS = 'QUESTIONS';

export const userQuestions = (questions) => ({
  type: QUESTIONS,
  payload: questions,
});

export const ALTERNATIVES = 'ALTERNATIVES';

export const gameAlternatives = (alternatives) => ({
  type: ALTERNATIVES,
  payload: alternatives,
});

export const QUESTION_RESULT = 'QUESTION_RESULT';

export const questionResultAction = () => ({
  type: QUESTION_RESULT,
});

export const NEXT_QUESTION = 'NEXT_QUESTION';

export const nextQuestionAction = (payload) => ({
  type: NEXT_QUESTION,
  payload,
});

export const FINISHED = 'FINISHED';

export const timerOverAction = (payload) => ({
  type: FINISHED,
  payload,
});

export const INIT = 'INIT';
export const timerInitAction = (payload) => ({
  type: INIT,
  payload,
});

export const ADD_SCORE = 'ADD_SCORE';

export const addScore = (payload) => ({
  type: ADD_SCORE,
  payload,
});

export const RESET_USER = 'RESET_USER';

export const resetUser = () => ({
  type: RESET_USER,
});
