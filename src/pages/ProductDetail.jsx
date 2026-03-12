import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router";
import SiteHeader from "../components/SiteHeader";
import NewsletterSection from "../components/NewsletterSection";
import FooterSection from "../components/FooterSection";
import productsData from "../data/products.json";
import { useLikes } from "../context/LikesContext";
import { useCart } from "../context/CartContext";

// Helper: sizeOptionsFrom
// Parse a product's size description into an explicit list of selectable sizes.
// Input examples and behavior:
// - "36-41" => ["36","37","38","39","40","41"]
// - "S-L" => ["S","M","L"] (mapped as a common S-L shorthand)
// - "M-L" => ["M","L"] (split on dash)
// - "One size" or single value => [value]
// Returns an empty array for falsy input.
const sizeOptionsFrom = (size) => {
  if (!size) return [];
  const trimmed = size.trim();
  if (/^\d+-\d+$/.test(trimmed)) {
    const [start, end] = trimmed.split("-").map(Number);
    const list = [];
    for (let i = start; i <= end; i += 1) list.push(String(i));
    return list;
  }
  if (trimmed.toUpperCase() === "S-L") return ["S", "M", "L"];
  if (trimmed.includes("-")) return trimmed.split("-").map((s) => s.trim());
  return [trimmed];
};

