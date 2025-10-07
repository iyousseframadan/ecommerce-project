
import React, { useContext, useEffect, useState } from "react";
import style from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import Loading from "../Loading/Loading";
import { CartContext } from "../../Context/CartContext";
import RelatedProducts from "../RelatedProducts/RelatedProducts";

export default function ProductDetails() {
  let { id } = useParams();
  const [productDetails, setProductDetails] = useState({});
  let { addProductToCart } = useContext(CartContext);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
  };

  async function getProductDetails(id) {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      setProductDetails(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProductDetails(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={style.productDetails}>
      <h2 className={style.pageTitle}>Product Details</h2>

      {productDetails && productDetails.id ? (
        <>
          <div className={style.detailsContainer}>
            {/* Product Images */}
            <div className={style.imageSection}>
              {productDetails.images?.length > 1 ? (
                <Slider {...settings}>
                  {productDetails.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      className={style.productImage}
                      alt={productDetails.title}
                    />
                  ))}
                </Slider>
              ) : (
                <img
                  src={productDetails.imageCover}
                  className={style.productImage}
                  alt={productDetails.title}
                />
              )}
            </div>

            {/* Product Info */}
            <div className={style.infoSection}>
              <h3 className={style.productTitle}>{productDetails.title}</h3>
              <p className={style.description}>{productDetails.description}</p>
              <span className={style.category}>
                {productDetails.category?.name}
              </span>

              <div className={style.priceRating}>
                <h4 className={style.price}>{productDetails.price} EGP</h4>
                <h4 className={style.rating}>
                  <i className="fas fa-star"></i>{" "}
                  {productDetails.ratingsAverage}
                </h4>
              </div>

              <button
                onClick={() => addProductToCart(id)}
                className={style.addBtn}
              >
                Add To Cart
              </button>
            </div>
          </div>

          {/* Related Products */}
          <div className={style.relatedWrapper}>
            <RelatedProducts />
          </div>
        </>
      ) : (
        <div className={style.loadingWrapper}>
          <Loading />
        </div>
      )}
    </div>
  );
}
