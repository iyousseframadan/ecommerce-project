/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import style from "./Register.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function Register() {
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setUserData } = useContext(UserContext);

  const navigate = useNavigate();

  async function handleRegister(values) {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );

      localStorage.setItem("user-token", data.token);
      setUserData(data.token);
      navigate("/");
      setLoading(false);
    } catch (error) {
      setApiError(error.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  }

  // 🔥 Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Min Letters IS 3")
      .max(20, "Max Letters IS 20")
      .required("Name Is Required"),
    email: Yup.string().email("Invalid Email").required("Email Is Required"),
    password: Yup.string()
      .matches(/^[A-Z][A-Za-z0-9@$!%*#?&]{5,11}$/, "Invalid Password Must Start With Capital Letter And Be 6-12 Characters")
      .required("Password Is Required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords Do Not Match")
      .required("Confirm Password Is Required"),
    phone: Yup.string()
      .matches(/^(002)?01[0125][0-9]{8}$/, "Invalid Egyptian Number")
      .required("Phone Number Is Required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: handleRegister,
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 py-10">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-emerald-600 text-center mb-6">
          Create Your Account
        </h2>

        {apiError && (
          <div className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
            {apiError}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter Your Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`block w-full p-3 text-sm border rounded-lg outline-none ${
                formik.errors.name && formik.touched.name
                  ? "border-red-500"
                  : "border-gray-300 focus:border-emerald-500"
              }`}
            />
            {formik.errors.name && formik.touched.name && (
              <p className="text-red-600 text-xs mt-1">{formik.errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Your Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`block w-full p-3 text-sm border rounded-lg outline-none ${
                formik.errors.email && formik.touched.email
                  ? "border-red-500"
                  : "border-gray-300 focus:border-emerald-500"
              }`}
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-600 text-xs mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Your Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`block w-full p-3 text-sm border rounded-lg outline-none ${
                formik.errors.password && formik.touched.password
                  ? "border-red-500"
                  : "border-gray-300 focus:border-emerald-500"
              }`}
            />
            {formik.errors.password && formik.touched.password && (
              <p className="text-red-600 text-xs mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* rePassword */}
          <div>
            <input
              type="password"
              name="rePassword"
              id="rePassword"
              placeholder="Confirm Your Password"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`block w-full p-3 text-sm border rounded-lg outline-none ${
                formik.errors.rePassword && formik.touched.rePassword
                  ? "border-red-500"
                  : "border-gray-300 focus:border-emerald-500"
              }`}
            />
            {formik.errors.rePassword && formik.touched.rePassword && (
              <p className="text-red-600 text-xs mt-1">
                {formik.errors.rePassword}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="Enter Your Phone Number"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`block w-full p-3 text-sm border rounded-lg outline-none ${
                formik.errors.phone && formik.touched.phone
                  ? "border-red-500"
                  : "border-gray-300 focus:border-emerald-500"
              }`}
            />
            {formik.errors.phone && formik.touched.phone && (
              <p className="text-red-600 text-xs mt-1">{formik.errors.phone}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-emerald-500 text-white py-2.5 rounded-lg hover:bg-emerald-600 transition-all duration-300"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <i className="fas fa-spinner fa-spin"></i> Registering...
              </span>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
