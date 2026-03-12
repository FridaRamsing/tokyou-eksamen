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

export default function HomePage() {
  return (
    <main className="lp-page">
      <SiteHeader />

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
