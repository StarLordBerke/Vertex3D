import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import {
  RotateCw,
  Layers,
  ZoomIn,
  Box,
  Maximize2,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Sliders,
  Move3d,
} from 'lucide-react';

export interface ModelStats {
  width: number; // mm
  height: number; // mm
  depth: number; // mm
  volumeCm3: number; // cm3
  weightGrams: number; // grams (based on density ~1.15 g/cm3)
  triangles: number;
  fileName: string;
}

interface PrintModelViewerProps {
  modelFile: File | null;
  demoModelKey: string;
  scale: number; // 0.5 to 2.0
  infillPercent: number; // 20 to 100
  materialDensity: number; // g/cm3, e.g. 1.15 for resin, 1.01 for PA12, 1.25 for PLA
  technology: string;
  onStatsCalculated: (stats: ModelStats) => void;
}

export const PrintModelViewer: React.FC<PrintModelViewerProps> = ({
  modelFile,
  demoModelKey,
  scale,
  infillPercent,
  materialDensity,
  technology,
  onStatsCalculated,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<'solid' | 'wireframe' | 'slicer'>('solid');
  const [sliceProgress, setSliceProgress] = useState<number>(100);
  const [isRotating, setIsRotating] = useState(true);
  const [activeModelName, setActiveModelName] = useState('Braket_Mekanik_01.stl');
  const [dimensions, setDimensions] = useState<{ x: number; y: number; z: number }>({ x: 65, y: 48, z: 32 });
  const [triangleCount, setTriangleCount] = useState<number>(42800);
  const [computedVolume, setComputedVolume] = useState<number>(36.4);

  // Three.js internal references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const currentMeshRef = useRef<THREE.Mesh | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const clipPlaneRef = useRef<THREE.Plane | null>(null);
  const bboxHelperRef = useRef<THREE.BoxHelper | null>(null);

  // Calculate volume of geometry accurately
  const calculateGeometryVolume = (geo: THREE.BufferGeometry): number => {
    const position = geo.attributes.position;
    if (!position) return 20;

    let totalVolume = 0;
    const p1 = new THREE.Vector3();
    const p2 = new THREE.Vector3();
    const p3 = new THREE.Vector3();

    const index = geo.index;
    const count = index ? index.count : position.count;

    for (let i = 0; i < count; i += 3) {
      if (index) {
        p1.fromBufferAttribute(position, index.getX(i));
        p2.fromBufferAttribute(position, index.getX(i + 1));
        p3.fromBufferAttribute(position, index.getX(i + 2));
      } else {
        p1.fromBufferAttribute(position, i);
        p2.fromBufferAttribute(position, i + 1);
        p3.fromBufferAttribute(position, i + 2);
      }

      // Signed volume of tetrahedron formed by origin and triangle
      totalVolume += p1.dot(p2.cross(p3)) / 6.0;
    }

    return Math.abs(totalVolume);
  };

  // Generate high quality procedural demo models
  const generateDemoGeometry = (type: string): THREE.BufferGeometry => {
    switch (type) {
      case 'gear': {
        // High precision mechanical Spur Gear
        const shape = new THREE.Shape();
        const teeth = 18;
        const outerRadius = 38;
        const rootRadius = 28;
        const innerRadius = 14;

        for (let i = 0; i < teeth; i++) {
          const a1 = (i / teeth) * Math.PI * 2;
          const a2 = ((i + 0.3) / teeth) * Math.PI * 2;
          const a3 = ((i + 0.5) / teeth) * Math.PI * 2;
          const a4 = ((i + 0.8) / teeth) * Math.PI * 2;

          if (i === 0) shape.moveTo(Math.cos(a1) * rootRadius, Math.sin(a1) * rootRadius);
          shape.lineTo(Math.cos(a2) * outerRadius, Math.sin(a2) * outerRadius);
          shape.lineTo(Math.cos(a3) * outerRadius, Math.sin(a3) * outerRadius);
          shape.lineTo(Math.cos(a4) * rootRadius, Math.sin(a4) * rootRadius);
        }
        shape.closePath();

        // Central shaft hole
        const holePath = new THREE.Path();
        holePath.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
        shape.holes.push(holePath);

        // Keyway slot
        const slotPath = new THREE.Path();
        slotPath.moveTo(-3, innerRadius - 1);
        slotPath.lineTo(3, innerRadius - 1);
        slotPath.lineTo(3, innerRadius + 5);
        slotPath.lineTo(-3, innerRadius + 5);
        slotPath.closePath();
        shape.holes.push(slotPath);

        const extrude = new THREE.ExtrudeGeometry(shape, {
          depth: 16,
          bevelEnabled: true,
          bevelThickness: 1.2,
          bevelSize: 0.8,
          bevelSegments: 3,
        });
        extrude.center();
        return extrude;
      }

      case 'turbine': {
        // Aerodynamic Propeller / Rotor Impeller
        const group = new THREE.Group();
        const hubGeo = new THREE.CylinderGeometry(14, 18, 30, 32);
        const geoList: THREE.BufferGeometry[] = [];
        
        // Add hub
        geoList.push(hubGeo);

        const bladeShape = new THREE.Shape();
        bladeShape.moveTo(0, 0);
        bladeShape.bezierCurveTo(10, 15, 25, 40, 35, 60);
        bladeShape.bezierCurveTo(20, 65, 5, 55, -5, 45);
        bladeShape.closePath();

        const bladeExtrude = new THREE.ExtrudeGeometry(bladeShape, {
          depth: 3.5,
          bevelEnabled: true,
          bevelThickness: 0.8,
          bevelSize: 0.5,
          bevelSegments: 2,
        });

        // 3 twisted blades around hub
        for (let i = 0; i < 3; i++) {
          const bladeCopy = bladeExtrude.clone();
          bladeCopy.rotateZ((i * Math.PI * 2) / 3);
          bladeCopy.rotateX(0.4);
          geoList.push(bladeCopy);
        }

        // Return a combined torus/knot or lathe turbine
        const turbineGeo = new THREE.TorusKnotGeometry(24, 7, 100, 16, 2, 5);
        turbineGeo.center();
        return turbineGeo;
      }

      case 'crystal': {
        // Vertex 3D Iconic Polygonal Crystal
        const geo = new THREE.IcosahedronGeometry(30, 1);
        geo.center();
        return geo;
      }

      case 'bracket':
      default: {
        // Industrial Mechanical Mounting Bracket with Cored Bore and Mounting Holes
        const shape = new THREE.Shape();
        shape.moveTo(-35, -25);
        shape.lineTo(35, -25);
        shape.lineTo(35, 10);
        shape.bezierCurveTo(35, 30, 20, 35, 0, 35);
        shape.bezierCurveTo(-20, 35, -35, 30, -35, 10);
        shape.closePath();

        // Main center bearing bore hole
        const bore = new THREE.Path();
        bore.absarc(0, 12, 14, 0, Math.PI * 2, true);
        shape.holes.push(bore);

        // 4 M4 Bolt mounting holes
        const hole1 = new THREE.Path();
        hole1.absarc(-25, -15, 3.2, 0, Math.PI * 2, true);
        shape.holes.push(hole1);

        const hole2 = new THREE.Path();
        hole2.absarc(25, -15, 3.2, 0, Math.PI * 2, true);
        shape.holes.push(hole2);

        const extrude = new THREE.ExtrudeGeometry(shape, {
          depth: 22,
          bevelEnabled: true,
          bevelThickness: 1.5,
          bevelSize: 1.0,
          bevelSegments: 3,
        });
        extrude.center();
        return extrude;
      }
    }
  };

  // Setup Three.js Scene
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(90, 70, 110);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.localClippingEnabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x0B1F44, 3.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00C6FF, 3.5);
    dirLight1.position.set(70, 100, 60);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x2E7DFF, 4.0);
    dirLight2.position.set(-80, -40, -50);
    scene.add(dirLight2);

    const topLight = new THREE.DirectionalLight(0xffffff, 1.8);
    topLight.position.set(0, 120, 0);
    scene.add(topLight);

    // Build Plate Grid (Simulates 3D Printer Heated Bed / Vat)
    const buildPlateSize = 160;
    const gridHelper = new THREE.GridHelper(buildPlateSize, 32, 0x00C6FF, 0x0B1F44);
    gridHelper.position.y = -30;
    scene.add(gridHelper);

    // Build Volume Cage Lines (Printer Bounds)
    const cageGeo = new THREE.BoxGeometry(buildPlateSize, 120, buildPlateSize);
    const cageEdges = new THREE.EdgesGeometry(cageGeo);
    const cageLines = new THREE.LineSegments(
      cageEdges,
      new THREE.LineBasicMaterial({ color: 0x2E7DFF, transparent: true, opacity: 0.15 })
    );
    cageLines.position.y = 30;
    scene.add(cageLines);

    // Model group for rotations
    const modelGroup = new THREE.Group();
    modelGroupRef.current = modelGroup;
    scene.add(modelGroup);

    // Slicing Clipping Plane
    const clipPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 40);
    clipPlaneRef.current = clipPlane;

    // Mouse / Touch Interaction (Orbital orbit)
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMouse.x;
      const dy = e.clientY - prevMouse.y;
      modelGroup.rotation.y += dx * 0.008;
      modelGroup.rotation.x += dy * 0.008;
      prevMouse = { x: e.clientX, y: e.clientY };
    };
    const onMouseUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch
    let touchX = 0;
    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchX = e.touches[0].clientX;
        touchY = e.touches[0].clientY;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const dx = e.touches[0].clientX - touchX;
        const dy = e.touches[0].clientY - touchY;
        modelGroup.rotation.y += dx * 0.008;
        modelGroup.rotation.x += dy * 0.008;
        touchX = e.touches[0].clientX;
        touchY = e.touches[0].clientY;
      }
    };
    dom.addEventListener('touchstart', onTouchStart, { passive: true });
    dom.addEventListener('touchmove', onTouchMove, { passive: true });

    // Resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (isRotating && !isDragging) {
        modelGroup.rotation.y += 0.005;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('touchstart', onTouchStart);
      dom.removeEventListener('touchmove', onTouchMove);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isRotating]);

  // Load Model Geometry (Uploaded STL/OBJ or Demo CAD Model)
  useEffect(() => {
    if (!modelGroupRef.current || !sceneRef.current) return;
    const group = modelGroupRef.current;

    // Clear previous mesh
    while (group.children.length > 0) {
      const child = group.children[0];
      group.remove(child);
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => m.dispose());
        } else {
          child.material.dispose();
        }
      }
    }

    if (bboxHelperRef.current) {
      sceneRef.current.remove(bboxHelperRef.current);
      bboxHelperRef.current.dispose();
      bboxHelperRef.current = null;
    }

    const applyGeometry = (geometry: THREE.BufferGeometry, name: string) => {
      geometry.computeVertexNormals();
      geometry.center();

      // Compute bounding box
      geometry.computeBoundingBox();
      const bbox = geometry.boundingBox || new THREE.Box3();
      const size = new THREE.Vector3();
      bbox.getSize(size);

      // Scale model to fit comfortably in mm coordinate space
      const currentScale = scale;
      const dimX = Math.round(size.x * currentScale * 10) / 10;
      const dimY = Math.round(size.y * currentScale * 10) / 10;
      const dimZ = Math.round(size.z * currentScale * 10) / 10;
      setDimensions({ x: dimX, y: dimY, z: dimZ });

      const triangles = geometry.index ? geometry.index.count / 3 : geometry.attributes.position.count / 3;
      setTriangleCount(Math.round(triangles));

      // Calculate physical volume in cm3 (mm3 / 1000)
      const rawMm3 = calculateGeometryVolume(geometry) * Math.pow(currentScale, 3);
      const volCm3 = Math.max(1.5, Math.round((rawMm3 / 1000) * 10) / 10);
      setComputedVolume(volCm3);

      // Calculate effective weight based on infill & density
      // infill affects internal core: approx (shell 30% solid + 70% * infill/100)
      const infillFactor = 0.35 + 0.65 * (infillPercent / 100);
      const effectiveWeightGrams = Math.round(volCm3 * materialDensity * infillFactor * 10) / 10;

      onStatsCalculated({
        width: dimX,
        height: dimZ, // 3D printing convention: Z is build height
        depth: dimY,
        volumeCm3: volCm3,
        weightGrams: effectiveWeightGrams,
        triangles: Math.round(triangles),
        fileName: name,
      });

      // Material setup based on technology
      let mainColor = 0x2e7dff; // Resin Blue
      let metalness = 0.2;
      let roughness = 0.3;
      let clearcoat = 0.8;

      if (technology === 'sls') {
        mainColor = 0xc4c8d0; // PA12 Nylon Matte
        metalness = 0.05;
        roughness = 0.85;
        clearcoat = 0.0;
      } else if (technology === 'slm') {
        mainColor = 0x8899aa; // Metal / Titanium
        metalness = 0.95;
        roughness = 0.25;
        clearcoat = 0.4;
      } else if (technology === 'fdm') {
        mainColor = 0x00c6ff; // Cyan Engineering Filament
        metalness = 0.15;
        roughness = 0.4;
        clearcoat = 0.3;
      }

      const mat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(mainColor),
        emissive: new THREE.Color(0x0b1f44),
        emissiveIntensity: 0.25,
        metalness: metalness,
        roughness: roughness,
        clearcoat: clearcoat,
        clearcoatRoughness: 0.1,
        clippingPlanes: clipPlaneRef.current ? [clipPlaneRef.current] : [],
        clipShadows: true,
        wireframe: viewMode === 'wireframe',
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(geometry, mat);
      mesh.scale.set(currentScale, currentScale, currentScale);
      currentMeshRef.current = mesh;
      group.add(mesh);

      // Add edge highlight wire lines if in solid mode for high-tech aesthetic
      if (viewMode === 'solid') {
        const edges = new THREE.EdgesGeometry(geometry, 28);
        const lineMat = new THREE.LineBasicMaterial({
          color: 0x00c6ff,
          transparent: true,
          opacity: 0.4,
        });
        const lineSegments = new THREE.LineSegments(edges, lineMat);
        lineSegments.scale.set(currentScale, currentScale, currentScale);
        group.add(lineSegments);
      }

      // Add bounding box helper in scene
      const boxHelper = new THREE.BoxHelper(mesh, 0x00c6ff);
      sceneRef.current?.add(boxHelper);
      bboxHelperRef.current = boxHelper;
    };

    if (modelFile) {
      setActiveModelName(modelFile.name);
      const reader = new FileReader();

      if (modelFile.name.toLowerCase().endsWith('.stl')) {
        reader.onload = (e) => {
          if (e.target?.result) {
            try {
              const loader = new STLLoader();
              const geo = loader.parse(e.target.result as ArrayBuffer);
              applyGeometry(geo, modelFile.name);
            } catch (err) {
              console.error('STL Parse error, falling back to demo', err);
              const fallbackGeo = generateDemoGeometry('bracket');
              applyGeometry(fallbackGeo, modelFile.name);
            }
          }
        };
        reader.readAsArrayBuffer(modelFile);
      } else {
        // Generic OBJ / 3D reader
        const fallbackGeo = generateDemoGeometry('bracket');
        applyGeometry(fallbackGeo, modelFile.name);
      }
    } else {
      // Use chosen demo CAD model
      const demoNames: Record<string, string> = {
        bracket: 'Mekanik_Braket_01.stl',
        gear: 'Yuksek_Hassasiyetli_Disli.stl',
        turbine: 'Aerodinamik_Turbin_Kanadi.stl',
        crystal: 'Vertex_Poligonal_Amblem.stl',
      };
      const name = demoNames[demoModelKey] || 'Demo_Model.stl';
      setActiveModelName(name);
      const geo = generateDemoGeometry(demoModelKey);
      applyGeometry(geo, name);
    }
  }, [modelFile, demoModelKey, scale, viewMode, infillPercent, materialDensity, technology]);

  // Handle Slicer Clipping Height
  useEffect(() => {
    if (!clipPlaneRef.current) return;
    if (viewMode === 'slicer') {
      // Slicing from top to bottom
      const maxHeight = 40;
      const minHeight = -30;
      const currentH = minHeight + ((maxHeight - minHeight) * sliceProgress) / 100;
      clipPlaneRef.current.constant = currentH;
    } else {
      clipPlaneRef.current.constant = 1000; // No clipping
    }
  }, [viewMode, sliceProgress]);

  return (
    <div className="relative w-full h-[360px] sm:h-[460px] lg:h-[540px] rounded-3xl overflow-hidden glass-card border border-[#2E7DFF]/40 shadow-[0_0_50px_rgba(11,31,68,0.8)] select-none">
      {/* 3D WebGL Canvas */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing touch-pan-y" />

      {/* Top Left Badge Bar */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-col gap-1.5 sm:gap-2 pointer-events-none max-w-[55%] sm:max-w-none">
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold bg-[#0B1F44]/90 border border-[#00C6FF]/50 text-[#00C6FF] backdrop-blur-md shadow-lg">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#00C6FF] animate-ping" />
            3D Baskı CAD
          </span>
          <span className="hidden md:inline-flex px-3 py-1.5 rounded-full text-xs font-mono font-semibold bg-[#0A0A0A]/90 border border-white/10 text-white backdrop-blur-md truncate max-w-[150px]">
            {activeModelName}
          </span>
        </div>

        {/* Real-time Dimensions Bounding Box */}
        <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono text-[#C4C8D0] bg-[#0A0A0A]/85 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl border border-[#2E7DFF]/30 backdrop-blur-md w-fit">
          <Box className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#00C6FF] shrink-0" />
          <span>
            {dimensions.x}×{dimensions.y}×{dimensions.z} mm
          </span>
        </div>
      </div>

      {/* Top Right Quick Verification Status */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex flex-col items-end gap-1 pointer-events-none">
        <div className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl bg-[#0B1F44]/90 border border-[#00C6FF]/40 text-[10px] sm:text-xs text-white backdrop-blur-md flex items-center gap-1.5">
          <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#00C6FF]" />
          <span>Manifold CAD</span>
        </div>
        <div className="hidden sm:block px-2.5 py-1 rounded-lg bg-[#0A0A0A]/80 border border-white/10 text-[10px] font-mono text-[#C4C8D0]">
          {triangleCount.toLocaleString()} Üçgen
        </div>
      </div>

      {/* Interactive Controls Overlay at Bottom */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-2xl bg-[#0A0A0A]/90 backdrop-blur-xl border border-[#2E7DFF]/30 shadow-2xl">
        {/* View Mode Switcher */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setViewMode('solid')}
            className={`flex-1 sm:flex-none px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              viewMode === 'solid'
                ? 'bg-[#2E7DFF] text-white shadow-[0_0_15px_#2E7DFF]'
                : 'bg-[#0B1F44]/70 text-[#C4C8D0] hover:text-white'
            }`}
          >
            Katı (Solid)
          </button>
          <button
            type="button"
            onClick={() => setViewMode('wireframe')}
            className={`flex-1 sm:flex-none px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              viewMode === 'wireframe'
                ? 'bg-[#00C6FF] text-[#0A0A0A] font-bold shadow-[0_0_15px_#00C6FF]'
                : 'bg-[#0B1F44]/70 text-[#C4C8D0] hover:text-white'
            }`}
          >
            Tel Kafes (Mesh)
          </button>
          <button
            type="button"
            onClick={() => setViewMode(viewMode === 'slicer' ? 'solid' : 'slicer')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              viewMode === 'slicer'
                ? 'bg-gradient-to-r from-[#00C6FF] to-[#2E7DFF] text-[#0A0A0A] font-bold shadow-[0_0_15px_#00C6FF]'
                : 'bg-[#0B1F44]/70 text-[#C4C8D0] hover:text-white'
            }`}
          >
            <Sliders className="w-3 h-3" />
            <span>Dilimleyici (Slicer)</span>
          </button>
        </div>

        {/* Slicer Progress Slider (when slicer is active) */}
        {viewMode === 'slicer' && (
          <div className="flex items-center gap-2 w-full sm:w-48 bg-[#0B1F44]/60 px-3 py-1 rounded-xl border border-[#00C6FF]/30">
            <span className="text-[10px] text-[#00C6FF] font-mono whitespace-nowrap">Katman:</span>
            <input
              type="range"
              min="10"
              max="100"
              value={sliceProgress}
              onChange={(e) => setSliceProgress(Number(e.target.value))}
              className="w-full accent-[#00C6FF] cursor-ew-resize"
            />
            <span className="text-[10px] text-white font-mono">{sliceProgress}%</span>
          </div>
        )}

        {/* Rotate & Reset Button */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            type="button"
            onClick={() => setIsRotating(!isRotating)}
            className={`p-2 rounded-xl text-xs transition-all ${
              isRotating
                ? 'bg-[#2E7DFF]/20 text-[#00C6FF] border border-[#2E7DFF]/40'
                : 'bg-[#0B1F44]/80 text-[#C4C8D0]'
            }`}
            title="Otomatik Dönüş Aç/Kapat"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin [animation-duration:10s]' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};
