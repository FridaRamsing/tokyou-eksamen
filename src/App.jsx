import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import Products from "./pages/Products";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/mood" element={<div>Mood page</div>} />
        <Route path="/women" element={<div>Woman page</div>} />
        <Route path="/men" element={<div>Men page</div>} />
        <Route path="/designers" element={<div>Designers page</div>} />
        <Route path="/inspo" element={<div>Inspo page</div>} />
        <Route path="/sale" element={<div>Sale page</div>} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
}
