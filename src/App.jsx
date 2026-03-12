import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";

export default function App() {
  return (
    <>
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
    </>
  );
}
