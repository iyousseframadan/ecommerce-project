import React, { useContext, useState } from "react";
import logo from "../../assets/images/freshcart.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { userData, setUserData } = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);


  

  function logOut() {
    localStorage.removeItem("user-token");
    setUserData(null);
    navigate("/login");
    setMenuOpen(false);
  }

  return (
    <nav className={`${styles["nav-container"]} shadow-md`}>
      <div className={styles["nav-inner"]}>
        {/* Logo */}
        <img src={logo} alt="FreshCart Logo" className={styles["nav-logo"]} />

        {/* Burger Icon */}
        <div
          className={styles.burgerIcon}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </div>

        {/* Main Menu */}
        <div
          className={`${styles.menuOverlay} ${menuOpen ? styles.showMenu : ""}`}
        >
          {userData && (
            <ul className={styles["nav-links"]}>
              <li>
                <NavLink
                  to=""
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive ? styles.activeLink : undefined
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="categories"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive ? styles.activeLink : undefined
                  }
                >
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="brands"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive ? styles.activeLink : undefined
                  }
                >
                  Brands
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="products"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive ? styles.activeLink : undefined
                  }
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="wishlist"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive ? styles.activeLink : undefined
                  }
                >
                  Wishlist
                </NavLink>
              </li>
            </ul>
          )}

          <ul className={styles["nav-actions"]}>
            {userData ? (
              <>
                <li className={styles["cart-icon"]}>
                  <NavLink to="cart" onClick={() => setMenuOpen(false)}>
                    <i className="fa-solid fa-cart-shopping"></i>
                    <span className={styles["cart-badge"]}>
                      {cart ? cart.numOfCartItems : 0}
                    </span>
                  </NavLink>
                </li>
                <li className={styles["logout-btn"]} onClick={logOut}>
                  Log Out
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="register" onClick={() => setMenuOpen(false)}>
                    Register
                  </NavLink>
                </li>
                <li>
                  <NavLink to="login" onClick={() => setMenuOpen(false)}>
                    Login
                  </NavLink>
                </li>
              </>
            )}

            <li className={styles["social-icons"]}>
              <i className="fa-brands fa-facebook-f"></i>
              <i className="fa-brands fa-instagram"></i>
              <i className="fa-brands fa-twitter"></i>
              <i className="fa-brands fa-youtube"></i>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
