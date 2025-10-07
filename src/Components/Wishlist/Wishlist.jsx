
import React, { useContext, useEffect } from "react";
import style from "./Wishlist.module.css";
import Loading from "../Loading/Loading";
import { WishlistContext } from "../../Context/WishlistContext";

export default function Wishlist() {
  let { loading, getWishList, wishlist, deleteProductFromWishList } =
    useContext(WishlistContext);

  useEffect(() => {
    getWishList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? (
        <div className={style.loadingWrapper}>
          <Loading />
        </div>
      ) : (
        <div className={style.container}>
          {wishlist && wishlist.data.length > 0 ? (
            <div className={style.tableWrapper}>
              <table className={style.table}>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {wishlist.data.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <img
                          src={product.imageCover}
                          alt={product.title}
                          className={style.productImage}
                        />
                      </td>
                      <td className={style.productName}>{product.title}</td>
                      <td className={style.price}>{product.price} EGP</td>
                      <td>
                        <button
                          onClick={() => deleteProductFromWishList(product.id)}
                          className={style.removeBtn}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <h2 className={style.emptyMsg}>Your Wishlist is Empty</h2>
          )}
        </div>
      )}
    </>
  );
}
