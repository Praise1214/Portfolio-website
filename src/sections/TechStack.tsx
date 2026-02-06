
import React, { lazy, Suspense, useEffect, useState } from "react";

import TitleHeader from "../components/TitleHeader";
import ErrorBoundary from "../components/ErrorBoundary";
import type { TechStackIcon } from "../types";
import { useInView } from "../hooks/useInView";
 
const TechIconCardExperience = lazy(
  () => import("../components/models/tech_logos/TechIconCardExperience")
);
 
const techStackIcons: TechStackIcon[] = [
  {
    name: "React Developer",
    modelPath: "/models/react_logo-transformed.glb",
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "TypeScript Developer",
    modelPath: "/models/typescript-transformed.glb",
    scale: 0.8,
    rotation: [0, 0, 0],
  },
  {
    name: "Java Developer",
    modelPath: "/models/java-transformed.glb",
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Backend Developer",
    modelPath: "/models/node-transformed.glb",
    scale: 5,
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    name: "Interactive Developer",
    modelPath: "/models/three.js-transformed.glb",
    scale: 0.05,
    rotation: [0, 0, 0],
  },
  {
    name: "Version Control",
    modelPath: "/models/git-svg-transformed.glb",
    scale: 0.05,
    rotation: [0, -Math.PI / 4, 0],
  },
];
 
const TechStack: React.FC = () => {
  const { ref, inView } = useInView<HTMLDivElement>("200px");
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!inView || hasAnimated) return;
    let isMounted = true;
    let ctx: { revert?: () => void } | null = null;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([gsapMod, scrollTriggerMod]) => {
        if (!isMounted) return;
        const gsap = gsapMod.default ?? gsapMod;
        const ScrollTrigger = scrollTriggerMod.ScrollTrigger ?? scrollTriggerMod.default;
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          gsap.fromTo(
            ".tech-card",
            {
              y: 50,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power2.inOut",
              stagger: 0.15,
              scrollTrigger: {
                trigger: "#skills",
                start: "top center",
              },
            }
          );
        });
        setHasAnimated(true);
      }
    );

    return () => {
      isMounted = false;
      ctx?.revert?.();
    };
  }, [hasAnimated, inView]);
 
  return (
    <section
      ref={ref}
      id="skills"
      className="flex-center section-padding mt-2 md:mt-12 mb-70"
      aria-label="Technical Skills"
    >
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="My Technical Skills & Expertise"
          sub="🤝 What I Bring to the Table"
        />
        <div className="tech-grid">
          {techStackIcons.map((icon) => (
            <div
              key={icon.name}
              className="card-border tech-card overflow-hidden group xl:rounded-full rounded-lg"
            >
              <div className="tech-card-animated-bg" />
              <div className="tech-card-content">
                <div className="tech-icon-wrapper">
                  {inView ? (
                    <ErrorBoundary
                      fallback={
                        <div className="w-full h-full flex-center">
                          <div className="text-4xl">⚡</div>
                        </div>
                      }
                    >
                      <Suspense fallback={null}>
                        <TechIconCardExperience model={icon} />
                      </Suspense>
                    </ErrorBoundary>
                  ) : (
                    <div className="w-full h-full flex-center">
                      <div className="text-4xl">⚡</div>
                    </div>
                  )}
                </div>
                <div className="padding-x w-full">
                  <p>{icon.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
 
export default TechStack;
