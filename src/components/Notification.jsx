import { useCart } from '../contexts/CartContext';

const Notification = () => {
  const { cart, dispatch } = useCart();

  return (
    <Snackbar
      open={!!cart.notification}
      autoHideDuration={3000}
      onClose={() => dispatch({ type: 'CLEAR_NOTIFICATION' })}
    >
      <Alert severity="success" sx={{ width: '100%' }}>
        {cart.notification}
      </Alert>
    </Snackbar>
  );
};