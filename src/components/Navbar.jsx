import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import CartDrawer from "./CartDrawer";
const theme = createTheme({
  typography: {
    fontFamily: ["OGG Regular", "Arial", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#000000",
    },
    text: {
      primary: "#ffffff",
    },
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:focus': {
            outline: 'none',
            boxShadow: 'none',
          },
          '&:focus-visible': {
            outline: 'none',
            boxShadow: 'none',
          }
        }
      }
    }
  }
});
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  borderColor: "#6F0936",
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(3),
  width: "200px",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          flexGrow: 1,
          margin: 0,
          padding: 0,
        }}
      >
        <AppBar
          position="fixed"
          sx={{
            bgcolor: "white",
            boxShadow: "2px",
            margin: 0,
            padding: 0,
            borderBottom: "solid 1px #6F0936",
          }}
        >
          <Toolbar
            sx={{
              paddingLeft: 0,
              paddingRight: 0,
              minHeight: "64px",
            }}
          >
            <Typography
              variant="h4"
              noWrap
              component={Link}
              to="/"
              sx={{
                flexGrow: 1,
                letterSpacing: "4px",
                fontWeight: 300,
                textAlign: "center",
                marginLeft: "100px",
                color: "#6F0936",
                textDecoration: 'none',
                '&:hover': {
                  opacity: 0.8,
                }
              }}
            >
              SATURN BEAUTY
            </Typography>
            {/* Barra de búsqueda - Reducir margen derecho */}
            <Search
              sx={{
                color: "#6F0936",
                borderBottom: "solid 1px #6F0936",
              }}
            >
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Buscar…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            
            {/* Navegación */}
            <Box sx={{ display: 'flex', marginLeft: '20px' }}>
              <Button 
                component={Link}
                to="/"
                sx={{ 
                  color: '#6F0936',
                  borderBottom: useLocation().pathname === '/' ? '2px solid #6F0936' : 'none',
                  borderRadius: 0,
                  padding: '6px 16px',
                  fontWeight: useLocation().pathname === '/' ? 600 : 400,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: '#6F0936',
                    color: 'white',
                    transform: 'scale(1.05)'
                  }
                }}
              >
                INICIO
              </Button>
              <Button 
                component={Link}
                to="/productos"
                sx={{ 
                  color: '#6F0936',
                  borderBottom: useLocation().pathname === '/productos' ? '2px solid #6F0936' : 'none',
                  borderRadius: 0,
                  padding: '6px 16px',
                  fontWeight: useLocation().pathname === '/productos' ? 600 : 400,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: '#6F0936',
                    color: 'white',
                    transform: 'scale(1.05)'
                  }
                }}
              >
                PRODUCTOS
              </Button>
            </Box>
            
            {/* Iconos derecha */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 1,
                marginRight: "16px",
                color: "#6F0936",
                alignItems: 'center'
              }}
            >
              <IconButton
                size="large"
                color="inherit"
                sx={{
                  transition: "background-color 0.3s ease",
                  color: "#6F0936",
                  "&:hover": {
                    backgroundColor: "#6F0936",
                    color: "white"
                  },
                }}
              >
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show notifications"
                color="inherit"
                sx={{
                  color: "#6F0936",
                  "&:hover": {
                    backgroundColor: "#6F0936",
                    color: "white"
                  },
                }}
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              {/* Componente del carrito */}
              <CartDrawer />
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                color="inherit"
                sx={{
                  color: "#6F0936",
                  "&:hover": {
                    backgroundColor: "#6F0936",
                    color: "white"
                  },
                }}
              >
                <AccountCircle />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