// ProductDetail
// Page component that shows a single product with gallery, size selection and
// add-to-cart behaviour.
// Important responsibilities and details:
// - Reads :productId from route params and finds the product in products.json.
// - Renders a size selector derived from product.size using sizeOptionsFrom.
// - If the product has multiple sizes, Add to bag opens a quick-buy size picker
//   when no size is selected; otherwise it adds the chosen size to the cart.
// - Uses Likes and Cart contexts to toggle favorites and add items to cart.
// - Provides a lightweight "related" list (first 4 other products) for inspiration.
export default function ProductDetail() {
  const { isLiked, toggleLike } = useLikes();
  const { addToCart } = useCart();
  const { productId } = useParams();
  // Find the selected product by route param.
  const product = productsData.find(
    (item) => String(item.id) === String(productId),
  );
  const [selectedSize, setSelectedSize] = useState("");
  const [quickBuyOpen, setQuickBuyOpen] = useState(false);
  // A11y: focus management for quick-buy dialog.
  const quickBuyPanelRef = useRef(null);
  const quickBuyCloseRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    // Reset size/overlay when switching products. Schedule the state updates
    // asynchronously (here using requestAnimationFrame) to avoid calling
    // setState synchronously inside an effect which can trigger cascading renders.
    const raf = requestAnimationFrame(() => {
      setSelectedSize("");
      setQuickBuyOpen(false);
    });
    return () => cancelAnimationFrame(raf);
  }, [productId]);

  useEffect(() => {
    // A11y: move focus into quick-buy dialog, restore on close.
    if (quickBuyOpen) {
      previousFocusRef.current = document.activeElement;
      requestAnimationFrame(() => quickBuyCloseRef.current?.focus());
      return;
    }
    previousFocusRef.current?.focus?.();
  }, [quickBuyOpen]);

  // Simple "related" list for the inspiration grid.
  const related = productsData
    .filter((item) => item.id !== product?.id)
    .slice(0, 4);

  if (!product) {
    return (
      <main className="lp-page">
        <SiteHeader />
        {/* Fallback if route is invalid */}
        <section className="product-detail">
          <p>Product not found.</p>
          <Link to="/products" className="products-back">
            ← Back to products
          </Link>
        </section>
        <NewsletterSection />
        <FooterSection />
      </main>
    );
  }

  const sizeOptions = sizeOptionsFrom(product.size);
  const availableSizes = sizeOptions.length ? sizeOptions : ["One size"];

  // Add to cart: if size missing, open quick-buy picker.
  const handleAddToBag = () => {
    if (!selectedSize && sizeOptions.length) {
      setQuickBuyOpen(true);
      return;
    }
    addToCart({
      id: product.id,
      size: selectedSize || availableSizes[0],
    });
  };

  // Called from quick-buy buttons: immediately select the size, add to cart and
  // close the picker.
  const handleQuickBuy = (size) => {
    setSelectedSize(size);
    addToCart({ id: product.id, size });
    setQuickBuyOpen(false);
  };

  const trapQuickBuyFocus = (event) => {
    if (event.key === "Escape") {
      setQuickBuyOpen(false);
      return;
    }
    if (event.key !== "Tab") return;
    const focusable = quickBuyPanelRef.current?.querySelectorAll(
      'button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    if (!focusable || focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <main className="lp-page">
      <SiteHeader />
      <section className="product-detail">
        <Link to="/products" className="products-back">
          ← Back to products
        </Link>

        {/* Top section: gallery + info */}
        <div className="product-detail-grid">
          <div className="product-gallery">
            <button
              className="detail-arrow detail-arrow-left"
              aria-label="Prev"
            >
              ←
            </button>
            <div className="product-gallery-main">
              <img src={product.image} alt={product.description} />
            </div>
            <div className="product-gallery-alt">
              <img src={product.image} alt={product.description} />
            </div>
            <button
              className="detail-arrow detail-arrow-right"
              aria-label="Next"
            >
              →
            </button>
          </div>

          <div className="product-info">
            <h1 className="product-info-brand">{product.brand}</h1>
            <p className="product-info-name">{product.description}</p>
            <p className="product-info-price">{product.price}</p>

            {/* Size selection (used by quick-buy and add-to-bag) */}
            <select
              className="product-size-select"
              aria-label="Select size"
              value={selectedSize}
              onChange={(event) => setSelectedSize(event.target.value)}
            >
              <option value="">Select size</option>
              {availableSizes.map((size) => (
                <option key={size}>{size}</option>
              ))}
            </select>

            <div className="product-actions">
              <button
                type="button"
                className="product-add"
                onClick={handleAddToBag}
              >
                Add to bag
              </button>
              <button
                className={`product-fav ${isLiked(product.id) ? "is-liked" : ""}`}
                type="button"
                aria-pressed={isLiked(product.id)}
                onClick={() => toggleLike(product.id)}
              >
                Favorites{" "}
                <span className="product-fav-icon" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill={isLiked(product.id) ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </span>
              </button>
            </div>

            <div className="product-delivery">
              <p>Delivery time</p>
              <p>Premium delivery · 1-4 days</p>
              <p>Standard delivery · 1-6 days</p>
            </div>

            <div className="product-accordion">
              <details>
                <summary>Material and care</summary>
                <p>Details will be added later.</p>
              </details>
              <details>
                <summary>Details</summary>
                <p>Details will be added later.</p>
              </details>
              <details>
                <summary>Size and fit</summary>
                <p>Details will be added later.</p>
              </details>
            </div>
          </div>
        </div>

        {/* Long description + collapsible details */}
        <div className="product-description">
          <h2>Product description</h2>
          <p>
            {product.brand} {product.description}. This is placeholder copy for
            the product description.
          </p>
        </div>

        {/* Inspiration grid */}
        <div className="product-inspo">
          <div className="product-inspo-header">
            <h3>For more inspiration</h3>
          </div>
          <div className="product-inspo-grid">
            {related.map((item) => (
              <article
                key={item.id}
                className="product-card product-card--mini"
              >
                <button
                  type="button"
                  className={`product-like ${isLiked(item.id) ? "is-liked" : ""}`}
                  aria-label="Like"
                  aria-pressed={isLiked(item.id)}
                  onClick={() => toggleLike(item.id)}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill={isLiked(item.id) ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
                <Link to={`/products/${item.id}`} className="product-link">
                  <div className="product-image">
                    <img src={item.image} alt={item.description} />
                  </div>
                  <div className="product-meta">
                    <h3 className="product-brand">{item.brand}</h3>
                    <p className="product-desc">{item.description}</p>
                    <p className="product-price">{item.price}</p>
                    <span className="product-bag" aria-hidden="true">
                      👜
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <NewsletterSection />
      <FooterSection />
      {/* Quick-buy size picker */}
      {quickBuyOpen && (
        <div
          className="quickbuy-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="quickbuy-title"
        >
          <div
            className="quickbuy-panel"
            ref={quickBuyPanelRef}
            onKeyDown={trapQuickBuyFocus}
            tabIndex={-1}
          >
            <button
              type="button"
              className="quickbuy-close"
              onClick={() => setQuickBuyOpen(false)}
              aria-label="Close quick buy"
              ref={quickBuyCloseRef}
            >
              ×
            </button>
            <h3 id="quickbuy-title">Select size</h3>
            <div className="quickbuy-sizes">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`quickbuy-size ${
                    selectedSize === size ? "is-active" : ""
                  }`}
                  onClick={() => handleQuickBuy(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="quickbuy-backdrop"
            aria-label="Close"
            onClick={() => setQuickBuyOpen(false)}
          />
        </div>
      )}
    </main>
  );
}
