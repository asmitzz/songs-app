import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import { VideosContextProvider } from './contexts/VideosContextProvider';

ReactDOM.render(
  <React.StrictMode>
      <VideosContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </VideosContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);