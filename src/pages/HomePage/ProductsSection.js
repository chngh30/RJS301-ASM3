import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { SHOW_POPUP } from '../../store/popupSlice';
import { getProducts } from '../../services/productService';
import classes from './HomePage.module.css';

const ProductsSection = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data.slice(0, 8));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const formatPrice = (price) =>
    new Intl.NumberFormat('vi-VN').format(price);

  const handleShowPopup = (product) => {
    dispatch(SHOW_POPUP(product));
  };

  return (
    <section className={classes.productsSection}>
      <div className={classes.productsHeading}>
        <p>MADE THE HARD WAY</p>
        <h2>TOP TRENDING PRODUCTS</h2>
      </div>

      {loading && (
        <p className={classes.productsMessage}>Loading products...</p>
      )}

      {error && (
        <p className={classes.productsMessage}>
          Cannot load products. Please try again later.
        </p>
      )}

      {!loading && !error && products.length === 0 && (
        <p className={classes.productsMessage}>No products available.</p>
      )}

      {!error && (
        <div className={classes.productsGrid}>
          {products.map((product) => (
            <article key={product._id} className={classes.productCard}>
              <button
                type="button"
                className={classes.productImage}
                onClick={() => handleShowPopup(product)}
                aria-label={`View information about ${product.name}`}
              >
                <img src={product.img1} alt={product.name} />
              </button>

              <h3>{product.name}</h3>

              <p className={classes.productPrice}>
                {formatPrice(product.price)} VND
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductsSection;