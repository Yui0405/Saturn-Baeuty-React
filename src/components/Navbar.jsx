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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../contexts/CartContext";
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
  const { cart } = useCart();
  const totalItems = cart.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

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
              component="div"
              sx={{
                flexGrow: 1,
                letterSpacing: "4px",
                fontWeight: 300,
                textAlign: "center",
                marginLeft: "480px",
                color: "#6F0936",
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
            {/* Iconos derecha */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 1,
                marginRight: "16px", // Espaciado final
                color: "#6F0936",
              }}
            >
              <IconButton
                size="large"
                color="inherit"
                sx={{
                  transition: "background-color 0.3s ease", // Transición suave
                  "&:hover": {
                    backgroundColor: "#6F0936", // Fondo al hacer hover
                  },
                }}
              >
                <Badge badgeContent={4} color="error">
                  <MailIcon sx={{ fontSize: 28 }} />
                </Badge>
              </IconButton>

              <IconButton
                size="large"
                color="inherit"
                sx={{
                  transition: "background-color 0.3s ease", // Transición suave
                  "&:hover": {
                    backgroundColor: "#6F0936", // Fondo al hacer hover
                  },
                }}
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon sx={{ fontSize: 28 }} />
                </Badge>
              </IconButton>

              <IconButton
                size="large"
                edge="end"
                color="inherit"
                sx={{
                  transition: "background-color 0.3s ease", // Transición suave
                  "&:hover": {
                    backgroundColor: "#6F0936", // Fondo al hacer hover
                  },
                }}
              >
                <AccountCircle sx={{ fontSize: 32 }} />
              </IconButton>
            </Box>
            <IconButton
              size="large"
              color="inherit"
              sx={{
                transition: "background-color 0.3s ease",
                "&:hover": {
                  backgroundColor: "#6F0936",
                  "& .MuiSvgIcon-root": {
                    color: "#FFFFFF",
                  },
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
                <ShoppingCartIcon sx={{ fontSize: 28, color: "#6F0936" }} />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
