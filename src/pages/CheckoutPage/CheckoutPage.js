import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import classes from './CheckoutPage.module.css';

const formatPrice = (price) =>
  `${new Intl.NumberFormat('vi-VN').format(price)} VND`;

const getPrice = (price) =>
  Number(String(price ?? 0).replace(/[^\d.-]/g, '')) || 0;

const CheckoutPage = () => {
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
  });

  const [message, setMessage] = useState('');

  const total = cartItems.reduce(
    (sum, item) => sum + getPrice(item.price) * item.quantity,
    0
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (cartItems.length === 0) {
      setMessage('Your shopping cart is empty.');
      return;
    }

    setMessage('Your order has been submitted successfully!');
  };

  return (
    <div className={classes.checkoutPage}>
      <div className={classes.checkoutBanner}>
        <h1>CHECKOUT</h1>

        <div className={classes.breadcrumb}>
          <button type="button" onClick={() => navigate('/')}>
            HOME
          </button>
          <span>/</span>
          <button type="button" onClick={() => navigate('/cart')}>
            CART
          </button>
          <span>/</span>
          <span>CHECKOUT</span>
        </div>
      </div>

      <div className={classes.checkoutContainer}>
        <section className={classes.billingSection}>
          <h2>BILLING DETAILS</h2>

          <form onSubmit={handleSubmit}>
            <div className={classes.formGroup}>
              <label htmlFor="fullName">FULL NAME:</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter Your Full Name Here!"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className={classes.formGroup}>
              <label htmlFor="email">EMAIL:</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter Your Email Here!"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className={classes.formGroup}>
              <label htmlFor="phone">PHONE NUMBER:</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter Your Phone Number Here!"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className={classes.formGroup}>
              <label htmlFor="address">ADDRESS:</label>
              <input
                id="address"
                name="address"
                type="text"
                placeholder="Enter Your Address Here!"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className={classes.placeOrderButton}>
              Place order
            </button>

            {message && (
              <p className={classes.message} role="status">
                {message}
              </p>
            )}
          </form>
        </section>

        <aside className={classes.orderSummary}>
          <h2>YOUR ORDER</h2>

          {cartItems.length === 0 ? (
            <p className={classes.emptyMessage}>
              Your shopping cart is empty.
            </p>
          ) : (
            <>
              <div className={classes.orderItems}>
                {cartItems.map((item) => (
                  <div className={classes.orderRow} key={item.id}>
                    <span className={classes.orderProduct}>
                      {item.name} × {item.quantity}
                    </span>

                    <span className={classes.orderPrice}>
                      {formatPrice(
                        getPrice(item.price) * item.quantity
                      )}
                    </span>
                  </div>
                ))}
              </div>

              <div className={classes.orderTotal}>
                <strong>TOTAL</strong>
                <strong>{formatPrice(total)}</strong>
              </div>
            </>
          )}
        </aside>
      </div>
    </div>
  );
};

export default CheckoutPage;
