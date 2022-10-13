import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from '../features/store';
import App from '../App';

afterEach(cleanup);
test('Test WebApp is running', () => {
  render(
    <React.StrictMode>
      <Provider store={configureStore}>
        <Router>
          <App />
        </Router>
      </Provider>
    </React.StrictMode>,
  );
});
