import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { getInitialData } from '../utils/api';

export interface AppState {
  authedUser: string | null;
  loading: boolean;
}

const initialState: AppState = {
  authedUser: null,
  loading: true,
};

const AUTHED_ID = 'tylermcginnis'

export const loadAsync = createAsyncThunk('app/load', async (_, thunkAPI) => {
  thunkAPI.dispatch(showLoading())
  const response = await getInitialData();
  thunkAPI.dispatch(hideLoading())
  return response;
});

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAuthedUser: (state, action: PayloadAction<string>) => {
      state.authedUser = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.authedUser = AUTHED_ID;
      });
  },
});

export default appSlice.reducer;
