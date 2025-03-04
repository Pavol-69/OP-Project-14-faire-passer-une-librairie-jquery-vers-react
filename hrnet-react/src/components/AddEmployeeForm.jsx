import "../style/generalCSS.scss";
import "../style/components/AddEmployeeForm.scss";
import DatePicker from "react-datepicker";
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

function AddEmployeeForm() {
  const [showModal, setShowModal] = useState(false);
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    startDate: new Date(),
    department: "",
    birthDate: new Date("01/01/1990"),
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });

  function onChangeHandle(e) {
    e.preventDefault();
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  }

  return (
    <>
      <form className="add_epy_form">
        <TextField
          name="firstName"
          label="First Name"
          onChange={(e) => onChangeHandle(e)}
        />
        <TextField
          name="lastName"
          label="Last Name"
          onChange={(e) => onChangeHandle(e)}
        />
        <label>Date of Birth</label>
        <DatePicker
          selected={employee.birthDate}
          onChange={(date) => setEmployee({ ...employee, birthDate: date })}
          showYearDropdown
          showMonthDropdown
          dateFormat="dd/MM/yyyy"
          dropdownMode="select"
        />
        <label>Start Date</label>
        <DatePicker
          selected={employee.startDate}
          onChange={(date) => setEmployee({ ...employee, startDate: date })}
          showYearDropdown
          showMonthDropdown
          dateFormat="dd/MM/yyyy"
          dropdownMode="select"
        />
        <fieldset className=" add_epy_form_input address">
          <legend>Address</legend>
          <TextField
            name="street"
            label="Street"
            onChange={(e) => onChangeHandle(e)}
          />
          <TextField
            name="city"
            label="City"
            onChange={(e) => onChangeHandle(e)}
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
          }}
        >
          Save
        </button>
      </form>
      <Dialog open={showModal} onClose={() => setShowModal(false)}>
        <DialogTitle>Message Important</DialogTitle>
        <DialogContent>Voici un message dans un modal.</DialogContent>
        <DialogActions>
          <Button onClick={() => setShowModal(false)}>Fermer</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddEmployeeForm;
