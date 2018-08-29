import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import {
  reducers as userReducers,
  epics as userEpics,
} from './user';

export const rootReducers = combineReducers({
  ...userReducers,
});

const allEpics = [
  ...userEpics,
];

export const rootEpics = combineEpics(...allEpics);
