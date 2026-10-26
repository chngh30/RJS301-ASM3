import classes from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.footerContainer}>
        <div className={classes.footerColumn}>
          <h3>CUSTOMER SERVICES</h3>
          <a href="#">Help &amp; Contact Us</a>
          <a href="#">Returns &amp; Refunds</a>
          <a href="#">Online Stores</a>
          <a href="#">Terms &amp; Conditions</a>
        </div>

        <div className={classes.footerColumn}>
          <h3>COMPANY</h3>
          <a href="#">What We Do</a>
          <a href="#">Available Services</a>
          <a href="#">Latest Posts</a>
          <a href="#">FAQs</a>
        </div>

        <div className={classes.footerColumn}>
          <h3>SOCIAL MEDIA</h3>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
          <a href="#">Facebook</a>
          <a href="#">Pinterest</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
