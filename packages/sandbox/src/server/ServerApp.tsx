import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import React from 'react';

import Universal from '../universal/Universal';

const ServerApp: React.FC<ServerAppProps> = ({
  reduxStore,
  requestUrl,
}) => {
  return (
    <StaticRouter location={requestUrl}>
      <Provider store={reduxStore}>
        <Universal />
      </Provider>
    </StaticRouter>
  );
};

export default ServerApp;

interface ServerAppProps {
  reduxStore;
  requestUrl: string;
}
