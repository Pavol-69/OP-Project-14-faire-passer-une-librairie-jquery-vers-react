import "../../style/generalCSS.scss";
import "../../style/components/DataTable/DataTable.scss";
import "../../style/components/DataTable/DataTableMenu.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "font-awesome/css/font-awesome.min.css";
import {
  faChevronRight,
  faChevronLeft,
  faAnglesRight,
  faAnglesLeft,
} from "@fortawesome/free-solid-svg-icons";

import { useEffect } from "react";

function DataTableMenu({
  rowPerPage,
  setRowPerPage,
  numPage,
  setNumPage,
  nbTotRows,
  data,
  searchText,
  setSearchText,
  displayData,
  filters,
}) {
  // Dans le cas précis où on supprime le dernier élément d'une page
  // => On se retrouve à afficher une page qui n'existe plus
  useEffect(() => {
    if (numPage > nbTotPages()) {
      setNumPage(numPage - 1);
    }
  }, [data]);

  // Calcul le delta dans lequel on se trouve par rapport au nombre de ligne affichées
  function delta() {
    return `${1 + (numPage - 1) * rowPerPage}-${
      numPage * rowPerPage > nbTotRows ? nbTotRows : numPage * rowPerPage
    }`;
  }

  // Incrémente le numéro de page de +1 ou -1
  function changePage(dir) {
    if (numPage + dir > 0 && numPage + dir <= nbTotPages()) {
      setNumPage(numPage + dir);
    }
  }

  // Calcul le nombre total de page
  function nbTotPages() {
    return Math.ceil(nbTotRows / rowPerPage);
  }

  // Fonction recherche
  // Si ce qui est recherché est présent dans l'un des champs, alors on affiche
  function handleSearch(e) {
    setSearchText(e.target.value);
    displayData(filters, e.target.value);
  }

  return (
    <div className="data_table_menu_ctn">
      <div className="data_table_menu_nav_ctn">
        <div>
          <span>Rows per page: </span>
          <select
            onChange={(e) => {
              setNumPage(1);
              setRowPerPage(e.target.value);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
        <span>{`${delta()} of ${nbTotRows}`}</span>
        <div className="data_table_menu_btn_ctn elm_ct hor">
          <FontAwesomeIcon onClick={() => setNumPage(1)} icon={faAnglesLeft} />
          <FontAwesomeIcon
            onClick={() => changePage(-1)}
            icon={faChevronLeft}
          />
          <FontAwesomeIcon
            onClick={() => changePage(1)}
            icon={faChevronRight}
          />
          <FontAwesomeIcon
            onClick={() => setNumPage(nbTotPages())}
            icon={faAnglesRight}
          />
        </div>
      </div>
      <input
        value={searchText}
        onChange={(e) => handleSearch(e)}
        placeholder="Search..."
      />
    </div>
  );
}

export default DataTableMenu;
