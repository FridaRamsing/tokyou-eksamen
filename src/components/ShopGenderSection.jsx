// ShopGenderSection
// Simple two-card presentational component to link to gendered collections.
export default function ShopGenderSection() {
  return (
    <section className="shop-gender">
      {/* Women card */}
      <article className="shop-gender-card">
        <img
          src="https://i.pinimg.com/736x/8b/21/3c/8b213cce74be820120f31d2a612e7aea.jpg"
          alt="Shop Women"
        />
        <h3>SHOP WOMEN</h3>
        <p>lille sup head til edit</p>
      </article>

      {/* Men card */}
      <article className="shop-gender-card">
        <img
          src="https://i.pinimg.com/1200x/5e/6f/d4/5e6fd4fa8889579aed81d549bbeee1c8.jpg"
          alt="Shop Men"
        />
        <h3>SHOP MEN</h3>
        <p>lille sup head til edit</p>
      </article>
    </section>
  );
}
