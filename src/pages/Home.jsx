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
    .home {
      min-height: 100vh;
      background: linear-gradient(135deg, #000000 0%, #434343 100%);
      margin: 0;
      padding: 0;
      position: relative;
    }
    .home::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at 20% 80%, rgba(255,255,255,0.05) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05) 0%, transparent 50%);
      z-index: 1;
    }
    .home > * {
      position: relative;
      z-index: 2;
    }
    .hero-section {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      padding: 10rem 2rem;
      text-align: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
    .hero-content {
      max-width: 800px;
      margin: 0 auto;
    }
    .hero-content h1 {
      font-size: 5rem;
      font-weight: 800;
      background: linear-gradient(135deg, #000000, #434343);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 2rem;
      letter-spacing: -0.03em;
      line-height: 1.1;
      text-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
    .hero-content .subtitle {
      font-size: 1.2rem;
      color: #6b7280;
      margin-bottom: 3rem;
      font-weight: 400;
      line-height: 1.6;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }
    .login-btn {
      background: linear-gradient(135deg, #000000, #434343);
      color: white;
      border: none;
      padding: 1.25rem 3rem;
      border-radius: 15px;
      font-size: 1.125rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-bottom: 4rem;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .login-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
    }
    .login-btn:active {
      transform: translateY(-1px);
    }
    .stats-section {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      padding: 5rem 2rem;
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
      padding: 2rem 1rem;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-radius: 20px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }
    .stat-item:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
    }
    .stat-number {
      font-size: 3rem;
      font-weight: 800;
      background: linear-gradient(135deg, #000000, #434343);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      display: block;
      margin-bottom: 0.75rem;
    }
    .stat-label {
      color: #64748b;
      font-size: 0.875rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .features-section {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      padding: 8rem 2rem;
    }
    .features-container {
      max-width: 1200px;
      margin: 0 auto;
    }
    .section-title {
      text-align: center;
      font-size: 3rem;
      background: linear-gradient(135deg, #ffffff, #e5e7eb);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 1.5rem;
      font-weight: 800;
      letter-spacing: -0.03em;
    }
    .section-subtitle {
      text-align: center;
      font-size: 1.2rem;
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 5rem;
      max-width: 700px;
      margin-left: auto;
      margin-right: auto;
      line-height: 1.7;
      font-weight: 400;
    }
    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 3rem;
    }
    .feature {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 25px;
      padding: 4rem 2.5rem;
      text-align: center;
      transition: all 0.4s ease;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }
    .feature:hover {
      transform: translateY(-10px) scale(1.02);
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
      background: rgba(255, 255, 255, 1);
    }
    .feature-icon {
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, #000000, #434343);
      border-radius: 20px;
      margin: 0 auto 2.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
      transition: all 0.3s ease;
    }
    .feature:hover .feature-icon {
      transform: scale(1.1) rotate(5deg);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
    }
    .feature h3 {
      font-size: 1.75rem;
      margin-bottom: 1.25rem;
      background: linear-gradient(135deg, #000000, #434343);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-weight: 700;
      letter-spacing: -0.01em;
    }
    .feature p {
      color: #6b7280;
      line-height: 1.6;
      font-size: 1rem;
    }
    .cta-section {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      padding: 8rem 2rem;
      text-align: center;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
    }
    .cta-content {
      max-width: 600px;
      margin: 0 auto;
    }
    .cta-title {
      font-size: 3rem;
      margin-bottom: 1.5rem;
      font-weight: 800;
      background: linear-gradient(135deg, #000000, #434343);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      letter-spacing: -0.03em;
    }
    .cta-subtitle {
      font-size: 1.1rem;
      color: #6b7280;
      line-height: 1.6;
    }
    @media (max-width: 768px) {
      .hero-content h1 {
        font-size: 2.5rem;
      }
      .section-title, .cta-title {
        font-size: 2rem;
      }
      .features {
        grid-template-columns: 1fr;
      }
      .stats-container {
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
      }
      .feature {
        padding: 2rem 1.5rem;
      }
    }
    @media (max-width: 480px) {
      .hero-content h1 {
        font-size: 2rem;
      }
      .stats-container {
        grid-template-columns: 1fr;
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
            <button className="login-btn" onClick={() => navigate('/login')}>
              Get Started
            </button>
            <p className="subtitle">Your trusted digital pharmacy delivering authentic medicines and expert healthcare solutions</p>
          </div>
        </section>
        
        <section className="stats-section">
          <div className="stats-container">
            <div className="stat-item">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Customers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Medicines</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Support</span>
            </div>
            <div className="stat-item">
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
              <div className="feature">
                <div className="feature-icon">
                  <ShieldCheckIcon />
                </div>
                <h3>Verified Quality</h3>
                <p>All medicines sourced from licensed manufacturers with rigorous quality checks for authenticity and safety.</p>
              </div>
              <div className="feature">
                <div className="feature-icon">
                  <TruckIcon />
                </div>
                <h3>Fast Delivery</h3>
                <p>Express delivery within 24 hours with real-time tracking and temperature-controlled packaging.</p>
              </div>
              <div className="feature">
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