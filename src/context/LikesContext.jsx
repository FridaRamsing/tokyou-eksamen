import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";

// LikesContext
// Provides a simple persisted list of liked product ids.
// - Data is stored as an array of string ids in localStorage under key 'likedIds'.
// - Exposes toggleLike(id) and isLiked(id) helpers for UI components.
const LikesContext = createContext(null);

// Helper: safeParse
// Safely parse JSON from localStorage and ensure the result is an array.
// Returns the provided fallback for invalid JSON or non-array values.
const safeParse = (value, fallback) => {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
};

export function LikesProvider({ children }) {
  // Load liked IDs once on mount. Uses lazy initial state so this only runs
  // during client-side rendering; server-side rendering will return an empty list.
  const [likedIds, setLikedIds] = useState(() => {
    if (typeof window === "undefined") return [];
    return safeParse(window.localStorage.getItem("likedIds"), []);
  });

  useEffect(() => {
    // Persist likes to localStorage.
    window.localStorage.setItem("likedIds", JSON.stringify(likedIds));
  }, [likedIds]);

  // Toggle a product ID in the liked list.
  // useCallback keeps the function identity stable where useful to consumers.
  const toggleLike = useCallback((id) => {
    const key = String(id);
    setLikedIds((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key],
    );
  }, []);

  // Query helper for UI (hearts + liked overlay).
  // depends on likedIds and will update when likedIds changes.
  const isLiked = useCallback(
    (id) => likedIds.includes(String(id)),
    [likedIds],
  );

  // Memoize context value to avoid rerenders in consumers when the value hasn't changed.
  const value = useMemo(
    () => ({
      likedIds,
      toggleLike,
      isLiked,
    }),
    [likedIds, toggleLike, isLiked],
  );

  return (
    <LikesContext.Provider value={value}>{children}</LikesContext.Provider>
  );
}

export function useLikes() {
  const context = useContext(LikesContext);
  if (!context) {
    throw new Error("useLikes must be used within a LikesProvider");
  }
  return context;
}
