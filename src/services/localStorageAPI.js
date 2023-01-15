const tokenKey = 'token';
const rankingKey = 'ranking';

export const saveToken = (token) => localStorage.setItem(tokenKey, token);

export const getToken = () => localStorage.getItem(tokenKey);

export const getRankingStorage = () => {
  const currentRanking = JSON.parse(localStorage.getItem(rankingKey)) || [];
  return currentRanking;
};

export const saveRanking = (results) => {
  const ranking = getRankingStorage();
  const newArr = [...ranking, results];
  console.log(ranking);
  // currentRanking.push(results);
  localStorage.setItem(rankingKey, JSON.stringify(newArr));
};
