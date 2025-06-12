import { createContext, useContext, useReducer } from 'react';
import { Snackbar, Alert } from '@mui/material';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'INCREASE_QUANTITY': {
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
        notification: 'Cantidad actualizada'
      };
    }
    case 'DECREASE_QUANTITY': {
      const existingItem = state.items.find(item => item.id === action.id);
      if (existingItem && existingItem.quantity > 1) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
          notification: 'Cantidad actualizada'
        };
      }
      // Si la cantidad es 1, eliminamos el producto
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.id),
        notification: 'Producto eliminado del carrito'
      };
    }
    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.id),
        notification: 'Producto eliminado del carrito'
      };
    }
    case 'ADD_ITEM': {
      // Usar el nombre como ID si no hay un ID definido
      const itemWithId = {
        ...action.item,
        id: action.item.id || action.item.name // Usar el ID si existe, si no, usar el nombre
      };
      
      const existingItem = state.items.find(item => item.id === itemWithId.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === itemWithId.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          notification: 'Producto actualizado en el carrito'
        };
      }
      return {
        items: [...state.items, { ...itemWithId, quantity: 1 }],
        notification: 'Producto añadido al carrito'
      };
    }
    case 'CLEAR_NOTIFICATION': {
      return { ...state, notification: null };
    }
    case 'CLEAR_CART': {
      return { 
        ...state, 
        items: [],
        notification: 'Carrito vaciado'
      };
    }
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