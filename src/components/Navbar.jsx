import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authApi';
import './Navbar.css';

function Navbar() {
  const [show, handleShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener('scroll', () => {});
    };
  }, []);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
    window.location.reload();
  };

  const getUsername = () => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        return parsedUser.username || 'User';
      } catch (e) {
        return 'User';
      }
    }
    return 'User';
  };

  const isAdmin = () => {
    const userEmail = localStorage.getItem('userEmail');
    return userEmail === 'prajwalkr612@gmail.com';
  };

  const handleAdminClick = () => {
    navigate('/admin');
  };

  return (
    <div className={`nav ${show && 'nav__black'}`}>
      <img
        className="nav__logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
        alt="Netflix Logo"
      />
      <div className="nav__right">
        <span className="nav__user">{localStorage.getItem('userEmail')}</span>
        <span className="nav__username">({getUsername()})</span>
        {isAdmin() && (
          <button
            className="nav__admin"
            onClick={handleAdminClick}
            title="Admin Dashboard"
          >
            Admin
          </button>
        )}
        <button
          className="nav__logout"
          onClick={handleLogout}
          title="Logout"
        >
          Logout
        </button>
        <img
          className="nav__avatar"
          src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png"
          alt="Avatar"
          onClick={handleLogout}
          style={{ cursor: 'pointer' }}
        />
      </div>
    </div>
  );
}

export default Navbar;
