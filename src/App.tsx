import { lazy, Suspense } from "react";
import Hero from "./sections/Hero";
import Navbar from "./components/NavBar";
const App = () => {
  return (
    <>
    <Navbar />
    <Hero />
    </>
  );
};

export default App;
