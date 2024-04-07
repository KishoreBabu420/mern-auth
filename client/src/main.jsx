// Import the required libraries and modules
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';

import { store } from './redux/store';
import { Provider } from 'react-redux';

// Use ReactDOM to create a root element and render the App component
// inside a React.StrictMode wrapper for better error handling and debugging
const rootElement = ReactDOM.createRoot(document.getElementById('root'));
rootElement.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
