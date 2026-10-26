import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { HIDE_POPUP } from '../../store/popupSlice';
import classes from './HomePage.module.css';

const Popup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isVisible, product } = useSelector((state) => state.popup);

  const handleClose = () => {
    dispatch(HIDE_POPUP());
  };

  const handleViewDetail = () => {
    if (!product) return;

    const rawId = product._id;

    const productId =
      typeof rawId === 'object' ? rawId?.$oid : rawId;

    if (!productId) return;

    dispatch(HIDE_POPUP());
    navigate(`/detail/${productId}`);
  };

  if (!isVisible || !product) {
    return null;
  }

  const formatPrice = (price) =>
    new Intl.NumberFormat('vi-VN').format(price);

  return (
    <div
      className={classes.popupOverlay}
      onClick={handleClose}
    >
      <div
        className={classes.popupModal}
        role="dialog"
        aria-modal="true"
        aria-label={product.name}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className={classes.popupClose}
          onClick={handleClose}
          aria-label="Close popup"
        >
          ×
        </button>

        <div className={classes.popupImage}>
          <img src={product.img1} alt={product.name} />
        </div>

        <div className={classes.popupInfo}>
          <h2 className={classes.popupTitle}>{product.name}</h2>

          <p className={classes.popupPrice}>
            {formatPrice(product.price)} VND
          </p>

          <p className={classes.popupDescription}>
            {product.short_desc}
          </p>

          <button
            type="button"
            className={classes.popupDetailButton}
            onClick={handleViewDetail}
          >
            <FaShoppingCart aria-hidden="true" />
            VIEW DETAIL
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;