import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

// eslint-disable-next-line react-refresh/only-export-components
export let WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
  let headers = {
    token: localStorage.getItem("user-token"),
  };

  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(false);

  async function addToWishlist(productId) {
    try {
      setLoading(true);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId,
        },
        {
          headers,
        }
      );
      toast.success(data.message, {
        duration: 2000,
      });
      setWishlist(data);
      getWishList();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function deleteProductFromWishList(productId) {
    try {
      setLoading(true);
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {
          headers,
        }
      );

      console.log(data);
      setWishlist(data);
      toast.success(data.message, {
        duration: 2000,
      });
      setLoading(false);
      getWishList();
    } catch (error) {
      console.log(error);
      toast.error("There is an error, try again later", { duration: 2000 });
      setLoading(false);
    }
  }
  async function getWishList() {
    try {
      setLoading(true);
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers,
        }
      );
      console.log(data);
      setWishlist(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  // to save NumberOfCartItems Also Refresh
  useEffect(() => {
    getWishList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        loading,
        addToWishlist,
        getWishList,
        wishlist,
        setLoading,
        setWishlist,
        deleteProductFromWishList,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
