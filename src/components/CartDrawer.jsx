import { useState } from 'react';
import { 
  Drawer, 
  Box, 
  Typography, 
  IconButton, 
  List, 
  ListItem, 
  ListItemText, 
  Divider,
  Badge,
  Button,
  ButtonGroup
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCart } from '../contexts/CartContext';

export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, dispatch } = useCart();
  const { items = [] } = cart;

  const handleRemoveItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', id });
  };

  const handleClearCart = () => {
    if (items.length > 0) {
      dispatch({ type: 'CLEAR_CART' });
    }
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsOpen(open);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div>
      <IconButton 
        size="large"
        aria-label="show cart items"
        color="inherit"
        onClick={toggleDrawer(true)}
        sx={{
          color: "#6F0936",
          transition: "background-color 0.3s ease",
          "&:hover": {
            backgroundColor: "#6F0936",
            color: "white"
          },
        }}
      >
        <Badge 
          badgeContent={totalItems} 
          color="error"
          sx={{
            "& .MuiBadge-badge": {
              right: -3,
              top: 5,
              padding: "0 4px",
            },
          }}
        >
          <ShoppingCartIcon sx={{ fontSize: 28 }} />
        </Badge>
      </IconButton>
      
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }
        }}
      >
        <Box
          sx={{ 
            width: 350, 
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            overflow: 'hidden'
          }}
          role="presentation"
          onKeyDown={toggleDrawer(false)}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography 
              variant="h3" 
              component="h3" 
              sx={{ 
                fontFamily: 'Playfair Display',
                fontWeight: 400,
                color: 'var(--color-primary)',
                fontSize: '1.8rem',
                mb: 2
              }}
            >
              Mi Carrito
            </Typography>
            <IconButton 
              onClick={toggleDrawer(false)}
              sx={{ 
                color: 'var(--color-primary)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: 'white',
                  backgroundColor: 'var(--color-primary)',
                  transform: 'scale(1.1)'
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          
          <Divider />
          
          <Box sx={{ 
            flex: 1, 
            overflowY: 'auto', 
            mb: 2,
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'var(--color-primary)',
              borderRadius: '3px',
              '&:hover': {
                backgroundColor: 'var(--color-primary-dark)',
              },
            },
            scrollbarWidth: 'thin',
            scrollbarColor: 'var(--color-primary) transparent',
          }}>
            {items.length === 0 ? (
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                height: '100%',
                textAlign: 'center',
                p: 3,
                color: 'var(--color-primary)'
              }}>
                <ShoppingCartIcon sx={{ 
                  fontSize: 60, 
                  color: 'var(--color-primary)', 
                  mb: 2,
                  opacity: 0.7 
                }} />
                <Typography variant="h6" sx={{ color: 'var(--color-primary)', mb: 1 }}>
                  Tu carrito está vacío
                </Typography>
                <Typography variant="body2" sx={{ color: 'var(--color-text)', opacity: 0.8 }}>
                  Agrega productos para comenzar a comprar
                </Typography>
              </Box>
            ) : (
              <List>
                {items.map((item) => (
                  <div key={item.id || item.name}>
                    <ListItem>
                      {item.image && (
                        <img 
                          src={item.image} 
                          alt={item.name || 'Producto'} 
                          style={{ width: 50, height: 50, marginRight: 16, objectFit: 'cover' }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      )}
                      <ListItemText 
                        primary={
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              fontFamily: 'Playfair Display',
                              color: 'var(--color-primary)',
                              fontSize: '1rem',
                              lineHeight: 1.2,
                              mb: 1
                            }}
                          >
                            {item.name}
                          </Typography>
                        } 
                        secondary={
                          <Box sx={{ mt: 1 }}>
                            <Typography component="span" variant="body2" sx={{ display: 'block', mb: 1 }}>
                              ${item.price || '0.00'} c/u
                            </Typography>
                            <ButtonGroup 
                              size="small"
                              variant="outlined"
                              sx={{
                                '& .MuiButton-root': {
                                  minWidth: '30px',
                                  padding: '4px 8px',
                                  borderColor: 'var(--color-primary)',
                                  color: 'var(--color-primary)',
                                  transition: 'all 0.3s ease',
                                  '&:focus': {
                                    outline: 'none',
                                    boxShadow: 'none'
                                  },
                                  '&:focus-visible': {
                                    outline: 'none',
                                    boxShadow: 'none'
                                  },
                                  '&:hover': {
                                    backgroundColor: 'var(--color-primary)',
                                    color: 'white',
                                    transform: 'scale(1.1)'
                                  }
                                }
                              }}
                            >
                              <Button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  dispatch({ type: 'DECREASE_QUANTITY', id: item.id || item.name });
                                }}
                                sx={{
                                  '&:hover': {
                                    transform: 'scale(1.1)'
                                  },
                                  '&:focus': {
                                    outline: 'none',
                                    boxShadow: 'none'
                                  },
                                  '&:focus-visible': {
                                    outline: 'none',
                                    boxShadow: 'none'
                                  }
                                }}
                              >
                                <RemoveIcon fontSize="small" />
                              </Button>
                              <Button 
                                disabled 
                                sx={{ 
                                  minWidth: '30px', 
                                  cursor: 'default',
                                  fontWeight: 'bold',
                                  color: 'var(--color-primary)',
                                  fontSize: '1rem',
                                  backgroundColor: 'rgba(111, 9, 54, 0.05)'
                                }}
                              >
                                {item.quantity}
                              </Button>
                              <Button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  dispatch({ type: 'INCREASE_QUANTITY', id: item.id || item.name });
                                }}
                                sx={{
                                  '&:hover': {
                                    transform: 'scale(1.1)'
                                  },
                                  '&:focus': {
                                    outline: 'none',
                                    boxShadow: 'none'
                                  },
                                  '&:focus-visible': {
                                    outline: 'none',
                                    boxShadow: 'none'
                                  }
                                }}
                              >
                                <AddIcon fontSize="small" />
                              </Button>
                            </ButtonGroup>
                          </Box>
                        }
                        sx={{ flex: 1 }} 
                      />
                      <Box display="flex" flexDirection="column" alignItems="flex-end">
                        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                        <IconButton 
                          aria-label="Eliminar" 
                          size="small" 
                          sx={{ 
                            color: 'var(--color-primary)', 
                            transition: 'all 0.3s ease', 
                            '&:hover': { 
                              color: 'white', 
                              backgroundColor: 'var(--color-primary)',
                              transform: 'scale(1.1)' 
                            } 
                          }} 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveItem(item.id || item.name);
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </ListItem>
                    <Divider />
                  </div>
                ))}
              </List>
            )}
          </Box>
          
          <Box sx={{ 
            mt: 'auto',
            p: 2, 
            bgcolor: 'background.paper',
            borderTop: '1px solid',
            borderColor: 'divider',
            position: 'sticky',
            bottom: 0,
            backgroundColor: 'white',
            zIndex: 1
          }}>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="subtitle1">Total:</Typography>
              <Typography variant="subtitle1" fontWeight="bold">
                ${totalPrice.toFixed(2)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
              <Button 
                variant="outlined"
                fullWidth
                onClick={handleClearCart}
                disabled={items.length === 0}
                sx={{ 
                  py: 1.5,
                  borderRadius: 0,
                  borderColor: 'var(--color-primary)',
                  color: 'var(--color-primary)',
                  '&:hover': {
                    backgroundColor: 'var(--color-primary)',
                    color: 'white',
                    border: '1px solid transparent'
                  },
                  '&:disabled': {
                    borderColor: 'rgba(0, 0, 0, 0.12)',
                    color: 'rgba(0, 0, 0, 0.26)'
                  }
                }}
              >
                Vaciar carrito
              </Button>
              <Button 
                variant="outlined"
                fullWidth
                sx={{ 
                  py: 1.5,
                  borderRadius: 0,
                  borderColor: 'var(--color-primary)',
                  color: 'var(--color-primary)',
                  '&:hover': {
                    backgroundColor: 'var(--color-primary)',
                    color: 'white',
                    border: '1px solid transparent'
                  },
                  '&:disabled': {
                    borderColor: 'rgba(0, 0, 0, 0.12)',
                    color: 'rgba(0, 0, 0, 0.26)'
                  }
                }}
              >
                Proceder al pago
              </Button>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </div>
  );
};

export default CartDrawer;
