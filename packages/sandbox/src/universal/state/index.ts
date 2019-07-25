import {
  applyMiddleware,
  createStore,
  Store,
} from 'redux';
import { interpolateActionType } from 'aktion';
import { logger } from 'jege';
import thunk from 'redux-thunk';

import RawActionHandler from './RawActionHandler';
import RawActionType from './RawActionType';
import ReduxState, {
  ReduxStateType,
} from './ReduxState';

const log = logger('[sandbox-web]');

const {
  interpolatedActionHandler,
  interpolatedActionType,
} = interpolateActionType({
  rawActionHandler: RawActionHandler,
  rawActionType: RawActionType,
});

function reducer(state: ReduxStateType, action) {
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
  preloadedState = ReduxState,
}: InitializeStoreArgs<ReduxStateType> = {}): Store<ReduxStateType> {
  return createStore(reducer, preloadedState, enhancer);
}

export {
  interpolatedActionType as ActionType,
  initializeStore,
};

interface InitializeStoreArgs<S> {
  preloadedState?: S;
}
