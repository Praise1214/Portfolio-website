import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, useTexture } from "@react-three/drei";
import * as THREE from "three";

const RotatingPhotoFrame: React.FC = () => {
  const frameRef = useRef<THREE.Group>(null);
  const frameMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  
  const [frontTexture, backTexture] = useTexture([
    "/images/profile-professional.jpg",
    "/images/profile-dev.png",
  ]);

  useEffect(() => {
    if (frontTexture) {
      frontTexture.colorSpace = THREE.SRGBColorSpace;
      frontTexture.needsUpdate = true;
    }
    if (backTexture) {
      backTexture.colorSpace = THREE.SRGBColorSpace;
      backTexture.needsUpdate = true;
    }
  }, [frontTexture, backTexture]);

  // Rotation + dynamic frame color
  useFrame(() => {
    if (frameRef.current && frameMaterialRef.current) {
      frameRef.current.rotation.y += 0.005;

      // Get rotation to determine which side is facing front
      const rotation = frameRef.current.rotation.y % (Math.PI * 2);
      const normalizedRotation = rotation < 0 ? rotation + Math.PI * 2 : rotation;
      
      // Front facing (professional): 0 to PI/2 and 3PI/2 to 2PI → Blue
      // Back facing (hacker): PI/2 to 3PI/2 → Green
      const isFrontFacing = normalizedRotation < Math.PI / 2 || normalizedRotation > (3 * Math.PI) / 2;
      
      const targetColor = isFrontFacing 
        ? new THREE.Color("#2563eb") // Blue for professional
        : new THREE.Color("#10b981"); // Green for hacker
      
      frameMaterialRef.current.color.lerp(targetColor, 0.05);
    }
  });

  const frameWidth = 3.2;
  const frameHeight = 4;
  const frameDepth = 0.12;
  const borderThickness = 0.15;

  return (
    <group ref={frameRef}>
      {/* Frame border */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[frameWidth + borderThickness, frameHeight + borderThickness, frameDepth]} />
        <meshStandardMaterial
          ref={frameMaterialRef}
          color="#2563eb"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Front photo - Professional */}
      <mesh position={[0, 0, frameDepth / 2 + 0.001]}>
        <planeGeometry args={[frameWidth, frameHeight]} />
        <meshBasicMaterial map={frontTexture} />
      </mesh>

      {/* Back photo - Hacker */}
      <mesh position={[0, 0, -frameDepth / 2 - 0.001]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[frameWidth, frameHeight]} />
        <meshBasicMaterial map={backTexture} />
      </mesh>
    </group>
  );
};

const PhotoFrameWithSuspense: React.FC = () => {
  return (
    <React.Suspense fallback={<LoadingPlaceholder />}>
      <RotatingPhotoFrame />
    </React.Suspense>
  );
};

const LoadingPlaceholder: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[3.2, 4, 0.12]} />
      <meshStandardMaterial color="#1f1f1f" />
    </mesh>
  );
};

const Scene: React.FC = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />
      
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} />
      <pointLight position={[3, 0, 3]} intensity={0.5} color="#2563eb" />
      <pointLight position={[-3, 0, -3]} intensity={0.5} color="#10b981" />

      <PhotoFrameWithSuspense />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.3}
      />
    </>
  );
};

const HeroExperience: React.FC = () => {
  const [canvasError, setCanvasError] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full h-full flex-center">
        <div className="text-6xl animate-pulse">⚡</div>
      </div>
    );
  }

  if (canvasError) {
    return (
      <div className="w-full h-full flex-center">
        <img 
          src="/images/profile-professional.jpg" 
          alt="Praise Daniels"
          className="w-48 h-60 object-cover rounded-xl border-2 border-primary shadow-2xl"
        />
      </div>
    );
  }

  return (
    <Canvas
      className="w-full h-full"
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
      dpr={[1, 2]}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0); // Fully transparent background
        gl.domElement.addEventListener("webglcontextlost", (e) => {
          e.preventDefault();
          setCanvasError(true);
        });
      }}
    >
      <Scene />
    </Canvas>
  );
};

export default HeroExperience;