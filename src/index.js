import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { router } from './routes';
import { RouterProvider } from 'react-router-dom';
import {AuthProvider} from './context/authContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </React.StrictMode>
);