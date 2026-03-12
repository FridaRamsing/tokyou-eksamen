import { createContext, useContext, useEffect, useMemo, useState } from "react";

// CartContext
// Global cart store with simple persistence to localStorage. The cart stores
// an array of entries of shape { id, size, qty } under the key defined by CART_KEY.
// API provided to consumers:
// - cartItems: current list of entries
// - addToCart(item): merges items with same id+size and increments qty
// - removeFromCart(id, size)
// - clearCart()
// - cartOpen/openCart/closeCart: simple UI state for the cart overlay.
const CartContext = createContext(null);
const CART_KEY = "tokyou-cart";

// Safe JSON parse for localStorage.
const safeParse = (value, fallback) => {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
};

export function CartProvider({ children }) {
  // Load cart once on mount.
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window === "undefined") return [];
    return safeParse(window.localStorage.getItem(CART_KEY), []);
  });
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    // Persist cart to localStorage.
    if (typeof window === "undefined") return;
    window.localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  // Add a product with a size; merge if same id+size.
  const addToCart = (item) => {
    setCartItems((prev) => {
      const index = prev.findIndex(
        (entry) =>
          String(entry.id) === String(item.id) && entry.size === item.size,
      );
      if (index === -1) return [...prev, { ...item, qty: item.qty ?? 1 }];
      const next = [...prev];
      next[index] = { ...next[index], qty: next[index].qty + (item.qty ?? 1) };
      return next;
    });
    setCartOpen(true);
  };

  // Remove a specific id+size entry.
  const removeFromCart = (id, size) => {
    setCartItems((prev) =>
      prev.filter(
        (entry) => !(String(entry.id) === String(id) && entry.size === size),
      ),
    );
  };

  // Clear all cart items.
  const clearCart = () => {
    setCartItems([]);
  };

  // Memoize API surface for consumers.
  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      clearCart,
      cartOpen,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
    }),
    [cartItems, cartOpen],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
