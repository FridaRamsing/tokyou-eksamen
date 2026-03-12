// FooterSection
// Static footer with links and legal notes. This component is fully presentational
// and intentionally simple so it can be reused across pages.
export default function FooterSection() {
  return (
    <footer className="site-footer">
      {/* Footer columns with links + payments */}
      <div className="footer-columns">
        <div className="footer-col">
          <h5>CUSTOMER CARE</h5>
          <a href="#">Track An Order</a>
          <a href="#">Create A Return</a>
          <a href="#">Contact Us</a>
          <a href="#">Exchanges &amp; Returns</a>
          <a href="#">Delivery</a>
          <a href="#">Payment</a>
          <a href="#">Terms &amp; Conditions</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Cookie Center</a>
          <a href="#">Cookie Policy</a>
        </div>

        <div className="footer-col">
          <h5>ABOUT US</h5>
          <a href="#">About TO-K-YOU</a>
          <a href="#">People &amp; Planet</a>
          <a href="#">TO-K-YOU Reviews</a>
          <a href="#">Advertising</a>
          <a href="#">Affiliates</a>
        </div>

        <div className="footer-col">
          <h5>TO-K-TO ACCEPTS</h5>
          <div className="payment-icons">
            <span>VISA</span>
            <span>MC</span>
            <span>AMEX</span>
            <span>PAYPAL</span>
            <span>APPLE PAY</span>
          </div>
          <div className="trustpilot-badge" aria-label="Trustpilot">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path
                d="M12 2l2.8 5.7 6.2.9-4.5 4.3 1.1 6.1L12 16.9 6.4 19l1.1-6.1L3 8.6l6.2-.9L12 2z"
                fill="currentColor"
              />
            </svg>
            <span>Trustpilot</span>
          </div>
        </div>
      </div>

      {/* Bottom legal notes */}
      <div className="footer-bottom">
        <p>©2026 TO-K-YOU | All Rights Reserved</p>
        <p>
          Notes: A Binding Agreement Has Only Been Entered Into Once We Have
          Confirmed Your Order.
        </p>
      </div>
    </footer>
  );
}
