import Banner from './Banner';
import Categories from './Categories';
import ProductsSection from './ProductsSection';
import InfoSection from './InfoSection';
import Newsletter from './Newsletter';
import Popup from './Popup';
import classes from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={classes.homePage}>
      <Banner />
      <Categories />
      <ProductsSection />
      <InfoSection />
      <Newsletter />
      <Popup />
    </div>
  );
};

export default HomePage;