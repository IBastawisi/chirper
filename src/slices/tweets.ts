import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { saveLikeToggle, saveTweet } from '../utils/api';
import { loadAsync } from './app';

const initialState: { [key: string]: tweet } = {};

export const tweetsSlice = createSlice({
  name: 'tweets',
  initialState,
  reducers: {
    load: (state, action: PayloadAction<{ [key: string]: tweet }>) => action.payload,
    toggleLike: (state, action: PayloadAction<{id: string, hasLiked: Boolean, authedUser: string }>) => {
      let tweet = state[action.payload.id];
      action.payload.hasLiked? tweet.likes = tweet.likes.filter(u => u !== action.payload.authedUser) : tweet.likes.push(action.payload.authedUser)
    },
    add: (state, action: PayloadAction<tweet>) => {
      state[action.payload.id] = action.payload;
      if (action.payload.replyingTo) {
        state[action.payload.replyingTo].replies.push(action.payload.id)
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loadAsync.fulfilled, (state, action) => action.payload.tweets);
  },
});

export const toggleLikeAsync = createAsyncThunk('tweets/toggleLike', async (info: {id: string, hasLiked: Boolean, authedUser: string }, thunkAPI) => {
  thunkAPI.dispatch(tweetsSlice.actions.toggleLike(info))
  const response = await saveLikeToggle(info).catch(e => {
    thunkAPI.dispatch(tweetsSlice.actions.toggleLike(info))
  });
  return response
});

export const addTweetAsync = createAsyncThunk('tweets/add', async (info: {text: string, author: string, replyingTo: string|undefined }, thunkAPI) => {
  thunkAPI.dispatch(showLoading())
  const response = await saveTweet(info);
  thunkAPI.dispatch(tweetsSlice.actions.add(response))
  thunkAPI.dispatch(hideLoading())
  return response;
});

export default tweetsSlice.reducer;
