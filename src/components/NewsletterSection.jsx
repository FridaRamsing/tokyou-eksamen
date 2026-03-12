import { useState } from "react";

// NewsletterSection
// Renders newsletter signup and informational columns. Small bits of local
// UI state: language dropdown open/closed. The signup input is not wired to
// any backend in this example — the form is illustrative.
export default function NewsletterSection() {
  // Local dropdown state for language selector.
  const [langOpen, setLangOpen] = useState(false);

  return (
    <section className="newsletter">
      {/* Left column: signup + social icons */}
      <div className="newsletter-left">
        <h3>ENJOY 5% OFF YOUR NEXT ORDER</h3>
        <p>
          Claim Your Exclusive Discount Code When You Subscribe To TO-K-YOU.
          T&amp;C And Exclusions Apply
        </p>
        <div className="newsletter-form">
          <input type="email" placeholder="Enter Email Here..." />
          <button type="button">Sign Up</button>
        </div>
        <div className="newsletter-social">
          <span className="social">X</span>
          <span className="social">IG</span>
          <span className="social">TT</span>
          <span className="social social--trust" aria-label="Trustpilot">
            ★
          </span>
        </div>
      </div>

      <div className="newsletter-divider" aria-hidden="true" />

      {/* Right column: help + authenticity + language */}
      <div className="newsletter-right">
        <h4>NEED HELP?</h4>
        <p>
          For Any Enquiries Please Visit TO-K-YOU{" "}
          <span className="newsletter-link">Customer Care</span>
        </p>
        <h4>NOT SURE IF WE ARE AUTHENTIC?</h4>
        <p>
          For Any Enquiries Please Visit TO-K-YOU{" "}
          <span className="newsletter-link">
            Authentic Proof Of Identification
          </span>
        </p>
        <h4>LOCATION &amp; LANGUAGE</h4>
        <div className="newsletter-lang">
          <button
            type="button"
            className="newsletter-lang-toggle"
            onClick={() => setLangOpen((prev) => !prev)}
            aria-expanded={langOpen}
            aria-label="Location and language"
          >
            <span>🇬🇧</span>
            <span>English</span>
            <span className="chevron">▾</span>
          </button>
          {langOpen && (
            <div className="newsletter-lang-menu">
              <button type="button" aria-label="English">
                🇬🇧 English
              </button>
              <button type="button" aria-label="Dansk">
                🇩🇰 Dansk
              </button>
              <button type="button" aria-label="Svenska">
                🇸🇪 Svenska
              </button>
              <button type="button" aria-label="Français">
                🇫🇷 Français
              </button>
              <button type="button" aria-label="Deutsch">
                🇩🇪 Deutsch
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
