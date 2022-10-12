import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import cryptoSlice from './cryptoSlice';

export default configureStore({
  reducer: {
    crypto: cryptoSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
