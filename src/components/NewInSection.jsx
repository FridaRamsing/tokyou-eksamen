import products from "../data/products.json";

// NewInSection
// Small promotional section that shows a preview strip of newly arrived items.
// Data: takes the first 4 entries from products.json for this demo.
export default function NewInSection() {
  // New In section uses the first 4 products as a preview strip.
  const newInItems = products.slice(0, 4);
  return (
    <section className="new-in">
      {/* Product strip */}
      <div className="new-in-grid">
        {newInItems.map((item) => (
          <article key={item.id} className="new-in-card">
            <img src={item.image} alt={item.name} />
            <h3>{item.brand}</h3>
          </article>
        ))}
      </div>

      {/* Right-side call-to-action */}
      <aside className="new-in-info">
        <p className="new-in-count"> 728 New Items</p>
        <h2>NEW IN</h2>
        <p>New Arrivals - Discover The Latest Launches</p>
        <button>SHOP NEW IN</button>
      </aside>
    </section>
  );
}
