import { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaShoppingCart, FaUser, FaChevronDown } from 'react-icons/fa';

import { ON_LOGOUT } from '../../store/authSlice';
import classes from './Navbar.module.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector(
    (state) => state.auth.currentUser
  );

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      );
    };
  }, []);

  const username =
    currentUser?.fullName ||
    currentUser?.name ||
    currentUser?.username ||
    currentUser?.email ||
    'User';

  const handleLogout = () => {
    localStorage.removeItem('CURRENT_USER');
    dispatch(ON_LOGOUT());
    setIsOpen(false);
    navigate('/login');
  };

  return (
    <header className={classes.navbar}>
      <div className={classes.navbarLeft}>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${classes.navLink} ${isActive ? classes.active : ''}`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/shop"
          className={({ isActive }) =>
            `${classes.navLink} ${isActive ? classes.active : ''}`
          }
        >
          Shop
        </NavLink>
      </div>

      <Link to="/" className={classes.navbarLogo}>
        BOUTIQUE
      </Link>

      <div className={classes.navbarRight}>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `${classes.navLink} ${isActive ? classes.active : ''}`
          }
        >
          <FaShoppingCart />
          Cart
        </NavLink>

        {currentUser ? (
          <>
            <div className={classes.userDropdown} ref={dropdownRef}>
              <button
                type="button"
                className={classes.userDropdownButton}
                onClick={() => setIsOpen((prev) => !prev)}
                aria-expanded={isOpen}
                aria-haspopup="true"
              >
                <FaUser />
                <span className={classes.username}>{username}</span>
                <FaChevronDown
                  className={`${classes.dropdownArrow} ${
                    isOpen ? classes.dropdownArrowOpen : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className={classes.dropdownMenu}>
                  <span>{username}</span>
                </div>
              )}
            </div>

            <button
              type="button"
              className={classes.logoutButton}
              onClick={handleLogout}
            >
              (Logout)
            </button>
          </>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `${classes.navLink} ${isActive ? classes.active : ''}`
            }
          >
            <FaUser />
            Login
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default Navbar;