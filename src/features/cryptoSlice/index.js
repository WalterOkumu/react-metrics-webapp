import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseURL = process.env.REACT_APP_BASE_URL;

const createRequest = (url) => ({ url });

export const cryptoAPI = createApi({
  reducerPath: 'cryptoAPI',
  baseQuery: fetchBaseQuery({ baseURL }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: () => createRequest('/coins'),
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coins/${coinId}`),
    }),
  }),
});

export const { useGetCryptosQuery, useLazyGetCryptoDetailsQuery } = cryptoAPI;
