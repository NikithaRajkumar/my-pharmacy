import { useNavigate } from 'react-router-dom';

const ShieldCheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9 12l2 2 4-4"/>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const TruckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M14 18V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/>
    <path d="M15 18H9"/>
    <circle cx="6.5" cy="18.5" r="2.5"/>
    <circle cx="17.5" cy="18.5" r="2.5"/>
    <path d="M15 6h4l3 3v8a1 1 0 0 1-1 1h-2"/>
  </svg>
);

const UserCheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <polyline points="16,11 18,13 22,9"/>
  </svg>
);

const Home = () => {
  const navigate = useNavigate();
  
  const styles = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(50px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideInLeft {
      from { opacity: 0; transform: translateX(-50px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes slideInRight {
      from { opacity: 0; transform: translateX(50px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    @keyframes shimmer {
      0% { background-position: -200px 0; }
      100% { background-position: calc(200px + 100%) 0; }
    }
    .home {
      min-height: 100vh;
      background: linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%);
      margin: 0;
      padding: 0;
      position: relative;
      overflow-x: hidden;
    }
    .home::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
                  radial-gradient(circle at 40% 40%, rgba(255,255,255,0.05) 0%, transparent 50%);
      z-index: 1;
    }
    .home > * {
      position: relative;
      z-index: 2;
    }
    .hero-section {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(20px);
      padding: 12rem 2rem;
      text-align: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      animation: fadeInUp 1s ease-out;
    }
    .hero-content {
      max-width: 900px;
      margin: 0 auto;
    }
    .hero-content h1 {
      font-size: 6rem;
      font-weight: 900;
      background: linear-gradient(135deg, #ffffff 0%, #e5e7eb 50%, #ffffff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 2rem;
      letter-spacing: -0.05em;
      line-height: 1;
      animation: slideInLeft 1s ease-out 0.3s both;
      position: relative;
    }
    .hero-content h1::after {
      content: '';
      position: absolute;
      bottom: -20px; left: 50%;
      transform: translateX(-50%);
      width: 100px; height: 4px;
      background: linear-gradient(90deg, transparent, #fff, transparent);
      border-radius: 2px;
    }
    .hero-content .subtitle {
      font-size: 1.4rem;
      color: rgba(255,255,255,0.8);
      margin-bottom: 4rem;
      font-weight: 300;
      line-height: 1.6;
      max-width: 700px;
      margin-left: auto;
      margin-right: auto;
      animation: slideInRight 1s ease-out 0.6s both;
    }
    .login-btn {
      background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1));
      color: white;
      border: 2px solid rgba(255,255,255,0.3);
      padding: 1.5rem 4rem;
      border-radius: 50px;
      font-size: 1.2rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.4s ease;
      margin-bottom: 4rem;
      backdrop-filter: blur(10px);
      text-transform: uppercase;
      letter-spacing: 2px;
      position: relative;
      overflow: hidden;
      animation: fadeInUp 1s ease-out 0.9s both;
    }
    .login-btn::before {
      content: '';
      position: absolute;
      top: 0; left: -100%;
      width: 100%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
      transition: left 0.6s ease;
    }
    .login-btn:hover {
      transform: translateY(-5px) scale(1.05);
      box-shadow: 0 20px 40px rgba(0,0,0,0.3);
      border-color: rgba(255,255,255,0.6);
    }
    .login-btn:hover::before {
      left: 100%;
    }
    .login-btn:active {
      transform: translateY(-2px) scale(1.02);
    }
    .stats-section {
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(10px);
      padding: 6rem 2rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    .stats-container {
      max-width: 1000px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 3rem;
      text-align: center;
    }
    .stat-item {
      padding: 3rem 2rem;
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(20px);
      border-radius: 25px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      transition: all 0.4s ease;
      animation: fadeInUp 0.8s ease-out calc(var(--delay, 0) * 0.2s) both;
    }
    .stat-item:hover {
      transform: translateY(-10px) scale(1.05);
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.2);
      box-shadow: 0 20px 40px rgba(0,0,0,0.2);
    }
    .stat-number {
      font-size: 3.5rem;
      font-weight: 900;
      background: linear-gradient(135deg, #ffffff, #e5e7eb);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      display: block;
      margin-bottom: 1rem;
      animation: pulse 2s ease-in-out infinite;
    }
    .stat-label {
      color: rgba(255,255,255,0.7);
      font-size: 1rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .features-section {
      background: rgba(255, 255, 255, 0.02);
      backdrop-filter: blur(10px);
      padding: 10rem 2rem;
    }
    .features-container {
      max-width: 1200px;
      margin: 0 auto;
    }
    .section-title {
      text-align: center;
      font-size: 3.5rem;
      background: linear-gradient(135deg, #ffffff, #e5e7eb);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 2rem;
      font-weight: 900;
      letter-spacing: -0.03em;
      animation: fadeInUp 0.8s ease-out;
    }
    .section-subtitle {
      text-align: center;
      font-size: 1.3rem;
      color: rgba(255, 255, 255, 0.7);
      margin-bottom: 6rem;
      max-width: 700px;
      margin-left: auto;
      margin-right: auto;
      line-height: 1.7;
      font-weight: 300;
      animation: fadeInUp 0.8s ease-out 0.2s both;
    }
    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 4rem;
    }
    .feature {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 30px;
      padding: 4rem 3rem;
      text-align: center;
      transition: all 0.5s ease;
      animation: fadeInUp 0.8s ease-out calc(var(--delay, 0) * 0.2s) both;
    }
    .feature:hover {
      transform: translateY(-15px) scale(1.03);
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.2);
      box-shadow: 0 30px 60px rgba(0,0,0,0.3);
    }
    .feature-icon {
      width: 100px;
      height: 100px;
      background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1));
      border: 2px solid rgba(255,255,255,0.3);
      border-radius: 25px;
      margin: 0 auto 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      transition: all 0.4s ease;
      backdrop-filter: blur(10px);
      animation: float 3s ease-in-out infinite;
    }
    .feature:hover .feature-icon {
      transform: scale(1.2) rotate(10deg);
      background: linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.2));
      border-color: rgba(255,255,255,0.5);
    }
    .feature h3 {
      font-size: 2rem;
      margin-bottom: 1.5rem;
      color: white;
      font-weight: 700;
      letter-spacing: -0.01em;
    }
    .feature p {
      color: rgba(255,255,255,0.7);
      line-height: 1.7;
      font-size: 1.1rem;
      font-weight: 300;
    }
    .cta-section {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(20px);
      padding: 10rem 2rem;
      text-align: center;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      animation: fadeInUp 0.8s ease-out;
    }
    .cta-content {
      max-width: 700px;
      margin: 0 auto;
    }
    .cta-title {
      font-size: 3.5rem;
      margin-bottom: 2rem;
      font-weight: 900;
      background: linear-gradient(135deg, #ffffff, #e5e7eb);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      letter-spacing: -0.03em;
      animation: slideInLeft 0.8s ease-out 0.2s both;
    }
    .cta-subtitle {
      font-size: 1.2rem;
      color: rgba(255,255,255,0.7);
      line-height: 1.7;
      font-weight: 300;
      animation: slideInRight 0.8s ease-out 0.4s both;
    }
    @media (max-width: 768px) {
      .hero-content h1 {
        font-size: 3rem;
      }
      .section-title, .cta-title {
        font-size: 2.5rem;
      }
      .features {
        grid-template-columns: 1fr;
        gap: 3rem;
      }
      .stats-container {
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
      }
      .feature {
        padding: 3rem 2rem;
      }
      .hero-section {
        padding: 8rem 2rem;
      }
    }
    @media (max-width: 480px) {
      .hero-content h1 {
        font-size: 2.5rem;
      }
      .stats-container {
        grid-template-columns: 1fr;
      }
      .login-btn {
        padding: 1.2rem 3rem;
        font-size: 1rem;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="home">
        <section className="hero-section">
          <div className="hero-content">
            <h1>medPlus</h1>
            <p className="subtitle">Your trusted digital pharmacy delivering authentic medicines and expert healthcare solutions</p>
            <button className="login-btn" onClick={() => navigate('/login')}>
              Get Started
            </button>
          </div>
        </section>
        
        <section className="stats-section">
          <div className="stats-container">
            <div className="stat-item" style={{'--delay': 0}}>
              <span className="stat-number">50K+</span>
              <span className="stat-label">Customers</span>
            </div>
            <div className="stat-item" style={{'--delay': 1}}>
              <span className="stat-number">10K+</span>
              <span className="stat-label">Medicines</span>
            </div>
            <div className="stat-item" style={{'--delay': 2}}>
              <span className="stat-number">24/7</span>
              <span className="stat-label">Support</span>
            </div>
            <div className="stat-item" style={{'--delay': 3}}>
              <span className="stat-number">99%</span>
              <span className="stat-label">Satisfaction</span>
            </div>
          </div>
        </section>
        
        <section className="features-section">
          <div className="features-container">
            <h2 className="section-title">Why Choose medPlus</h2>
            <p className="section-subtitle">Professional healthcare solutions with verified quality and expert support</p>
            <div className="features">
              <div className="feature" style={{'--delay': 0}}>
                <div className="feature-icon">
                  <ShieldCheckIcon />
                </div>
                <h3>Verified Quality</h3>
                <p>All medicines sourced from licensed manufacturers with rigorous quality checks for authenticity and safety.</p>
              </div>
              <div className="feature" style={{'--delay': 1}}>
                <div className="feature-icon">
                  <TruckIcon />
                </div>
                <h3>Fast Delivery</h3>
                <p>Express delivery within 24 hours with real-time tracking and temperature-controlled packaging.</p>
              </div>
              <div className="feature" style={{'--delay': 2}}>
                <div className="feature-icon">
                  <UserCheckIcon />
                </div>
                <h3>Expert Support</h3>
                <p>24/7 access to licensed pharmacists and healthcare professionals for personalized guidance.</p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="cta-section">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Get Started</h2>
            <p className="cta-subtitle">Join thousands of customers who trust medPlus for their healthcare needs</p>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;