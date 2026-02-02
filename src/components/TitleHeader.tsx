import React from "react";
import type { TitleHeaderProps } from "../types";

const TitleHeader: React.FC<TitleHeaderProps> = ({ title, sub }) => {
  const trimmedSub = sub.trim();
  const subParts = trimmedSub.split(" ");
  const firstToken = subParts[0] ?? "";
  const hasIcon = /^\p{Extended_Pictographic}$/u.test(firstToken);
  const label = hasIcon ? subParts.slice(1).join(" ") : trimmedSub;

  return (
    <div className="section-header">
      <div className="section-badge">
        {hasIcon && (
          <span className="section-badge-icon" aria-hidden="true">
            {firstToken}
          </span>
        )}
        <span className="section-badge-text">{label}</span>
      </div>
      <h2>{title}</h2>
    </div>
  );
};

export default TitleHeader;
