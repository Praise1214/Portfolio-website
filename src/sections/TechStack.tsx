
import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import TitleHeader from "../components/TitleHeader";
import ErrorBoundary from "../components/ErrorBoundary";
import TechIconCardExperience from "../components/models/tech_logos/TechIconCardExperience";
import type { TechStackIcon } from "../types";
 
gsap.registerPlugin(ScrollTrigger);
 
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
  useGSAP(() => {
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
 
  return (
    <section
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
                  <ErrorBoundary
                    fallback={
                      <div className="w-full h-full flex-center">
                        <div className="text-4xl">⚡</div>
                      </div>
                    }
                  >
                    <TechIconCardExperience model={icon} />
                  </ErrorBoundary>
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
