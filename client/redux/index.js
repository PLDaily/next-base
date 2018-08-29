import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import isPro from '../utils/env';
import { rootReducers, rootEpics } from './modules';

let middlewares = [
  createEpicMiddleware(rootEpics),
];

if (!isPro) {
  middlewares = [...middlewares, createLogger({ collapsed: true })];
}

export default function configureStore(initialState) {
  const applyedMiddleware = applyMiddleware(...middlewares)
  const store = createStore(
    rootReducers,
    initialState,
    applyedMiddleware
  );
  return store;
}