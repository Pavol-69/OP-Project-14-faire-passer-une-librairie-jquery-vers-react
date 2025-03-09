import "../../style/generalCSS.scss";
import "../../style/components/DataTable/DataTable.scss";
import "../../style/components/DataTable/DataTableLine.scss";

import { useState, useEffect } from "react";

import EmployeeForm from "../EmployeeForm";
import Modal from "../Modal";

import { useDispatch } from "react-redux";
import { employeeSlice } from "../../store/slices/employeeSlice";

// Crée un composant DataTable, en fonction de l'objet data
// => Ce composant est générique, et est voué à être réutiliser avec des données complètement différentes
// => On a donc besoin en données d'entrée de la data, et aussi des colonnes qui sera sous le format suivant :
// columns = [{
// name : "Nom Colonne"
// selector: (row) => row.parametre
// }, ...]
function DataTableLine({ row, columns }) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [employee, setEmployee] = useState(row);

  useEffect(() => {
    setEmployee(row);
  }, [row]);

  function handleUpdate(e, employee) {
    e.preventDefault();

    dispatch(employeeSlice.actions.updateEmployee(employee));
  }

  return (
    <div className="data_table_line_ctn">
      {columns.map((elt, index) => (
        <div key={index} className="cell line_cell">
          {elt.selector(row)}
        </div>
      ))}
      <div className="data_table_line_btn_ctn cell line_cell">
        <button
          onClick={() => setShowModal(true)}
          className="data_table_line_btn data_table_line_btn_change"
        >
          ✏️
        </button>
        <button
          onClick={() => dispatch(employeeSlice.actions.removeEmployee(row))}
          className="data_table_line_btn data_table_line_btn_delete"
        >
          ❌
        </button>
      </div>
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
    </div>
  );
}

export default DataTableLine;
