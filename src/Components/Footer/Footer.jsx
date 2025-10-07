import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/freshcart.svg";
import style from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.footerContainer}>
        {/* Logo + About */}
        <div className={style.footerLogo}>
          <img src={logo} alt="FreshCart Logo" />
          <p className={style.footerText}>
            FreshCart is your go-to eCommerce platform for groceries, fashion,
            and more. Shop smarter, faster, and fresher every day.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className={style.footerHeading}>Quick Links</h3>
          <ul className={style.footerList}>
            <li>
              <Link to="/" className={style.footerLink}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className={style.footerLink}>
                Products
              </Link>
            </li>
            <li>
              <Link to="/brands" className={style.footerLink}>
                Brands
              </Link>
            </li>
            <li>
              <Link to="/categories" className={style.footerLink}>
                Categories
              </Link>
            </li>
            <li>
              <Link to="/wishlist" className={style.footerLink}>
                Wish List
              </Link>
            </li>
            <li>
              <Link to="/cart" className={style.footerLink}>
                Cart
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className={style.footerHeading}>Customer Support</h3>
          <ul className={style.footerList}>
            <li>
              <a href="#" className={style.footerLink}>
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className={style.footerLink}>
                Shipping & Delivery
              </a>
            </li>
            <li>
              <a href="#" className={style.footerLink}>
                Returns & Refunds
              </a>
            </li>
            <li>
              <a href="#" className={style.footerLink}>
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className={style.footerLink}>
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className={style.footerHeading}>Follow Us</h3>
          <div className={style.socialIcons}>
            <a href="#">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={style.bottomBar}>
        © {new Date().getFullYear()} FreshCart. All rights reserved.
      </div>
    </footer>
  );
}
