import { configureStore } from '@reduxjs/toolkit';
import groupModalReducer from './feature/groupModalSlice';
import userReducer from './feature/userSlice';
import refreshTokenReducer from './feature/refreshTokenSlice';
import reloadReducer from './feature/reloadSlice';
import searchTextReducer from './feature/searchTextSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    refreshToken: refreshTokenReducer,
    reload: reloadReducer,
    searchText: searchTextReducer,
    groupModal: groupModalReducer,
  },
});