import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  REMOVE_FROM_CART,
} from '../../store/cartSlice';

import classes from './CartPage.module.css';

const getPrice = (price) =>
  Number(String(price ?? 0).replace(/[^\d.-]/g, '')) || 0;

const formatPrice = (price) =>
  `${new Intl.NumberFormat('vi-VN').format(price)} VND`;

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);

  const [coupon, setCoupon] = useState('');

  const [couponMessage, setCouponMessage] = useState('');

  const subtotal = cartItems.reduce(
    (total, item) => total + getPrice(item.price) * item.quantity,
    0
  );

  const handleApplyCoupon = () => {
    if (!coupon.trim()) {
      setCouponMessage('Please enter a coupon code.');
      return;
    }

    setCouponMessage('Coupon validation is not available yet.');
  };

  return (
    <div className={classes.cartPage}>
      <div className={classes.cartBanner}>
        <h1>CART</h1>
        <span>CART</span>
      </div>

      <div className={classes.cartContainer}>
        <section className={classes.cartMain}>
          <h2>SHOPPING CART</h2>

          {cartItems.length === 0 ? (
            <div className={classes.emptyCart}>
              <p>Your shopping cart is empty.</p>
              <button
                type="button"
                className={classes.outlineButton}
                onClick={() => navigate('/shop')}
              >
                ← Continue shopping
              </button>
            </div>
          ) : (
            <>
              <div className={classes.tableWrapper}>
                <table className={classes.cartTable}>
                  <thead>
                    <tr>
                      <th>IMAGE</th>
                      <th>PRODUCT</th>
                      <th>PRICE</th>
                      <th>QUANTITY</th>
                      <th>TOTAL</th>
                      <th>REMOVE</th>
                    </tr>
                  </thead>

                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <img
                            className={classes.productImage}
                            src={item.img1}
                            alt={item.name}
                          />
                        </td>

                        <td className={classes.productName}>
                          {item.name}
                        </td>

                        <td>{formatPrice(getPrice(item.price))}</td>

                        <td>
                          <div className={classes.quantityControl}>
                            <button
                              type="button"
                              aria-label={`Decrease quantity of ${item.name}`}
                              onClick={() =>
                                dispatch(DECREASE_QUANTITY(item.id))
                              }
                            >
                              −
                            </button>

                            <span>{item.quantity}</span>

                            <button
                              type="button"
                              aria-label={`Increase quantity of ${item.name}`}
                              onClick={() =>
                                dispatch(INCREASE_QUANTITY(item.id))
                              }
                            >
                              +
                            </button>
                          </div>
                        </td>

                        <td className={classes.itemTotal}>
                          {formatPrice(
                            getPrice(item.price) * item.quantity
                          )}
                        </td>

                        <td>
                          <button
                            type="button"
                            className={classes.removeButton}
                            aria-label={`Remove ${item.name}`}
                            onClick={() =>
                              dispatch(REMOVE_FROM_CART(item.id))
                            }
                          >
                            <svg
                              viewBox="0 0 24 24"
                              width="19"
                              height="19"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="M3 6h18" />
                              <path d="M8 6V4h8v2" />
                              <path d="m19 6-1 14H6L5 6" />
                              <path d="M10 10v6M14 10v6" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className={classes.cartActions}>
                <button
                  type="button"
                  className={classes.outlineButton}
                  onClick={() => navigate('/shop')}
                >
                  ← Continue shopping
                </button>

                <button
                  type="button"
                  className={classes.outlineButton}
                  onClick={() => navigate('/checkout')}
                >
                  Proceed to checkout →
                </button>
              </div>
            </>
          )}
        </section>

        <aside className={classes.cartSummary}>
          <h2>CART TOTAL</h2>

          <div className={classes.summaryRow}>
            <span>SUBTOTAL</span>
            <span>{formatPrice(subtotal)}</span>
          </div>

          <div className={classes.summaryTotal}>
            <strong>TOTAL</strong>
            <strong>{formatPrice(subtotal)}</strong>
          </div>

          <div className={classes.couponForm}>
            <input
              type="text"
              placeholder="Enter your coupon"
              value={coupon}
              onChange={(event) => {
                setCoupon(event.target.value);
                setCouponMessage('');
              }}
              aria-label="Coupon code"
            />

            <button type="button" onClick={handleApplyCoupon}>
              <svg
                viewBox="0 0 24 24"
                width="19"
                height="19"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 10h18v11H3z" />
                <path d="M2 6h20v4H2z" />
                <path d="M12 6v15" />
                <path d="M12 6H8.5a2.5 2.5 0 1 1 2.5-2.5V6Z" />
                <path d="M12 6h3.5a2.5 2.5 0 1 0-2.5-2.5V6Z" />
              </svg>
              Apply coupon
            </button>

            {couponMessage && (
              <p className={classes.couponMessage} role="status">
                {couponMessage}
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CartPage;
