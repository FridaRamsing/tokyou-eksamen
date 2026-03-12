import SiteHeader from "../components/SiteHeader";
import NewInSection from "../components/NewInSection";
import ShopGenderSection from "../components/ShopGenderSection";
import MoodBannerSection from "../components/MoodBannerSection";
import FeelingSection from "../components/FeelingSection";
import SaleBannerSection from "../components/SaleBannerSection";
import DenimSection from "../components/DenimSection";
import WornByYouSection from "../components/WornByYouSection";
import NewsletterSection from "../components/NewsletterSection";
import FooterSection from "../components/FooterSection";

// HomePage
// Composes the homepage using a set of presentational sections (hero, new in, mood, etc.).
// Responsibilities:
// - Renders the SiteHeader and page-level sections in the design order.
// - Sections are mostly presentational and source their data from static assets or products.json.
export default function HomePage() {
  // Use BASE_URL so the video works on GitHub Pages sub-paths.
  const heroVideoSrc = `${import.meta.env.BASE_URL}tokyou-hero-video.mp4`;

  return (
    <main className="lp-page">
      <SiteHeader />

      {/* Hero video banner */}
      <section className="lp-hero">
        <video className="lp-hero-video" autoPlay muted loop playsInline>
          <source src={heroVideoSrc} type="video/mp4" />
        </video>
      </section>

      {/* Home sections in Figma order */}
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
