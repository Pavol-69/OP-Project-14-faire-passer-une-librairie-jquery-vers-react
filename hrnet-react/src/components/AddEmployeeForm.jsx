import "../style/generalCSS.scss";
import "../style/components/AddEmployeeForm.scss";
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { states } from "../store/states";
import { departments } from "../store/departments";
import DropDownMenu from "./DropDownMenu";
import TextField from "@mui/material/TextField";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

import { useDispatch } from "react-redux";

import { employeeSlice } from "../store/slices/employeeSlice";

function AddEmployeeForm() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [birthDate, setBirthDate] = useState(dayjs("12/20/1991"));
  const [startDate, setStartDate] = useState(dayjs("01/01/2025"));
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    startDate: dayjs(startDate).format("DD/MM/YYYY"),
    department: "",
    birthDate: dayjs(birthDate).format("DD/MM/YYYY"),
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });

  function onChangeHandle(e) {
    e.preventDefault();
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  }

  return birthDate != "" && startDate != "" ? (
    <>
      <form className="add_epy_form">
        <TextField
          name="firstName"
          label="First Name"
          onChange={(e) => onChangeHandle(e)}
          className="add_epy_form_input"
        />
        <TextField
          name="lastName"
          label="Last Name"
          onChange={(e) => onChangeHandle(e)}
          className="add_epy_form_input"
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start Date"
            value={startDate}
            inputFormat="DD/MM/YYYY"
            onChange={(newValue) => {
              setStartDate(newValue);
              setEmployee({
                ...employee,
                startDate: dayjs(newValue.$d).format("DD/MM/YYYY"),
              });
            }}
            renderInput={(params) => <TextField {...params} />}
            className="add_epy_form_input"
          />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date of Birth"
            value={birthDate}
            inputFormat="DD/MM/YYYY"
            onChange={(newValue) => {
              setBirthDate(newValue);
              setEmployee({
                ...employee,
                birthDate: dayjs(newValue.$d).format("DD/MM/YYYY"),
              });
            }}
            renderInput={(params) => <TextField {...params} />}
            className="add_epy_form_input"
          />
        </LocalizationProvider>

        <fieldset className="address">
          <legend>Address</legend>
          <TextField
            name="street"
            label="Street"
            onChange={(e) => onChangeHandle(e)}
            className="add_epy_form_input"
          />
          <TextField
            name="city"
            label="City"
            onChange={(e) => onChangeHandle(e)}
            className="add_epy_form_input"
          />
          <DropDownMenu
            label={"State"}
            value={employee.state}
            name={"state"}
            data={states}
            onChangeHandle={onChangeHandle}
          />
          <TextField
            name="zipCode"
            label="Zip Code"
            onChange={(e) => onChangeHandle(e)}
            className="add_epy_form_input"
          />
        </fieldset>
        <DropDownMenu
          label={"Department"}
          value={employee.department}
          name={"department"}
          data={departments}
          onChangeHandle={onChangeHandle}
        />

        <button
          className="add_epy_form_button"
          onClick={(e) => {
            e.preventDefault();
            setShowModal(true);
            dispatch(employeeSlice.actions.addEmployee(employee));
          }}
        >
          Save
        </button>
      </form>
      <Dialog open={showModal} onClose={() => setShowModal(false)}>
        <DialogTitle>Employee added !</DialogTitle>
        <DialogContent>
          The employee has been added with the following informations : <br />
          {`- First Name : ${employee.firstName}`} <br />
          {`- last Name : ${employee.lastName}`} <br />
          {`- Start Date : ${employee.startDate}`}
          <br />
          {`- Birth Date : ${employee.birthDate}`}
          <br />
          {`- Street : ${employee.street}`} <br />
          {`- City : ${employee.city}`} <br />
          {`- State : ${employee.state}`} <br />
          {`- Zip Code : ${employee.zipCode}`} <br />
          {`- Department : ${employee.department}`} <br />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowModal(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  ) : (
    <></>
  );
}

export default AddEmployeeForm;
