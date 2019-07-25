import { ActionHandlerType } from 'aktion';

import { RawActionTypeType } from '@@universal/state/RawActionType';
import { ReduxStateType } from '@@universal/state/ReduxState';

const RawActionHandler: ActionHandlerType<RawActionTypeType, ReduxStateType> = {
  DECREMENT: {
    base: (state) => {
      return {
        ...state,
        count: state.count - 1,
      };
    },
  },
  INCREMENT: {
    base: (state: ReduxStateType) => {
      return {
        ...state,
        count: state.count + 1,
      };
    },
  },
};

export default RawActionHandler;
