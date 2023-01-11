const key = 'token';

export const saveToken = (token) => localStorage.setItem(key, JSON.stringify(token));

export const getToken = () => JSON.parse(localStorage.getItem(key));
