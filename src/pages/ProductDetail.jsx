import { Link, useParams } from "react-router";
import SiteHeader from "../components/SiteHeader";
import NewsletterSection from "../components/NewsletterSection";
import FooterSection from "../components/FooterSection";
import productsData from "../data/products.json";

const sizeOptionsFrom = (size) => {
  if (!size) return [];
  const trimmed = size.trim();
  if (/^\d+-\d+$/.test(trimmed)) {
    const [start, end] = trimmed.split("-").map(Number);
    if (Number.isFinite(start) && Number.isFinite(end)) {
      const list = [];
      for (let i = start; i <= end; i += 1) list.push(String(i));
      return list;
    }
  }
  if (trimmed.toUpperCase() === "S-L") return ["S", "M", "L"];
  if (trimmed.includes("-")) {
    return trimmed.split("-").map((part) => part.trim()).filter(Boolean);
  }
  return [trimmed];
};

export default function ProductDetail() {
  const { productId } = useParams();
  const product = productsData.find(
    (item) => String(item.id) === String(productId)
  );

  const related = productsData
    .filter((item) => item.id !== product?.id)
    .slice(0, 4);

  if (!product) {
    return (
      <main className="lp-page">
        <SiteHeader />
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

  return (
    <main className="lp-page">
      <SiteHeader />

      <section className="product-detail">
        <Link to="/products" className="products-back">
          ← Back to products
        </Link>

        <div className="product-detail-grid">
          <div className="product-gallery">
            <button className="detail-arrow detail-arrow-left" aria-label="Prev">
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

            <select className="product-size-select" aria-label="Select size">
              <option value="">Select size</option>
              {sizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>

            <div className="product-actions">
              <button className="product-add">Add to bag</button>
              <button className="product-fav">
                Favorites
                <span className="product-fav-icon">♡</span>
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

        <div className="product-description">
          <h2>Product description</h2>
          <p>
            {product.brand} {product.description}. This is placeholder copy for
            the product description and will be updated later.
          </p>
        </div>

        <div className="product-inspo">
          <div className="product-inspo-header">
            <h3>For more inspiration</h3>
          </div>
          <div className="product-inspo-grid">
            {related.map((item) => (
              <article key={item.id} className="product-card product-card--mini">
                <button
                  type="button"
                  className="product-like"
                  aria-label="Like"
                >
                  ♡
                </button>
                <Link to={`/products/${item.id}`} className="product-link">
                  <div className="product-image">
                    <img src={item.image} alt={item.description} />
                  </div>
                  <div className="product-meta">
                    <h3 className="product-brand">{item.brand}</h3>
                    <p className="product-desc">{item.description}</p>
                    <p className="product-price">{item.price}</p>
                    <span className="product-bag" aria-hidden="true">👜</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <NewsletterSection />
      <FooterSection />
    </main>
  );
}
