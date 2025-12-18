import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrdersContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../hooks/useAlert';
import Alert from '../components/Alert';

const Checkout = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { addOrder } = useOrders();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { alert, showSuccess, showError, showWarning, hideAlert } = useAlert();
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    phone: '',
    address: '',
    upiId: '',
    bankAccount: ''
  });

  const handleInputChange = (e) => {
    setOrderDetails({
      ...orderDetails,
      [e.target.name]: e.target.value
    });
  };

  const handlePlaceOrder = async () => {
    if (!orderDetails.name || !orderDetails.phone || !orderDetails.address) {
      showWarning('Please fill all required fields');
      return;
    }
    
    if (paymentMethod === 'upi' && !orderDetails.upiId) {
      showWarning('Please enter UPI ID');
      return;
    }
    
    if (paymentMethod === 'netbanking' && !orderDetails.bankAccount) {
      showWarning('Please enter bank account details');
      return;
    }

    const orderData = {
      items: items.map(item => ({
        medicineId: item._id || item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })),
      total: getTotalPrice(),
      paymentMethod,
      customerDetails: {
        name: orderDetails.name,
        email: orderDetails.email || 'user@example.com',
        phone: orderDetails.phone,
        address: orderDetails.address
      },
      status: 'Confirmed'
    };
    
    try {
      await addOrder(orderData);
      showSuccess(`Order placed successfully! Payment method: ${paymentMethod.toUpperCase()}`);
      clearCart();
      setTimeout(() => navigate('/orders'), 2000);
    } catch (error) {
      showError('Failed to place order. Please try again.');
    }
  };

  const styles = `
    .checkout-page {
      min-height: 100vh;
      background: #f8fafc;
    }
    .checkout-header {
      background: white;
      padding: 2rem;
      border-bottom: 1px solid #e2e8f0;
    }
    .checkout-title {
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: #1e293b;
    }
    .checkout-subtitle {
      font-size: 1rem;
      color: #64748b;
    }
    .checkout-content {
      max-width: 1000px;
      margin: 0 auto;
      padding: 2rem;
    }
    .checkout-grid {
      display: grid;
      grid-template-columns: 1fr 350px;
      gap: 2rem;
    }
    .checkout-main {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .section-card {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      border: 1px solid #e2e8f0;
    }
    .section-title {
      font-size: 1.125rem;
      font-weight: 500;
      color: #1e293b;
      margin-bottom: 1rem;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid #f1f5f9;
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
    .form-group input, .form-group textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      font-size: 0.875rem;
      transition: border-color 0.2s ease;
      background: white;
    }
    .form-group input:focus, .form-group textarea:focus {
      outline: none;
      border-color: #1e293b;
    }
    .payment-options {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 0.75rem;
      margin-bottom: 1.5rem;
    }
    .payment-option {
      padding: 1rem;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      cursor: pointer;
      text-align: center;
      transition: all 0.2s ease;
      background: white;
    }
    .payment-option.selected {
      border-color: #1e293b;
      background: #f8fafc;
    }
    .payment-option:hover {
      border-color: #cbd5e1;
    }
    .payment-option h4 {
      font-weight: 500;
      color: #1e293b;
      margin-bottom: 0.25rem;
      font-size: 0.875rem;
    }
    .payment-option p {
      color: #64748b;
      font-size: 0.75rem;
    }
    .order-summary {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      border: 1px solid #e2e8f0;
      height: fit-content;
      position: sticky;
      top: 2rem;
    }
    .summary-title {
      font-size: 1.125rem;
      font-weight: 500;
      color: #1e293b;
      margin-bottom: 1rem;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid #f1f5f9;
    }
    .order-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 0;
      border-bottom: 1px solid #f1f5f9;
    }
    .order-item:last-child {
      border-bottom: none;
    }
    .item-info {
      flex: 1;
    }
    .item-name {
      font-weight: 500;
      color: #1e293b;
      margin-bottom: 0.125rem;
      font-size: 0.875rem;
    }
    .item-quantity {
      color: #64748b;
      font-size: 0.75rem;
    }
    .item-price {
      font-weight: 500;
      color: #059669;
      font-size: 0.875rem;
    }
    .total-section {
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid #f1f5f9;
    }
    .total-price {
      font-size: 1.5rem;
      font-weight: 600;
      color: #059669;
      text-align: center;
      margin-bottom: 1.5rem;
    }
    .place-order-btn {
      width: 100%;
      background: #1e293b;
      color: white;
      border: none;
      padding: 0.875rem 1.5rem;
      border-radius: 6px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 500;
      transition: background-color 0.2s ease;
    }
    .place-order-btn:hover {
      background: #334155;
    }
    .empty-checkout {
      text-align: center;
      padding: 3rem 2rem;
      background: white;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
    }
    .empty-checkout h3 {
      font-size: 1.25rem;
      color: #64748b;
      margin-bottom: 1.5rem;
      font-weight: 500;
    }
    @media (max-width: 1024px) {
      .checkout-content {
        padding: 1.5rem;
      }
      .checkout-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
      .order-summary {
        position: static;
      }
    }
    @media (max-width: 768px) {
      .checkout-content {
        padding: 1rem;
      }
      .section-card, .order-summary {
        padding: 1rem;
      }
      .section-title, .summary-title {
        font-size: 1rem;
      }
      .payment-options {
        grid-template-columns: 1fr;
        gap: 0.5rem;
      }
      .payment-option {
        padding: 0.75rem;
      }
    }
    @media (max-width: 480px) {
      .checkout-header {
        padding: 1.5rem 1rem;
      }
      .checkout-title {
        font-size: 1.5rem;
      }
      .checkout-content {
        padding: 1rem 0.5rem;
      }
      .section-card, .order-summary {
        padding: 0.875rem;
      }
      .section-title, .summary-title {
        font-size: 0.875rem;
      }
      .form-group input, .form-group textarea {
        padding: 0.625rem;
        font-size: 0.8rem;
      }
      .payment-option {
        padding: 0.625rem;
      }
      .payment-option h4 {
        font-size: 0.75rem;
      }
      .payment-option p {
        font-size: 0.7rem;
      }
      .order-item {
        padding: 0.5rem 0;
      }
      .item-name {
        font-size: 0.75rem;
      }
      .item-quantity, .item-price {
        font-size: 0.7rem;
      }
      .total-price {
        font-size: 1.25rem;
      }
      .place-order-btn {
        padding: 0.75rem 1.25rem;
        font-size: 0.875rem;
      }
    }
  `;

  if (!isLoggedIn()) {
    return (
      <>
        <style>{styles}</style>
        <div className="checkout-page">
          <div className="checkout-header">
            <h2 className="checkout-title">Checkout</h2>
            <p className="checkout-subtitle">Complete your order</p>
          </div>
          <div className="checkout-content">
            <div className="empty-checkout">
              <h3>Please login to proceed with checkout</h3>
              <button className="place-order-btn" onClick={() => navigate('/login')}>Login</button>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <style>{styles}</style>
        <div className="checkout-page">
          <div className="checkout-header">
            <h2 className="checkout-title">Checkout</h2>
            <p className="checkout-subtitle">Complete your order</p>
          </div>
          <div className="checkout-content">
            <div className="empty-checkout">
              <h3>Your cart is empty. Please add items to proceed.</h3>
              <button className="place-order-btn" onClick={() => navigate('/browse')}>Continue Shopping</button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="checkout-page">
        <div className="checkout-header">
          <h2 className="checkout-title">Checkout</h2>
          <p className="checkout-subtitle">Complete your order</p>
        </div>
        <div className="checkout-content">
          <div className="checkout-grid">
            <div className="checkout-main">
              <div className="section-card">
                <h3 className="section-title">Delivery Details</h3>
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={orderDetails.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={orderDetails.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Address *</label>
                  <textarea
                    name="address"
                    value={orderDetails.address}
                    onChange={handleInputChange}
                    rows="3"
                    required
                  />
                </div>
              </div>

              <div className="section-card">
                <h3 className="section-title">Payment Method</h3>
                <div className="payment-options">
                  <div
                    className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod('cod')}
                  >
                    <h4>Cash on Delivery</h4>
                    <p>Pay when you receive</p>
                  </div>
                  <div
                    className={`payment-option ${paymentMethod === 'upi' ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod('upi')}
                  >
                    <h4>UPI Payment</h4>
                    <p>Pay via UPI</p>
                  </div>
                  <div
                    className={`payment-option ${paymentMethod === 'netbanking' ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod('netbanking')}
                  >
                    <h4>Net Banking</h4>
                    <p>Pay via bank</p>
                  </div>
                </div>

                {paymentMethod === 'upi' && (
                  <div className="form-group">
                    <label>UPI ID *</label>
                    <input
                      type="text"
                      name="upiId"
                      value={orderDetails.upiId}
                      onChange={handleInputChange}
                      placeholder="example@upi"
                    />
                  </div>
                )}

                {paymentMethod === 'netbanking' && (
                  <div className="form-group">
                    <label>Bank Account Number *</label>
                    <input
                      type="text"
                      name="bankAccount"
                      value={orderDetails.bankAccount}
                      onChange={handleInputChange}
                      placeholder="Enter account number"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="order-summary">
              <h3 className="summary-title">Order Summary</h3>
              {items.map(item => (
                <div key={item.id} className="order-item">
                  <div className="item-info">
                    <div className="item-name">{item.name}</div>
                    <div className="item-quantity">Qty: {item.quantity}</div>
                  </div>
                  <div className="item-price">₹{(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
              <div className="total-section">
                <div className="total-price">Total: ₹{getTotalPrice().toFixed(2)}</div>
                <button className="place-order-btn" onClick={handlePlaceOrder}>
                  Place Order
                </button>
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

export default Checkout;