import { useNavigate } from 'react-router-dom';
import classes from './HomePage.module.css';

const categories = [
  { name: 'iPhone', value: 'iphone', image: '/product_1.png' },
  { name: 'Mac', value: 'macbook', image: '/product_2.png' },
  { name: 'iPad', value: 'ipad', image: '/product_3.png' },
  { name: 'Apple Watch', value: 'watch', image: '/product_4.png' },
  { name: 'AirPods', value: 'airpod', image: '/product_5.png' },
];

const Categories = () => {
  const navigate = useNavigate();

  return (
    <section className={classes.categoriesSection}>
      <div className={classes.categoriesHeading}>
        <p>CAREFULLY CREATED COLLECTIONS</p>
        <h2>BROWSE OUR CATEGORIES</h2>
      </div>

      <div className={classes.categoriesGrid}>
        {categories.map((category) => (
          <button
            key={category.name}
            type="button"
            className={classes.categoryCard}
            onClick={() => navigate(`/shop?category=${category.value}`)}
            aria-label={`Browse ${category.name}`}
          >
            <img src={category.image} alt={category.name} />
          </button>
        ))}
      </div>
    </section>
  );
};

export default Categories;