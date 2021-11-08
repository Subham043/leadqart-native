import { createSlice } from '@reduxjs/toolkit';



export const reloadSlice = createSlice({
  name: 'reload',
  initialState : {
    reload:false,
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setReload: (state, action) => {
      state.reload = action.payload;
    },
  },
  
});

export const { setReload } = reloadSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectReload = (state) => state.reload.reload;



export default reloadSlice.reducer;