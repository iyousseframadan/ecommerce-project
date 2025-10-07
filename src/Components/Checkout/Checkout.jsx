
import React, { useContext } from "react";
import style from "./Checkout.module.css";
import { useFormik } from "formik";
import { CartContext } from "../../Context/CartContext";

export default function Checkout() {
  let { checkout } = useContext(CartContext);

  let formik = useFormik({
    initialValues: {
      details: "",
      city: "",
      phone: "",
    },
    onSubmit: checkout,
  });

  return (
    <div className={style.checkoutContainer}>
      <h2 className={style.checkoutTitle}>Checkout Now</h2>

      <form onSubmit={formik.handleSubmit}>
        {/* details */}
        <div className={style.inputGroup}>
          <input
            type="text"
            name="details"
            id="details"
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder=" "
            className={style.inputField}
          />
          <label htmlFor="details" className={style.inputLabel}>
            Enter Your Details:
          </label>
        </div>

        {/* city */}
        <div className={style.inputGroup}>
          <input
            type="text"
            name="city"
            id="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder=" "
            className={style.inputField}
          />
          <label htmlFor="city" className={style.inputLabel}>
            Enter Your City:
          </label>
        </div>

        {/* phone */}
        <div className={style.inputGroup}>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder=" "
            className={style.inputField}
          />
          <label htmlFor="phone" className={style.inputLabel}>
            Enter Your Phone:
          </label>
        </div>

        <button type="submit" className={style.checkoutBtn}>
          Checkout
        </button>
      </form>
    </div>
  );
}
