import "../style/generalCSS.scss";
import "../style/components/EmployeeForm.scss";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

function DropDownMenu({ label, value, name, data, onChangeHandle }) {
  return (
    <FormControl fullWidth className="add_epy_form_input">
      <InputLabel id="dropDownMenuLabel">{label}</InputLabel>
      <Select
        labelId="dropDownMenuLabel"
        label={name}
        name={name}
        value={value}
        onChange={(e) => onChangeHandle(e)}
      >
        {data.map((item, index) => (
          <MenuItem key={index} value={item.name}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default DropDownMenu;
