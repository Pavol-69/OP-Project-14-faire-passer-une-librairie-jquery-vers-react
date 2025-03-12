import "../style/generalCSS.scss";
import "../style/components/EmployeeForm.scss";
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { states } from "../store/states";
import { departments } from "../store/departments";
import DropDownMenu from "./DropDownMenu";
import TextField from "@mui/material/TextField";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

function AddEmployeeForm({ employee, setEmployee, action }) {
  const birthDateFr = employee.birthDate.split("/");
  const startDateFr = employee.startDate.split("/");

  const [birthDate, setBirthDate] = useState(
    dayjs(`${birthDateFr[1]}/${birthDateFr[0]}/${birthDateFr[2]}`)
  );
  const [startDate, setStartDate] = useState(
    dayjs(`${startDateFr[1]}/${startDateFr[0]}/${startDateFr[2]}`)
  );

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
          value={employee.firstName}
        />
        <TextField
          name="lastName"
          label="Last Name"
          onChange={(e) => onChangeHandle(e)}
          className="add_epy_form_input"
          value={employee.lastName}
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
            value={employee.street}
          />
          <TextField
            name="city"
            label="City"
            onChange={(e) => onChangeHandle(e)}
            className="add_epy_form_input"
            value={employee.city}
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
            value={employee.zipCode}
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
            action(e, employee);
          }}
        >
          Save
        </button>
      </form>
    </>
  ) : (
    <></>
  );
}

export default AddEmployeeForm;
