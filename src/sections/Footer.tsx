import React from "react";
import { socialImgs, profileInfo } from "../constants";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container ml-1">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-base font-bold whitespace-nowrap">
            <span>Terms &  Conditions</span>
            <span className="text-primary"></span>
          </span>
        </div>

        {/* Social Links */}
        <div className="socials ml-100">
          {socialImgs.map((social) => (
            <a
              key={social.name}
              href={social.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="icon"
              aria-label={`${social.name} profile`}
            >
              <img src={social.imgPath} alt={social.name} />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="ml-auto w-full">
          <p className="copyright text-white text-base font-bold text-right">
            ©{currentYear} {profileInfo.name} . All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
