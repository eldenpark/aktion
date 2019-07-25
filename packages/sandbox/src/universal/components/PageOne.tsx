import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ActionType } from '@@universal/state';
import { ReduxStateType } from '@@universal/state/reduxState';

const PageOne: React.FC<any> = () => {
  const dispatch = useDispatch();
  const count = useSelector((state: ReduxStateType) => state.count);

  const handleClickIncrement = React.useCallback(() => {
    dispatch({
      type: ActionType.INCREMENT.Base,
    });
  }, []);

  const handleClickDecrement = React.useCallback(() => {
    dispatch({
      type: ActionType.DECREMENT.Base,
    });
  }, []);

  return (
    <div>
      <p>Page One</p>
      <div>
        <button
          onClick={handleClickIncrement}
          type="button"
        >
          increment
        </button>
        <button
          onClick={handleClickDecrement}
          type="button"
        >
          decrement
        </button>
        <p>{count}</p>
      </div>
    </div>
  );
};

export default PageOne;
