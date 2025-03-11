import "../../style/generalCSS.scss";
import "../../style/components/DataTable/DataTable.scss";
import "../../style/components/DataTable/DataTableHeader.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "font-awesome/css/font-awesome.min.css";
import { faSort } from "@fortawesome/free-solid-svg-icons";

function DataTableHeader({
  data,
  columns,
  filters,
  setFilters,
  searchText,
  displayData,
}) {
  // Fonction pour définir les filtres
  // Chaque colonne peut avoir les données 0, 1, -1
  // Une seule colonne peut vavoir 1 ou -1, les autres sont remises à 0 automatiquement
  function handleFilter(e, index) {
    e.preventDefault();

    let filtersTemp = [...filters];
    const name = Object.keys(data[0])[index + 1];
    //console.log(data[0]["lastName"]);

    // On regarde dans quelle colonne on se situe
    const filtersCheck = filters.filter((filter) => filter.name == name);

    // Aucun résultat veut dire qu'il faut créer la données, par défault = 1
    if (filtersCheck.length == 0) {
      filtersTemp.push({ name: name, order: 1 });
    } else {
      // Sinon on fait évoluer les données
      filtersTemp = filters.map((filter) =>
        filter.name == name
          ? { ...filter, order: filter.order + 1 < 2 ? filter.order + 1 : -1 }
          : filter
      );
    }

    // Remise à 0 de tout le reste
    filtersTemp.forEach((filter) => {
      if (filter.name != name) {
        filter.order = 0;
      }
    });

    // Attribution des données pour le reste du code
    setFilters(filtersTemp);

    displayData(filtersTemp, searchText);
  }

  return (
    <div className="data_table_header">
      {columns.map((elt, index) => (
        <div className="header_cell" key={index}>
          <span className="cell">{elt.name}</span>
          <div
            className="filter_btn elm_ct"
            onClick={(e) => handleFilter(e, index)}
          >
            <FontAwesomeIcon icon={faSort} />
          </div>
        </div>
      ))}
      <div className="cell header_cell">Actions</div>
    </div>
  );
}
export default DataTableHeader;
