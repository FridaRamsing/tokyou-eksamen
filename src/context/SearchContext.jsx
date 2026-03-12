import { createContext, useContext, useMemo, useState } from "react";

// SearchContext
// Provides a single shared search query string for the app. The header input
// writes into this context and the Products page reads from it to filter results.
// API:
// - query: current string
// - setQuery(value): update the query
// - clearQuery(): convenience to reset the query to empty string
const SearchContext = createContext(null);

export function SearchProvider({ children }) {
  // Single query string for the whole app.
  const [query, setQuery] = useState("");

  // Memoize to keep referential stability.
  const value = useMemo(
    () => ({
      query,
      setQuery,
      clearQuery: () => setQuery(""),
    }),
    [query],
  );

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be used within SearchProvider");
  return ctx;
}
