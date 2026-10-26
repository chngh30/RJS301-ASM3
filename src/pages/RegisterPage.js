
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classes from './AuthPage.module.css';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
  });

  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setMessage('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { fullName, email, password, phone } = formData;

    if (
      !fullName.trim() ||
      !email.trim() ||
      !password ||
      !phone.trim()
    ) {
      setIsError(true);
      setMessage('Please fill in all fields.');
      return;
    }

    if (password.length <= 8) {
      setIsError(true);
      setMessage('Password must be longer than 8 characters.');
      return;
    }

    let userArr = [];

    try {
      userArr = JSON.parse(localStorage.getItem('userArr')) || [];

      if (!Array.isArray(userArr)) {
        userArr = [];
      }
    } catch {
      setIsError(true);
      setMessage('Unable to read registered accounts.');
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = userArr.find(
      (user) => user.email.toLowerCase() === normalizedEmail
    );

    if (existingUser) {
      setIsError(true);
      setMessage('This email is already registered.');
      return;
    }

    const newUser = {
      fullName: fullName.trim(),
      email: normalizedEmail,
      password,
      phone: phone.trim(),
    };

    userArr.push(newUser);
    localStorage.setItem('userArr', JSON.stringify(userArr));

    setIsError(false);
    setMessage('Registration successful! Please sign in.');

    navigate('/login');
  };

  return (
    <main
      className={classes.authPage}
      style={{ backgroundImage: "url('/banner1.jpg')" }}
    >
      <section className={classes.authForm}>
        <h1 className={classes.authTitle}>SIGN UP</h1>

        <form onSubmit={handleSubmit}>
          <div className={classes.authInputs}>
            <input
              className={classes.authInput}
              type="text"
              name="fullName"
              placeholder="Full Name"
              aria-label="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              autoComplete="name"
              required
            />

            <input
              className={classes.authInput}
              type="email"
              name="email"
              placeholder="Email"
              aria-label="Email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />

            <input
              className={classes.authInput}
              type="password"
              name="password"
              placeholder="Password"
              aria-label="Password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />

            <input
              className={classes.authInput}
              type="tel"
              name="phone"
              placeholder="Phone"
              aria-label="Phone"
              value={formData.phone}
              onChange={handleChange}
              autoComplete="tel"
              required
            />
          </div>

          <button className={classes.authButton} type="submit">
            SIGN UP
          </button>

          {message && (
            <p
              className={classes.authMessage}
              role="status"
              style={{ color: isError ? '#b42318' : '#198754' }}
            >
              {message}
            </p>
          )}
        </form>

        <p className={classes.authFooter}>
          Login?{' '}
          <Link className={classes.authLink} to="/login">
            Click
          </Link>
        </p>
      </section>
    </main>
  );
};

export default RegisterPage;
