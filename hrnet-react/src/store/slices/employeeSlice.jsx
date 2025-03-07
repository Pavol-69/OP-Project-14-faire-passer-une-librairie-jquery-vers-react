import { createSlice } from "@reduxjs/toolkit";
import { getNewId } from "../selectors";

export const employeeSlice = createSlice({
  name: "employees",
  initialState: {},
  reducers: {
    addEmployee: (currentState, action) => {
      const newEmployee = action.payload;
      newEmployee.id = getNewId(currentState);
      const listWithNewEmployee = [...currentState, newEmployee];
      return listWithNewEmployee;
    },
    removeEmployee: (currentState, action) => {
      const list = [...currentState].filter(
        (item, index) => index !== action.payload
      );
      return list;
    },
  },
});
