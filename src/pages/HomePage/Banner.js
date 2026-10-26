import { useNavigate } from 'react-router-dom';
import classes from './HomePage.module.css';

const Banner = () => {
  const navigate = useNavigate();

  return (
    <section
      className={classes.banner}
      backgroundImage: `url('${process.env.PUBLIC_URL}/banner1.jpg')`
    >
      <div className={classes.bannerContent}>
        <p className={classes.bannerSubtitle}>NEW INSPIRATION 2026</p>
        <h1>20% OFF ON NEW SEASON</h1>
        <button onClick={() => navigate('/shop')}>
          Browse collections
        </button>
      </div>
    </section>
  );
};

export default Banner;
