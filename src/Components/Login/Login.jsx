
import React, { useContext, useState } from "react";
import style from "./Login.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function Login() {
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  let { setUserData } = useContext(UserContext);

  let navigate = useNavigate();

  async function handelLogin(values) {
    try {
      setLoading(true);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );

      localStorage.setItem("user-token", data.token);
      setUserData(data.token);
      navigate("/");
      setLoading(false);
    } catch (error) {
      setApiError(error.response?.data?.message || "Login failed");
      setLoading(false);
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string()
      .matches(/^[A-Z][A-Za-z0-9@$!%*#?&]{5,11}$/, "Invalid Password")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: handelLogin,
  });

  return (
    <div className={`${style.loginContainer} mx-auto my-10`}>
      <h2 className="text-4xl font-bold text-center text-emerald-600 mb-8">
        Welcome
      </h2>
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full sm:w-2/3 lg:w-1/2 mx-auto"
      >
        {apiError && (
          <div className="mb-4 text-sm text-red-700 bg-red-100 p-2 rounded border border-red-300">
            {apiError}
          </div>
        )}

        {/* Email */}
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="email"
            name="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-3 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:border-emerald-600 focus:outline-none focus:ring-0 peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-emerald-600"
          >
            Enter Your Email
          </label>
          {formik.errors.email && formik.touched.email && (
            <p className="mt-2 text-xs text-red-500">{formik.errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="password"
            name="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-3 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:border-emerald-600 focus:outline-none focus:ring-0 peer"
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-emerald-600"
          >
            Enter Your Password
          </label>
          {formik.errors.password && formik.touched.password && (
            <p className="mt-2 text-xs text-red-500">
              {formik.errors.password}
            </p>
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 mt-4 text-white font-medium rounded-lg bg-emerald-500 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-300 transition-all duration-300"
        >
          {loading ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
        </button>

        <p className="text-sm text-gray-500 mt-4 text-center">
          Don’t have an account?{" "}
          <Link to="/register">
            <span className="text-emerald-600 font-medium cursor-pointer hover:underline">
              Sign up now
            </span>
          </Link>
        </p>
      </form>
    </div>
  );
}
