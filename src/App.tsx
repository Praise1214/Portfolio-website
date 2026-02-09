import { lazy, Suspense, useEffect, useState } from "react";
import Navbar from "./components/NavBar";
import LoadingSpinner from "./components/LoadingSpinner";

// Lazy load ALL heavy sections — this lets React render the page shell
// immediately while Three.js + GSAP chunks download in parallel
const Hero = lazy(() => import("./sections/Hero"));
const ShowcaseSection = lazy(() => import("./sections/ShowcaseSection"));
const FeatureCards = lazy(() => import("./sections/FeatureCard"));
const Experience = lazy(() => import("./sections/Experience"));
const TechStack = lazy(() => import("./sections/TechStack"));
const Contact = lazy(() => import("./sections/Contact"));
const Footer = lazy(() => import("./sections/Footer"));

const App = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const dismiss = () => {
      const preloader = document.getElementById("preloader");
      if (preloader) {
        preloader.style.opacity = "0";
        preloader.style.visibility = "hidden";
        setTimeout(() => preloader.remove(), 500);
      }
      setReady(true);
    };

    const loaded = new Promise<void>((r) => {
      if (document.readyState === "complete") r();
      else window.addEventListener("load", () => r(), { once: true });
    });

    loaded.then(() => {
      if ((window as unknown as Record<string, () => void>).__preloaderDone) {
        (window as unknown as Record<string, () => void>).__preloaderDone();
      }
      setTimeout(dismiss, 600);
    });
  }, []);

  return (
    <div style={{ opacity: ready ? 1 : 0, transition: "opacity 0.4s ease" }}>
      <Navbar />
      <Suspense fallback={<LoadingSpinner />}>
        <Hero />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <ShowcaseSection />
      </Suspense>
      <Suspense fallback={null}>
        <FeatureCards />
      </Suspense>
      <Suspense fallback={null}>
        <Experience />
      </Suspense>
      <Suspense fallback={null}>
        <TechStack />
      </Suspense>
      <Suspense fallback={null}>
        <Contact />
      </Suspense>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default App;
