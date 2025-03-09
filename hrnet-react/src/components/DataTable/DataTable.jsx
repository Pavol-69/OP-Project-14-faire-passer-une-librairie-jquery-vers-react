import "../../style/generalCSS.scss";
import "../../style/components/DataTable/DataTable.scss";

import DataTableLine from "./DataTableLine";
import DataTableMenu from "./DataTableMenu";

import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "font-awesome/css/font-awesome.min.css";
import { faSort } from "@fortawesome/free-solid-svg-icons";

// Crée un composant DataTable, en fonction de l'objet data
// => Ce composant est générique, et est voué à être réutiliser avec des données complètement différentes
// => On a donc besoin en données d'entrée de la data, et aussi des colonnes qui sera sous le format suivant :
// columns = [{
// name : "Nom Colonne"
// selector: (row) => row.parametre
// }, ...]
function DataTable({ data, columns }) {
  // A chaque ligne, on va considérer qu'il y aura toujours :
  // - un bouton pour modifier les données
  // - un autre pour supprimer la ligne

  const [filteredData, setFilteredData] = useState("");
  const [rowPerPage, setRowPerPage] = useState(5);
  const [numPage, setNumPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  // Pour chaque colonne
  // 0, on ne fait rien
  // 1, on tri dans un sens
  // -1, on tri dans l'autre sens
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    setFilteredData(data);
    displayData(filters, searchText);
  }, [data]);

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

  // Affiche les données selon les filtres et la recherche
  function displayData(filtersList, text) {
    // Récupérationd des données du filter souhaité
    let myFilter = { name: "", order: 0 };
    filtersList.forEach((filter) => {
      if (filter.order != 0) {
        myFilter = { ...filter };
      }
    });

    let dataFiltersBis = [...data];
    // On ne fait rien si l'ordre est à 0
    if (myFilter.order != 0) {
      dataFiltersBis.sort((a, b) => {
        // Tri différent de s'il est fonction de date ou de string
        if (isDate(a[myFilter.name])) {
          return triDate(a, b, myFilter);
        } else {
          return triText(a, b, myFilter);
        }
      });
    }

    // Fonction de filtrage intégrée
    const dataBis = dataFiltersBis.filter((row) =>
      Object.values(row).some(
        (value) =>
          typeof value === "string" && // pour ignorer l'id
          value.toLowerCase().includes(text.toLowerCase())
      )
    );

    setFilteredData(dataBis);
  }

  // Nous dit si une string est une date ou non
  function isDate(date) {
    const newDate = new Date(date);
    const split = date.split("/");
    if (newDate != "Invalid Date" && split.length == 3) {
      return true;
    } else {
      return false;
    }
  }

  // Tri date
  function triDate(a, b, filter) {
    const eltA = a[filter.name].split("/");
    const eltB = b[filter.name].split("/");

    // Comme le format de base est celui MM/DD/YYYY, et que toutes les dates ont été générées sous forme de string "DD/MM/YYYY"
    // On va faire la comparaison nous même
    if (eltB[2] < eltA[2]) {
      return 1 * filter.order;
    } else if (eltB[2] > eltA[2]) {
      return -1 * filter.order;
    } else {
      if (eltB[1] < eltA[1]) {
        return 1 * filter.order;
      } else if (eltB[1] > eltA[1]) {
        return -1 * filter.order;
      } else {
        if (eltB[0] < eltA[0]) {
          return 1 * filter.order;
        } else {
          return -1 * filter.order;
        }
      }
    }
  }

  // Tri texte
  function triText(a, b, filter) {
    const eltA = a[filter.name].toUpperCase();
    const eltB = b[filter.name].toUpperCase();
    if (eltA < eltB) {
      return -1 * filter.order;
    } else if (eltA > eltB) {
      return 1 * filter.order;
    } else {
      return 0;
    }
  }

  return filteredData != "" ? (
    <div className="data_table_ctn">
      <DataTableMenu
        rowPerPage={rowPerPage}
        setRowPerPage={setRowPerPage}
        numPage={numPage}
        setNumPage={setNumPage}
        nbTotRows={filteredData.length}
        data={filteredData}
        searchText={searchText}
        setSearchText={setSearchText}
        displayData={displayData}
        filters={filters}
      />
      <div className="data_table_header">
        {columns.map((elt, index) => (
          <div className="cell header_cell" key={index}>
            <span>{elt.name}</span>
            <div className="filter_btn" onClick={(e) => handleFilter(e, index)}>
              <FontAwesomeIcon icon={faSort} />
            </div>
          </div>
        ))}
        <div className="cell header_cell">Actions</div>
      </div>
      {filteredData.map((row, index) =>
        index >= (numPage - 1) * rowPerPage && index < numPage * rowPerPage ? (
          <DataTableLine key={index} row={row} columns={columns} />
        ) : null
      )}
    </div>
  ) : (
    <></>
  );
}

export default DataTable;
