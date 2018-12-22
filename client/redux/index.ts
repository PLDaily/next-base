import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import isPro from '../utils/env';
import isNode from '../utils/isNode';

import { rootEpics, rootReducers } from './modules';

let middlewares = [
  createEpicMiddleware(rootEpics),
];

if (!isPro && !isNode) {
  middlewares = [...middlewares, createLogger({ collapsed: true })];
}

export let store;

export default function configureStore(initialState) {
  const applyedMiddleware = applyMiddleware(...middlewares);

  store = createStore(
    rootReducers,
    initialState,
    compose(
      applyedMiddleware,
      !isPro && !isNode && window.devToolsExtension
        ? window.devToolsExtension() : f => f
    )
  );

  return store;
}
