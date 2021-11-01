import { configureStore } from '@reduxjs/toolkit';
import groupModalReducer from './feature/groupModalSlice';

export const store = configureStore({
  reducer: {
    groupModal: groupModalReducer,
  },
});