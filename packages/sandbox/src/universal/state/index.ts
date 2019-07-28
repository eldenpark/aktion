import {
  applyMiddleware,
  createStore,
  Store,
} from 'redux';
import { logger } from 'jege';
import thunk from 'redux-thunk';

import actionHandler from './actionHandler';
import ActionType from './ActionType';
import reduxState, {
  ReduxState,
} from './reduxState';

const log = logger('[sandbox-web]');

function reducer(state: ReduxState, action) {
  try {
    const relevantActionHandler = actionHandler[action.type]
      || actionHandler.default;
    return relevantActionHandler(state, action);
  } catch (err) {
    log('reducer(): error: %o', err);
    return state;
  }
}

const reduxLogger = () => (next) => (action) => {
  log('logger(): action: %j', action);
  return next(action);
};

const enhancer = applyMiddleware(reduxLogger, thunk);

function initializeStore({
  preloadedState = reduxState,
}: InitializeStoreArgs<ReduxState> = {}): Store<ReduxState> {
  return createStore(reducer, preloadedState, enhancer);
}

export {
  ActionType,
  initializeStore,
};

interface InitializeStoreArgs<S> {
  preloadedState?: S;
}
