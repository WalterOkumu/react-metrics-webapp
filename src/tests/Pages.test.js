import { cleanup } from '@testing-library/react';
import configureStore from '../features/store';

jest.useFakeTimers();

const appState = configureStore.getState();

describe('Testing state in WebApp', () => {
  afterEach(cleanup);

  test('Testing loading in redux before fetch', () => {
    expect(appState.loading).toBe(undefined);
  });

  test('Testing data state', () => {
    expect(appState.crypto.data).toBeTruthy();
  });

  test('Testing coin state', () => {
    expect(appState.crypto.coin).toBeTruthy();
  });

  test('Testing loading state after fetch', () => {
    expect(appState.crypto.loading).toBeTruthy();
  });
});
