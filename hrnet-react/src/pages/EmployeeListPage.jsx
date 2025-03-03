import "../style/generalCSS.scss";
import "../style/pages/EmployeeListPage.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import DataTable from "react-data-table-component";

function EmployeeListPage() {
  const employees = useSelector((state) => state.employees);
  const [searchText, setSearchText] = useState("");
  const columns = [
    { name: "ID", selector: (row) => row.id, omit: true },
    { name: "First Name", selector: (row) => row.firstName, sortable: true },
    { name: "Last Name", selector: (row) => row.lastName, sortable: true },
    { name: "Start Data", selector: (row) => row.startDate, sortable: true },
    { name: "Department", selector: (row) => row.department, sortable: true },
    { name: "Date of Birth", selector: (row) => row.birthDate, sortable: true },
    { name: "Street", selector: (row) => row.street, sortable: true },
    { name: "City", selector: (row) => row.city, sortable: true },
    { name: "State", selector: (row) => row.state, sortable: true },
    { name: "Zip Code", selector: (row) => row.zipCode, sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <button
            onClick={() => handleEdit(row)}
            style={{
              marginRight: "5px",
              padding: "5px 10px",
              backgroundColor: "#f0ad4e",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            ✏️ Modifier
          </button>
          <button
            onClick={() => handleDelete(row)}
            style={{
              padding: "5px 10px",
              backgroundColor: "#d9534f",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            ❌ Supprimer
          </button>
        </>
      ),
      ignoreRowClick: true, // Évite que les boutons déclenchent un clic sur la ligne
    },
  ];

  function handleEdit(row) {
    console.log(row);
  }
  function handleDelete(row) {
    console.log(row);
  }

  // Fonction de filtrage intégrée
  const filteredEmployees = employees.filter((employee) =>
    Object.values(employee).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <>
      <DataTable
        columns={columns}
        data={filteredEmployees}
        pagination
        highlightOnHover
        responsive
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 20]}
        subHeader
        subHeaderComponent={
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{
              padding: "8px",
              width: "300px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        }
      />
    </>
  );
}

export default EmployeeListPage;
