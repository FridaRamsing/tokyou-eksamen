import { useMemo, useState } from "react";
import { NavLink, Link } from "react-router";
import SiteHeader from "../components/SiteHeader";
import NewsletterSection from "../components/NewsletterSection";
import FooterSection from "../components/FooterSection";
import productsData from "../data/products.json";

const parsePrice = (value) => {
  if (!value) return 0;
  const digits = value.toString().replace(/[^0-9]/g, "");
  return Number(digits || 0);
};

const unique = (list) => Array.from(new Set(list)).filter(Boolean);

const priceOptions = [
  { value: "all", label: "Price" },
  { value: "under3000", label: "Under 3.000 DKK" },
  { value: "3000to6000", label: "3.000 - 6.000 DKK" },
  { value: "6000plus", label: "Over 6.000 DKK" },
];

export default function Products() {
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

  const [filters, setFilters] = useState({
    brand: "All",
    category: "All",
    color: "All",
    size: "All",
    price: "all",
  });

  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      const matchesBrand =
        filters.brand === "All" || product.brand === filters.brand;
      const matchesCategory =
        filters.category === "All" || product.Category === filters.category;
      const matchesColor =
        filters.color === "All" || product.color === filters.color;
      const matchesSize =
        filters.size === "All" || product.size === filters.size;

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
        matchesBrand &&
        matchesCategory &&
        matchesColor &&
        matchesSize &&
        matchesPrice
      );
    });
  }, [filters]);

  return (
    <main className="lp-page">
      <SiteHeader />

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

        <button
          type="button"
          className="filter-chip is-disabled"
          aria-disabled="true"
        >
          Material
        </button>

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
          className="filter-chip is-disabled"
          aria-disabled="true"
        >
          Fit
        </button>
        <button
          type="button"
          className="filter-chip is-disabled"
          aria-disabled="true"
        >
          Other Filters
        </button>
      </section>

      <section className="products-grid" aria-live="polite">
        {filteredProducts.map((product) => (
          <article key={product.id} className="product-card">
            <button type="button" className="product-like" aria-label="Like">
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
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
