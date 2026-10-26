import classes from './HomePage.module.css';

const Newsletter = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <section className={classes.newsletterSection}>
      <div className={classes.newsletterText}>
        <h2>LET'S BE FRIENDS!</h2>
        <p>
          Nisi nisi tempor consequat laboris nisi.
          Lorem ipsum dolor sit amet.
        </p>
      </div>

      <form
        className={classes.newsletterForm}
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          placeholder="Enter your email address"
          aria-label="Email address"
          required
        />

        <button type="submit">Subscribe</button>
      </form>
    </section>
  );
};

export default Newsletter;