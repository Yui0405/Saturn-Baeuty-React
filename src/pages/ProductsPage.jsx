import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import Products from "../components/Products";
import "../index.css";
import { styled } from "@mui/material/styles";

// Estilo personalizado para los selectores
const CustomSelect = styled(Select)(({ theme }) => ({
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--color-primary)",
    borderRadius: 0,
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--color-primary)",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--color-primary)",
    borderWidth: 1,
  },
  color: "var(--color-primary)",
  fontFamily: "Playfair Display",
}));

const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
  fontFamily: "Playfair Display",
  color: "var(--color-primary)",
  "&:hover": {
    backgroundColor: "rgba(111, 9, 54, 0.1)",
  },
  "&.Mui-selected": {
    backgroundColor: "rgba(111, 9, 54, 0.2)",
  },
}));

const ProductsPage = () => {
  const [sortBy, setSortBy] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  // Ejemplo de categorías - ajustar según tus datos reales
  const categories = ["skincare", "makeup", "tools", "lipcare"];

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterCategory(event.target.value);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 12, minWidth: 1000 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h3" sx={{ml:10, fontFamily: 'Playfair Display',color: 'var(--color-primary)', marginBottom: 10}}>
          Nuestra Colección
        </Typography>

        <Box display="flex" gap={2}>
          <FormControl sx={{ width: 200 }}>
            <InputLabel
              sx={{
                color: "var(--color-primary)",
                fontFamily: "Playfair Display",
                "&.Mui-focused": {
                  color: "var(--color-primary)",
                },
              }}
            >
              Filtrar por categoría
            </InputLabel>
            <CustomSelect
              value={filterCategory}
              onChange={handleFilterChange}
              label="Filtrar por categoría"
              MenuProps={{
                PaperProps: {
                  sx: {
                    borderRadius: 0,
                    boxShadow: "none",
                    border: "1px solid var(--color-primary)",
                  },
                },
              }}
            >
              <CustomMenuItem value="">Todas</CustomMenuItem>
              {categories.map((category) => (
                <CustomMenuItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </CustomMenuItem>
              ))}
            </CustomSelect>
          </FormControl>

          <FormControl sx={{ width: 200 }}>
            <InputLabel
              sx={{
                color: "var(--color-primary)",
                fontFamily: "Playfair Display",
                "&.Mui-focused": {
                  color: "var(--color-primary)",
                },
              }}
            >
              Ordenar por
            </InputLabel>
            <CustomSelect
              value={sortBy}
              onChange={handleSortChange}
              label="Ordenar por"
              MenuProps={{
                PaperProps: {
                  sx: {
                    borderRadius: 0,
                    boxShadow: "none",
                    border: "1px solid var(--color-primary)",
                  },
                },
              }}
            >
              <CustomMenuItem value="">Predeterminado</CustomMenuItem>
              <CustomMenuItem value="price-asc">
                Precio: Menor a Mayor
              </CustomMenuItem>
              <CustomMenuItem value="price-desc">
                Precio: Mayor a Menor
              </CustomMenuItem>
              <CustomMenuItem value="popularity">Popularidad</CustomMenuItem>
            </CustomSelect>
          </FormControl>
        </Box>
      </Box>
      
      <Products sortBy={sortBy} filterCategory={filterCategory} />
      
    </Container>
  );
};

export default ProductsPage;
