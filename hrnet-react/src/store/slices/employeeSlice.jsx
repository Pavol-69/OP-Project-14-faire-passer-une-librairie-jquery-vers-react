import { createSlice } from "@reduxjs/toolkit";

export const employeeSlice = createSlice({
  name: "employees",
  initialState: {},
  reducers: {
    addEmployee: (currentState, action) => {
      const listWithNewEmployee = [...currentState, action.payload];
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
