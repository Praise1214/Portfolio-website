import { lazy, Suspense } from "react";
import Hero from "./sections/Hero";
import Navbar from "./components/NavBar";
import LoadingSpinner from "./components/LoadingSpinner";
import FeatureCards from "./sections/FeatureCard";
// Lazy load sections for better performance
const ShowcaseSection = lazy(() => import("./sections/ShowcaseSection"));
const App = () => {
  return (
    <>
    <Navbar />
    <Hero />
    <Suspense fallback = {<LoadingSpinner />}>
      <ShowcaseSection />
      <FeatureCards />
    </Suspense>
    </>
  );
};

export default App;
