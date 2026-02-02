import { useRef, ReactNode } from "react";

interface ExpCard {
  review: string;
  company?: string;
  imgPath?: string;
  logo?: string;
  [key: string]: unknown;
}

interface GlowCardProps {
  card: ExpCard;
  index: number;
  children: ReactNode;
}

const GlowCard = ({ card, index, children }: GlowCardProps) => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseMove =
    (idx: number) => (e: React.MouseEvent<HTMLDivElement>) => {
      const cardEl = cardRefs.current[idx];
      if (!cardEl) return;

      const rect = cardEl.getBoundingClientRect();
      const mouseX = e.clientX - rect.left - rect.width / 2;
      const mouseY = e.clientY - rect.top - rect.height / 2;

      let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
      angle = (angle + 360) % 360;

      cardEl.style.setProperty("--start", String(angle + 60));
    };

  return (
    <div
      ref={(el) => {
        cardRefs.current[index] = el;
      }}
      onMouseMove={handleMouseMove(index)}
      className="card timeline-card rounded-2xl p-6 md:p-8 bg-surface-light/50 backdrop-blur border border-border hover:border-primary/30 transition-all duration-500"
    >
      <div className="glow" />

      {/* Star Rating */}
      <div className="review-header">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }, (_, i) => (
            <svg
              key={i}
              className="w-4 h-4 md:w-5 md:h-5 text-primary"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>

      {/* Review Text */}
      <div className="mb-6">
        <p className="text-text-secondary text-sm md:text-base leading-relaxed">
          "{card.review}"
        </p>
      </div>

      {/* Children (Image) */}
      <div className="review-children">
        {children}
        {card.logo && (
          <div className="review-badge" aria-hidden="true">
            <img src={card.logo} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default GlowCard;
