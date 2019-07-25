import { RawActionHandler } from 'aktion';

import { RawActionTypeType } from '@@universal/state/RawActionType';
import { ReduxState } from '@@universal/state/reduxState';

const rawActionHandler: RawActionHandler<RawActionTypeType, ReduxState> = {
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
