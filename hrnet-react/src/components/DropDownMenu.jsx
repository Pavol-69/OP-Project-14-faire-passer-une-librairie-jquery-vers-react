import "../style/generalCSS.scss";
import "../style/components/AddEmployeeForm.scss";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";

function DropDownMenu({ label, value, name, data, onChangeHandle }) {
  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="dropDownMenuLabel">{label}</InputLabel>
        <Select
          className="add_epy_form_input"
          labelId="dropDownMenuLabel"
          name={name}
          value={value}
          onChange={(e) => onChangeHandle(e)}
        >
          {data.map((item, index) => (
            <MenuItem key={index} value={item.name}>
              {item.abbreviation
                ? `${item.name}, ${item.abbreviation}`
                : item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default DropDownMenu;
