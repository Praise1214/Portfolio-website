import React from "react";
import type { TitleHeaderProps } from "../types";

const TitleHeader: React.FC<TitleHeaderProps> = ({ title, sub }) => {
  return (
    <div className="section-header">
      <div className="section-badge">
        <span className="w-2 h-2 bg-primary rounded-full" />
        <span>{sub}</span>
      </div>
      <h2>{title}</h2>
    </div>
  );
};

export default TitleHeader;