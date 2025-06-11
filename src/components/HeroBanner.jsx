import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const HeroBanner = () => {
  return (
    <Box
      sx={{
        height: { xs: '500px', md: '90vh' },
        backgroundImage: 'url(/images/heroBanner.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        right: 0,
        width: '100vw',
        marginLeft: '-50vw',
        left: '50%',
      }}
    >
      
      <Box/>
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          backgroundColor: 'var(--color-primary)',
          color: '#fff',
          p: 4,
          
          textAlign: 'center',
          maxWidth: 400,
        }}
      >
        <Typography variant="overline" display="block" gutterBottom>
          Nuevo Producto
        </Typography>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          El poder del BHA que te hace brillar
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Mejora la claridad de tu piel con Cherry Dub BHA Toner.
        </Typography>
        <Button fullWidth sx={{ 
                    mt: 1 ,
                    borderRadius: 0,
                    backgroundColor:'var(--color-background)',
                    color:'var(--color-primary)',
                    fontWeight:'bold',
                    border: '1px solid transparent', 
                    '&:hover':{
                      border: '1px solid #FFFFFF',
                      
                    }
                    }} >
          Comprar ahora
        </Button>
      </Box>
    </Box>
  );
};

export default HeroBanner;
