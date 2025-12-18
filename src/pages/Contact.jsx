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
    .contact-page {
      min-height: 100vh;
      background: #f8fafc;
    }
    .contact-header {
      background: white;
      padding: 2rem;
      border-bottom: 1px solid #e2e8f0;
      text-align: center;
    }
    .contact-title {
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: #1e293b;
    }
    .contact-subtitle {
      font-size: 1rem;
      color: #64748b;
      max-width: 600px;
      margin: 0 auto;
    }
    .contact-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 2rem;
    }
    .contact-form {
      background: white;
      border-radius: 8px;
      padding: 2rem;
      border: 1px solid #e2e8f0;
    }
    .form-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 1.5rem;
    }
    .form-group {
      margin-bottom: 1rem;
    }
    .form-group label {
      display: block;
      margin-bottom: 0.375rem;
      font-weight: 500;
      color: #374151;
      font-size: 0.875rem;
    }
    .form-group input,
    .form-group textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      font-size: 0.875rem;
      transition: border-color 0.2s ease;
      background: white;
    }
    .form-group input:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #1e293b;
    }
    .form-group textarea {
      resize: vertical;
      min-height: 120px;
    }
    .submit-btn {
      background: #1e293b;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 6px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 500;
      transition: background-color 0.2s ease;
      width: 100%;
    }
    .submit-btn:hover {
      background: #334155;
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
      font-size: 1.5rem;
      color: #d1d5db;
      transition: color 0.2s ease;
    }
    .star.active {
      color: #fbbf24;
    }
    .feedback-form {
      background: white;
      border-radius: 8px;
      padding: 2rem;
      border: 1px solid #e2e8f0;
    }
    .contact-info {
      background: white;
      border-radius: 8px;
      padding: 2rem;
      border: 1px solid #e2e8f0;
      height: fit-content;
    }
    .info-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 1.5rem;
    }
    .info-item {
      margin-bottom: 1.5rem;
    }
    .info-label {
      font-weight: 500;
      color: #374151;
      font-size: 0.875rem;
      margin-bottom: 0.25rem;
    }
    .info-value {
      color: #64748b;
      font-size: 0.875rem;
    }
    .hours-section {
      margin-top: 2rem;
      padding-top: 2rem;
      border-top: 1px solid #e5e7eb;
    }
    .hours-title {
      font-weight: 500;
      color: #374151;
      font-size: 0.875rem;
      margin-bottom: 1rem;
    }
    .hours-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      font-size: 0.875rem;
    }
    .hours-day {
      color: #374151;
    }
    .hours-time {
      color: #64748b;
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
        padding: 1rem;
      }
      .contact-form,
      .contact-info,
      .feedback-form {
        padding: 1.5rem;
      }
    }
    @media (max-width: 480px) {
      .contact-header {
        padding: 1.5rem 1rem;
      }
      .contact-title {
        font-size: 1.5rem;
      }
      .contact-content {
        padding: 1rem 0.5rem;
      }
      .contact-form,
      .contact-info {
        padding: 1rem;
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
            Get in touch with our healthcare professionals for any questions or
            support
          </p>
        </div>
        <div className="contact-content">
          <div className="contact-form">
            <h2 className="form-title">Send us a Message</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
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
              <div className="form-group">
                <label htmlFor="feedback-name">Name</label>
                <input
                  type="text"
                  id="feedback-name"
                  name="name"
                  value={feedbackData.name}
                  onChange={handleFeedbackChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="feedback-email">Email</label>
                <input
                  type="email"
                  id="feedback-email"
                  name="email"
                  value={feedbackData.email}
                  onChange={handleFeedbackChange}
                  required
                />
              </div>
              <div className="form-group">
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
                  <span style={{fontSize: '0.875rem', color: '#64748b'}}>({feedbackData.rating}/5)</span>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="feedback-text">Your Feedback</label>
                <textarea
                  id="feedback-text"
                  name="feedback"
                  value={feedbackData.feedback}
                  onChange={handleFeedbackChange}
                  placeholder="Tell us about your experience..."
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

            <div className="info-item">
              <div className="info-label">Address</div>
              <div className="info-value">
                123 Kondampatti
                <br />
                Coimbatore District
                <br />
                Coimbatore city,Tamil Nadu-641202
              </div>
            </div>

            <div className="info-item">
              <div className="info-label">Phone</div>
              <div className="info-value">9080214005</div>
            </div>

            <div className="info-item">
              <div className="info-label">Email</div>
              <div className="info-value">support@medplus.com</div>
            </div>

            <div className="info-item">
              <div className="info-label">Emergency Hotline</div>
              <div className="info-value">9823437164</div>
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
                <span className="hours-day">Emergency</span>
                <span className="hours-time">24/7 Available</span>
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
