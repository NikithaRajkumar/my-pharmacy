import { useState, useEffect } from 'react';

const Alert = ({ isOpen, onClose, onConfirm, title, message, type = 'confirm', variant = 'default' }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300);
  };

  const handleConfirm = () => {
    setIsVisible(false);
    setTimeout(() => {
      onConfirm();
      onClose();
    }, 300);
  };

  if (!isOpen) return null;

  const styles = `
    .alert-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(10px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      opacity: ${isVisible ? '1' : '0'};
      transition: all 0.3s ease;
    }
    .alert-container {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-radius: 20px;
      padding: 2.5rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
      max-width: 400px;
      width: 90%;
      text-align: center;
      transform: ${isVisible ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(-20px)'};
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .alert-title {
      font-size: 1.5rem;
      font-weight: 700;
      background: linear-gradient(135deg, #000000, #434343);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 1rem;
      letter-spacing: -0.02em;
    }
    .alert-message {
      color: #64748b;
      font-size: 1rem;
      margin-bottom: 2rem;
      line-height: 1.5;
    }
    .alert-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }
    .alert-btn {
      padding: 0.75rem 1.5rem;
      border-radius: 12px;
      border: none;
      font-weight: 600;
      font-size: 0.875rem;
      cursor: pointer;
      transition: all 0.3s ease;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      min-width: 100px;
    }
    .alert-btn-confirm {
      background: linear-gradient(135deg, #000000, #434343);
      color: white;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    }
    .alert-btn-confirm:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 25px rgba(0, 0, 0, 0.4);
    }
    .alert-btn-success {
      background: linear-gradient(135deg, #10b981, #059669);
      color: white;
      box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
    }
    .alert-btn-success:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 25px rgba(16, 185, 129, 0.4);
    }
    .alert-btn-error {
      background: linear-gradient(135deg, #ef4444, #dc2626);
      color: white;
      box-shadow: 0 8px 20px rgba(239, 68, 68, 0.3);
    }
    .alert-btn-error:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 25px rgba(239, 68, 68, 0.4);
    }
    .alert-btn-warning {
      background: linear-gradient(135deg, #f59e0b, #d97706);
      color: white;
      box-shadow: 0 8px 20px rgba(245, 158, 11, 0.3);
    }
    .alert-btn-warning:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 25px rgba(245, 158, 11, 0.4);
    }
    .alert-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    .alert-icon-success { color: #10b981; }
    .alert-icon-error { color: #ef4444; }
    .alert-icon-warning { color: #f59e0b; }
    .alert-icon-info { color: #3b82f6; }
    .alert-btn-cancel {
      background: rgba(255, 255, 255, 0.9);
      color: #64748b;
      border: 2px solid #e5e7eb;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    .alert-btn-cancel:hover {
      background: rgba(255, 255, 255, 1);
      border-color: #cbd5e1;
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    }
    .alert-btn:active {
      transform: translateY(0);
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="alert-overlay" onClick={handleClose}>
        <div className="alert-container" onClick={(e) => e.stopPropagation()}>
          {variant !== 'default' && (
            <div className="alert-icon">
              {variant === 'success' && <div className="alert-icon-success">✓</div>}
              {variant === 'error' && <div className="alert-icon-error">✕</div>}
              {variant === 'warning' && <div className="alert-icon-warning">⚠</div>}
              {variant === 'info' && <div className="alert-icon-info">ℹ</div>}
            </div>
          )}
          <h3 className="alert-title">{title}</h3>
          <p className="alert-message">{message}</p>
          <div className="alert-buttons">
            {type === 'confirm' && (
              <>
                <button className="alert-btn alert-btn-cancel" onClick={handleClose}>
                  Cancel
                </button>
                <button className={`alert-btn alert-btn-${variant === 'default' ? 'confirm' : variant}`} onClick={handleConfirm}>
                  Confirm
                </button>
              </>
            )}
            {type === 'info' && (
              <button className={`alert-btn alert-btn-${variant === 'default' ? 'confirm' : variant}`} onClick={handleClose}>
                OK
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Alert;