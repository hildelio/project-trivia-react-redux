const key = 'token';

export const saveToken = (token) => localStorage.setItem(key, token);

export const getToken = () => JSON.parse(localStorage.getItem(key));
