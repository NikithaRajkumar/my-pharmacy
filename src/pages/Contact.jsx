import { useState } from "react";
import { useAlert } from "../hooks/useAlert";
import Alert from "../components/Alert";

const Contact = () => {
  const { alert, showSuccess, hideAlert } = useAlert();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [feedbackData, setFeedbackData] = useState({
    name: "",
    email: "",
    rating: 5,
    feedback: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFeedbackChange = (e) => {
    setFeedbackData({
      ...feedbackData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    showSuccess("Thank you for your message! We will get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    showSuccess("Thank you for your feedback! We appreciate your input.");
    setFeedbackData({ name: "", email: "", rating: 5, feedback: "" });
  };

  const styles = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
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
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    @keyframes shimmer {
      0% { background-position: -200px 0; }
      100% { background-position: calc(200px + 100%) 0; }
    }
    .contact-page {
      min-height: 100vh;
      background: linear-gradient(135deg, #000 0%, #1a1a1a 50%, #000 100%);
      position: relative;
      overflow-x: hidden;
    }
    .contact-page::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%);
      pointer-events: none;
    }
    .contact-header {
      background: rgba(255,255,255,0.05);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255,255,255,0.1);
      padding: 4rem 2rem;
      text-align: center;
      position: relative;
      animation: fadeInUp 0.8s ease-out;
    }
    .contact-title {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 1rem;
      background: linear-gradient(135deg, #fff 0%, #ccc 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: slideInLeft 0.8s ease-out 0.2s both;
    }
    .contact-subtitle {
      font-size: 1.25rem;
      color: rgba(255,255,255,0.8);
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
      animation: slideInRight 0.8s ease-out 0.4s both;
    }
    .contact-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 4rem 2rem;
      display: grid;
      grid-template-columns: 1fr 1fr 400px;
      gap: 3rem;
      position: relative;
    }
    .contact-form, .feedback-form {
      background: rgba(255,255,255,0.05);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 20px;
      padding: 2.5rem;
      transition: all 0.4s ease;
      animation: fadeInUp 0.8s ease-out 0.6s both;
    }
    .contact-form:hover, .feedback-form:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px rgba(0,0,0,0.3);
      border-color: rgba(255,255,255,0.2);
    }
    .form-title {
      font-size: 1.75rem;
      font-weight: 600;
      color: white;
      margin-bottom: 2rem;
      position: relative;
    }
    .form-title::after {
      content: '';
      position: absolute;
      bottom: -10px; left: 0;
      width: 50px; height: 3px;
      background: linear-gradient(90deg, #fff, transparent);
      border-radius: 2px;
    }
    .form-group {
      margin-bottom: 1.5rem;
      animation: slideInLeft 0.6s ease-out calc(var(--delay, 0) * 0.1s) both;
    }
    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: rgba(255,255,255,0.9);
      font-size: 0.875rem;
      transition: color 0.3s ease;
    }
    .form-group input, .form-group textarea {
      width: 100%;
      padding: 1rem;
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 12px;
      font-size: 0.875rem;
      transition: all 0.3s ease;
      background: rgba(255,255,255,0.05);
      color: white;
      backdrop-filter: blur(10px);
    }
    .form-group input::placeholder, .form-group textarea::placeholder {
      color: rgba(255,255,255,0.5);
    }
    .form-group input:focus, .form-group textarea:focus {
      outline: none;
      border-color: rgba(255,255,255,0.4);
      background: rgba(255,255,255,0.1);
      transform: scale(1.02);
      box-shadow: 0 0 20px rgba(255,255,255,0.1);
    }
    .form-group textarea {
      resize: vertical;
      min-height: 120px;
    }
    .submit-btn {
      background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1));
      color: white;
      border: 1px solid rgba(255,255,255,0.3);
      padding: 1rem 2rem;
      border-radius: 12px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 600;
      transition: all 0.3s ease;
      width: 100%;
      backdrop-filter: blur(10px);
      position: relative;
      overflow: hidden;
    }
    .submit-btn::before {
      content: '';
      position: absolute;
      top: 0; left: -100%;
      width: 100%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: left 0.5s ease;
    }
    .submit-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(0,0,0,0.3);
      border-color: rgba(255,255,255,0.5);
    }
    .submit-btn:hover::before {
      left: 100%;
    }
    .submit-btn:active {
      transform: translateY(0);
    }
    .rating-group {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
    .rating-stars {
      display: flex;
      gap: 0.25rem;
    }
    .star {
      cursor: pointer;
      font-size: 1.8rem;
      color: rgba(255,255,255,0.3);
      transition: all 0.3s ease;
      transform-origin: center;
    }
    .star:hover {
      transform: scale(1.2) rotate(5deg);
      color: rgba(255,215,0,0.8);
    }
    .star.active {
      color: #ffd700;
      animation: pulse 0.6s ease;
    }
    .contact-info {
      background: rgba(255,255,255,0.05);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 20px;
      padding: 2.5rem;
      height: fit-content;
      transition: all 0.4s ease;
      animation: fadeInUp 0.8s ease-out 0.8s both;
    }
    .contact-info:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px rgba(0,0,0,0.3);
      border-color: rgba(255,255,255,0.2);
    }
    .info-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: white;
      margin-bottom: 2rem;
      position: relative;
    }
    .info-title::after {
      content: '';
      position: absolute;
      bottom: -10px; left: 0;
      width: 50px; height: 3px;
      background: linear-gradient(90deg, #fff, transparent);
      border-radius: 2px;
    }
    .info-item {
      margin-bottom: 2rem;
      padding: 1rem;
      border-radius: 12px;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      transition: all 0.3s ease;
      animation: slideInRight 0.6s ease-out calc(var(--delay, 0) * 0.1s) both;
    }
    .info-item:hover {
      background: rgba(255,255,255,0.1);
      transform: translateX(5px);
    }
    .info-label {
      font-weight: 600;
      color: rgba(255,255,255,0.9);
      font-size: 0.875rem;
      margin-bottom: 0.5rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .info-value {
      color: rgba(255,255,255,0.7);
      font-size: 0.875rem;
      line-height: 1.5;
    }
    .hours-section {
      margin-top: 2rem;
      padding-top: 2rem;
      border-top: 1px solid rgba(255,255,255,0.1);
    }
    .hours-title {
      font-weight: 600;
      color: rgba(255,255,255,0.9);
      font-size: 1rem;
      margin-bottom: 1rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .hours-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.75rem;
      font-size: 0.875rem;
      padding: 0.5rem;
      border-radius: 8px;
      transition: all 0.3s ease;
    }
    .hours-item:hover {
      background: rgba(255,255,255,0.05);
    }
    .hours-day {
      color: rgba(255,255,255,0.9);
      font-weight: 500;
    }
    .hours-time {
      color: rgba(255,255,255,0.7);
    }
    @media (max-width: 1024px) {
      .contact-content {
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
      }
    }
    @media (max-width: 768px) {
      .contact-content {
        grid-template-columns: 1fr;
        gap: 2rem;
        padding: 2rem 1rem;
      }
      .contact-title {
        font-size: 2rem;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="contact-page">
        <div className="contact-header">
          <h1 className="contact-title">Contact Us</h1>
          <p className="contact-subtitle">
            Get in touch with our healthcare professionals for any questions or support
          </p>
        </div>
        <div className="contact-content">
          <div className="contact-form">
            <h2 className="form-title">Send us a Message</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group" style={{'--delay': 1}}>
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="form-group" style={{'--delay': 2}}>
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div className="form-group" style={{'--delay': 3}}>
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="What is this about?"
                  required
                />
              </div>
              <div className="form-group" style={{'--delay': 4}}>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us more about your inquiry..."
                  required
                />
              </div>
              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </form>
          </div>

          <div className="feedback-form">
            <h2 className="form-title">Share Your Feedback</h2>
            <form onSubmit={handleFeedbackSubmit}>
              <div className="form-group" style={{'--delay': 1}}>
                <label htmlFor="feedback-name">Name</label>
                <input
                  type="text"
                  id="feedback-name"
                  name="name"
                  value={feedbackData.name}
                  onChange={handleFeedbackChange}
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="form-group" style={{'--delay': 2}}>
                <label htmlFor="feedback-email">Email</label>
                <input
                  type="email"
                  id="feedback-email"
                  name="email"
                  value={feedbackData.email}
                  onChange={handleFeedbackChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div className="form-group" style={{'--delay': 3}}>
                <label>Rating</label>
                <div className="rating-group">
                  <div className="rating-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`star ${star <= feedbackData.rating ? 'active' : ''}`}
                        onClick={() => setFeedbackData({...feedbackData, rating: star})}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span style={{fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)'}}>({feedbackData.rating}/5)</span>
                </div>
              </div>
              <div className="form-group" style={{'--delay': 4}}>
                <label htmlFor="feedback-text">Your Feedback</label>
                <textarea
                  id="feedback-text"
                  name="feedback"
                  value={feedbackData.feedback}
                  onChange={handleFeedbackChange}
                  placeholder="Tell us about your experience with our service..."
                  required
                />
              </div>
              <button type="submit" className="submit-btn">
                Submit Feedback
              </button>
            </form>
          </div>

          <div className="contact-info">
            <h2 className="info-title">Contact Information</h2>

            <div className="info-item" style={{'--delay': 1}}>
              <div className="info-label">📍 Address</div>
              <div className="info-value">
                123 Kondampatti<br />
                Coimbatore District<br />
                Coimbatore city, Tamil Nadu-641202
              </div>
            </div>

            <div className="info-item" style={{'--delay': 2}}>
              <div className="info-label">📞 Phone</div>
              <div className="info-value">+91 9080214005</div>
            </div>

            <div className="info-item" style={{'--delay': 3}}>
              <div className="info-label">✉️ Email</div>
              <div className="info-value">support@medplus.com</div>
            </div>

            <div className="info-item" style={{'--delay': 4}}>
              <div className="info-label">🚨 Emergency Hotline</div>
              <div className="info-value">+91 9823437164</div>
            </div>

            <div className="hours-section">
              <div className="hours-title">Business Hours</div>
              <div className="hours-item">
                <span className="hours-day">Monday - Friday</span>
                <span className="hours-time">8:00 AM - 10:00 PM</span>
              </div>
              <div className="hours-item">
                <span className="hours-day">Saturday</span>
                <span className="hours-time">9:00 AM - 8:00 PM</span>
              </div>
              <div className="hours-item">
                <span className="hours-day">Sunday</span>
                <span className="hours-time">10:00 AM - 6:00 PM</span>
              </div>
              <div className="hours-item">
                <span className="hours-day">Holidays</span>
                <span className="hours-time">Emergency Only</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Alert
        isOpen={alert.isOpen}
        onClose={hideAlert}
        onConfirm={alert.onConfirm}
        title={alert.title}
        message={alert.message}
        type={alert.type}
        variant={alert.variant}
      />
    </>
  );
};

export default Contact;