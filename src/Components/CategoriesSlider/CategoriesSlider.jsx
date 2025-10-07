
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import styles from "./CategoriesSlider.module.css";

export default function CategoriesSlider() {
  const [categories, setCategories] = useState([]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 6,
    slidesToScroll: 2,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

  async function getCategories() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/Categories"
      );
      setCategories(data.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className={styles.categoriesWrapper}>
      <Slider {...settings}>
        {categories.map((cat, idx) => (
          <div key={idx} className={styles.card}>
            <div className={styles.imgBox}>
              <img src={cat.image} alt={cat.name} />
            </div>
            <h3>{cat.name}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
}
