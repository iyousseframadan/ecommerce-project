/* eslint-disable no-unused-vars */

import React, { useContext, useEffect } from "react";
import style from "./Allorders.module.css";
import { CartContext } from "../../Context/CartContext";

export default function Allorders() {
  const { clearCart } = useContext(CartContext);

  useEffect(() => {
    clearCart(); // ✅ Clear the cart after successful checkout
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      {/* 🎉 Success Icon */}
      <div className="bg-emerald-100 rounded-full p-6 mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-emerald-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      {/* ✅ Confirmation Text */}
      <h2 className="text-3xl font-bold text-emerald-600 mb-4">
        Your Order Has Been Placed!
      </h2>
      <p className="text-gray-600 text-lg max-w-md">
        Thank you for shopping with us. Your cart has been cleared, and we’re
        preparing your order for delivery.
      </p>

      {/* 🛒 Back to Shopping Button */}
      <button
        onClick={() => (window.location.href = "/")}
        className="mt-6 bg-emerald-600 text-white px-6 py-2 rounded-lg shadow hover:bg-emerald-700 transition-all duration-300"
      >
        Continue Shopping
      </button>
    </div>
  );
}
