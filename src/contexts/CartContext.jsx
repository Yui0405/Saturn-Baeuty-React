import { createContext, useContext, useReducer } from 'react';
import { Snackbar, Alert } from '@mui/material';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.id === action.item.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.item.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          notification: 'Producto actualizado en el carrito'
        };
      }
      return {
        items: [...state.items, { ...action.item, quantity: 1 }],
        notification: 'Producto añadido al carrito'
      };
    case 'CLEAR_NOTIFICATION':
      return { ...state, notification: null };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, { items: [], notification: null });

  const handleCloseNotification = () => {
    dispatch({ type: 'CLEAR_NOTIFICATION' });
  };

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
      <Snackbar
        open={!!cart.notification}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
      >
        <Alert severity="success" variant="filled">
          {cart.notification}
        </Alert>
      </Snackbar>
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);