import { lazy, Suspense } from "react";

// Components
import Navbar from "./components/NavBar";
import Hero from "./sections/Hero";
import LoadingSpinner from "./components/LoadingSpinner";

// Lazy load sections for better performance
const ShowcaseSection = lazy(() => import("./sections/ShowcaseSection"));
const LogoShowcase = lazy(() => import("./sections/LogoShowcase"));
const FeatureCards = lazy(() => import("./sections/FeatureCards"));
const Experience = lazy(() => import("./sections/Experience"));
const TechStack = lazy(() => import("./sections/TechStack"));
const Testimonials = lazy(() => import("./sections/Testimonials"));
const Contact = lazy(() => import("./sections/Contact"));
const Footer = lazy(() => import("./sections/Footer"));

const App: React.FC = () => (
  <>
    <Navbar />
    <Hero />
    <Suspense fallback={<LoadingSpinner />}>
      <ShowcaseSection />
      <LogoShowcase />
      <FeatureCards />
      <Experience />
      <TechStack />
      <Testimonials />
      <Contact />
      <Footer />
    </Suspense>
  </>
);

export default App;
