import { useOrders } from '../context/OrdersContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const { orders } = useOrders();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const styles = `
    .orders-page {
      min-height: 100vh;
      background: linear-gradient(135deg, #000000 0%, #434343 100%);
      position: relative;
    }
    .orders-page::before {
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
    .orders-page > * {
      position: relative;
      z-index: 2;
    }
    .orders-header {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      padding: 2.5rem 2rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
    .orders-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      background: linear-gradient(135deg, #000000, #434343);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      letter-spacing: -0.02em;
    }
    .orders-subtitle {
      font-size: 1rem;
      color: #64748b;
      font-weight: 400;
    }
    .orders-content {
      max-width: 1000px;
      margin: 0 auto;
      padding: 2rem;
    }
    .empty-orders {
      text-align: center;
      padding: 4rem 2rem;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-radius: 20px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    }
    .empty-orders h3 {
      font-size: 1.25rem;
      color: #64748b;
      margin-bottom: 1.5rem;
      font-weight: 500;
    }
    .orders-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .order-card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-radius: 20px;
      padding: 2rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
      transition: all 0.3s ease;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }
    .order-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
      background: rgba(255, 255, 255, 1);
    }
    .order-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #f1f5f9;
    }
    .order-info {
      flex: 1;
    }
    .order-id {
      font-size: 1.25rem;
      font-weight: 700;
      background: linear-gradient(135deg, #000000, #434343);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 0.25rem;
      letter-spacing: -0.01em;
    }
    .order-meta {
      display: flex;
      gap: 1rem;
      color: #64748b;
      font-size: 0.875rem;
      font-weight: 400;
    }
    .order-status {
      background: linear-gradient(135deg, #10b981, #059669);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 600;
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .order-items {
      margin-bottom: 1.5rem;
    }
    .items-title {
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
      margin-bottom: 0.75rem;
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
    .item-details {
      flex: 1;
    }
    .item-name {
      font-weight: 600;
      color: #000000;
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
    .order-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 1rem;
      border-top: 1px solid #f1f5f9;
    }
    .delivery-info {
      flex: 1;
    }
    .delivery-title {
      font-size: 0.75rem;
      font-weight: 500;
      color: #374151;
      margin-bottom: 0.25rem;
    }
    .delivery-address {
      color: #64748b;
      line-height: 1.4;
      font-size: 0.875rem;
    }
    .order-total {
      text-align: right;
    }
    .total-label {
      font-size: 0.75rem;
      color: #64748b;
      margin-bottom: 0.25rem;
    }
    .total-amount {
      font-size: 1.25rem;
      font-weight: 600;
      color: #059669;
    }
    .continue-btn {
      background: linear-gradient(135deg, #000000, #434343);
      color: white;
      border: none;
      padding: 1rem 2rem;
      border-radius: 12px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 600;
      transition: all 0.3s ease;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .continue-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 25px rgba(0, 0, 0, 0.3);
    }
    @media (max-width: 768px) {
      .orders-content {
        padding: 1rem;
      }
      .order-card {
        padding: 1rem;
      }
      .order-header {
        flex-direction: column;
        gap: 0.75rem;
        text-align: center;
        margin-bottom: 1rem;
        padding-bottom: 0.75rem;
      }
      .order-id {
        font-size: 1rem;
      }
      .order-meta {
        justify-content: center;
        gap: 0.75rem;
      }
      .order-footer {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }
      .total-amount {
        font-size: 1.125rem;
      }
    }
    @media (max-width: 480px) {
      .orders-header {
        padding: 1.5rem 1rem;
      }
      .orders-title {
        font-size: 1.5rem;
      }
      .orders-content {
        padding: 1rem 0.5rem;
      }
      .order-card {
        padding: 0.875rem;
      }
      .order-header {
        margin-bottom: 0.875rem;
      }
      .order-id {
        font-size: 0.875rem;
      }
      .order-meta {
        flex-direction: column;
        gap: 0.25rem;
        font-size: 0.75rem;
      }
      .order-status {
        padding: 0.25rem 0.5rem;
        font-size: 0.7rem;
      }
      .items-title {
        font-size: 0.75rem;
      }
      .order-item {
        padding: 0.5rem 0;
      }
      .item-name {
        font-size: 0.75rem;
      }
      .item-quantity {
        font-size: 0.7rem;
      }
      .item-price {
        font-size: 0.75rem;
      }
      .delivery-title {
        font-size: 0.7rem;
      }
      .delivery-address {
        font-size: 0.75rem;
      }
      .total-label {
        font-size: 0.7rem;
      }
      .total-amount {
        font-size: 1rem;
      }
      .continue-btn {
        padding: 0.625rem 1.25rem;
        font-size: 0.875rem;
      }
    }
  `;

  if (!isLoggedIn()) {
    return (
      <>
        <style>{styles}</style>
        <div className="orders-page">
          <div className="orders-header">
            <h2 className="orders-title">Your Orders</h2>
            <p className="orders-subtitle">Track your order history</p>
          </div>
          <div className="orders-content">
            <div className="empty-orders">
              <h3>Please login to view your orders</h3>
              <button className="continue-btn" onClick={() => navigate('/login')}>Login</button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="orders-page">
        <div className="orders-header">
          <h2 className="orders-title">Your Orders</h2>
          <p className="orders-subtitle">Track your order history and status</p>
        </div>
        <div className="orders-content">
          {orders.length === 0 ? (
            <div className="empty-orders">
              <h3>You have no orders yet</h3>
              <button className="continue-btn" onClick={() => navigate('/browse')}>Start Shopping</button>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <div className="order-info">
                      <div className="order-id">Order #{order.id}</div>
                      <div className="order-meta">
                        <span>Date: {order.date}</span>
                        <span>Payment: {order.paymentMethod.toUpperCase()}</span>
                      </div>
                    </div>
                    <div className="order-status">{order.status}</div>
                  </div>
                  
                  <div className="order-items">
                    <div className="items-title">Items Ordered</div>
                    {order.items.map((item) => (
                      <div key={item.id} className="order-item">
                        <div className="item-details">
                          <div className="item-name">{item.name}</div>
                          <div className="item-quantity">Quantity: {item.quantity}</div>
                        </div>
                        <div className="item-price">₹{(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="order-footer">
                    <div className="delivery-info">
                      <div className="delivery-title">Delivery Address</div>
                      <div className="delivery-address">
                        {order.customerDetails.name}<br/>
                        {order.customerDetails.address}
                      </div>
                    </div>
                    <div className="order-total">
                      <div className="total-label">Total Amount</div>
                      <div className="total-amount">₹{order.total.toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;