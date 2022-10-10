import { configureStore } from '@reduxjs/toolkit';
import { cryptoAPI } from './cryptoSlice';

const store = configureStore({
  reducer: {
    cryptoAPI: cryptoAPI.reducer,
  },
});

export default store;
