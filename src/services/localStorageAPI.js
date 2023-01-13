const key = 'token';

export const saveToken = (token) => localStorage.setItem(key, token);

export const getToken = () => localStorage.getItem(key);
