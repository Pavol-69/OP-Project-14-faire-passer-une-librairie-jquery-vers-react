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
    updateEmployee: (currentState, action) => {
      const employeesUpdated = currentState.map((employee) => {
        if (employee.id == action.payload.id) {
          return action.payload;
        } else {
          return employee;
        }
      });
      return employeesUpdated;
    },
    removeEmployee: (currentState, action) => {
      const list = [...currentState].filter(
        (item) => item.id !== action.payload.id
      );
      return list;
    },
  },
});
