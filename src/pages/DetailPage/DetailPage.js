import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getProducts } from '../../services/productService';
import { ADD_TO_CART } from '../../store/cartSlice';

import classes from './DetailPage.module.css';

const getProductId = (product) => {
  const id = product?._id;
  return String(typeof id === 'object' ? id?.$oid : id ?? '');
};

const formatPrice = (price) =>
  `${new Intl.NumberFormat('vi-VN').format(Number(price) || 0)} VND`;

const DetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError('');

        const data = await getProducts();
        setProducts(data);
      } catch {
        setError('Unable to load product details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    setQuantity(1);
    setMessage('');
  }, [id]);

  const product = products.find(
    (item) => getProductId(item) === id
  );

  const relatedProducts = product
    ? products.filter(
        (item) =>
          item.category === product.category &&
          getProductId(item) !== id
      )
    : [];

  const handleAddToCart = () => {
    if (!product) return;

    dispatch(ADD_TO_CART({ ...product, quantity }));
    setMessage('Product added to cart successfully!');
  };

  if (loading) {
    return <p className={classes.status}>Loading product...</p>;
  }

  if (error) {
    return <p className={classes.status}>{error}</p>;
  }

  if (!product) {
    return (
      <div className={classes.status}>
        <p>Product not found.</p>
        <Link to="/shop">Back to Shop</Link>
      </div>
    );
  }

  return (
    <div className={classes.detailPage}>
      <section className={classes.productSection}>
        <div className={classes.imageWrapper}>
          <img
            className={classes.mainImage}
            src={product.img1}
            alt={product.name}
          />
        </div>

        <div className={classes.productInfo}>
          <h1 className={classes.productName}>{product.name}</h1>

          <p className={classes.price}>
            {formatPrice(product.price)}
          </p>

          <p className={classes.shortDescription}>
            {product.short_desc}
          </p>

          <p className={classes.category}>
            <strong>CATEGORY:</strong>{' '}
            {product.category}
          </p>

          <div className={classes.purchaseRow}>
            <div className={classes.quantityControl}>
              <button
                type="button"
                aria-label="Decrease quantity"
                disabled={quantity <= 1}
                onClick={() =>
                  setQuantity((current) => Math.max(1, current - 1))
                }
              >
                −
              </button>

              <span>{quantity}</span>

              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() =>
                  setQuantity((current) => current + 1)
                }
              >
                +
              </button>
            </div>

            <button
              type="button"
              className={classes.addButton}
              onClick={handleAddToCart}
            >
              ADD TO CART
            </button>
          </div>

          {message && (
            <p className={classes.successMessage} role="status">
              {message}
            </p>
          )}
        </div>
      </section>

      <section className={classes.descriptionSection}>
        <h2>PRODUCT DESCRIPTION</h2>
        <p className={classes.longDescription}>
          {product.long_desc}
        </p>
      </section>

      <section className={classes.relatedSection}>
        <h2>RELATED PRODUCTS</h2>

        {relatedProducts.length === 0 ? (
          <p>No related products found.</p>
        ) : (
          <div className={classes.relatedGrid}>
            {relatedProducts.map((item) => (
              <Link
                to={`/detail/${getProductId(item)}`}
                className={classes.relatedCard}
                key={getProductId(item)}
              >
                <img src={item.img1} alt={item.name} />

                <h3>{item.name}</h3>

                <p>{formatPrice(item.price)}</p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default DetailPage;