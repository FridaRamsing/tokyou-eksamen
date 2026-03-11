


import { useState } from "react";
import { NavLink } from "react-router";
import NewInSection from "../components/NewInSection";
import ShopGenderSection from "../components/ShopGenderSection";
import MoodBannerSection from "../components/MoodBannerSection";
import FeelingSection from "../components/FeelingSection";
import SaleBannerSection from "../components/SaleBannerSection";
import DenimSection from "../components/DenimSection";
import WornByYouSection from "../components/WornByYouSection";
import NewsletterSection from "../components/NewsletterSection";
import FooterSection from "../components/FooterSection";

export default function HomePage() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const toggleMenu = (menu) => {
    setActiveMenu((prev) => (prev === menu ? null : menu));
  };

  return (
    <main className="lp-page">
      {/* 1 Top bar */}
      <section className="lp-topbar">
        <p>
          {" "}
          Sign Up Today And Get 5% Off Your First Order And Free Shipping,
          Always
        </p>
        <p>
          Free Returns | We Arrenge Pickup From Your Home | Delivery Not
          Included
        </p>
      </section>

      {/* 2 Header / nav */}
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
                  <button type="button">🇬🇧</button>
                  <button type="button">🇩🇰</button>
                  <button type="button">🇸🇪</button>
                  <button type="button">🇫🇷</button>
                  <button type="button">🇩🇪</button>
                </div>
              )}
            </div>

            <div className="search-wrap">
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
                className="lp-search-input"
                type="text"
                placeholder="SEARCH"
                aria-label="Search"
              />
            </div>
          </div>

          <div className="lp-logo">TOKYOU</div>

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
                aria-label="Wishlist"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </span>
            <button
              type="button"
              className="icon-btn"
              onClick={() => setCartOpen(true)}
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
          <button
            type="button"
            className={activeMenu === "women" ? "is-active" : ""}
            onClick={() => toggleMenu("women")}
            aria-expanded={activeMenu === "women"}
          >
            WOMEN
          </button>
          <button
            type="button"
            className={activeMenu === "men" ? "is-active" : ""}
            onClick={() => toggleMenu("men")}
            aria-expanded={activeMenu === "men"}
          >
            MEN
          </button>
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
        {activeMenu && (
          <div className="mega-overlay" role="region" aria-label="Menu">
            <button
              type="button"
              className="mega-close"
              onClick={() => setActiveMenu(null)}
              aria-label="Close menu"
            >
              ×
            </button>
            <div className="mega-inner">
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

              {activeMenu === "women" && (
                <div className="mega-grid mega-grid--4">
                  <div className="mega-col">
                    <h4>SHOP</h4>
                    <ul>
                      <li>All Clothing</li>
                      <li>Accessories</li>
                      <li>Cardigans</li>
                      <li>Dresses</li>
                      <li>Jackets</li>
                    </ul>
                  </div>
                  <div className="mega-col">
                    <ul>
                      <li>Jeans</li>
                      <li>Knitwear</li>
                      <li>Pants</li>
                      <li>Shirts</li>
                      <li>Shorts</li>
                    </ul>
                  </div>
                  <div className="mega-col">
                    <ul>
                      <li>Skirts</li>
                      <li>Sweatshirt/Hoodie</li>
                      <li>Sweaters</li>
                      <li>Swimwear</li>
                    </ul>
                  </div>
                <div className="mega-media">
                  <div
                    className="mega-thumb mega-thumb--light"
                    style={{
                      backgroundImage:
                        "url(https://i.pinimg.com/1200x/ee/28/04/ee2804fbc825b51cb32c6c0a40547c8d.jpg)",
                    }}
                  >
                    Shop Jackets
                  </div>
                  <div
                    className="mega-thumb mega-thumb--light"
                    style={{
                      backgroundImage:
                        "url(https://i.pinimg.com/1200x/31/90/ba/3190bad16b82e6dce98fcbb412ff2198.jpg)",
                    }}
                  >
                    Shop Knitwear
                  </div>
                </div>
                </div>
              )}

              {activeMenu === "men" && (
                <div className="mega-grid mega-grid--4">
                  <div className="mega-col">
                    <h4>SHOP</h4>
                    <ul>
                      <li>All Clothing</li>
                      <li>Accessories</li>
                      <li>Denim</li>
                      <li>Vests</li>
                      <li>Jackets</li>
                    </ul>
                  </div>
                  <div className="mega-col">
                    <ul>
                      <li>Jeans</li>
                      <li>Knitwear</li>
                      <li>Pants</li>
                      <li>Shoes</li>
                      <li>Shorts</li>
                    </ul>
                  </div>
                  <div className="mega-col">
                    <ul>
                      <li>Sweatshirt/Hoodie</li>
                      <li>Sweaters</li>
                      <li>Swimwear</li>
                      <li>Trousers</li>
                      <li>T-Shirts</li>
                    </ul>
                  </div>
                <div className="mega-media">
                  <div
                    className="mega-thumb"
                    style={{
                      backgroundImage:
                        "url(https://i.pinimg.com/1200x/67/dc/91/67dc91d74cb94a037e2b643a04e89643.jpg)",
                    }}
                  >
                    Shop Denim
                  </div>
                  <div
                    className="mega-thumb mega-thumb--light"
                    style={{
                      backgroundImage:
                        "url(https://i.pinimg.com/736x/2e/fa/fe/2efafecf87d75a5f751736029ebf83b9.jpg)",
                    }}
                  >
                    Shop Trousers
                  </div>
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

      {cartOpen && (
        <div className="cart-overlay" role="dialog" aria-modal="true">
          <div className="cart-panel">
            <button
              type="button"
              className="cart-close"
              onClick={() => setCartOpen(false)}
              aria-label="Close bag"
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
            <h2>SHOPPING BAG</h2>
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
          </div>
          <button
            type="button"
            className="cart-backdrop"
            aria-label="Close"
            onClick={() => setCartOpen(false)}
          />
        </div>
      )}
      {/* 3 Hero */}
      <section className="lp-hero">
        <video
          className="lp-hero-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/tokyou-hero-video.mp4" type="video/mp4" />
        </video>
      </section>

      <NewInSection />
      <ShopGenderSection />
      <MoodBannerSection />
      <FeelingSection />
      <SaleBannerSection />
      <DenimSection />
      <WornByYouSection />
      <NewsletterSection />
      <FooterSection />
    </main>
  );
}
