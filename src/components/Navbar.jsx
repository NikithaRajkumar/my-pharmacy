import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import Alert from './Alert';

const Navbar = () => {
  const { getTotalItems, clearCart } = useCart();
  const { user, logout, isLoggedIn } = useAuth();
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);

  const handleLogout = () => {
    setShowLogoutAlert(true);
  };

  const confirmLogout = () => {
    logout();
    clearCart();
    localStorage.removeItem('currentUser');
  };

  const styles = `
    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
    @keyframes glow {
      0%, 100% { box-shadow: 0 0 5px rgba(255,255,255,0.3); }
      50% { box-shadow: 0 0 20px rgba(255,255,255,0.6); }
    }
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(255,255,255,0.05);
      backdrop-filter: blur(20px);
      padding: 1.5rem 2rem;
      color: white;
      position: sticky;
      top: 0;
      z-index: 1000;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      animation: slideDown 0.6s ease-out;
      transition: all 0.3s ease;
    }
    .navbar:hover {
      background: rgba(255,255,255,0.08);
      border-bottom-color: rgba(255,255,255,0.2);
    }
    .navbar-logo a {
      color: white;
      text-decoration: none;
      font-size: 2rem;
      font-weight: 900;
      background: linear-gradient(135deg, #fff 0%, #e5e7eb 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transition: all 0.3s ease;
      letter-spacing: -0.02em;
      position: relative;
    }
    .navbar-logo a::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 0;
      height: 3px;
      background: linear-gradient(90deg, #fff, transparent);
      transition: width 0.3s ease;
      border-radius: 2px;
    }
    .navbar-logo a:hover::after {
      width: 100%;
    }
    .navbar-logo a:hover {
      transform: scale(1.05);
      filter: drop-shadow(0 0 10px rgba(255,255,255,0.3));
    }
    .navbar-links {
      list-style: none;
      display: flex;
      gap: 1rem;
      margin: 0;
      padding: 0;
      align-items: center;
    }
    .navbar-links li {
      animation: fadeIn 0.6s ease-out calc(var(--delay, 0) * 0.1s) both;
    }
    .navbar-links li a {
      color: rgba(255,255,255,0.8);
      text-decoration: none;
      padding: 0.75rem 1.25rem;
      border-radius: 12px;
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      font-weight: 500;
      font-size: 0.9rem;
      position: relative;
      overflow: hidden;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      backdrop-filter: blur(10px);
    }
    .navbar-links li a::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: left 0.5s ease;
    }
    .navbar-links li a:hover {
      background: rgba(255,255,255,0.15);
      color: white;
      transform: translateY(-2px) scale(1.05);
      border-color: rgba(255,255,255,0.3);
      box-shadow: 0 8px 25px rgba(0,0,0,0.2);
    }
    .navbar-links li a:hover::before {
      left: 100%;
    }
    .navbar-links li button {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.2);
      color: rgba(255,255,255,0.8);
      padding: 0.75rem 1.25rem;
      border-radius: 12px;
      cursor: pointer;
      font-weight: 500;
      font-size: 0.9rem;
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      backdrop-filter: blur(10px);
      position: relative;
      overflow: hidden;
    }
    .navbar-links li button::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: left 0.5s ease;
    }
    .navbar-links li button:hover {
      background: rgba(255,255,255,0.15);
      border-color: rgba(255,255,255,0.4);
      color: white;
      transform: translateY(-2px) scale(1.05);
      box-shadow: 0 8px 25px rgba(0,0,0,0.2);
    }
    .navbar-links li button:hover::before {
      left: 100%;
    }
    .user-greeting {
      color: rgba(255,255,255,0.9);
      padding: 0.75rem 1.25rem;
      font-weight: 600;
      font-size: 0.9rem;
      background: rgba(255,255,255,0.1);
      border-radius: 12px;
      border: 1px solid rgba(255,255,255,0.2);
      backdrop-filter: blur(10px);
      animation: glow 2s ease-in-out infinite;
    }
    .cart-badge {
      background: linear-gradient(135deg, #ef4444, #dc2626);
      color: white;
      border-radius: 50%;
      padding: 0.2rem 0.5rem;
      font-size: 0.75rem;
      margin-left: 0.5rem;
      min-width: 20px;
      text-align: center;
      font-weight: 700;
      animation: pulse 2s ease-in-out infinite;
      box-shadow: 0 2px 8px rgba(239, 68, 68, 0.4);
      border: 2px solid rgba(255,255,255,0.3);
    }
    @media (max-width: 768px) {
      .navbar {
        padding: 1rem 1.5rem;
        flex-wrap: wrap;
        gap: 1rem;
      }
      .navbar-logo a {
        font-size: 1.5rem;
      }
      .navbar-links {
        gap: 0.5rem;
        flex-wrap: wrap;
      }
      .navbar-links li a,
      .navbar-links li button {
        padding: 0.5rem 1rem;
        font-size: 0.8rem;
      }
      .user-greeting {
        padding: 0.5rem 1rem;
        font-size: 0.8rem;
      }
    }
    @media (max-width: 480px) {
      .navbar {
        padding: 0.75rem 1rem;
      }
      .navbar-logo a {
        font-size: 1.25rem;
      }
      .navbar-links {
        gap: 0.25rem;
      }
      .navbar-links li a,
      .navbar-links li button {
        padding: 0.4rem 0.8rem;
        font-size: 0.75rem;
      }
      .user-greeting {
        padding: 0.4rem 0.8rem;
        font-size: 0.75rem;
      }
      .cart-badge {
        padding: 0.15rem 0.4rem;
        font-size: 0.7rem;
        margin-left: 0.3rem;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/">medPlus</Link>
        </div>
        <ul className="navbar-links">
          <li style={{'--delay': 1}}><Link to="/browse">Browse Medicine</Link></li>
          <li style={{'--delay': 2}}>
            <Link to="/cart">
              Cart
              {getTotalItems() > 0 && (
                <span className="cart-badge">{getTotalItems()}</span>
              )}
            </Link>
          </li>
          <li style={{'--delay': 3}}><Link to="/orders">Orders</Link></li>
          <li style={{'--delay': 4}}><Link to="/contact">Contact</Link></li>
          {isLoggedIn() && user?.role === 'admin' && (
            <li style={{'--delay': 5}}><Link to="/admin">Admin</Link></li>
          )}
          {isLoggedIn() ? (
            <>
              <li style={{'--delay': 6}}><span className="user-greeting">Hi, {user.name}</span></li>
              <li style={{'--delay': 7}}><button onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <>
              <li style={{'--delay': 6}}><Link to="/login">Login</Link></li>
              <li style={{'--delay': 7}}><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </nav>
      <Alert
        isOpen={showLogoutAlert}
        onClose={() => setShowLogoutAlert(false)}
        onConfirm={confirmLogout}
        title="Confirm Logout"
        message="Are you sure you want to logout? You will need to login again to access your account."
        type="confirm"
      />
    </>
  );
};

export default Navbar;