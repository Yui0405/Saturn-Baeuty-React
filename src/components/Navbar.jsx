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
import { useAuth } from "../hooks/useAuth";
import AuthModal from "./auth/AuthModal";
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
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const { user, openAuthModal } = useAuth();
  const location = useLocation();
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
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%'
            }}
          >
            <Typography
              variant="h4"
              noWrap
              component={Link}
              to="/"
              sx={{
                fontFamily: '"Dancing Script", cursive',
                fontSize: '2.5rem',
                letterSpacing: "2px",
                fontWeight: 600,
                color: "#6F0936",
                textDecoration: 'none',
                flexShrink: 0,
                '&:hover': {
                  opacity: 0.8,
                }
              }}
            >
              Saturn Beauty
            </Typography>

            <Box sx={{ 
              display: 'flex', 
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              gap: 1
            }}>
              <Button 
                component={Link}
                to="/"
                sx={{ 
                  color: '#6F0936',
                  borderBottom: location.pathname === '/' ? '2px solid #6F0936' : 'none',
                  borderRadius: 0,
                  padding: '6px 16px',
                  fontWeight: location.pathname === '/' ? 600 : 400,
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
                  borderBottom: location.pathname === '/productos' ? '2px solid #6F0936' : 'none',
                  borderRadius: 0,
                  padding: '6px 16px',
                  fontWeight: location.pathname === '/productos' ? 600 : 400,
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
            
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: 2,
              marginRight: '16px' 
            }}>
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
              <CartDrawer />
              <IconButton
                size="large"
                edge="end"
                aria-label={user ? 'Ver perfil' : 'Iniciar sesión'}
                color="inherit"
                onClick={() => openAuthModal('login')}
                sx={{
                  color: "#6F0936",
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: "#6F0936",
                    color: "white",
                    transform: 'scale(1.1)'
                  },
                }}
              >
                {user ? (
                  <Box 
                    sx={{ 
                      width: 32, 
                      height: 32, 
                      borderRadius: '50%', 
                      bgcolor: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '0.875rem'
                    }}
                  >
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </Box>
                ) : (
                  <AccountCircle />
                )}
              </IconButton>
              <AuthModal />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  </ThemeProvider>
  );
}
