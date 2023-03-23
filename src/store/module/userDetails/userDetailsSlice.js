import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  name: '',
  age: '',
  skills: [],
  photo: '',
  location: '',
};

export const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    addUser: state => {
      state.value += 1;
    },
    deleteUser: state => {
      state.value -= 1;
    },
    deleteAll: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const {addUser, deleteUser, deleteAll} = userDetailsSlice.actions;
export default userDetailsSlice.reducer;
