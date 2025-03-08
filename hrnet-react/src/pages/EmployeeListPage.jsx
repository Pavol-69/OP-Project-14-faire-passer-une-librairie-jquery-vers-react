import "../style/generalCSS.scss";
import "../style/pages/EmployeeListPage.scss";
import DataTable from "../components/DataTable/DataTable";
import { useSelector } from "react-redux";
import Banner from "../components/Banner";

function EmployeeListPage() {
  const employees = useSelector((state) => state.employees);

  const columns = [
    { name: "First Name", selector: (row) => row.firstName },
    { name: "Last Name", selector: (row) => row.lastName },
    { name: "Start Date", selector: (row) => row.startDate },
    { name: "Department", selector: (row) => row.department },
    { name: "Date of Birth", selector: (row) => row.birthDate },
    { name: "Street", selector: (row) => row.street },
    { name: "City", selector: (row) => row.city },
    { name: "State", selector: (row) => row.state },
    { name: "Zip Code", selector: (row) => row.zipCode },
  ];

  return (
    <>
      <Banner toPage={"form"} />
      <DataTable data={employees} columns={columns} />
    </>
  );
}

export default EmployeeListPage;
