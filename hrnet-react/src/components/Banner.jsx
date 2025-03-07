import "../style/generalCSS.scss";
import "../style/components/Banner.scss";
import bannerImg from "../assets/banner.jpg";
import { Link } from "react-router-dom";

function Banner({ toPage }) {
  return (
    <div className="banner_ctn elm_ct">
      <img src={bannerImg} />
      <div className="deg" />
      <span className="title">HR-Net</span>
      <Link
        className="banner_btn"
        to={toPage == "form" ? "/" : "employees-list"}
      >
        {toPage == "form" ? "Add new Employee" : "Employees List"}
      </Link>
    </div>
  );
}

export default Banner;
