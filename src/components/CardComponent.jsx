import { Box, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';
import '../index.css'
import { useCart } from "../contexts/CartContext";
const CardComponent = ({ product }) => {  
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      item: product 
    });
  };

  return (
    <Card sx={{ width: 250, borderRadius:0,backgroundColor:'var(--color-secondary)' }}>
      <CardContent>
        <CardMedia 
          component="img"
          height="300"
          image={product.image}
          alt={product.name}
          sx={{ mb: 1, objectFit: 'cover' }}
        />
        <Typography variant="h6" sx={{ 
          fontFamily: 'Playfair Display',
          color: 'var(--color-primary)',
          minHeight: 100 
        }}>
          {product.name}
        </Typography>
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
          ${product.price}
        </Typography>
        <Button 
          fullWidth 
          sx={{ 
            mt: 1,
            borderRadius: 0,
            borderColor: 'var(--color-primary)',
            color: 'var(--color-primary)',
          }} 
          variant="outlined"
          onClick={handleAddToCart} 
        >
          Agregar al carrito
        </Button>
      </CardContent>
    </Card>
  );
};

export default CardComponent
