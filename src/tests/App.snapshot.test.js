import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from '../features/store';
import App from '../App';

describe('Jest snapshot to test components', () => {
  afterEach(cleanup);
  test('Matches DOM snapshot', () => {
    const domTree = renderer
      .create(
        <React.StrictMode>
          <Provider store={configureStore}>
            <Router>
              <App />
            </Router>
          </Provider>
        </React.StrictMode>,
      )
      .toJSON();

    expect(domTree).toMatchSnapshot();
  });
});
