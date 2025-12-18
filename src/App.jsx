import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Browse from "./pages/Browse";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import { CartProvider } from "./context/CartContext";
import { OrdersProvider } from "./context/OrdersContext";
import { AuthProvider } from "./context/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary";

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
  
  :root {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    line-height: 1.6;
    font-weight: 400;
    color: #2c3e50;
    background-color: #000;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    scroll-behavior: smooth;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes slideInDown {
    from { opacity: 0; transform: translateY(-30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-30px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(30px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  
  @keyframes shimmer {
    0% { background-position: -200px 0; }
    100% { background-position: calc(200px + 100%) 0; }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  * {
    box-sizing: border-box;
  }
  
  *:focus {
    outline: 2px solid rgba(255,255,255,0.3);
    outline-offset: 2px;
  }
  
  html {
    scroll-behavior: smooth;
  }
  
  body {
    margin: 0;
    min-height: 100vh;
    background: linear-gradient(135deg, #000 0%, #1a1a1a 50%, #000 100%);
    overflow-x: hidden;
    animation: fadeIn 0.5s ease-out;
  }
  
  a {
    font-weight: 500;
    color: rgba(255,255,255,0.8);
    text-decoration: none;
    transition: all 0.3s ease;
    position: relative;
  }
  
  a:hover {
    color: white;
    transform: translateY(-1px);
  }
  
  a::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, rgba(255,255,255,0.8), transparent);
    transition: width 0.3s ease;
  }
  
  a:hover::after {
    width: 100%;
  }
  
  h1, h2, h3, h4, h5, h6 {
    color: white;
    font-weight: 700;
    line-height: 1.2;
    margin: 0 0 1rem 0;
    animation: slideInUp 0.6s ease-out;
  }
  
  p {
    animation: slideInUp 0.6s ease-out 0.1s both;
  }
  
  button {
    border-radius: 12px;
    border: none;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    font-family: inherit;
    background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1));
    color: white;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.2);
    position: relative;
    overflow: hidden;
    animation: scaleIn 0.5s ease-out;
  }
  
  button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s ease;
  }
  
  button:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 10px 25px rgba(0,0,0,0.3);
    border-color: rgba(255,255,255,0.4);
  }
  
  button:hover::before {
    left: 100%;
  }
  
  button:active {
    transform: translateY(-1px) scale(0.98);
  }
  
  input, textarea, select {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 8px;
    padding: 0.75rem;
    color: white;
    font-family: inherit;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    animation: slideInUp 0.5s ease-out;
  }
  
  input::placeholder, textarea::placeholder {
    color: rgba(255,255,255,0.5);
  }
  
  input:focus, textarea:focus, select:focus {
    border-color: rgba(255,255,255,0.4);
    background: rgba(255,255,255,0.1);
    transform: scale(1.02);
    box-shadow: 0 0 20px rgba(255,255,255,0.1);
  }
  
  .page-transition {
    animation: slideInUp 0.6s ease-out;
  }
  
  .card {
    background: rgba(255,255,255,0.05);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 20px;
    padding: 2rem;
    transition: all 0.4s ease;
    animation: scaleIn 0.6s ease-out;
  }
  
  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    border-color: rgba(255,255,255,0.2);
  }
  
  .glass {
    background: rgba(255,255,255,0.05);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255,255,255,0.1);
  }
  
  .animate-on-scroll {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease-out;
  }
  
  .animate-on-scroll.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    button {
      padding: 0.6rem 1.2rem;
      font-size: 0.9rem;
    }
    
    input, textarea, select {
      padding: 0.6rem;
    }
  }
  
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

const AppContent = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== '/';

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <style>{globalStyles}</style>
      <AuthProvider>
        <CartProvider>
          <OrdersProvider>
            <Router>
              <AppContent />
            </Router>
          </OrdersProvider>
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
