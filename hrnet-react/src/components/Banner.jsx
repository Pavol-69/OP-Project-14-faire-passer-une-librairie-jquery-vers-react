import "../style/generalCSS.scss";
import "../style/components/Banner.scss";
import bannerImg from "../assets/banner.jpg";

function Banner() {
  return (
    <div className="banner_ctn elm_ct">
      <img src={bannerImg} />
      <div className="deg" />
      <span className="title">HR-Net</span>
    </div>
  );
}

export default Banner;
