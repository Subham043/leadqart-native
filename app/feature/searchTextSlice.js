import { createSlice } from '@reduxjs/toolkit';



export const seacrhTextSlice = createSlice({
  name: 'searchText',
  initialState : {
    searchText:"",
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setSeacrhText: (state, action) => {
      state.searchText = action.payload;
    },
  },
  
});

export const { setSeacrhText } = seacrhTextSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectSearchText = (state) => state.searchText.searchText;



export default seacrhTextSlice.reducer;