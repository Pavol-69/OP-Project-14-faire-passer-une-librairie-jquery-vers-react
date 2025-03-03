import "../style/generalCSS.scss";
import "../style/components/AddEmployeeForm.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

function AddEmployeeForm() {
  const [birthtDate, setBirthDate] = useState(new Date("01/01/1990"));
  const [startDate, setStartDate] = useState(new Date());

  return (
    <form className="add_epy_form">
      <label htmlFor="first-name">First Name</label>
      <input className="add_epy_form_input" type="text" id="first-name" />

      <label htmlFor="last-name">Last Name</label>
      <input className="add_epy_form_input" type="text" id="last-name" />

      <label htmlFor="date-of-birth">Date of Birth</label>
      <DatePicker
        selected={birthtDate}
        onChange={(date) => setBirthDate(date)}
        showYearDropdown
        showMonthDropdown
        dateFormat="dd/MM/yyyy"
        dropdownMode="select"
      />

      <label htmlFor="start-date">Start Date</label>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        showYearDropdown
        showMonthDropdown
        dateFormat="dd/MM/yyyy"
        dropdownMode="select"
      />

      <fieldset className=" add_epy_form_input address">
        <legend>Address</legend>

        <label htmlFor="street">Street</label>
        <input className="add_epy_form_input" id="street" type="text" />

        <label htmlFor="city">City</label>
        <input className="add_epy_form_input" id="city" type="text" />

        <label htmlFor="state">State</label>
        <select className="add_epy_form_input" name="state" id="state"></select>

        <label htmlFor="zip-code">Zip Code</label>
        <input className="add_epy_form_input" id="zip-code" type="number" />
      </fieldset>

      <label htmlFor="department">Department</label>
      <select className="add_epy_form_input" name="department" id="department">
        <option>Sales</option>
        <option>Marketing</option>
        <option>Engineering</option>
        <option>Human Resources</option>
        <option>Legal</option>
      </select>

      <button
        className="add_epy_form_button"
        onClick={(e) => {
          e.preventDefault();
          console.log("toto");
        }}
      >
        Save
      </button>
    </form>
  );
}

export default AddEmployeeForm;
