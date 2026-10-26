
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ON_LOGIN } from '../store/authSlice';
import classes from './AuthPage.module.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
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

    const { email, password } = formData;

    if (!email.trim() || !password) {
      setIsError(true);
      setMessage('Please enter both email and password.');
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

    const user = userArr.find(
      (item) =>
        item.email.toLowerCase() === normalizedEmail &&
        item.password === password
    );

    if (!user) {
      setIsError(true);
      setMessage('Invalid email or password. Please try again.');

      setFormData((previousData) => ({
        ...previousData,
        password: '',
      }));

      return;
    }

    const currentUser = {
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
    };
  
    dispatch(ON_LOGIN(currentUser));

    localStorage.setItem(
      'CURRENT_USER',
      JSON.stringify(currentUser)
    );

    navigate('/');

  };

  return (
    <main
      className={classes.authPage}
      style={{ backgroundImage: "url('/banner1.jpg')" }}
    >
      <section className={classes.authForm}>
        <h1 className={classes.authTitle}>SIGN IN</h1>

        <form onSubmit={handleSubmit}>
          <div className={classes.authInputs}>
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
              autoComplete="current-password"
              required
            />
          </div>

          <button className={classes.authButton} type="submit">
            SIGN IN
          </button>

          {message && (
            <p
              className={classes.authMessage}
              role="alert"
              style={{ color: isError ? '#b42318' : '#198754' }}
            >
              {message}
            </p>
          )}
        </form>

        <p className={classes.authFooter}>
          Don't have an account?{' '}
          <Link className={classes.authLink} to="/register">
            Click
          </Link>
        </p>
      </section>
    </main>
  );
};

export default LoginPage;
