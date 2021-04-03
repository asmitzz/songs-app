import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { VideosContextProvider } from './contexts/VideosContextProvider';

ReactDOM.render(
  <React.StrictMode>
      <VideosContextProvider>
        <App />
      </VideosContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);