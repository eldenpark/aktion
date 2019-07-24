// import axios from 'axios';
import { logger } from 'jege';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const log = logger('[example-react]');

const PageOne: React.FC<any> = () => {
  const dispatch = useDispatch();

  // const counter = useSelector((state: any) => state.counter);
  const otherInformation = useSelector((state: any) => state.otherInformation);
  log('11', otherInformation);

  const handleClickDispatch = React.useCallback(() => {
    dispatch({
      type: 'INCREMENT',
    });
  }, []);

  return (
    <div>
      <p>Page One</p>
      <div>
        <button
          onClick={handleClickDispatch}
          type="button"
        >
          dispatch (Increment)
        </button>
      </div>
    </div>
  );
};

export default PageOne;
