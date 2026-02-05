export interface NavLink {
  name: string;
  link: string;
}

// Title Header Props
export interface TitleHeaderProps {
  title: string;
  sub: string;
}

// Tech Stack
export interface TechStackIcon {
  name: string;
  modelPath: string;
  scale: number;
  rotation: [number, number, number];
}

export interface SocialImg {
  name: string;
  imgPath: string;
  url?: string;
}