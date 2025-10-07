
import React, { useContext } from "react";
import style from "./RelatedProducts.module.css";
import { Link, useParams } from "react-router-dom";
import useProducts from "../../Hooks/useProducts";
import Loading from "../Loading/Loading";
import { CartContext } from "../../Context/CartContext";

export default function RelatedProducts() {
  let { name } = useParams();
  let { data, isLoading } = useProducts();
  let { addProductToCart } = useContext(CartContext);

  return (
    <>
      {!isLoading ? (
        <div className={style.productsGrid}>
          {data
            ?.filter((product) => product.category.name === name)
            .map((product, index) => (
              <div key={index} className={style.card}>
                <Link to={`/productdetails/${product.id}`}>
                  <div className={style.cardContent}>
                    <img
                      src={product.imageCover}
                      className={style.productImage}
                      alt={product.title}
                    />
                    <h2 className={style.category}>{product.category.name}</h2>
                    <h2 className={style.title}>
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h2>
                    <div className={style.priceRating}>
                      <h3 className={style.price}>{product.price} EGP</h3>
                      <h3 className={style.rating}>
                        <i className="fas fa-star"></i> {product.ratingsAverage}
                      </h3>
                    </div>
                  </div>
                </Link>
                <button
                  onClick={() => addProductToCart(product.id)}
                  className={style.addBtn}
                >
                  Add To Cart
                </button>
              </div>
            ))}
        </div>
      ) : (
        <div className={style.loadingWrapper}>
          <Loading />
        </div>
      )}
    </>
  );
}
