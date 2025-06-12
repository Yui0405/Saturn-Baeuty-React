import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import CardComponent from "./CardComponent";
import "../index.css";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const productosVisibles = 3;

  useEffect(() => {
    fetch("/productos.json")
      .then((res) => res.json())
      .then((data) => {
        const topRatedProducts = data
          .sort((a, b) => b.rating - a.rating) 
          .slice(0, 5); 
        setProducts(topRatedProducts);
      })
      .catch((err) => console.error("Error cargando productos:", err));
  }, []);

  const total = products.length;

  const getVisibleProducts = () => {
    if (startIndex + productosVisibles <= total) {
      return products.slice(startIndex, startIndex + productosVisibles);
    } else {
      return [
        ...products.slice(startIndex),
        ...products.slice(0, (startIndex + productosVisibles) % total),
      ];
    }
  };

  const next = () => {
    setStartIndex((prev) => (prev + 1) % total);
  };

  const prev = () => {
    setStartIndex((prev) => (prev - 1 + total) % total);
  };

  return (
    <Box
      sx={{
        px: 4,
        py: 6,
        gap: 3,
        flexWrap: "nowrap",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          display: "block",
          justifyContent: "start",
          width: "100%",
          fontFamily: "Playfair Display",
          color: "var(--color-primary)",
        }}
        gutterBottom
      >
        Productos Destacados
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <IconButton 
          onClick={prev}
          sx={{
            color: 'var(--color-primary)',
            '&:focus': { outline: 'none' },
            '&:hover': {
              backgroundColor: 'var(--color-primary)',
              color: 'white',
              transform: 'scale(1.1)'
            },
            transition: 'all 0.3s ease'
          }}
        >
          <ArrowBackIos />
        </IconButton>

        <Box
          sx={{
            display: "flex",
            gap: 3,
            flexWrap: "nowrap",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {getVisibleProducts().map((product, index) => (
            <CardComponent key={index} product={product} />
          ))}
        </Box>

        <IconButton 
          onClick={next}
          sx={{
            color: 'var(--color-primary)',
            '&:focus': { outline: 'none' },
            '&:hover': {
              backgroundColor: 'var(--color-primary)',
              color: 'white',
              transform: 'scale(1.1)'
            },
            transition: 'all 0.3s ease'
          }}
        >
          <ArrowForwardIos />
        </IconButton>
      </Box>
    </Box>
  );
};

export default FeaturedProducts;
