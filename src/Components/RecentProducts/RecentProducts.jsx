import React, { useContext } from "react";
import styles from "./RecentProducts.module.css";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";

export default function RecentProducts({ product }) {
  const { addProductToCart } = useContext(CartContext);
  const { wishlist, addToWishlist, deleteProductFromWishList } =
    useContext(WishlistContext);

  function isInWishList(productId) {
    return wishlist?.data?.some((item) => item._id === productId);
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardInner}>
        <i
          onClick={() => {
            if (isInWishList(product.id)) {
              deleteProductFromWishList(product.id);
            } else {
              addToWishlist(product.id);
            }
          }}
          className={`fa-heart cursor-pointer ${
            isInWishList(product.id)
              ? "fa-solid text-red-500"
              : "fa-regular text-gray-400"
          } ${styles.heartIcon}`}
        ></i>

        <Link
          to={`/productdetails/${product.id}`}
          className={styles.imageWrapper}
        >
          <img src={product.imageCover} alt={product.title} />
        </Link>

        <div className={styles.info}>
          <h3 className={styles.category}>{product.category.name}</h3>
          <h2 className={styles.title}>
            {product.title.split(" ").slice(0, 2).join(" ")}
          </h2>
          <div className={styles.priceRating}>
            <span className={styles.price}>{product.price} EGP</span>
            <span className={styles.rating}>
              <i className="fas fa-star text-yellow-400"></i>{" "}
              {product.ratingsAverage}
            </span>
          </div>
        </div>

        <button
          onClick={() => addProductToCart(product.id)}
          className={styles.addBtn}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}
