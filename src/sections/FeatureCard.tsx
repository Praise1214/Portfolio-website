import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const abilities = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Quality Focus",
    desc: "Delivering high-quality results while maintaining attention to every detail.",
    metric: "100%",
    metricLabel: "Code Review Pass Rate",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: "Clear Communication",
    desc: "Keeping you updated at every step to ensure transparency and clarity.",
    metric: "24h",
    metricLabel: "Response Time",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "On-Time Delivery",
    desc: "Making sure projects are completed on schedule without compromising quality.",
    metric: "99%",
    metricLabel: "Delivery Rate",
  },
];

const FeatureCards = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      gsap.fromTo(
        card,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: index * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=50",
          },
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-20 px-5 md:px-3">
      <div className="max-w-7xl mx-auto ">

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {abilities.map((ability, index) => (
            <div
              key={ability.title}
              ref={(el) => { cardRefs.current[index] = el }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-full min-h-[220px] md:min-h-[260px] p-6 md:p-9 rounded-2xl bg-surface-light border border-border overflow-hidden transition-all duration-500 hover:border-primary/50 hover:-translate-y-2">
                
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Top section with icon and metric */}
                <div className="relative flex items-start justify-between mb-6">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-surface transition-all duration-300">
                    {ability.icon}
                  </div>
                  
                  {/* Metric */}
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gradient">
                      {ability.metric}
                    </div>
                    <div className="text-xs text-text-secondary">
                      {ability.metricLabel}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 
                    className="text-xl font-bold text-white mb-3"
                    style={{ fontFamily: "Space Grotesk" }}
                  >
                    {ability.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {ability.desc}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-blue-500 group-hover:w-full transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default FeatureCards;
