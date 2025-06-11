import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrimarySearchAppBar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import { CartProvider } from './contexts/CartContext';

function App() {
  return (
    <Router>
      <CartProvider>
        <PrimarySearchAppBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/productos" element={<ProductsPage />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;