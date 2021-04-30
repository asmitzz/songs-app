import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import { VideosContextProvider } from './contexts/VideosContextProvider';
import { AuthContextProvider } from './contexts/AuthContext';

ReactDOM.render(
  <React.StrictMode>
      <AuthContextProvider>
       <VideosContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
       </VideosContextProvider>
      </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);