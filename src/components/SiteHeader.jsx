import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import productsData from "../data/products.json";
import { useLikes } from "../context/LikesContext";
import { useCart } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";
import tokyouLogo from "../assets/tokyou-logo.svg";

// SiteHeader
// Top-level site header/nav component. Responsibilities:
// - Show logo, global search input, and primary navigation.
// - Wire up small UI overlays: language selector, mega menus, likes overlay and cart overlay.
// - Read shared state from Likes, Cart and Search contexts and transform it for UI overlays.
//
// Notes about important pieces:
// - likedProducts: derived list of product objects for the likes overlay; kept in local memory
//   by mapping liked ids from LikesContext to items in products.json.
// - cartDetailed: maps cart entries (id + size + qty) to the full product object for display.
// - toggleMenu(menu): open/close a named mega menu; keeps menu state in `activeMenu`.
export default function SiteHeader() {
  // Global UI state (nav overlays + search) and shared data from contexts.
  const { likedIds } = useLikes();
  const {
    cartItems,
    cartOpen,
    openCart,
    closeCart,
    removeFromCart,
    clearCart,
  } = useCart();
  const { query, setQuery } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(null);
  const [langOpen, setLangOpen] = useState(false);
  const [likesOpen, setLikesOpen] = useState(false);
  // A11y: keep references to panels + close buttons for focus management.
  const megaPanelRef = useRef(null);
  const megaCloseRef = useRef(null);
  const cartPanelRef = useRef(null);
  const cartCloseRef = useRef(null);
  const likesPanelRef = useRef(null);
  const likesCloseRef = useRef(null);
  const previousFocusRef = useRef(null);

  // Toggle the named mega menu; passes null to close.
  const toggleMenu = (menu) => {
    setActiveMenu((prev) => (prev === menu ? null : menu));
  };

  // Build data for overlays (likes + cart) from product catalog.
  // These derived arrays are inexpensive here but prevent components deeper in the
  // tree from having to re-run the lookup.
  const likedProducts = productsData.filter((product) =>
    likedIds.includes(String(product.id)),
  );
  const cartDetailed = cartItems.map((entry) => ({
    ...entry,
    product: productsData.find(
      (product) => String(product.id) === String(entry.id),
    ),
  }));

  // A11y: trap focus within overlays and close with Escape.
  const getFocusable = (container) => {
    if (!container) return [];
    return Array.from(
      container.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ),
    );
  };

  const trapFocus = (event, panelRef) => {
    if (event.key === "Escape") {
      setActiveMenu(null);
      closeCart();
      setLikesOpen(false);
      return;
    }
    if (event.key !== "Tab") return;
    const focusable = getFocusable(panelRef.current);
    if (focusable.length === 0) return;
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

  useEffect(() => {
    // A11y: move focus into the active overlay, restore on close.
    const openLayer = activeMenu
      ? "mega"
      : cartOpen
        ? "cart"
        : likesOpen
          ? "likes"
          : null;
    if (openLayer) {
      previousFocusRef.current = document.activeElement;
      requestAnimationFrame(() => {
        if (openLayer === "mega") megaCloseRef.current?.focus();
        if (openLayer === "cart") cartCloseRef.current?.focus();
        if (openLayer === "likes") likesCloseRef.current?.focus();
      });
      return;
    }
    previousFocusRef.current?.focus?.();
  }, [activeMenu, cartOpen, likesOpen]);

  return (
    <>
      {/* 1 Top bar */}
      <section className="lp-topbar">
        <p>
          Sign Up Today And Get 5% Off Your First Order And Free Shipping,
          Always
        </p>
        <p>
          Free Returns | We Arrenge Pickup From Your Home | Delivery Not
          Included
        </p>
      </section>

      {/* 2 Header / nav (logo, search, menu) */}
      <header className="lp-header">
        <div className="lp-header-row">
          <div className="lp-left">
            <div className="lang">
              <button
                type="button"
                className="lang-toggle"
                onClick={() => setLangOpen((prev) => !prev)}
                aria-expanded={langOpen}
                aria-label="Language"
              >
                <span className="flag">🇬🇧</span>
                <span className="caret">▾</span>
              </button>
              {langOpen && (
                <div className="lang-menu">
                  <button type="button" aria-label="English">
                    🇬🇧
                  </button>
                  <button type="button" aria-label="Dansk">
                    🇩🇰
                  </button>
                  <button type="button" aria-label="Svenska">
                    🇸🇪
                  </button>
                  <button type="button" aria-label="Français">
                    🇫🇷
                  </button>
                  <button type="button" aria-label="Deutsch">
                    🇩🇪
                  </button>
                </div>
              )}
            </div>

            <div className="search-wrap">
              {/* A11y: explicit label for screen readers */}
              <label className="sr-only" htmlFor="site-search">
                Search products
              </label>
              <span className="search-icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="7" />
                  <line x1="16.5" y1="16.5" x2="22" y2="22" />
                </svg>
              </span>
              <input
                id="site-search"
                className="lp-search-input"
                type="text"
                placeholder="SEARCH"
                aria-label="Search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  // If user hits Enter outside /products, navigate there.
                  if (
                    event.key === "Enter" &&
                    location.pathname !== "/products"
                  ) {
                    navigate("/products");
                  }
                }}
              />
            </div>
          </div>

          <Link to="/" className="lp-logo" aria-label="TOKYOU Home">
            <img src={tokyouLogo} alt="TOKYOU" />
          </Link>

          <div className="lp-right">
            <span className="icon">
              <svg
                viewBox="0 0 24 24"
                width="26"
                height="26"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-label="Profile"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c1.6-4 14.4-4 16 0" />
              </svg>
            </span>
            <button
              type="button"
              className="icon-btn"
              onClick={() => setLikesOpen(true)}
              aria-label="Liked items"
            >
              <svg
                viewBox="0 0 24 24"
                width="26"
                height="26"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-label="Wishlist"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
            <button
              type="button"
              className="icon-btn"
              onClick={openCart}
              aria-label="Shopping bag"
            >
              <svg
                viewBox="0 0 24 24"
                width="26"
                height="26"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="6" y="7" width="12" height="14" rx="3" />
                <path d="M9 7a3 3 0 0 1 6 0" />
              </svg>
            </button>
          </div>
        </div>

        {/* Main nav buttons; some open mega menus, others are routes */}
        <nav className="lp-menu">
          <button
            type="button"
            className={activeMenu === "new" ? "is-active" : ""}
            onClick={() => toggleMenu("new")}
            aria-expanded={activeMenu === "new"}
          >
            NEW IN
          </button>
          <button
            type="button"
            className={activeMenu === "mood" ? "is-active" : ""}
            onClick={() => toggleMenu("mood")}
            aria-expanded={activeMenu === "mood"}
          >
            PICK A MOOD
          </button>
          <NavLink to="/products">PRODUCTS</NavLink>
          <button
            type="button"
            className={activeMenu === "designers" ? "is-active" : ""}
            onClick={() => toggleMenu("designers")}
            aria-expanded={activeMenu === "designers"}
          >
            DESIGNERS
          </button>
          <NavLink to="/inspo">GET YOUR INSPO</NavLink>
          <NavLink to="/sale" className="sale">
            SALE
          </NavLink>
        </nav>

        {/* Mega menu overlay (NEW / MOOD / DESIGNERS) */}
        {activeMenu && (
          <div
            className="mega-overlay"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mega-title"
          >
            <button
              type="button"
              className="mega-close"
              onClick={() => setActiveMenu(null)}
              aria-label="Close menu"
              ref={megaCloseRef}
            >
              ×
            </button>
            <div
              className="mega-inner"
              ref={megaPanelRef}
              onKeyDown={(event) => trapFocus(event, megaPanelRef)}
              tabIndex={-1}
            >
              <h2 id="mega-title" className="sr-only">
                Site menu
              </h2>
              {activeMenu === "mood" && (
                <div className="mega-grid mega-grid--3">
                  <div className="mega-col">
                    <ul>
                      <li>Feeling Calm</li>
                      <li>Feeling Cool</li>
                      <li>Feeling Cute</li>
                      <li>Feeling Creative</li>
                    </ul>
                  </div>
                  <div className="mega-col">
                    <ul>
                      <li>Feeling Elegant</li>
                      <li>Feeling Empowered</li>
                      <li>Feeling Free</li>
                      <li>Feeling Glamorous</li>
                    </ul>
                  </div>
                  <div className="mega-col">
                    <ul>
                      <li>Feeling Modest</li>
                      <li>Feeling Joyful</li>
                      <li>Feeling Sexy</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeMenu === "new" && (
                <div className="mega-grid mega-grid--3">
                  <div className="mega-col">
                    <h4>NEW IN WOMEN</h4>
                    <ul>
                      <li>Blouses</li>
                      <li>Dresses</li>
                      <li>Pants</li>
                      <li>Shirts</li>
                      <li>Shorts/Skirts</li>
                    </ul>
                  </div>
                  <div className="mega-col">
                    <h4>NEW IN MEN</h4>
                    <ul>
                      <li>Pants</li>
                      <li>Shirts</li>
                      <li>Shorts</li>
                      <li>Sweaters</li>
                      <li>Tops</li>
                    </ul>
                  </div>
                  <div className="mega-col">
                    <h4>NEW IN ACCESSORIES</h4>
                    <ul>
                      <li>Jewelry</li>
                      <li>Scarfs</li>
                      <li>Sunglasses</li>
                      <li>Socks</li>
                      <li>Hats</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeMenu === "designers" && (
                <div className="mega-grid mega-grid--4">
                  <div className="mega-col">
                    <h4>SHOP</h4>
                    <ul>
                      <li>Brands A-Z</li>
                      <li>AVAVAV</li>
                      <li>Burberry</li>
                      <li>Moncler</li>
                      <li>Miu Miu</li>
                    </ul>
                  </div>
                  <div className="mega-col">
                    <ul>
                      <li>Stone Island</li>
                      <li>Prada</li>
                      <li>Tom Ford</li>
                      <li>Chrome Hearts</li>
                      <li>Lemaire</li>
                    </ul>
                  </div>
                  <div className="mega-col">
                    <ul>
                      <li>Ganni</li>
                      <li>Fendi</li>
                      <li>Jacquemus</li>
                      <li>Dior</li>
                      <li>Gucci</li>
                    </ul>
                  </div>
                  <div className="mega-media">
                    <div
                      className="mega-thumb mega-thumb--light"
                      style={{
                        backgroundImage:
                          "url(https://i.pinimg.com/1200x/83/0a/b0/830ab07472d1b193070ff06f15f3f204.jpg)",
                      }}
                    >
                      Shop Popular Brands
                    </div>
                    <div
                      className="mega-thumb mega-thumb--light"
                      style={{
                        backgroundImage:
                          "url(https://i.pinimg.com/1200x/26/5e/0a/265e0ac5579b25505d2362197e55306d.jpg)",
                      }}
                    >
                      Shop Bags
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Shopping bag overlay */}
      {cartOpen && (
        <div
          className="cart-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cart-title"
        >
          <div
            className="cart-panel"
            ref={cartPanelRef}
            onKeyDown={(event) => trapFocus(event, cartPanelRef)}
            tabIndex={-1}
          >
            <button
              type="button"
              className="cart-close"
              onClick={closeCart}
              aria-label="Close bag"
              ref={cartCloseRef}
            >
              ×
            </button>
            <div className="cart-icon">
              <svg
                viewBox="0 0 24 24"
                width="64"
                height="64"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="6" y="7" width="12" height="14" rx="3" />
                <path d="M9 7a3 3 0 0 1 6 0" />
              </svg>
            </div>
            {/* Empty vs. filled cart UI */}
            {cartDetailed.length === 0 ? (
              <>
                <h2 id="cart-title">SHOPPING BAG</h2>
                <p>
                  There&apos;s nothing in your bag yet.{" "}
                  <span className="cart-link">Sign in</span> or{" "}
                  <span className="cart-link">create an account</span> to unlock
                  members-only rewards and personalised recommendations
                </p>
                <div className="cart-links">
                  <a href="#">Shop Women</a>
                  <a href="#">Shop Men</a>
                  <a href="#">Shop Accessories</a>
                </div>
              </>
            ) : (
              <>
                <h2 id="cart-title">SHOPPING BAG</h2>
                <p className="cart-count">
                  {cartItems.length} item{cartItems.length === 1 ? "" : "s"}
                </p>
                <ul className="cart-list">
                  {cartDetailed.map((entry) => (
                    <li key={`${entry.id}-${entry.size}`}>
                      {entry.product?.image ? (
                        <img
                          src={entry.product.image}
                          alt={entry.product.description}
                        />
                      ) : (
                        <div className="cart-thumb" aria-hidden="true" />
                      )}
                      <div className="cart-item-meta">
                        <span className="cart-item-brand">
                          {entry.product?.brand ?? "Item"}
                        </span>
                        <span className="cart-item-desc">
                          {entry.product?.description ?? ""}
                        </span>
                        <span className="cart-item-size">
                          Size {entry.size}
                        </span>
                        <span className="cart-item-price">
                          {entry.product?.price ?? ""}
                        </span>
                      </div>
                      <button
                        type="button"
                        className="cart-remove"
                        onClick={() => removeFromCart(entry.id, entry.size)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="cart-actions">
                  <button
                    type="button"
                    className="cart-clear"
                    onClick={clearCart}
                  >
                    Clear bag
                  </button>
                </div>
              </>
            )}
          </div>
          <button
            type="button"
            className="cart-backdrop"
            aria-label="Close"
            onClick={closeCart}
          />
        </div>
      )}

      {/* Liked items overlay */}
      {likesOpen && (
        <div
          className="likes-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="likes-title"
        >
          <div
            className="likes-panel"
            ref={likesPanelRef}
            onKeyDown={(event) => trapFocus(event, likesPanelRef)}
            tabIndex={-1}
          >
            <button
              type="button"
              className="likes-close"
              onClick={() => setLikesOpen(false)}
              aria-label="Close liked items"
              ref={likesCloseRef}
            >
              ×
            </button>
            <h2 id="likes-title">
              LIKED{" "}
              <span className="likes-count">({likedProducts.length})</span>
            </h2>
            {likedProducts.length === 0 ? (
              <p className="likes-empty">You have no liked items yet.</p>
            ) : (
              <ul className="likes-list">
                {likedProducts.map((product) => (
                  <li key={product.id}>
                    <Link
                      to={`/products/${product.id}`}
                      onClick={() => setLikesOpen(false)}
                    >
                      <img src={product.image} alt={product.description} />
                      <div className="likes-meta">
                        <span className="likes-brand">{product.brand}</span>
                        <span className="likes-desc">
                          {product.description}
                        </span>
                        <span className="likes-price">{product.price}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            type="button"
            className="likes-backdrop"
            aria-label="Close"
            onClick={() => setLikesOpen(false)}
          />
        </div>
      )}
    </>
  );
}
