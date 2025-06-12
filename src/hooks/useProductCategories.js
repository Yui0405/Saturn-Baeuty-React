import { useState, useEffect } from 'react';

// Hook para extraer categorías únicas de los productos
export const useProductCategories = (products = []) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const uniqueCategories = [...new Set(products.map(product => product.category))];
      setCategories(uniqueCategories);
    } catch (err) {
      console.error('Error al extraer categorías:', err);
      setError(err);
    }
  }, [products]);

  return { categories, loading, error };
};

// Hook para filtrar productos por categoría
export const useProductsByCategory = (products = [], categoryId = '') => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      if (!categoryId) {
        setFilteredProducts(products);
        return;
      }
      
      const filtered = products.filter(
        product => product.category && 
        product.category.toLowerCase() === categoryId.toLowerCase()
      );
      
      setFilteredProducts(filtered);
    } catch (err) {
      console.error('Error al filtrar productos por categoría:', err);
      setError(err);
    }
  }, [products, categoryId]);

  return { filteredProducts, loading, error };
};

export const useProductFilter = (products = [], { category = '', sortBy = '' } = {}) => {
  // Extraer categorías únicas para el filtro
  const categories = (() => {
    const uniqueCategories = new Set();
    products.forEach(product => {
      if (product && product.category) {
        uniqueCategories.add(product.category);
      }
    });
    return Array.from(uniqueCategories);
  })();

  // Filtrar y ordenar productos
  const filterAndSortProducts = () => {
    if (!Array.isArray(products)) return [];
    
    let result = [...products];

    // Aplicar filtro por categoría
    if (category) {
      result = result.filter(product => 
        product && 
        product.category && 
        product.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Aplicar ordenación
    if (sortBy) {
      const sortedResult = [...result];
      switch (sortBy) {
        case 'price-asc':
          return sortedResult.sort((a, b) => (a.price || 0) - (b.price || 0));
        case 'price-desc':
          return sortedResult.sort((a, b) => (b.price || 0) - (a.price || 0));
        case 'popularity':
          return sortedResult.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        default:
          // Orden por defecto (nombre ascendente)
          return sortedResult.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
      }
    }

    return result;
  };

  const filteredProducts = filterAndSortProducts();

  return {
    filteredAndSortedProducts: filteredProducts,
    categories,
    loading: false,
    error: null
  };
};
