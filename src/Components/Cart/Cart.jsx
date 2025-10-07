
import React, { useContext, useEffect } from "react";
import styles from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";

export default function Cart() {
  const { getCart, cart, loading, updateProductCount, deleteProductCart } =
    useContext(CartContext);

  useEffect(() => {
    getCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? (
        <div className={styles.loadingWrapper}>
          <Loading />
        </div>
      ) : (
        <div className={styles.cartContainer}>
          {cart ? (
            <div className={styles.tableWrapper}>
              <table className={styles.cartTable}>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart?.data.products.map((product) => (
                    <tr key={product.product.id}>
                      <td>
                        <img
                          src={product.product.imageCover}
                          alt={product.product.title}
                          className={styles.productImg}
                        />
                      </td>
                      <td>{product.product.title}</td>
                      <td>
                        <div className={styles.qtyControl}>
                          <button
                            onClick={() =>
                              updateProductCount(
                                product.product.id,
                                product.count - 1
                              )
                            }
                          >
                            –
                          </button>
                          <span>{product.count}</span>
                          <button
                            onClick={() =>
                              updateProductCount(
                                product.product.id,
                                product.count + 1
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>{product.price} EGP</td>
                      <td>
                        <button
                          onClick={() => deleteProductCart(product.product.id)}
                          className={styles.removeBtn}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className={styles.totalRow}>
                    <td colSpan={3}>Total Cart Price</td>
                    <td>{cart.data.totalCartPrice} EGP</td>
                  </tr>
                </tfoot>
              </table>
              <Link to="/checkout" className={styles.checkoutBtn}>
                Check out
              </Link>
            </div>
          ) : (
            <h2 className={styles.emptyCart}>The Cart Is Empty</h2>
          )}
        </div>
      )}
    </>
  );
}
