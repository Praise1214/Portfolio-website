import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import type { TechStackIcon } from "../../../types";
 
// Tech logo URLs - using high quality SVGs/PNGs from CDN
const techLogoUrls: Record<string, string> = {
  react: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  typescript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  node: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  three: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg",
  git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  javascript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  nextjs: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
};
 
// Get the logo URL based on tech name
const getLogoUrl = (name: string): string => {
  const lowerName = name.toLowerCase();
 
  if (lowerName.includes("react")) return techLogoUrls.react;
  if (lowerName.includes("typescript")) return techLogoUrls.typescript;
  if (lowerName.includes("node") || lowerName.includes("backend")) return techLogoUrls.node;
  if (lowerName.includes("three") || lowerName.includes("interactive")) return techLogoUrls.three;
  if (lowerName.includes("git") || lowerName.includes("version")) return techLogoUrls.git;
  if (lowerName.includes("java") && !lowerName.includes("javascript")) return techLogoUrls.java;
  if (lowerName.includes("javascript")) return techLogoUrls.javascript;
  if (lowerName.includes("next")) return techLogoUrls.nextjs;
  if (lowerName.includes("python")) return techLogoUrls.python;
 
  return techLogoUrls.react; // fallback
};
 
// 3D Logo component that displays the actual logo as a texture on a plane
interface LogoMeshProps {
  url: string;
}

const LogoMesh: React.FC<LogoMeshProps> = ({ url }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
 
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.crossOrigin = "anonymous";
    loader.load(
      url,
      (loadedTexture) => {
        loadedTexture.minFilter = THREE.LinearFilter;
        loadedTexture.magFilter = THREE.LinearFilter;
        setTexture(loadedTexture);
      },
      undefined,
      (error) => {
        console.error("Error loading texture:", error);
      }
    );
  }, [url]);
 
  // Gentle rotation — invalidate to trigger render in demand mode
  useFrame(({ clock, invalidate }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.3;
      invalidate();
    }
  });
 
  if (!texture) {
    return (
      <mesh ref={meshRef}>
        <boxGeometry args={[1.5, 1.5, 0.1]} />
        <meshStandardMaterial color="#10b981" />
      </mesh>
    );
  }
 
  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2.5, 2.5]} />
      <meshBasicMaterial
        map={texture}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};
 
// Loading fallback with spinner
const LoadingFallback: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
 
  useFrame(({ clock, invalidate }) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = clock.getElapsedTime() * 2;
      invalidate();
    }
  });
 
  return (
    <mesh ref={meshRef}>
      <ringGeometry args={[0.5, 0.7, 32]} />
      <meshBasicMaterial color="#10b981" />
    </mesh>
  );
};
 
// Main 3D Tech Model
interface TechModelProps {
  name: string;
}
 
const TechModel: React.FC<TechModelProps> = ({ name }) => {
  const logoUrl = getLogoUrl(name);
 
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <LogoMesh url={logoUrl} />
    </Float>
  );
};
 
// Main component
interface TechIconCardExperienceProps {
  model: TechStackIcon;
}
 
const TechIconCardExperience: React.FC<TechIconCardExperienceProps> = ({ model }) => {
  const [canvasError, setCanvasError] = useState(false);
  const [isClient, setIsClient] = useState(false);
 
  useEffect(() => {
    setIsClient(true);
  }, []);
 
  if (!isClient) {
    return (
      <div className="w-full h-full flex-center">
        <div className="animate-pulse text-5xl">⚡</div>
      </div>
    );
  }
 
  if (canvasError) {
    return (
      <div className="w-full h-full flex-center">
        <div className="text-5xl">⚡</div>
      </div>
    );
  }
 
  return (
    <Canvas
      className="w-full h-full"
      camera={{ position: [0, 0, 4], fov: 50 }}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
        failIfMajorPerformanceCaveat: false,
      }}
      dpr={window.innerWidth < 768 ? 1 : [1, 1.5]}
      frameloop="demand"
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", (e) => {
          e.preventDefault();
          setCanvasError(true);
        });
      }}
    >
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />

      <Suspense fallback={<LoadingFallback />}>
        <TechModel name={model.name} />
      </Suspense>
    </Canvas>
  );
};
 
export default TechIconCardExperience;
