import classes from './HomePage.module.css';

const InfoSection = () => {
  return (
    <section className={classes.infoSection}>
      <div className={classes.infoItem}>
        <h3>FREE SHIPPING</h3>
        <p>Free shipping worldwide</p>
      </div>

      <div className={classes.infoItem}>
        <h3>24 X 7 SERVICE</h3>
        <p>Enjoy our support anytime</p>
      </div>

      <div className={classes.infoItem}>
        <h3>FESTIVAL OFFER</h3>
        <p>Get exciting deals and special offers</p>
      </div>
    </section>
  );
};

export default InfoSection;