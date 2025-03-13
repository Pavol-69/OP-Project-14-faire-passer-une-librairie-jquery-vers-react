import "../style/generalCSS.scss";
import "../style/pages/EmployeeListPage.scss";
import DataTable from "../components/DataTable/DataTable";
import { useSelector } from "react-redux";
import Banner from "../components/Banner";
import EmployeeForm from "../components/EmployeeForm";
import Modal from "../components/Modal";
import { useDispatch } from "react-redux";
import { employeeSlice } from "../store/slices/employeeSlice";

function EmployeeListPage() {
  const employees = useSelector((state) => state.employees);
  const dispatch = useDispatch();

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

  const modal = (
    showModal,
    setShowModal,
    employee,
    setEmployee,
    handleUpdate
  ) => (
    <Modal
      showModal={showModal}
      setShowModal={setShowModal}
      title={"Employee informations"}
      content={
        <EmployeeForm
          employee={employee}
          setEmployee={setEmployee}
          action={handleUpdate}
        />
      }
    />
  );

  const EmployeeUpdate = (employee) => {
    dispatch(employeeSlice.actions.updateEmployee(employee));
  };

  const EmployeeDelete = (employee) => {
    dispatch(employeeSlice.actions.removeEmployee(employee));
  };

  return (
    <div className="epy_list_page_ctn">
      <Banner toPage={"form"} />
      <DataTable
        data={employees}
        columns={columns}
        modal={modal}
        EmployeeDelete={EmployeeDelete}
        EmployeeUpdate={EmployeeUpdate}
      />
    </div>
  );
}

export default EmployeeListPage;
