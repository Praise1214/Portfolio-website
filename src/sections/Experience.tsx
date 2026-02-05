import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TitleHeader from "../components/TitleHeader";
import GlowCard from "../components/Glowcard";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    id: 1,
    company: "TranxCarbon",
    role: "Product Lead",
    date: "Jan 2025 - Present",
    location: "Lagos, NG",
    logo: "/images/logo-tranxcarbon.jpg",
    imgPath: "/images/exp1.png",
    review:
      "Praise has been instrumental in building our carbon credit marketplace from the ground up. His technical expertise combined with product vision helped us launch Tranxcarbon 1.0 successfully. A true leader who delivers results.",
    responsibilities: [
      "Built and scaled Tranxcarbon's digital carbon credit marketplace (Tranxcarbon 1.0), ensuring reliability, performance, and user-centric design.",
      "Developed core features such as carbon credit trading, ESG dashboards, emissions tracking, and sustainability reporting tools.",
      "Defined and maintained TranXcarbon's product direction and roadmap, aligning business goals, climate impact, and registry standards.",
    ],
  },
  {
    id: 2,
    company: "Upkey",
    role: "FullStack Software Intern",
    date: "May 2022 - June 2023",
    location: "Remote",
    logo: "/images/logo-upkey.jpeg",
    imgPath: "/images/exp2.png",
    review:
      "During his internship, Praise demonstrated exceptional growth and technical ability. He quickly became a valuable contributor to our engineering team, consistently delivering quality code and collaborating effectively across teams.",
    responsibilities: [
      "Developed and maintained frontend features using JavaScript and React, contributing to user-facing components and platform functionality.",
      "Built and integrated backend endpoints using Express.js, supporting core application logic and API communication.",
      "Collaborated with cross-functional teams in an agile remote environment to implement new features and fix bugs.",
    ],
  },
  {
    id: 3,
    company: "Agrinect",
    role: "Product Lead",
    date: "Jan 2021 - Apr 2022",
    location: "Lagos, NG",
    logo: "/images/logo-agrinect.png",
    imgPath: "/images/exp3.png",
    review:
      "Praise's leadership was crucial in taking Agrinect from concept to a competition-winning product. His ability to coordinate teams and translate vision into features helped us secure 3rd place at OSVP and a $5,000 grant.",
    responsibilities: [
      "Led product strategy and end-to-end development of an agri-marketplace connecting farmers directly to buyers, improving market access and efficiency.",
      "Coordinated cross-functional teams to translate user needs into scalable product features and MVP execution.",
      "Played a key role in securing 3rd Place at Orange Social Venture Prize Africa & Middle East (OSVP), leading to a $5,000 grant.",
    ],
  },
];

const Experience = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Animate GlowCards from left
      gsap.utils.toArray<HTMLElement>(".timeline-card").forEach((card) => {
        gsap.from(card, {
          xPercent: -100,
          opacity: 0,
          transformOrigin: "left left",
          duration: 1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
          },
        });
      });

      // Get all experience items
      const expItems = gsap.utils.toArray<HTMLElement>(".exp-item");

      expItems.forEach((item) => {
        const circleBorder = item.querySelector<SVGCircleElement>(".logo-circle-border");
        const logoImage = item.querySelector<HTMLElement>(".logo-image");
        const line = item.querySelector<HTMLElement>(".timeline-line");
        const content = item.querySelector<HTMLElement>(".exp-content");

        // Get the circumference of the circle for stroke animation
        // Circle radius is 27 (54px diameter / 2), circumference = 2 * PI * r
        const circumference = 2 * Math.PI * 27;

        // Create a GSAP timeline with scroll-driven scrub
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            end: "center 40%",
            scrub: 0.3, // Smooth scrub for forward and backward
          },
        });

        // Phase 1: Build the logo circle (stroke draws in)
        if (circleBorder) {
          // Set initial state - circle border is invisible (stroke not drawn)
          gsap.set(circleBorder, {
            strokeDasharray: circumference,
            strokeDashoffset: circumference,
            opacity: 1,
          });

          // Animate stroke drawing (circle builds)
          tl.to(
            circleBorder,
            {
              strokeDashoffset: 0,
              duration: 0.4,
              ease: "power2.inOut",
            },
            0
          );
        }

        // Phase 2: Fade in the logo image after circle is partially built
        if (logoImage) {
          gsap.set(logoImage, { opacity: 0, scale: 0.8 });

          tl.to(
            logoImage,
            {
              opacity: 1,
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            },
            0.2 // Start after circle is 50% drawn
          );
        }

        // Phase 3: Grow the timeline line from the logo (all items have a line)
        if (line) {
          gsap.set(line, { scaleY: 0 });

          tl.to(
            line,
            {
              scaleY: 1,
              duration: 0.4,
              ease: "power2.out",
            },
            0.3 // Start after logo is mostly built
          );
        }

        // Content fade in (separate, not part of scrub timeline)
        if (content) {
          gsap.from(content, {
            opacity: 0,
            y: 20,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: content,
              start: "top 85%",
            },
          });
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="experience"
      className="pt-6 md:pt-10 pb-20 md:pb-28 px-5 md:px-10 xl:px-20"
    >
      <div className="max-w-7xl mx-auto" ref={containerRef}>
        <TitleHeader
          title="Professional Work Experience"
          sub="💼 My Career Overview"
        />

        <div className="experience-timeline mt-16 md:mt-24">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="exp-item">
                <div className="exp-card-wrapper">
                  {/* LEFT - GlowCard with Review and Image */}
                  <div className="w-full xl:w-5/12 order-2 xl:order-1">
                    <GlowCard card={exp} index={index}>
                      <div className="rounded-lg overflow-hidden">
                        <img
                          src={exp.imgPath}
                          alt={`${exp.company}`}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </GlowCard>
                </div>

                {/* RIGHT - Job Details with timeline */}
                <div className="w-full xl:w-7/12 flex gap-4 md:gap-6 order-1 xl:order-2">
                  {/* Timeline container - logo circle + line */}
                  <div className="timeline-container">
                    {/* Logo with SVG circle border for draw animation */}
                    <div className="timeline-logo">
                      {/* SVG circle border that will animate */}
                      <svg
                        className="logo-circle-svg"
                        width="56"
                        height="56"
                        viewBox="0 0 56 56"
                      >
                        <circle
                          className="logo-circle-border"
                          cx="28"
                          cy="28"
                          r="27"
                          fill="none"
                          stroke="var(--primary)"
                          strokeWidth="2"
                        />
                      </svg>
                      {/* Logo image */}
                      <div className="logo-image">
                        <img src={exp.logo} alt={`${exp.company} logo`} />
                      </div>
                    </div>

                    {/* Timeline line - all items have a line */}
                    <div className="timeline-line" />
                  </div>

                  {/* Content */}
                  <div className="exp-content">
                    <h1>{exp.role}</h1>
                    <p className="exp-date">
                      <span>🗓️</span>
                      <span>{exp.date}</span>
                      <span className="text-border">•</span>
                      <span>{exp.location}</span>
                    </p>
                    <p className="exp-responsibilities-label">Responsibilities</p>
                    <ul>
                      {exp.responsibilities.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
