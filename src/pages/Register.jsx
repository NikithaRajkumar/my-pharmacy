import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target["confirm-password"].value;
    const role = e.target.role.value;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await register({ name, email, password, role });
      if (response.requiresApproval) {
        alert("Admin registration submitted successfully! Your account is awaiting approval from the current admin. You will be able to login once approved.");
        setTimeout(() => navigate("/login"), 1000);
        return;
      }
      navigate("/browse");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    }
  };

  const styles = `
    .register-page {
      min-height: 100vh;
      background: linear-gradient(135deg, #000000 0%, #434343 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      position: relative;
    }
    .register-page::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%);
    }
    .register-container {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-radius: 20px;
      padding: 3rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
      width: 100%;
      max-width: 500px;
      position: relative;
      z-index: 1;
    }
    .register-header {
      text-align: center;
      margin-bottom: 2rem;
    }
    .register-title {
      font-size: 2.5rem;
      font-weight: 700;
      background: linear-gradient(135deg, #000000, #434343);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 0.5rem;
      letter-spacing: -0.02em;
    }
    .register-subtitle {
      color: #64748b;
      font-size: 1rem;
      font-weight: 400;
    }
    .register-form {
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
    .form-group input,
    .form-group select {
      width: 100%;
      padding: 1rem;
      border: 2px solid #e5e7eb;
      border-radius: 12px;
      font-size: 1rem;
      transition: all 0.3s ease;
      background: white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }
    .form-group input:focus,
    .form-group select:focus {
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
    .register-btn {
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
    .register-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 25px rgba(0, 0, 0, 0.4);
    }
    .register-btn:active {
      transform: translateY(0);
    }
    .register-footer {
      text-align: center;
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid #e5e7eb;
    }
    .register-footer p {
      color: #6b7280;
      margin-bottom: 0.75rem;
      font-size: 0.875rem;
    }
    .register-footer a {
      color: #000000;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.2s ease;
      padding: 0.5rem 1rem;
      border-radius: 8px;
    }
    .register-footer a:hover {
      background: #f8fafc;
      color: #434343;
    }
    @media (max-width: 768px) {
      .register-page {
        padding: 1.5rem;
      }
      .register-container {
        padding: 1.5rem;
        max-width: 100%;
      }
      .register-title {
        font-size: 1.5rem;
      }
      .register-subtitle {
        font-size: 0.875rem;
      }
    }
    @media (max-width: 480px) {
      .register-page {
        padding: 1rem;
        align-items: flex-start;
        padding-top: 2rem;
      }
      .register-container {
        padding: 1.25rem;
      }
      .register-title {
        font-size: 1.25rem;
      }
      .register-subtitle {
        font-size: 0.8rem;
      }
      .register-header {
        margin-bottom: 1.5rem;
      }
      .form-group input {
        padding: 0.625rem;
        font-size: 0.8rem;
      }
      .register-btn {
        padding: 0.625rem 1.25rem;
        font-size: 0.875rem;
      }
      .register-footer {
        margin-top: 1.25rem;
        padding-top: 1.25rem;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="register-page">
        <div className="register-container">
          <div className="register-header">
            <h2 className="register-title">Join medPlus</h2>
            <p className="register-subtitle">Create your account to get started</p>
          </div>
          <form className="register-form" onSubmit={handleSubmit}>
            {error && <div className="error">{error}</div>}
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required />
            </div>
            <div className="form-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input type="password" id="confirm-password" name="confirm-password" required />
            </div>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select id="role" name="role" required>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" className="register-btn">
              Create Account
            </button>
          </form>
          <div className="register-footer">
            <p>Already have an account?</p>
            <a href="/login">Sign In</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;