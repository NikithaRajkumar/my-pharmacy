import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loginType, setLoginType] = useState("user");
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    try {
      const data = await login({ email, password });
      
      if (loginType === "admin" && data.user.role !== "admin") {
        setError("Access denied. Admin credentials required.");
        return;
      }

      if (loginType === "user" && data.user.role === "admin") {
        setError("Please use Admin Login for admin accounts.");
        return;
      }

      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/browse");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

  const styles = `
    .login-page {
      min-height: 100vh;
      background: linear-gradient(135deg, #000000 0%, #434343 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      position: relative;
    }
    .login-page::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%);
    }
    .login-container {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-radius: 20px;
      padding: 3rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
      width: 100%;
      max-width: 450px;
      position: relative;
      z-index: 1;
    }
    .login-header {
      text-align: center;
      margin-bottom: 2rem;
    }
    .login-title {
      font-size: 2.5rem;
      font-weight: 700;
      background: linear-gradient(135deg, #000000, #434343);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 0.5rem;
      letter-spacing: -0.02em;
    }
    .login-subtitle {
      color: #64748b;
      font-size: 1rem;
      font-weight: 400;
    }
    .login-tabs {
      display: flex;
      margin-bottom: 2rem;
      background: #f8fafc;
      border-radius: 12px;
      padding: 4px;
    }
    .login-tab {
      flex: 1;
      padding: 0.75rem;
      background: none;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;
      color: #64748b;
      transition: all 0.3s ease;
    }
    .login-tab.active {
      color: white;
      background: linear-gradient(135deg, #000000, #434343);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }
    .login-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .form-group {
      position: relative;
    }
    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
      color: #000000;
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .form-group input {
      width: 100%;
      padding: 1rem;
      border: 2px solid #e5e7eb;
      border-radius: 12px;
      font-size: 1rem;
      transition: all 0.3s ease;
      background: white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }
    .form-group input:focus {
      outline: none;
      border-color: #000000;
      box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    }
    .error {
      background: #fef2f2;
      color: #dc2626;
      padding: 0.75rem;
      border-radius: 6px;
      font-size: 0.875rem;
      text-align: center;
      border: 1px solid #fecaca;
    }
    .login-btn {
      background: linear-gradient(135deg, #000000, #434343);
      color: white;
      border: none;
      padding: 1rem 2rem;
      border-radius: 12px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 600;
      transition: all 0.3s ease;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .login-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 25px rgba(0, 0, 0, 0.4);
    }
    .login-btn:active {
      transform: translateY(0);
    }
    .login-footer {
      text-align: center;
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid #e5e7eb;
    }
    .login-footer p {
      color: #6b7280;
      margin-bottom: 0.75rem;
      font-size: 0.875rem;
    }
    .login-footer a {
      color: #000000;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.2s ease;
      padding: 0.5rem 1rem;
      border-radius: 8px;
    }
    .login-footer a:hover {
      background: #f8fafc;
      color: #434343;
    }
    @media (max-width: 768px) {
      .login-page {
        padding: 1.5rem;
      }
      .login-container {
        padding: 1.5rem;
        max-width: 100%;
      }
      .login-title {
        font-size: 1.5rem;
      }
      .login-subtitle {
        font-size: 0.875rem;
      }
    }
    @media (max-width: 480px) {
      .login-page {
        padding: 1rem;
        align-items: flex-start;
        padding-top: 2rem;
      }
      .login-container {
        padding: 1.25rem;
      }
      .login-title {
        font-size: 1.25rem;
      }
      .login-subtitle {
        font-size: 0.8rem;
      }
      .login-header {
        margin-bottom: 1.5rem;
      }
      .form-group input {
        padding: 0.625rem;
        font-size: 0.8rem;
      }
      .login-btn {
        padding: 0.625rem 1.25rem;
        font-size: 0.875rem;
      }
      .login-footer {
        margin-top: 1.25rem;
        padding-top: 1.25rem;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="login-page">
        <div className="login-container">
          <div className="login-header">
            <h2 className="login-title">Welcome Back</h2>
            <p className="login-subtitle">Sign in to your medPlus account</p>
          </div>
          <div className="login-tabs">
            <button 
              className={`login-tab ${loginType === 'user' ? 'active' : ''}`}
              onClick={() => {setLoginType('user'); setError('');}}
            >
              User Login
            </button>
            <button 
              className={`login-tab ${loginType === 'admin' ? 'active' : ''}`}
              onClick={() => {setLoginType('admin'); setError('');}}
            >
              Admin Login
            </button>
          </div>
          <form className="login-form" onSubmit={handleSubmit}>
            {error && <div className="error">{error}</div>}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required />
            </div>
            <button type="submit" className="login-btn">
              Sign In
            </button>
          </form>
          <div className="login-footer">
            <p>Don't have an account?</p>
            <a href="/register">Create Account</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;