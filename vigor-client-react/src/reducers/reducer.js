import { combineReducers } from 'redux';
import { increment, decrement } from '../actions/actions';
import { checkLogin } from '../config/session';

let { LOGGED_IN_USER } = sessionStorage;

const userReducer = (state = LOGGED_IN_USER ? LOGGED_IN_USER : {}, action) => {
  switch (action.type) {
    case "LOG_IN":
      return action.payload;
    case "LOG_OUT":
      return {};
    default:
      return state;
  }
};

const loginReducer = (state = checkLogin(), action) => {
  switch (action.type) {
    case "LOG_IN":
      return true;
    case "LOG_OUT":
      return false;
    default:
      return state;
  }
};

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}

export const reducers = combineReducers({
  counter: counterReducer,
  user: userReducer,
  IsLogged: loginReducer,
});