import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, RotateCw, Sparkles, Box, Layers } from 'lucide-react';

interface ThreeCanvasProps {
  className?: string;
  interactive?: boolean;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ className = '', interactive = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [wireframe, setWireframe] = useState(false);
  const [isRotating, setIsRotating] = useState(true);
  const [meshColor, setMeshColor] = useState<'blue' | 'cyan' | 'sapphire'>('blue');
  const [isHovered, setIsHovered] = useState(false);

  // References for Three.js instance
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshGroupRef = useRef<THREE.Group | null>(null);
  const materialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const lineSegmentsRef = useRef<THREE.LineSegments[]>([]);
  const isRotatingRef = useRef(isRotating);
  isRotatingRef.current = isRotating;

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 7.5);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0x0B1F44, 2.5);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0x00C6FF, 3.5);
    mainLight.position.set(5, 8, 5);
    scene.add(mainLight);

    const backLight = new THREE.DirectionalLight(0x2E7DFF, 4.0);
    backLight.position.set(-6, -4, -4);
    scene.add(backLight);

    const pointLight = new THREE.PointLight(0x00E5FF, 2, 20);
    pointLight.position.set(0, 1, 4);
    scene.add(pointLight);

    // 5. 3D Model Group (Faceted Stylized V Polyhedron)
    const group = new THREE.Group();
    meshGroupRef.current = group;
    scene.add(group);

    materialsRef.current = [];
    lineSegmentsRef.current = [];

    // Create high-tech faceted crystal "V" using 2 angled prism extrusions
    const createPrism = (points: [number, number][], depth: number, rotationZ: number, positionX: number, positionY: number) => {
      const shape = new THREE.Shape();
      points.forEach(([x, y], idx) => {
        if (idx === 0) shape.moveTo(x, y);
        else shape.lineTo(x, y);
      });
      shape.closePath();

      const extrudeSettings = {
        steps: 1,
        depth: depth,
        bevelEnabled: true,
        bevelThickness: 0.25,
        bevelSize: 0.18,
        bevelOffset: 0,
        bevelSegments: 2,
      };

      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geometry.center();

      // Modern metallic faceted crystal material
      const mat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(0x2E7DFF),
        emissive: new THREE.Color(0x0B1F44),
        emissiveIntensity: 0.35,
        metalness: 0.75,
        roughness: 0.15,
        clearcoat: 0.9,
        clearcoatRoughness: 0.1,
        reflectivity: 0.9,
        wireframe: false,
      });
      materialsRef.current.push(mat);

      const mesh = new THREE.Mesh(geometry, mat);
      mesh.rotation.z = rotationZ;
      mesh.position.set(positionX, positionY, 0);
      group.add(mesh);

      // Add glowing neon wireframe edges
      const edges = new THREE.EdgesGeometry(geometry);
      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x00C6FF,
        transparent: true,
        opacity: 0.7,
        linewidth: 1.5,
      });
      const wire = new THREE.LineSegments(edges, lineMaterial);
      wire.rotation.z = rotationZ;
      wire.position.set(positionX, positionY, 0);
      group.add(wire);
      lineSegmentsRef.current.push(wire);

      return mesh;
    };

    // Left Arm of the V (Polygonal faceted prism)
    const leftArmPts: [number, number][] = [
      [-0.45, 1.8],
      [0.45, 1.8],
      [0.35, -1.2],
      [-0.35, -1.2]
    ];
    createPrism(leftArmPts, 0.6, 0.45, -0.9, 0.1);

    // Right Arm of the V
    const rightArmPts: [number, number][] = [
      [-0.45, 1.8],
      [0.45, 1.8],
      [0.35, -1.2],
      [-0.35, -1.2]
    ];
    createPrism(rightArmPts, 0.6, -0.45, 0.9, 0.1);

    // Central apex crystal
    const apexPts: [number, number][] = [
      [-0.5, 0.3],
      [0.5, 0.3],
      [0.0, -1.1],
    ];
    createPrism(apexPts, 0.7, 0, 0, -1.1);

    // Floating Particles / 3D Grid coordinate points
    const particleCount = 220;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 14;
      particlePositions[i + 1] = (Math.random() - 0.5) * 10;
      particlePositions[i + 2] = (Math.random() - 0.5) * 8;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00C6FF,
      size: 0.055,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Coordinate grid helper at base
    const gridHelper = new THREE.GridHelper(12, 24, 0x2E7DFF, 0x0B1F44);
    gridHelper.position.y = -2.8;
    scene.add(gridHelper);

    // Interaction handling (Drag to rotate)
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      group.rotation.y += deltaX * 0.008;
      group.rotation.x += deltaY * 0.008;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch support
    let touchStartX = 0;
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - touchStartX;
        const deltaY = e.touches[0].clientY - touchStartY;
        group.rotation.y += deltaX * 0.008;
        group.rotation.x += deltaY * 0.008;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };
    domElement.addEventListener('touchstart', onTouchStart, { passive: true });
    domElement.addEventListener('touchmove', onTouchMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Render loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Auto rotation
      if (isRotatingRef.current && !isDragging) {
        group.rotation.y += 0.006;
        group.position.y = Math.sin(elapsedTime * 1.5) * 0.12;
      }

      particles.rotation.y = elapsedTime * 0.03;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElement.removeEventListener('touchstart', onTouchStart);
      domElement.removeEventListener('touchmove', onTouchMove);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update wireframe state
  useEffect(() => {
    materialsRef.current.forEach((mat) => {
      mat.wireframe = wireframe;
    });
    lineSegmentsRef.current.forEach((lines) => {
      lines.visible = !wireframe;
    });
  }, [wireframe]);

  // Update color palette
  useEffect(() => {
    let mainColor = 0x2E7DFF;
    let emissiveColor = 0x0B1F44;

    if (meshColor === 'cyan') {
      mainColor = 0x00C6FF;
      emissiveColor = 0x004566;
    } else if (meshColor === 'sapphire') {
      mainColor = 0x1A4FD8;
      emissiveColor = 0x051336;
    }

    materialsRef.current.forEach((mat) => {
      mat.color.setHex(mainColor);
      mat.emissive.setHex(emissiveColor);
    });
  }, [meshColor]);

  return (
    <div
      className={`relative w-full h-full min-h-[340px] sm:min-h-[440px] rounded-3xl overflow-hidden glass-card border border-[#2E7DFF]/30 select-none shadow-[0_0_50px_rgba(11,31,68,0.7)] ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D WebGL Canvas Target */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing touch-pan-y" />

      {/* Top Overlay Badges */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-wrap gap-2 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-[#0B1F44]/90 border border-[#2E7DFF]/40 text-[#00C6FF] backdrop-blur-md shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[#00C6FF] animate-pulse" />
          WebGL 3D Canlı Motor
        </span>
        <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#0A0A0A]/80 border border-white/10 text-[#C4C8D0]">
          Hassasiyet: 0.01 mm
        </span>
      </div>

      {/* Quick Interactive Tooltip */}
      <div
        className={`absolute top-3 right-3 sm:top-4 sm:right-4 text-[10px] sm:text-xs bg-[#0B1F44]/85 backdrop-blur-md border border-[#2E7DFF]/30 px-2 sm:px-3 py-1 rounded-lg text-white/80 transition-opacity duration-300 pointer-events-none ${
          isHovered ? 'opacity-100' : 'opacity-70'
        }`}
      >
        <span className="text-[#00C6FF]">3D Döndür</span>
      </div>

      {/* Bottom Interactive Controls Panel */}
      {interactive && (
        <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between gap-1.5 sm:gap-2 p-2 sm:p-2.5 rounded-2xl bg-[#0A0A0A]/90 backdrop-blur-xl border border-[#2E7DFF]/25 shadow-2xl">
          {/* Wireframe / Solid Mode */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            <button
              onClick={() => setWireframe(!wireframe)}
              className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-medium transition-all cursor-pointer ${
                wireframe
                  ? 'bg-[#00C6FF] text-[#0A0A0A] font-bold shadow-[0_0_15px_rgba(0,198,255,0.6)]'
                  : 'bg-[#0B1F44]/80 text-[#C4C8D0] hover:text-white hover:bg-[#0B1F44]'
              }`}
              title="Tel Kafes / Katı Model Modu"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{wireframe ? 'Kafes' : 'Katı'}</span>
            </button>

            {/* Auto-rotation Toggle */}
            <button
              onClick={() => setIsRotating(!isRotating)}
              className={`p-1.5 rounded-xl text-[11px] sm:text-xs font-medium transition-all cursor-pointer ${
                isRotating
                  ? 'bg-[#2E7DFF]/20 text-[#00C6FF] border border-[#2E7DFF]/40'
                  : 'bg-[#0B1F44]/80 text-[#C4C8D0] hover:text-white'
              }`}
              title="Otomatik Dönüş"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin [animation-duration:8s]' : ''}`} />
            </button>
          </div>

          {/* Color Switcher */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-[10px] text-[#C4C8D0] hidden md:inline uppercase tracking-wider font-semibold">
              Materyal:
            </span>
            <button
              onClick={() => setMeshColor('blue')}
              className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#2E7DFF] transition-all border-2 cursor-pointer ${
                meshColor === 'blue' ? 'border-white scale-110 shadow-[0_0_10px_#2E7DFF]' : 'border-transparent opacity-70 hover:opacity-100'
              }`}
              title="Ana Mavi (#2E7DFF)"
            />
            <button
              onClick={() => setMeshColor('cyan')}
              className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#00C6FF] transition-all border-2 cursor-pointer ${
                meshColor === 'cyan' ? 'border-white scale-110 shadow-[0_0_10px_#00C6FF]' : 'border-transparent opacity-70 hover:opacity-100'
              }`}
              title="Açık Neon Mavi (#00C6FF)"
            />
            <button
              onClick={() => setMeshColor('sapphire')}
              className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#0B1F44] transition-all border-2 cursor-pointer ${
                meshColor === 'sapphire' ? 'border-white scale-110 shadow-[0_0_10px_#0B1F44]' : 'border-transparent opacity-70 hover:opacity-100'
              }`}
              title="Koyu Safir Lacivert (#0B1F44)"
            />
          </div>
        </div>
      )}
    </div>
  );
};
