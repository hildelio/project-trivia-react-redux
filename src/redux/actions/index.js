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
