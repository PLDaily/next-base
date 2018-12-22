import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import * as user from './user';

export interface State {
  user: user.State;
}

export const rootReducers = combineReducers({
  ...user.reducers,
});

const allEpics = [
  ...user.epics,
];

export const rootEpics = combineEpics(...allEpics);
