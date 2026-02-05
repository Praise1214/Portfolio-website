import React, { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CounterItemProps {
  value: number;
  suffix: string;
  label: string;
  index: number;
}

const CounterItem: React.FC<CounterItemProps> = ({ value, suffix, label, index }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const itemRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!itemRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          // Staggered start based on index
          setTimeout(() => {
            const duration = 2000;
            const startTime = Date.now();

            const animate = () => {
              const elapsed = Date.now() - startTime;
              const progress = Math.min(elapsed / duration, 1);

              // Ease out cubic
              const easeOut = 1 - Math.pow(1 - progress, 3);
              const current = Math.floor(easeOut * value);

              setDisplayValue(current);

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setDisplayValue(value);
              }
            };

            requestAnimationFrame(animate);
          }, index * 150);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(itemRef.current);
    return () => observer.disconnect();
  }, [value, index]);

  return (
    <div
      ref={itemRef}
      className="group relative p-3 sm:p-5 md:p-8 min-h-[120px] sm:min-h-[140px] rounded-2xl bg-surface-light/50 border border-border hover:border-primary/50 transition-all duration-500 overflow-hidden"
    >
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-baseline">
          <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient">
            {displayValue}
          </span>
          <span className="text-2xl sm:text-3xl md:text-5xl font-bold text-primary">
            {suffix}
          </span>
        </div>
        <p className="text-text-secondary text-xs sm:text-sm md:text-lg mt-2 sm:mt-3 leading-tight">
          {label}
        </p>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-blue-500 
                      w-0 group-hover:w-full transition-all duration-500" />
    </div>
  );
};

const AnimatedCounter: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const counterItems = [
    { value: 6, suffix: "+", label: "Years Experience" },
    { value: 20, suffix: "+", label: "Projects Completed" },
    { value: 10, suffix: "+", label: "Technologies" },
    { value: 100, suffix: "%", label: "Dedication" },
  ];

  useGSAP(() => {
    gsap.fromTo(
      ".counter-item",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      }
    );
  }, []);

  return (
    <div id="counter" ref={containerRef} className="w-full mt-12 md:mt-20 px-4 sm:px-5 md:px-30">
      <div className="w-full grid grid-cols-4 gap-3 sm:gap-5 md:gap-8">
        {counterItems.map((item, index) => (
          <div key={index} className="counter-item">
            <CounterItem
              value={item.value}
              suffix={item.suffix}
              label={item.label}
              index={index}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedCounter;
