// WornByYouSection
// Presentational gallery section that shows a horizontal strip of user-inspired
// looks. Static content; intended as a visual inspiration block.
export default function WornByYouSection() {
  return (
    <section className="worn-by">
      {/* Section header copy */}
      <div className="worn-by-header">
        <p className="worn-by-lead">Dare To Be Different?</p>
        <p className="worn-by-sub">
          Find Inspiration In Others To Become Utterly You
        </p>
        <a className="worn-by-link" href="#">
          See Others Awesome Outfits
        </a>
      </div>

      {/* Horizontal image strip */}
      <div className="worn-by-strip">
        <img
          src="https://i.pinimg.com/736x/b4/10/ba/b410ba685f6f1a08178fba1192ed492c.jpg"
          alt="Look 1"
        />
        <img
          src="https://i.pinimg.com/736x/84/0e/b4/840eb4db93837437233e37f5c3192ad5.jpg"
          alt="Look 2"
        />
        <img
          src="https://i.pinimg.com/1200x/59/e1/bc/59e1bc21fc6a7c87944cb1144d2236ea.jpg"
          alt="Look 3"
        />
        <img
          src="https://i.pinimg.com/1200x/44/dc/b1/44dcb1b8c480a41be8b24c9c0ad4244e.jpg"
          alt="Look 4"
        />
        <img
          src="https://i.pinimg.com/736x/29/98/65/29986551cd5b8a1a6a7cc8bba6e6d78d.jpg"
          alt="Look 5"
        />
        <h2 className="worn-by-title">WORN BY YOU</h2>
      </div>
    </section>
  );
}
