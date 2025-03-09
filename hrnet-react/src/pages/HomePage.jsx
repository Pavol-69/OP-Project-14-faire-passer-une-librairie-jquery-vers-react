import "../style/generalCSS.scss";
import "../style/pages/HomePage.scss";
import Banner from "../components/Banner";
import EmployeeForm from "../components/EmployeeForm";
import Modal from "../components/Modal";
import Message from "../components/Message";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { employeeSlice } from "../store/slices/employeeSlice";

function HomePage() {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    startDate: "01/01/2025",
    department: "",
    birthDate: "20/12/1991",
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });

  function addEmployee(e, employee) {
    e.preventDefault();
    setShowModal(true);
    dispatch(employeeSlice.actions.addEmployee(employee));
  }

  return (
    <div className="hp_ctn elm_ct ver">
      <Banner toPage={"list"} />
      <EmployeeForm
        employee={employee}
        setEmployee={setEmployee}
        action={addEmployee}
      />
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        title={"Employee added !"}
        content={<Message employee={employee} />}
      />
    </div>
  );
}

export default HomePage;
