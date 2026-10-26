import classes from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.footerContainer}>
        <div className={classes.footerColumn}>
          <h3>CUSTOMER SERVICES</h3>
          <span>Help &amp; Contact Us</span>
          <span>Returns &amp; Refunds</span>
          <span>Online Stores</span>
          <span>Terms &amp; Conditions</span>
        </div>

        <div className={classes.footerColumn}>
          <h3>COMPANY</h3>
          <span>What We Do</span>
          <span>Available Services</span>
          <span>Latest Posts</span>
          <span>FAQs</span>
        </div>

        <div className={classes.footerColumn}>
          <h3>SOCIAL MEDIA</h3>
          <span>Twitter</span>
          <span>Instagram</span>
          <span>Facebook</span>
          <span>Pinterest</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
