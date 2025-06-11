import { Box, Typography, Button, Container } from '@mui/material';
import HeroBanner from '../components/HeroBanner'
import FeaturedProducts from '../components/FeaturedProducts'
import Noticias from '../components/News';
const HomePage = () => {
  return (
    <Box sx={{ mt:4 }}>
      <HeroBanner/>
      
      <Container maxWidth="lg" sx={{ 
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 4 
      }}>
        <FeaturedProducts/>
        <Noticias/>
      </Container>
    </Box>
  );
};

export default HomePage;