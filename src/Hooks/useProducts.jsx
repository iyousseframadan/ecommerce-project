import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function useProducts() {
  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  let response = useQuery({
    queryKey: ["recentProducts"],
    queryFn: getProducts,
    // gcTime: 3000,
    // staleTime: 6000,
    // refetchOnMount:false,
    // refetchOnWindowFocus:false,
    // refetchOnReconnect:false,
    // retry:3,
    // retryDelay:10000,
    // refetchInterval:2000
    select: (data) => data?.data.data,
  });

  return response;
}
