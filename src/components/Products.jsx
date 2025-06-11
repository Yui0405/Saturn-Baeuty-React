import React, { useEffect, useState, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import "../index.css";
import CardComponent from "./CardComponent";

const Products = ({ sortBy, filterCategory }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/productos.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error cargando productos:", err));
  }, []);
  const processedProducts = useMemo(() => {
    let filtered = products;

    // Filtrado por categoría
    if (filterCategory) {
      filtered = filtered.filter(
        (item) =>
          item.category.toLowerCase().trim() ===
          filterCategory.toLowerCase().trim()
      );
    }

    // Ordenamiento
    switch (sortBy) {
      case "price-asc":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...filtered].sort((a, b) => b.price - a.price);
      case "popularity":
        return [...filtered].sort((a, b) => (b.rating || 0) - (a.rating || 0));
      default:
        return filtered;
    }
  }, [products, sortBy, filterCategory]);

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
        
        {processedProducts.map((product, index) => (
          <CardComponent
            key={index} 
            product={product} 
          />
        ))}
      </Box>
    </Box>
  );
};

export default Products;
