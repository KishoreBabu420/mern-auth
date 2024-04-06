// Import the required libraries and modules
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';

// Use ReactDOM to create a root element and render the App component
// inside a React.StrictMode wrapper for better error handling and debugging
const rootElement = ReactDOM.createRoot(document.getElementById('root'));
rootElement.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
