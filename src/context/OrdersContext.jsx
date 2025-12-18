import { createContext, useContext, useReducer, useEffect } from 'react';
import { orderAPI } from '../services/api';
import { useAuth } from './AuthContext';

const OrdersContext = createContext();

const ordersReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ORDERS':
      return {
        ...state,
        orders: action.payload
      };
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [action.payload, ...state.orders]
      };
    default:
      return state;
  }
};

export const OrdersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ordersReducer, { orders: [] });
  const { user, isLoggedIn } = useAuth();

  const loadOrders = async () => {
    if (isLoggedIn() && user) {
      try {
        const orders = await orderAPI.getUserOrders(user._id || user.id);
        dispatch({ type: 'SET_ORDERS', payload: orders });
      } catch (error) {
        console.error('Error loading orders:', error);
      }
    }
  };

  useEffect(() => {
    loadOrders();
  }, [user, isLoggedIn]);

  const addOrder = async (orderData) => {
    try {
      const order = await orderAPI.create({
        ...orderData,
        userId: user._id || user.id
      });
      dispatch({ type: 'ADD_ORDER', payload: order });
      return order;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  return (
    <OrdersContext.Provider value={{
      orders: state.orders,
      addOrder,
      loadOrders
    }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
};