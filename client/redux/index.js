import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import isPro from '../utils/env';
import { rootReducers, rootEpics } from './modules';

const epicMiddleware = createEpicMiddleware();

let middlewares = [
  epicMiddleware,
];

if (!isPro) {
  middlewares = [...middlewares, createLogger({ collapsed: true })];
}

export default function configureStore(initialState) {
  const applyedMiddleware = applyMiddleware(...middlewares)
  const store = createStore(
    rootReducers,
    initialState,
    compose(applyedMiddleware)
  );
  epicMiddleware.run(rootEpics)
  return store;
}