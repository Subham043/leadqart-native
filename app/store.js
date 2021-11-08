import { configureStore } from '@reduxjs/toolkit';
import groupModalReducer from './feature/groupModalSlice';
import userReducer from './feature/userSlice';
import refreshTokenReducer from './feature/refreshTokenSlice';
import reloadReducer from './feature/reloadSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    refreshToken: refreshTokenReducer,
    reload: reloadReducer,
    groupModal: groupModalReducer,
  },
});