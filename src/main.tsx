import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import './index.css';
import { StyleProvider } from '@ant-design/cssinjs';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StyleProvider layer>
      <App />
    </StyleProvider>
  </React.StrictMode>
);
