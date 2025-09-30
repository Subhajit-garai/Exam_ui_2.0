

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice.js"
import examReducer from "./slice/examSlice.js"
import appReducer from "./slice/appSlice.js"
import noteReducer from "./slice/noteSlice.js"
 


const rootReducer = combineReducers({
  user :userReducer,
  exam :examReducer,
  app :appReducer,
  note :noteReducer,
})



 
 
export const store = configureStore({
  reducer: rootReducer,
});



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


