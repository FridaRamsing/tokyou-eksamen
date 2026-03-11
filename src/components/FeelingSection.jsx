
import { useEffect, useRef, useState } from "react";

export default function FeelingSection() {
  const moods = [
    {
      title: "FEELING ELEGANT",
      img: "https://i.pinimg.com/1200x/0f/37/ef/0f37ef276aee93a476ae4bbd79b6ccf2.jpg",
    },
    {
      title: "FEELING JOYFUL",
      img: "https://i.pinimg.com/736x/ed/fa/11/edfa11b18ae6997618c0f630c887571c.jpg",
    },
    {
      title: "FEELING FREE",
      img: "https://i.pinimg.com/736x/62/0d/e6/620de611e1cafbdfa7ec8f4fb9d40393.jpg",
    },
    {
      title: "FEELING EMPOWERED",
      img: "https://i.pinimg.com/736x/1c/e1/05/1ce105eb46064cb6fd9ca8ee9e64debc.jpg",
    },
    {
      title: "FEELING COOL",
      img: "https://i.pinimg.com/736x/03/6b/02/036b0253bc147c0f2f112ed058df999c.jpg",
    },
    {
      title: "FEELING BOLD",
      img: "https://i.pinimg.com/736x/83/12/99/8312991febd02fd572cb7a95e1c3903c.jpg",
    },
    {
      title: "FEELING CALM",
      img: "https://i.pinimg.com/736x/ca/58/ea/ca58ea72bd1f7dfe1cd83a37f71195d0.jpg",
    },
  ];

  const sectionRef = useRef(null);
  const [metrics, setMetrics] = useState({
    cardWidth: 222,
    gap: 16,
    viewportWidth: 1174,
    progressWidth: 640,
    barWidth: 128,
    visibleCount: 5,
  });
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const readMetrics = () => {
      if (!sectionRef.current) return;
      const styles = getComputedStyle(sectionRef.current);
      const getVar = (name, fallback) => {
        const raw = styles.getPropertyValue(name).trim();
        if (!raw || raw.endsWith("%")) return fallback;
        const value = parseFloat(raw);
        return Number.isFinite(value) ? value : fallback;
      };

      const cardWidth = getVar("--card-width", 222);
      const gap = getVar("--card-gap", 16);
      const viewportWidth =
        getVar("--viewport-width", sectionRef.current.clientWidth) ||
        sectionRef.current.clientWidth;
      const progressWidth = getVar("--progress-width", 640);
      const barWidth = getVar("--bar-width", 128);
      const visibleCount = Math.max(
        1,
        Math.floor((viewportWidth + gap) / (cardWidth + gap))
      );

      setMetrics({
        cardWidth,
        gap,
        viewportWidth,
        progressWidth,
        barWidth,
        visibleCount,
      });
    };

    readMetrics();
    window.addEventListener("resize", readMetrics);
    return () => window.removeEventListener("resize", readMetrics);
  }, []);

  const maxIndex = Math.max(0, moods.length - metrics.visibleCount);

  const clampedIndex = Math.min(index, maxIndex);

  const translateX = clampedIndex * (metrics.cardWidth + metrics.gap);
  const progress = maxIndex === 0 ? 0 : clampedIndex / maxIndex;

  return (
    <section className="feeling" ref={sectionRef}>
      <div className="feeling-viewport">
        <div
          className="feeling-track"
          style={{ transform: `translateX(-${translateX}px)` }}
        >
          {moods.map((mood) => (
            <article key={mood.title} className="feeling-card">
              {mood.img ? (
                <img src={mood.img} alt={mood.title} />
              ) : (
                <div className="feeling-placeholder" />
              )}
              <h3>{mood.title}</h3>
            </article>
          ))}
        </div>
      </div>

      <div className="feeling-progress" aria-hidden="true">
        <span
          className="feeling-progress-bar"
          style={{
            transform: `translateX(${
              progress * (metrics.progressWidth - metrics.barWidth)
            }px)`,
          }}
        />
      </div>

      <button
        className="arrow left"
        aria-label="Previous"
        onClick={() =>
          setIndex((prev) => {
            const safe = Math.min(prev, maxIndex);
            return Math.max(0, safe - 1);
          })
        }
        disabled={clampedIndex === 0}
      >
        <span className="arrow-icon">←</span>
      </button>

      <button
        className="arrow right"
        aria-label="Next"
        onClick={() =>
          setIndex((prev) => {
            const safe = Math.min(prev, maxIndex);
            return Math.min(maxIndex, safe + 1);
          })
        }
        disabled={clampedIndex === maxIndex}
      >
        <span className="arrow-icon">→</span>
      </button>
    </section>
  );
}
