const tokenKey = 'token';
const rankingKey = 'ranking';

export const saveToken = (token) => localStorage.setItem(tokenKey, token);

export const getToken = () => localStorage.getItem(tokenKey);

export const saveRanking = (ranking) => (
  localStorage.setItem(rankingKey, JSON.stringify(ranking)));

export const getRankingStorage = () => JSON.parse(localStorage.getItem(rankingKey));
