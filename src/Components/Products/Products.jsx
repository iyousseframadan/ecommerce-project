/* eslint-disable no-unused-vars */

import React, { useContext, useEffect, useState } from "react";
import style from "./Products.module.css";
import Loading from "../Loading/Loading";
import RecentProducts from "../RecentProducts/RecentProducts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useProducts from "../../Hooks/useProducts";
import { WishlistContext } from "../../Context/WishlistContext";
export default function Products(props) {

  
  let { data, isLoading } = useProducts();
  let { addToWishlist } = useContext(WishlistContext);

  return (
    <>
      {!isLoading ? (
        <div className="flex flex-wrap  justify-center">
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
