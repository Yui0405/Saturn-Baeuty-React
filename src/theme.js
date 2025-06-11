import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6F0936', 
    },
    secondary: {
      main: '#ff4081', 
    },
    background: {
      default: '#f5f5f5',
    },
    text: {
      primary: '#333',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif', 
  },
});

export default theme;