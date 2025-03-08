import "../../style/generalCSS.scss";
import "../../style/components/DataTable/DataTable.scss";

import DataTableLine from "./DataTableLine";

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
  const [lastFilter, setLastFilter] = useState({ name: "", factor: 1 });

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  // On veut pouvoir trier chaque colonne par ordre alphabétique, ou l'inverse si c'est déjà trier de la sorte
  function handleFilter(e, index) {
    e.preventDefault();

    console.log(isDate("01/sdf/4555"));

    // Vérification de si ce filter a été préssé pour la 2ème fois consécutive ou non
    const col = Object.keys(data[0])[index + 1];
    let myFactor = lastFilter.factor;
    if (col == lastFilter.name) {
      myFactor = myFactor * -1;
      setLastFilter({ ...lastFilter, factor: myFactor });
    } else {
      setLastFilter({ ...lastFilter, name: col });
    }

    let dataBis = [...data];
    dataBis.sort((a, b) => {
      // Tri différent de s'il est fonction de date ou de string
      if (isDate(a[Object.keys(a)[index + 1]])) {
        const eltA = a[Object.keys(a)[index + 1]].split("/");
        const eltB = b[Object.keys(b)[index + 1]].split("/");

        // Comme le format de base est celui MM/DD/YYYY, et que toutes les dates ont été générées sous forme de string "DD/MM/YYYY"
        // On va faire la comparaison nous même
        if (eltB[2] < eltA[2]) {
          return 1 * myFactor;
        } else if (eltB[2] > eltA[2]) {
          return -1 * myFactor;
        } else {
          if (eltB[1] < eltA[1]) {
            return 1 * myFactor;
          } else if (eltB[1] > eltA[1]) {
            return -1 * myFactor;
          } else {
            if (eltB[0] < eltA[0]) {
              return 1 * myFactor;
            } else {
              return -1 * myFactor;
            }
          }
        }
      } else {
        const eltA = a[Object.keys(a)[index + 1]].toUpperCase();
        const eltB = b[Object.keys(b)[index + 1]].toUpperCase();
        if (eltA < eltB) {
          return -1 * myFactor;
        } else if (eltA > eltB) {
          return 1 * myFactor;
        } else {
          return 0;
        }
      }
    });
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

  return filteredData != "" ? (
    <div className="data_table_ctn">
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
      {filteredData.map((row, index) => (
        <DataTableLine key={index} row={row} columns={columns} />
      ))}
    </div>
  ) : (
    <></>
  );
}

export default DataTable;
