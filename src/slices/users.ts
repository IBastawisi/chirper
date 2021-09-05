import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadAsync } from './app';

const initialState: { [key: string]: user } = {};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    load: (state, action: PayloadAction<{ [key: string]: user }>) => action.payload,
  },
  extraReducers: (builder) => {
    builder.addCase(loadAsync.fulfilled, (state, action) => action.payload.users);
  },

});


export default usersSlice.reducer;
