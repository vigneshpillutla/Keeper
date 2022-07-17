import { AuthProvider } from 'providers/AuthProvider.jsx';
import NotesProvider from 'providers/NotesProvider.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import App from './App.jsx';

ReactDOM.render(
  <>
    <BrowserRouter>
      <AuthProvider>
        <NotesProvider>
          <App />
        </NotesProvider>
      </AuthProvider>
      <ToastContainer />
    </BrowserRouter>
  </>,
  document.getElementById('root')
);
