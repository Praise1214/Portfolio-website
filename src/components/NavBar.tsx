import { useState, useEffect, useCallback } from "react";
import { navLinks, profileInfo } from "../constants";

const Navbar = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50)
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>,
    link: string) => {
    e.preventDefault();
    const element = document.querySelector(link);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  }

  return (
    <header className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}>
      <div className="inner lg:ml-20">
        {/* Logo */}
        <a href="#hero" className="logo group">
          <span className="text-gradient">{profileInfo.name}</span>
          <span className="text-primary"></span>
        </a>

        {/*Desktop Navigation */}
        <nav className="desktop">
          <ul>
            {navLinks.map((item) => (
              <li key={item.name}>
                <a
                  href="item.link"
                  onClick={(e) => handleNavClick(e, item.link)}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>


        {/* CTA Button */}
        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, "#contact")}
          className="contact-btn"
        >
          <div className="inner">Get in Touch</div>
        </a>



        {/* Mobile menu button */}
        <button
          className="lg:hidden text-white p-2 hover:text-primary transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/*Mobile Menu */}

      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-surface/95 backdrop-blur-xl border-b border-border">
          <nav className="px-5 py-6">
            <ul className="flex flex-col gap-4">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.link}
                    onClick={(e) => handleNavClick(e, item.link)}
                    className="block py-2 text-text-secondary hover:text-primary transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
              <li className="pt-4 border-t border-border">
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "#contact")}
                  className="block py-3 px-6 bg-primary text-surface rounded-full text-center font-semibold"
                >
                  Get in Touch
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  )

}

export default Navbar;

