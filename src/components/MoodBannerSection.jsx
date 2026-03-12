// MoodBannerSection
// Decorative banner made of three images and an overlay call-to-action.
// Presentational only.
export default function MoodBannerSection() {
  return (
    <section className="mood-banner">
      {/* Background triptych */}
      <img
        src="https://i.pinimg.com/736x/5b/8d/e5/5b8de5b0b63bfeba8c6c42879fa880d9.jpg"
        alt="Mood left"
      />
      <img
        src="https://i.pinimg.com/736x/fe/71/2a/fe712affd3bde3b3034e0f2c06a28b42.jpg"
        alt="Mood center"
      />
      <img
        src="https://i.pinimg.com/1200x/47/75/7e/47757e5299296d921aa0dbb46a22cf68.jpg"
        alt="Mood right"
      />

      {/* Overlay CTA */}
      <div className="mood-overlay">
        <h2>DRESS AS YOU FEEL</h2>
        <button>PICK A MOOD AND SHOP IT</button>
      </div>
    </section>
  );
}
