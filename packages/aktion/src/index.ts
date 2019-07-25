import { logger } from 'jege';

const log = logger('[aktion]');

export function interpolateActionType<AT, S>({
  rawActionHandler,
  rawActionType,
}: InterpolateActionTypeArgs<AT, S>): InterpolateActionTypeResult<AT, S> {
  log('rawActionType', rawActionType, rawActionHandler);
  const interpolatedActionType = {} as any;
  Object.keys(rawActionType)
    .forEach((actionType) => {
      interpolatedActionType[actionType] = {
        Base: actionType,
        Error: `${actionType}_ERROR`,
        Success: `${actionType}_SUCCESS`,
      };
    });

  const interpolatedActionHandler = {
    default: (state) => state,
  } as any;

  Object.entries(rawActionHandler)
    .forEach(([actionType, reducerSuite]) => {
      interpolatedActionHandler[actionType] = (reducerSuite as any).base;
      interpolatedActionHandler[`${actionType}_ERROR`] = (reducerSuite as any).error;
      interpolatedActionHandler[`${actionType}_SUCCESS`] = (reducerSuite as any).success;
    });

  return {
    interpolatedActionHandler,
    interpolatedActionType,
  };
}

export type Action = {
  type: string;
  [key: string]: any;
};

export type ActionHandlerType<AT, S> = {
  [actionType in keyof AT]: ReducerSuite<S>;
};

interface InterpolateActionTypeArgs<AT, S> {
  rawActionHandler: ActionHandlerType<AT, S>;
  rawActionType: AT;
}

interface InterpolateActionTypeResult<AT, S> {
  interpolatedActionHandler: InterpolatedActionHandler<S>;
  interpolatedActionType: InterpolatedActionType<AT>;
}

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
