
import React from "react";
import style from "./Category.module.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";

export default function Category() {
  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/Categories");
  }

  let { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    select: (data) => data?.data.data,
  });

  return (
    <div className={style.categoriesPage}>
      {!isLoading ? (
        <div className={style.categoriesGrid}>
          {data?.map((category, index) => (
            <Link
              to={`/categories/${category.name}`}
              key={index}
              className={style.categoryCard}
            >
              <div className={style.imageWrapper}>
                <img
                  src={category.image}
                  className={style.categoryImage}
                  alt={category.name}
                />
              </div>

              <div className={style.categoryInfo}>
                <h3 className={style.categoryName}>{category.name}</h3>
                <p className={style.categorySlug}>{category.slug}</p>
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
