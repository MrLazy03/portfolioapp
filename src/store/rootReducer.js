import {combineReducers} from '@reduxjs/toolkit';
import userDetailsReducer from './module/userDetails/userDetailsSlice';
const rootReducer = combineReducers({
  userDetails: userDetailsReducer,
});

export default rootReducer;
