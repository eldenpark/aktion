import {
  applyMiddleware,
  createStore,
  Store,
} from 'redux';
import { interpolateActionType } from 'aktion';
import { logger } from 'jege';
import thunk from 'redux-thunk';

import rawActionHandler from './rawActionHandler';
import rawActionType from './rawActionType';
import reduxState, {
  ReduxState,
} from './reduxState';

const log = logger('[sandbox-web]');

const {
  interpolatedActionHandler,
  interpolatedActionType,
} = interpolateActionType({
  rawActionHandler,
  rawActionType,
});

function reducer(state: ReduxState, action) {
  try {
    const actionHandler = interpolatedActionHandler[action.type]
      || interpolatedActionHandler.default;
    return actionHandler(state, action);
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
  interpolatedActionType as ActionType,
  initializeStore,
};

interface InitializeStoreArgs<S> {
  preloadedState?: S;
}
