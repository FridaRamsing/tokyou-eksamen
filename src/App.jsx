import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import { LikesProvider } from "./context/LikesContext";
import { CartProvider } from "./context/CartContext";
import { SearchProvider } from "./context/SearchContext";

// App
// Root application component that wires up global providers and the route table.
// Responsibilities:
// - Wrap children with Search, Cart and Likes providers so those contexts are
//   available throughout the app.
// - Define the client-side route table (which page component renders for each path).
// Note: This component is purely declarative and has no local state.
export default function App() {
  // App root: wire up global providers and route table.
  return (
    <SearchProvider>
      <CartProvider>
        <LikesProvider>
          <Routes>
            <Route path="/products" element={<Products />} />
            <Route path="/products/:productId" element={<ProductDetail />} />
            <Route path="/mood" element={<div>Mood page</div>} />
            <Route path="/women" element={<Products />} />
            <Route path="/men" element={<Products />} />
            <Route path="/designers" element={<div>Designers page</div>} />
            <Route path="/inspo" element={<div>Inspo page</div>} />
            <Route path="/sale" element={<div>Sale page</div>} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </LikesProvider>
      </CartProvider>
    </SearchProvider>
  );
}
