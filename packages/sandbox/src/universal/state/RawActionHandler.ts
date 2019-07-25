import { ActionHandler } from 'aktion';

import { RawActionType } from '@@universal/state/rawActionType';
import { ReduxState } from '@@universal/state/reduxState';

const rawActionHandler: ActionHandler<RawActionType, ReduxState> = {
  DECREMENT: {
    base: (state) => {
      return {
        ...state,
        count: state.count - 1,
      };
    },
  },
  INCREMENT: {
    base: (state: ReduxState) => {
      return {
        ...state,
        count: state.count + 1,
      };
    },
  },
};

export default rawActionHandler;
