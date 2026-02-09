import { lazy, Suspense, useEffect, useState } from "react";
import Hero from "./sections/Hero";
import Navbar from "./components/NavBar";
import LoadingSpinner from "./components/LoadingSpinner";
import FeatureCards from "./sections/FeatureCard";
import Experience from "./sections/Experience";
import TechStack from "./sections/TechStack";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
// Lazy load sections for better performance
const ShowcaseSection = lazy(() => import("./sections/ShowcaseSection"));

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
      // Signal the preloader script to go to 100%
      if ((window as unknown as Record<string, () => void>).__preloaderDone) {
        (window as unknown as Record<string, () => void>).__preloaderDone();
      }
      // Wait for bar animation to finish before dismissing
      setTimeout(dismiss, 600);
    });
  }, []);

  return (
    <div style={{ opacity: ready ? 1 : 0, transition: "opacity 0.4s ease" }}>
      <Navbar />
      <Hero />
      <Suspense fallback={<LoadingSpinner />}>
        <ShowcaseSection />
        <FeatureCards />
        <Experience />
        <TechStack />
        <Contact />
        <Footer />
      </Suspense>
    </div>
  );
};

export default App;
