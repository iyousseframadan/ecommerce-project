import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

// eslint-disable-next-line react-refresh/only-export-components
export let CartContext = createContext();

export default function CartContextProvider({ children }) {
  let headers = {
    token: localStorage.getItem("user-token"),
  };

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  async function checkout(shippingAddress) {
    try {
      setLoading(true);
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.data._id}?url=http://localhost:5173`,
        {
          shippingAddress,
        },
        {
          headers,
        }
      );

      console.log(data);
      window.location.href = data.session.url;
      setLoading(false);

    } 
    catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  async function addProductToCart(productId) {
    try {
      setLoading(true);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
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
      setCart(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  async function clearCart() {
    try {
      setLoading(true);
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          headers,
        }
      );

      console.log(data);
      setCart(null);
      setLoading(false);
    } 
    catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("There is an error, try again later", {  duration: 2000,});
    }
  }
  async function deleteProductCart(productId) {
    try {
      setLoading(true);
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          headers,
        }
      );

      console.log(data);
      setCart(data);

      toast.success(data.message, {
        duration: 2000,
      });
      setLoading(false);


    } catch (error) {
      console.log(error);
      toast.error("There is an error, try again later", {  duration: 2000,});
      setLoading(false);
    }
  }
  async function updateProductCount(productId, count) {
    if (count > 0) {
      try {
        setLoading(true);
        let { data } = await axios.put(
          `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
          {
            count,
          },
          {
            headers,
          }
        );

        console.log(data);
        setCart(data);

        setLoading(false);
        toast.success(data.message, {
          duration: 2000,
        });
      } catch (error) {
        console.log(error);
        setLoading(false);
        toast.error("There is an error, try again later", {  duration: 2000,});
      }
    }
    else{
        deleteProductCart(productId);
    }
  }
  async function getCart() {
    try {
      setLoading(true);
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers,
        }
      );
      console.log(data);
      setCart(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
 
    }
  }

  // to save NumberOfCartItems Also Refresh
  useEffect(()=>{
    getCart()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <CartContext.Provider
      value={{
        loading,
        clearCart,
        checkout,
        updateProductCount,
        addProductToCart,
        getCart,
        cart,
        setCart,
        deleteProductCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
