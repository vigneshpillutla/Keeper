import { AuthProvider } from 'providers/AuthProvider.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import App from './App.jsx';

ReactDOM.render(
  <>
    <AuthProvider>
      <App />
    </AuthProvider>
    <ToastContainer />
  </>,
  document.getElementById('root')
);
