import { BrowserRouter } from 'react-router-dom';
import { createStore } from '@@universal/state';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import * as React from 'react';

import Universal from '../universal/Universal';

const reduxStore = createStore({
  preloadedState: window['__REDUX_STATE__'],
});

const ClientApp = () => {
  return (
    <BrowserRouter>
      <Provider store={reduxStore}>
        <Universal />
      </Provider>
    </BrowserRouter>
  );
};

export default hot(module)(ClientApp);
