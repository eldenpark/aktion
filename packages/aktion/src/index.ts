import { logger } from 'jege';

const log = logger('[aktion]');

export function createActionType<AT extends ActionType>(
  rawActionType: AT,
): InterpolatedActionType<AT> {
  log('rawActionType: %j', rawActionType);

  const interpolatedActionType = {} as any;
  Object.keys(rawActionType)
    .forEach((actionType) => {
      interpolatedActionType[actionType] = {
        Base: actionType,
        Error: `${actionType}_ERROR`,
        Success: `${actionType}_SUCCESS`,
      };
    });

  return interpolatedActionType;
}

export function createActionHandler<AT extends ActionType, S>(
  rawActionHandler: RawActionHandler<AT, S>,
): InterpolatedActionHandler<S> {
  const interpolatedActionHandler = {
    default: (state) => state,
  } as any;

  Object.entries(rawActionHandler)
    .forEach(([actionType, reducerSuite]) => {
      interpolatedActionHandler[actionType] = (reducerSuite as any).base;
      interpolatedActionHandler[`${actionType}_ERROR`] = (reducerSuite as any).error;
      interpolatedActionHandler[`${actionType}_SUCCESS`] = (reducerSuite as any).success;
    });

  return interpolatedActionHandler;
}

export type Action = {
  type: string;
  [key: string]: any;
};

export type RawActionHandler<AT, S> = {
  [actionType in keyof AT]: ReducerSuite<S>;
};

type ActionType = {
  [actionType: string]: any;
};

type InterpolatedActionType<AT> = {
  [T in keyof AT]: {
    Base: T;
    Error: string;
    Success:string;
  }
};

interface InterpolatedActionHandler<S> {
  default: (state: S, action: Action) => S;
  [actionType: string]: (state: S, action: Action) => S;
}

type ReducerSuite<S> = {
  base?: (state: S, action: Action) => S;
  error?: (state: S, action: Action) => S;
  success?: (state: S, action: Action) => S;
};
