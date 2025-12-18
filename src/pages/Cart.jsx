import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { items: cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const styles = `
    .cart-page {
      min-height: 100vh;
      background: linear-gradient(135deg, #000000 0%, #434343 100%);
      position: relative;
    }
    .cart-page::before {
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
    .cart-page > * {
      position: relative;
      z-index: 2;
    }
    .cart-header {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      padding: 2.5rem 2rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
    .cart-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      background: linear-gradient(135deg, #000000, #434343);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      letter-spacing: -0.02em;
    }
    .cart-subtitle {
      font-size: 1rem;
      color: #64748b;
      font-weight: 400;
    }
    .cart-content {
      max-width: 900px;
      margin: 0 auto;
      padding: 1.5rem;
    }
    .empty-cart {
      text-align: center;
      padding: 3rem;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-radius: 20px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    }
    .empty-cart h3 {
      font-size: 1rem;
      color: #64748b;
      margin-bottom: 1rem;
      font-weight: 400;
    }
    .cart-items {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-bottom: 1.5rem;
    }
    .cart-item {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-radius: 15px;
      padding: 1.5rem;
      display: flex;
      align-items: center;
      gap: 1.5rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
      transition: all 0.3s ease;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }
    .cart-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
      background: rgba(255, 255, 255, 1);
    }
    .cart-item img {
      width: 60px;
      height: 60px;
      object-fit: cover;
      border-radius: 4px;
      background: #f1f5f9;
      border: 1px solid #e2e8f0;
    }
    .item-details {
      flex: 1;
    }
    .item-name {
      font-size: 1.125rem;
      font-weight: 700;
      background: linear-gradient(135deg, #000000, #434343);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 0.25rem;
      letter-spacing: -0.01em;
    }
    .item-price {
      color: #059669;
      font-weight: 500;
      font-size: 0.875rem;
    }
    .quantity-controls {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      margin: 0 0.75rem;
    }
    .quantity-btn {
      width: 32px;
      height: 32px;
      border: 2px solid #e2e8f0;
      background: white;
      color: #000000;
      cursor: pointer;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 0.875rem;
      transition: all 0.3s ease;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    .quantity-btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      background: linear-gradient(135deg, #000000, #434343);
      color: white;
    }
    .quantity {
      padding: 0.25rem 0.375rem;
      border: 1px solid #e2e8f0;
      border-radius: 3px;
      width: 50px;
      text-align: center;
      font-weight: 400;
      background: white;
      font-size: 0.875rem;
    }
    .quantity:focus {
      outline: none;
      border-color: #1e293b;
    }
    .remove-btn {
      background: linear-gradient(135deg, #ef4444, #dc2626);
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s ease;
      font-size: 0.75rem;
      box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .remove-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(239, 68, 68, 0.4);
    }
    .total-section {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-radius: 20px;
      padding: 2.5rem;
      text-align: center;
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    }
    .total-price {
      font-size: 1.5rem;
      font-weight: 500;
      color: #059669;
      margin-bottom: 1rem;
    }
    .checkout-actions {
      display: flex;
      gap: 0.75rem;
      justify-content: center;
      flex-wrap: wrap;
    }
    .checkout-btn {
      background: linear-gradient(135deg, #000000, #434343);
      color: white;
      border: none;
      padding: 1rem 2rem;
      border-radius: 12px;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 600;
      transition: all 0.3s ease;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .checkout-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 25px rgba(0, 0, 0, 0.3);
    }
    .clear-btn {
      background: #6b7280;
    }
    .clear-btn:hover {
      background: #4b5563;
    }
    @media (max-width: 768px) {
      .cart-content {
        padding: 1rem;
      }
      .cart-item {
        flex-direction: column;
        text-align: center;
        gap: 0.75rem;
        padding: 0.875rem;
      }
      .cart-item img {
        width: 50px;
        height: 50px;
      }
      .quantity-controls {
        margin: 0;
        justify-content: center;
      }
      .checkout-actions {
        flex-direction: column;
        gap: 0.5rem;
      }
      .total-section {
        padding: 1.25rem;
      }
      .total-price {
        font-size: 1.25rem;
      }
    }
    @media (max-width: 480px) {
      .cart-header {
        padding: 1rem;
      }
      .cart-title {
        font-size: 1.25rem;
      }
      .cart-content {
        padding: 0.75rem 0.5rem;
      }
      .cart-item {
        padding: 0.75rem;
      }
      .quantity-btn {
        width: 24px;
        height: 24px;
        font-size: 0.75rem;
      }
      .quantity {
        width: 40px;
        padding: 0.2rem 0.25rem;
        font-size: 0.75rem;
      }
    }
  `;

  if (!isLoggedIn()) {
    return (
      <>
        <style>{styles}</style>
        <div className="cart-page">
          <div className="cart-header">
            <h2 className="cart-title">Your Cart</h2>
            <p className="cart-subtitle">Review your selected items</p>
          </div>
          <div className="cart-content">
            <div className="empty-cart">
              <h3>Please login to view your cart</h3>
              <button className="checkout-btn" onClick={() => navigate('/login')}>Login</button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="cart-page">
        <div className="cart-header">
          <h2 className="cart-title">Your Cart</h2>
          <p className="cart-subtitle">Review your selected items</p>
        </div>
        <div className="cart-content">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <h3>Your cart is empty</h3>
              <button className="checkout-btn" onClick={() => navigate('/browse')}>Continue Shopping</button>
            </div>
          ) : (
            <>
              <div className="cart-summary" style={{background: 'white', border: '1px solid #e2e8f0', color: '#1e293b', padding: '1rem', borderRadius: '6px', marginBottom: '1.5rem', textAlign: 'left'}}>
                <h3 style={{fontSize: '1rem', marginBottom: '0.25rem', fontWeight: '500'}}>{cartItems.length} Item{cartItems.length !== 1 ? 's' : ''}</h3>
                <p style={{fontSize: '0.875rem', color: '#64748b'}}>Review and checkout when ready</p>
              </div>
              <div className="cart-items">
                {cartItems.map((item) => {
                  const itemId = item._id || item.id;
                  return (
                  <div key={itemId} className="cart-item">
                    <img src={item.image} alt={item.name} />
                    <div className="item-details">
                      <div className="item-name">{item.name}</div>
                      <div className="item-price">₹{item.price}</div>
                    </div>
                    <div className="quantity-controls">
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(itemId, item.quantity - 1)}
                      >
                        −
                      </button>
                      <input 
                        type="number" 
                        className="quantity" 
                        value={item.quantity}
                        onChange={(e) => updateQuantity(itemId, parseInt(e.target.value) || 0)}
                        min="1"
                      />
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(itemId, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button 
                      className="remove-btn"
                      onClick={() => removeFromCart(itemId)}
                    >
                      Remove
                    </button>
                  </div>
                  );
                })}
              </div>
              <div className="total-section">
                <div className="total-price">Total: ₹{getTotalPrice().toFixed(2)}</div>
                <div className="checkout-actions">
                  <button className="checkout-btn" onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
                  <button className="checkout-btn clear-btn" onClick={clearCart}>Clear Cart</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;