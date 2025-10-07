
import React from "react";
import styles from "./Home.module.css";
import RecentProducts from "../RecentProducts/RecentProducts";
import Loading from "../Loading/Loading";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import MainSlider from "../MainSlider/MainSlider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Home() {
  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { data, isLoading } = useQuery({
    queryKey: ["recentProducts"],
    queryFn: getProducts,
    select: (data) => data?.data.data,
  });

  return (
    <>
      <MainSlider />
      <CategoriesSlider />

      <div className={styles.sectionTitle}>Recent Products</div>

      {!isLoading ? (
        <div className={styles.productsGrid}>
          {data.map((product, index) => (
            <RecentProducts key={index} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center py-16">
          <Loading />
        </div>
      )}
    </>
  );
}
