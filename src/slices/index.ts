import { loadingBarReducer } from "react-redux-loading-bar";
import { appSlice, loadAsync } from "./app";
import { addTweetAsync, toggleLikeAsync, tweetsSlice } from "./tweets";
import { usersSlice } from "./users";
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const actions = {
  app: {
    ...appSlice.actions,
    loadAsync,
    showLoading,
    hideLoading,
  },
  users: usersSlice.actions,
  tweets: { ...tweetsSlice.actions, toggleLikeAsync, addTweetAsync },

};

export const reducers = {
  app: appSlice.reducer,
  users: usersSlice.reducer,
  tweets: tweetsSlice.reducer,
  loadingBar: loadingBarReducer,
}

export default reducers;
