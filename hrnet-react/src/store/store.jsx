import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { employeeSlice } from "./slices/employeeSlice";
import { employeesList } from "./employeesList";

let state = {
  employees: employeesList,
};

export const store = configureStore({
  preloadedState: state,
  reducer: combineReducers({ employees: employeeSlice.reducer }),
});
