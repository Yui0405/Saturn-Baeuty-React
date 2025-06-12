import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import "../index.css";
import CardComponent from "./CardComponent";

const Products = ({ products = [], isLoading = false }) => {
  console.log('Products component - products:', products);
  console.log('Products component - isLoading:', isLoading);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress style={{ color: 'var(--color-primary)' }} />
      </Box>
    );
  }

  if (!Array.isArray(products)) {
    console.error('Products is not an array:', products);
    return (
      <Box textAlign="center" p={4}>
        <Typography color="error">
          Error: Los datos de productos no son válidos
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ px: 4, py: 6 }}>
      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {products.length > 0 ? (
          products.map((product, index) => (
            <CardComponent 
              key={`${product.name}-${index}`} 
              product={product} 
            />
          ))
        ) : (
          <Typography variant="h6" sx={{ mt: 4, textAlign: 'center', width: '100%' }}>
            No se encontraron productos
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Products;
