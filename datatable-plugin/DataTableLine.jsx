import "./style/generalCSS.scss";
import "./style/DataTable.scss";
import "./style/DataTableLine.scss";

import { useState, useEffect } from "react";

// Crée un composant DataTable, en fonction de l'objet data
// => Ce composant est générique, et est voué à être réutiliser avec des données complètement différentes
// => On a donc besoin en données d'entrée de la data, et aussi des colonnes qui sera sous le format suivant :
// columns = [{
// name : "Nom Colonne"
// selector: (row) => row.parametre
// }, ...]
function DataTableLine({
  row,
  columns,
  modal,
  EmployeeDelete,
  EmployeeUpdate,
}) {
  const [showModal, setShowModal] = useState(false);
  const [rowTemp, setRowTemp] = useState(row); // Tempo pendant qu'on fait les modifs sur le Form

  useEffect(() => {
    setRowTemp(row);
  }, [row]);

  function handleUpdate(e, employee) {
    e.preventDefault();
    EmployeeUpdate(employee);
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
          onClick={() => EmployeeDelete(row)}
          className="data_table_line_btn data_table_line_btn_delete"
        >
          ❌
        </button>
        {modal(showModal, setShowModal, rowTemp, setRowTemp, handleUpdate)}
      </div>
    </div>
  );
}

export default DataTableLine;
