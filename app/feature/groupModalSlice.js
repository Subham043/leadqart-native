import { createSlice } from '@reduxjs/toolkit';



export const groupModalSlice = createSlice({
  name: 'groupModal',
  initialState : {
    groupModal:false
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setGroupModal: (state, action) => {
      state.groupModal = action.payload;
    },
  },
  
});

export const { setGroupModal } = groupModalSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectGroupModal = (state) => state.groupModal.groupModal;



export default groupModalSlice.reducer;