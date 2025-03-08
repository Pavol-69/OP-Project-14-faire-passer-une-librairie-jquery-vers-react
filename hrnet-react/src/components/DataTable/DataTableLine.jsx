import "../../style/generalCSS.scss";
import "../../style/components/DataTable/DataTable.scss";
import "../../style/components/DataTable/DataTableLine.scss";

// Crée un composant DataTable, en fonction de l'objet data
// => Ce composant est générique, et est voué à être réutiliser avec des données complètement différentes
// => On a donc besoin en données d'entrée de la data, et aussi des colonnes qui sera sous le format suivant :
// columns = [{
// name : "Nom Colonne"
// selector: (row) => row.parametre
// }, ...]
function DataTableLine({ row, columns }) {
  return (
    <div className="data_table_line_ctn">
      {columns.map((elt, index) => (
        <div key={index} className="cell line_cell">
          {elt.selector(row)}
        </div>
      ))}
      <div className="data_table_line_btn_ctn cell line_cell">
        <button className="data_table_line_btn data_table_line_btn_change">
          ✏️
        </button>
        <button className="data_table_line_btn data_table_line_btn_delete">
          ❌
        </button>
      </div>
    </div>
  );
}

export default DataTableLine;
