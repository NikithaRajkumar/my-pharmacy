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
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: white;
      padding: 1rem 2rem;
      color: #1e293b;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      position: sticky;
      top: 0;
      z-index: 1000;
      border-bottom: 1px solid #e2e8f0;
    }
    .navbar-logo a {
      color: #1e293b;
      text-decoration: none;
      font-size: 1.5rem;
      font-weight: 600;
      transition: all 0.2s ease;
    }
    .navbar-logo a:hover {
      color: #334155;
    }
    .navbar-links {
      list-style: none;
      display: flex;
      gap: 0.5rem;
      margin: 0;
      padding: 0;
      align-items: center;
    }
    .navbar-links li a {
      color: #64748b;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      transition: all 0.2s ease;
      font-weight: 500;
      font-size: 0.875rem;
    }
    .navbar-links li a:hover {
      background: #f8fafc;
      color: #1e293b;
    }
    .navbar-links li button {
      background: transparent;
      border: 1px solid #e2e8f0;
      color: #64748b;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      font-size: 0.875rem;
      transition: all 0.2s ease;
    }
    .navbar-links li button:hover {
      background: #f8fafc;
      border-color: #cbd5e1;
      color: #1e293b;
    }
    .user-greeting {
      color: #64748b;
      padding: 0.5rem 1rem;
      font-weight: 500;
      font-size: 0.875rem;
    }
    .cart-badge {
      background: #ef4444;
      color: white;
      border-radius: 50%;
      padding: 0.125rem 0.375rem;
      font-size: 0.75rem;
      margin-left: 0.25rem;
      min-width: 18px;
      text-align: center;
      font-weight: 600;
    }
    @media (max-width: 768px) {
      .navbar {
        padding: 0.75rem 1rem;
        flex-wrap: wrap;
      }
      .navbar-logo a {
        font-size: 1.25rem;
      }
      .navbar-links {
        gap: 0.25rem;
        flex-wrap: wrap;
      }
      .navbar-links li a {
        padding: 0.375rem 0.75rem;
        font-size: 0.8rem;
      }
    }
    @media (max-width: 480px) {
      .navbar {
        padding: 0.5rem 0.75rem;
      }
      .navbar-logo a {
        font-size: 1.125rem;
      }
      .navbar-links {
        gap: 0.125rem;
      }
      .navbar-links li a {
        padding: 0.25rem 0.5rem;
        font-size: 0.75rem;
      }
      .cart-badge {
        padding: 0.1rem 0.3rem;
        font-size: 0.7rem;
        margin-left: 0.2rem;
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
          <li><Link to="/browse">Browse Medicine</Link></li>
          <li>
            <Link to="/cart">
              Cart
              {getTotalItems() > 0 && (
                <span className="cart-badge">{getTotalItems()}</span>
              )}
            </Link>
          </li>
          <li><Link to="/orders">Orders</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          {isLoggedIn() && user?.role === 'admin' && (
            <li><Link to="/admin">Admin</Link></li>
          )}
          {isLoggedIn() ? (
            <>
              <li><span className="user-greeting">Hi, {user.name}</span></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
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