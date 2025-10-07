
import React from "react";
import Slider from "react-slick";
import styles from "./MainSlider.module.css";

import slide1 from "../../assets/images/image1.jpg";
import slide2 from "../../assets/images/image2.jpg";
import slide3 from "../../assets/images/image3.jpg";
import slide4 from "../../assets/images/image4.jpg";
import slide5 from "../../assets/images/image5.jpg";
import slide6 from "../../assets/images/image6.jpg";

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
  };

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.leftSlider}>
        <Slider {...settings}>
          <img src={slide1} alt="" />
          <img src={slide2} alt="" />
          <img src={slide3} alt="" />
          <img src={slide4} alt="" />
        </Slider>
      </div>
      <div className={styles.rightImages}>
        <img src={slide5} alt="" />
        <img src={slide6} alt="" />
      </div>
    </div>
  );
}
