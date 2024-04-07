// Import the required libraries and modules
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';

import { store, persistor } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// Use ReactDOM to create a root element and render the App component
// inside a React.StrictMode wrapper for better error handling and debugging
const rootElement = ReactDOM.createRoot(document.getElementById('root'));
rootElement.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate
        persistor={persistor}
        loading={null}
      >
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
