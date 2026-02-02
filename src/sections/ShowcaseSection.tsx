import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TitleHeader from "../components/TitleHeader";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "TranxCarbon",
    subtitle: "Carbon Credit Marketplace",
    description:
      "A digital platform for purchasing CO2 offsets and creating official carbon offset certificates.",
    image: "/images/project-tranxcarbon.png",
    tags: ["React", "Node.js", "PostgreSQL"],
    link: "https://www.tranxcarbon.com/",
  },
  {
    id: 2,
    title: "Velvet Pour",
    subtitle: "Cocktail Experience",
    description:
      "An elegant cocktail menu website with stunning visuals and smooth animations.",
    image: "/images/project-velvetpour.png",
    tags: ["React", "GSAP", "Tailwind"],
    link: "https://cocktail-gsap-landing.vercel.app/",
  },
  {
    id: 3,
    title: "Amazon Scraper",
    subtitle: "E-commerce Data Extraction",
    description:
      "Automated product data extraction tool for market research and price monitoring.",
    image: "/images/project-amazon.png",
    tags: ["Apify", "Node.js", "Automation"],
    link: "https://javascript-amazon-project-sage.vercel.app",
  },
  {
    id: 4,
    title: "Job Board",
    subtitle: "Career Platform",
    description:
      "A modern job listing platform connecting employers with talented candidates.",
    image: "/images/project-jobboard.png",
    tags: ["React", "TypeScript", "REST API"],
    link: "https://job-posting-website-429g.vercel.app/",
  },
];

const ShowcaseSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1 }
    );

    projectRefs.current.forEach((card, index) => {
      if (!card) return;

      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%"
          },
        }
      );
    });
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="section-padding relative overflow-hidden mt-10 md:mt-16 scroll-mt-24 md:scroll-mt-24"
    >
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1290px] mx-auto px-5 md:px-2">


        {/* Projects Grid - 2x2 */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-16">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => { projectRefs.current[index] = el }}
              className="group relative rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-500 bg-surface-light"
            >
              {/* Project Image */}
              <div className="relative h-[280px] md:h-[320px] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />

                {/* Glass Overlay - appears on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  {/* Subtitle */}
                  <span className="text-primary/200 text-sm font-medium mb-2">
                    {project.subtitle}
                  </span>

                  {/* Title */}
                  <h3
                    className="text-2xl font-bold text-white mb-2"
                    style={{ fontFamily: "Space Grotesk" }}
                  >
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/80 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary backdrop-blur-sm border border-primary/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Bar - Always visible */}
              <div className="p-4 flex items-center justify-between bg-surface-light border-t border-border">
                <div>
                  <h4
                    className="font-semibold text-white"
                    style={{ fontFamily: "Space Grotesk" }}
                  >
                    {project.title}
                  </h4>
                  <span className="text-xs text-text-secondary">
                    {project.subtitle}
                  </span>
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                  <svg
                    className="w-4 h-4 text-primary group-hover:text-surface transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View More Link */}
        <div className="mt-12 text-center">
          <a
            href="https://github.com/Praise1214"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary text-primary hover:bg-primary hover:text-surface transition-all duration-300"
          >
            <span>View more on GitHub</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
