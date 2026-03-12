import { useMemo, useState } from "react";
import { NavLink, Link } from "react-router";
import SiteHeader from "../components/SiteHeader";
import NewsletterSection from "../components/NewsletterSection";
import FooterSection from "../components/FooterSection";
import productsData from "../data/products.json";
import { useLikes } from "../context/LikesContext";
import { useSearch } from "../context/SearchContext";

// Helper: parsePrice
// Converts a price string such as "2.600 DKK" or "2600" into a numeric value (e.g. 2600).
// Returns 0 for falsy input. Keeps only digits and returns a Number.
const parsePrice = (value) => {
  if (!value) return 0;
  const digits = value.toString().replace(/[^0-9]/g, "");
  return Number(digits || 0);
};

// Helper: unique
// Returns a list of unique, truthy values from the provided array.
// Used to build the distinct options for the filter dropdowns (brand, category, color, size).
const unique = (list) => Array.from(new Set(list)).filter(Boolean);

// Price dropdown options.
const priceOptions = [
  { value: "all", label: "Price" },
  { value: "under3000", label: "Under 3.000 DKK" },
  { value: "3000to6000", label: "3.000 - 6.000 DKK" },
  { value: "6000plus", label: "Over 6.000 DKK" },
];

/**
 * Products component
 * Renders the product catalog page with search + multiple filter controls.
 *
 * Responsibilities:
 * - Build option lists (brands, categories, colors, sizes) from product data.
 * - Manage filter state (brand, category, color, size, price) and liked-only toggle.
 * - Compute the filtered product list (combines search query, filters and liked state).
 * - Render filter controls, product grid, and page chrome (header/footer/newsletter).
 */
export default function Products() {
  // Likes API from context: check and toggle liked state for product ids.
  const { isLiked, toggleLike } = useLikes();
  // Global search query from context (keeps search box elsewhere in sync).
  const { query } = useSearch();

  // Filter option lists (computed once with useMemo for performance):
  // - brands: sorted unique brand names
  // - categories: sorted unique Category values
  // - colors: sorted unique colors
  // - sizes: sorted unique sizes
  const brands = useMemo(
    () => unique(productsData.map((p) => p.brand)).sort(),
    [],
  );
  const categories = useMemo(
    () => unique(productsData.map((p) => p.Category)).sort(),
    [],
  );
  const colors = useMemo(
    () => unique(productsData.map((p) => p.color)).sort(),
    [],
  );
  const sizes = useMemo(
    () => unique(productsData.map((p) => p.size)).sort(),
    [],
  );

  // Active filters + liked-only toggle state. `filters` holds the currently
  // selected values from each select control. `likedOnly` restricts results to
  // items the user has liked.
  const [filters, setFilters] = useState({
    brand: "All",
    category: "All",
    color: "All",
    size: "All",
    price: "all",
  });
  const [likedOnly, setLikedOnly] = useState(false);

  /**
   * filteredProducts (useMemo)
   * Computes the visible products after applying:
   * - the search query (across several fields),
   * - each of the selected filters (brand, category, color, size, price),
   * - and the liked-only toggle.
   *
   * The price matching uses parsePrice to convert product.price to a number
   * and compares against the chosen price bucket.
   */
  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return productsData.filter((product) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [
          product.brand,
          product.name,
          product.description,
          product.Category,
          product.color,
        ]
          .filter(Boolean)
          .some((field) =>
            field.toString().toLowerCase().includes(normalizedQuery),
          );
      const matchesBrand =
        filters.brand === "All" || product.brand === filters.brand;
      const matchesCategory =
        filters.category === "All" || product.Category === filters.category;
      const matchesColor =
        filters.color === "All" || product.color === filters.color;
      const matchesSize =
        filters.size === "All" || product.size === filters.size;
      const matchesLiked = !likedOnly || isLiked(product.id);

      const price = parsePrice(product.price);
      const matchesPrice = (() => {
        if (filters.price === "all") return true;
        if (filters.price === "under3000") return price < 3000;
        if (filters.price === "3000to6000")
          return price >= 3000 && price <= 6000;
        if (filters.price === "6000plus") return price > 6000;
        return true;
      })();

      return (
        matchesQuery &&
        matchesBrand &&
        matchesCategory &&
        matchesColor &&
        matchesSize &&
        matchesPrice &&
        matchesLiked
      );
    });
  }, [filters, likedOnly, isLiked, query]);

  // Render the page: header, filters, product grid, and footer/newsletter.
  return (
    <main className="lp-page">
      <SiteHeader />

      {/* Page intro */}
      <section className="products-hero">
        <NavLink to="/" className="products-back">
          ← Back to home
        </NavLink>
        <p className="products-kicker">Product catalog</p>
        <h1 className="products-title">Product catalog of designer products</h1>
        <p className="products-lead">
          Explore curated designer pieces and use the filters to narrow down
          exactly what you want.
        </p>
      </section>

      {/* Filters row */}
      <section className="products-filters" aria-label="Product filters">
        <div className="filter-pill">
          <select
            className="filter-select"
            aria-label="Filter by brand"
            value={filters.brand}
            onChange={(event) =>
              setFilters((prev) => ({ ...prev, brand: event.target.value }))
            }
          >
            <option value="All">Brand</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-pill">
          <select
            className="filter-select"
            aria-label="Filter by size"
            value={filters.size}
            onChange={(event) =>
              setFilters((prev) => ({ ...prev, size: event.target.value }))
            }
          >
            <option value="All">Size</option>
            {sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-pill">
          <select
            className="filter-select"
            aria-label="Filter by product type"
            value={filters.category}
            onChange={(event) =>
              setFilters((prev) => ({ ...prev, category: event.target.value }))
            }
          >
            <option value="All">Product Type</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-pill">
          <select
            className="filter-select"
            aria-label="Filter by color"
            value={filters.color}
            onChange={(event) =>
              setFilters((prev) => ({ ...prev, color: event.target.value }))
            }
          >
            <option value="All">Color</option>
            {colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-pill">
          <select
            className="filter-select"
            aria-label="Filter by price"
            value={filters.price}
            onChange={(event) =>
              setFilters((prev) => ({ ...prev, price: event.target.value }))
            }
          >
            {priceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          className={`filter-chip ${likedOnly ? "is-active" : ""}`}
          aria-pressed={likedOnly}
          onClick={() => setLikedOnly((prev) => !prev)}
        >
          Liked
        </button>
      </section>

      {/* Product grid */}
      <section className="products-grid" aria-live="polite">
        {filteredProducts.map((product) => (
          <article key={product.id} className="product-card">
            <button
              type="button"
              className={`product-like ${isLiked(product.id) ? "is-liked" : ""}`}
              aria-label="Like"
              aria-pressed={isLiked(product.id)}
              onClick={() => toggleLike(product.id)}
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill={isLiked(product.id) ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>

            <Link to={`/products/${product.id}`} className="product-link">
              <div className="product-image">
                <img src={product.image} alt={product.description} />
              </div>
              <div className="product-meta">
                <h3 className="product-brand">{product.brand}</h3>
                <p className="product-desc">{product.description}</p>
                <p className="product-price">{product.price}</p>
                <span className="product-bag" aria-hidden="true">
                  👜
                </span>
              </div>
            </Link>
          </article>
        ))}

        {filteredProducts.length === 0 && (
          <p className="products-empty">No products match your filters.</p>
        )}
      </section>

      <NewsletterSection />
      <FooterSection />
    </main>
  );
}
