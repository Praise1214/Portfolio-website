import type { MouseEvent } from "react";

type ButtonProps = {
  text: string;
  className?: string;
  id?: string;
};

const Button = ({ text, className, id }: ButtonProps) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const target = document.getElementById("counter");

    // Only scroll if we found the section and an ID is passed in.
    // This prevents the contact button from scrolling to the top.
    if (target && id) {
      const offset = window.innerHeight * 0.15;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <a onClick={handleClick} className={`${className ?? ""} cta-wrapper`}>
      <div className="cta-button group mt-5">
        <div className="bg-circle" />
        <p className="text">{text}</p>
        <div className="arrow-wrapper">
          <img src="/images/arrow-down.svg" alt="arrow" />
        </div>
      </div>
    </a>
  );
};

export default Button;
