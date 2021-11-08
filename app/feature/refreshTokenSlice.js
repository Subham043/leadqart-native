import { createSlice } from '@reduxjs/toolkit';



export const refreshTokenSlice = createSlice({
  name: 'refreshToken',
  initialState : {
    refreshToken:null,
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    removeRefreshToken: (state) => {
      state.refreshToken = null;
    },
  },
  
});

export const { setRefreshToken, removeRefreshToken } = refreshTokenSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectRefreshToken = (state) => state.refreshToken.refreshToken;



export default refreshTokenSlice.reducer;