import { useNavigate } from 'react-router-dom';
import classes from './ShopPage.module.css';

const formatPrice = (price) =>
  new Intl.NumberFormat('vi-VN').format(Number(price));

const getProductId = (product) => {
  if (typeof product._id === 'string') {
    return product._id;
  }

  return product._id?.$oid;
};

const ProductList = ({ products }) => {
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    const productId = getProductId(product);

    if (productId) {
      navigate(`/detail/${productId}`);
    }
  };

  return (
    <div className={classes.productGrid}>
      {products.map((product, index) => (
        <button
          type="button"
          key={getProductId(product) || product.name}
          className={classes.productCard}
          onClick={() => handleProductClick(product)}
          style={{ animationDelay: `${index * 70}ms` }}
        >
          <div className={classes.productImageWrapper}>
            <img
              className={classes.productImage}
              src={product.img1}
              alt={product.name}
              loading="lazy"
            />
          </div>

          <h3 className={classes.productName}>{product.name}</h3>

          <p className={classes.productPrice}>
            {formatPrice(product.price)} VND
          </p>
        </button>
      ))}
    </div>
  );
};

export default ProductList;
