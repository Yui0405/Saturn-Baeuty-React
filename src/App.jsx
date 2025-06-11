import PrimarySearchAppBar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import { CartProvider } from './contexts/CartContext';


function App() {
  return (<div>
    <CartProvider>
    <PrimarySearchAppBar/>
    <HomePage/>
    <ProductsPage/>
    </CartProvider>
    </div>
  );
}

export default App;