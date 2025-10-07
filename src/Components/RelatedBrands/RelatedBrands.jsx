import React, { useContext } from "react";
import style from "./RelatedBrands.module.css";
import { Link, useParams } from "react-router-dom";
import useProducts from "../../Hooks/useProducts";
import Loading from "../Loading/Loading";
import { CartContext } from "../../Context/CartContext";

export default function RelatedBrands() {
  let { name } = useParams();
  let { data, isLoading } = useProducts();
  let { addProductToCart } = useContext(CartContext);

  return (
    <>
      {!isLoading ? (
        <div className={style.gridContainer}>
          {data
            ?.filter((product) => product.brand.name === name)
            .map((product, index) => (
              <div key={index} className={style.card}>
                <Link to={`/productdetails/${product.id}`}>
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className={style.image}
                  />
                  <div className={style.info}>
                    <h2 className={style.category}>{product.category.name}</h2>
                    <h2 className={style.title}>
                      {product.title.split(" ").slice(0, 3).join(" ")}
                    </h2>
                    <div className={style.priceRating}>
                      <span>{product.price} EGP</span>
                      <span className={style.rating}>
                        <i className="fas fa-star"></i> {product.ratingsAverage}
                      </span>
                    </div>
                  </div>
                </Link>
                <button
                  onClick={() => addProductToCart(product.id)}
                  className={style.btn}
                >
                  Add To Cart
                </button>
              </div>
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
