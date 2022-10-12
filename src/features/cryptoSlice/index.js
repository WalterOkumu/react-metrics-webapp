import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseUrl = process.env.REACT_APP_BASE_URL_DEV;

const initialState = {
  data: [],
  coin: [],
  loading: true,
};

export const fetchCrypto = createAsyncThunk('crypto/fetchCrypto', async () => {
  const data = await fetch(`${baseUrl}/coins`)
    .then((response) => response.json())
    .catch((error) => {
      throw new Error(error);
    });
  return data;
});

export const findCoin = createAsyncThunk('crypto/findCoin', async (id) => {
  const data = await fetch(`${baseUrl}/coins/${id}`)
    .then((response) => response.json())
    .catch((error) => {
      throw new Error(error);
    });
  return data;
});

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCrypto.pending, (state) => ({ ...state, loading: true }))
      .addCase(fetchCrypto.fulfilled, (state, { payload }) => ({
        ...state,
        loading: false,
        data: payload,
      }))
      .addCase(findCoin.pending, (state) => ({ ...state, loading: true }))
      .addCase(findCoin.fulfilled, (state, { payload }) => ({
        ...state,
        loading: false,
        coin: payload,
      }));
  },
});

export default cryptoSlice.reducer;
