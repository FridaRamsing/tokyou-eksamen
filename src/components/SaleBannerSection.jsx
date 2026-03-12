// SaleBannerSection
// Small promotional banner component highlighting sale messaging and imagery.
export default function SaleBannerSection() {
  return (
    <section className="sale-banner">
      {/* Left copy */}
      <div className="sale-left">
        <p className="sale-kicker">SAVE UP TO</p>
        <h2 className="sale-big">70% OFF</h2>
      </div>

      {/* Center image */}
      <div className="sale-center">
        <img
          src="https://plus.unsplash.com/premium_photo-1717529136933-87cf133a248d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MTE1fHx8ZW58MHx8fHx8"
          alt="Model"
        />
      </div>

      {/* Right copy */}
      <div className="sale-right">
        <h3>SALE</h3>
        <p>SHOP NOW</p>
      </div>
    </section>
  );
}
