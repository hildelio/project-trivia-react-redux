import { combineReducers } from 'redux';
import gameReducer from './game';
import userReducer from './user';

// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

const rootReducer = combineReducers({ player: userReducer, game: gameReducer });

export default rootReducer;
