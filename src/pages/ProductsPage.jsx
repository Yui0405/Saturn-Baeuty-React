import { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import Products from "../components/Products";
import { useProductCategories, useProductFilter } from "../hooks/useProductCategories";
import "../index.css";
import { styled } from "@mui/material/styles";

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
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { categories, loading: categoriesLoading, error: categoriesError } = useProductCategories(products);
  
  const { filteredAndSortedProducts, loading: filterLoading } = useProductFilter(products, {
    category: filterCategory,
    sortBy: sortBy
  });

  console.log('Products:', products);
  console.log('Categories:', categories);
  console.log('Filtered Products:', filteredAndSortedProducts);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log('Iniciando carga de productos...');
        
        const response = await fetch('/productos.json', {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        
        console.log('Respuesta recibida:', response);
        
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Productos cargados:', data);
        
        if (!Array.isArray(data)) {
          throw new Error('Formato de datos inválido');
        }
        
        setProducts(data);
      } catch (err) {
        console.error('Error al cargar productos:', err);
        setError(`Error al cargar los productos: ${err.message}. Por favor, recarga la página.`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);
  
  console.log('Estado actual:', {
    isLoading,
    categoriesLoading,
    filterLoading,
    productsLength: products.length,
    categories,
    filterCategory,
    sortBy
  });

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterCategory(event.target.value);
  };

  console.log('Loading states:', { isLoading, categoriesLoading, filterLoading });
  
  if (isLoading || categoriesLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress style={{ color: 'var(--color-primary)' }} />
      </Box>
    );
  }

  if (error || categoriesError) {
    return (
      <Box textAlign="center" p={4}>
        <Typography color="error">
          {error || 'Error al cargar las categorías'}
        </Typography>
      </Box>
    );
  }

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
      
      <Products 
        products={filteredAndSortedProducts} 
        isLoading={filterLoading} 
      />
      
    </Container>
  );
};

export default ProductsPage;
