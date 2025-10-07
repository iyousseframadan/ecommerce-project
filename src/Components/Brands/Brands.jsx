
import React from "react";
import style from "./Brands.module.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";

export default function Brands() {
  function getBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/Brands");
  }

  let { data, isLoading } = useQuery({
    queryKey: ["Brands"],
    queryFn: getBrands,
    select: (data) => data?.data.data,
  });

  return (
    <div className={style.brandsPage}>
      {!isLoading ? (
        <div className={style.brandsGrid}>
          {data?.map((brand, index) => (
            <Link
              to={`/brands/${brand.name}`}
              key={index}
              className={style.brandCard}
            >
              <div className={style.imageWrapper}>
                <img
                  src={brand.image}
                  className={style.brandImage}
                  alt={brand.name}
                />
              </div>

              <div className={style.brandInfo}>
                <h3 className={style.brandName}>{brand.name}</h3>
                <p className={style.brandSlug}>{brand.slug}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className={style.loadingWrapper}>
          <Loading />
        </div>
      )}
    </div>
  );
}
