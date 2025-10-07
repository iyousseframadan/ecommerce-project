import React from "react";
import { Link } from "react-router-dom";
import style from "./NotFound.module.css";

export default function NotFound() {
  return (
    <div className={style.wrapper}>
      <h1 className={style.code}>404</h1>
      <h2 className={style.title}>Oops! Page Not Found</h2>
      <p className={style.description}>
        The page you’re looking for might have been removed, had its name
        changed, or is temporarily unavailable. Let’s get you back on track!
      </p>
      <Link to="/" className={style.homeBtn}>
        Back to Home
      </Link>
    </div>
  );
}
