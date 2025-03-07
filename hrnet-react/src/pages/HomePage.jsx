import "../style/generalCSS.scss";
import "../style/pages/HomePage.scss";
import Banner from "../components/Banner";
import AddEmployeeForm from "../components/AddEmployeeForm";

function HomePage() {
  return (
    <div className="hp_ctn elm_ct ver">
      <Banner toPage={"list"} />
      <AddEmployeeForm />
    </div>
  );
}

export default HomePage;
