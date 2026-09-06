import React from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Marble3D — the lab's mark as a slowly turning glass marble.
 * Everything is generated in code (no textures to fetch), and the whole
 * thing goes still when the visitor asks for reduced motion.
 */

const INK = "#560591";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/** Paints the swirl that lives inside the glass. */
function makeSwirlTexture() {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 512;
  const g = c.getContext("2d")!;

  const base = g.createLinearGradient(0, 0, 0, c.height);
  base.addColorStop(0, "#1d0134");
  base.addColorStop(0.4, "#3f0369");
  base.addColorStop(0.62, INK);
  base.addColorStop(1, "#170128");
  g.fillStyle = base;
  g.fillRect(0, 0, c.width, c.height);

  // Ribbons of lighter glass. Each is a sine wave across the full width so the
  // seam meets itself when the map wraps; the mesh is tilted later, which is
  // what turns these into the diagonal sweep of a real marble.
  const ribbons = [
    { y: 150, amp: 70, w: 58, color: "rgba(157,101,214,0.55)", freq: 1, blur: 26 },
    { y: 210, amp: 96, w: 9, color: "rgba(255,255,255,0.85)", freq: 1, blur: 10 },
    { y: 232, amp: 88, w: 3, color: "rgba(255,255,255,0.55)", freq: 1, blur: 4 },
    { y: 300, amp: 58, w: 40, color: "rgba(206,168,255,0.4)", freq: 2, blur: 22 },
    { y: 352, amp: 74, w: 6, color: "rgba(233,214,255,0.7)", freq: 2, blur: 8 },
    { y: 430, amp: 44, w: 30, color: "rgba(96,38,158,0.7)", freq: 1, blur: 18 },
  ];

  g.lineCap = "round";
  g.lineJoin = "round";
  for (const r of ribbons) {
    g.beginPath();
    for (let x = 0; x <= c.width; x += 6) {
      const y = r.y + Math.sin((x / c.width) * Math.PI * 2 * r.freq) * r.amp;
      if (x === 0) g.moveTo(x, y);
      else g.lineTo(x, y);
    }
    g.strokeStyle = r.color;
    g.lineWidth = r.w;
    g.shadowColor = r.color;
    g.shadowBlur = r.blur;
    g.stroke();
  }
  g.shadowBlur = 0;

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.anisotropy = 4;
  return tex;
}

function Marble({ still }: { still: boolean }) {
  const ref = React.useRef<THREE.Mesh>(null);
  const texture = React.useMemo(makeSwirlTexture, []);
  React.useEffect(() => () => texture.dispose(), [texture]);

  useFrame((state, delta) => {
    const m = ref.current;
    if (!m || still) return;
    m.rotation.y += delta * 0.22;
    const t = state.clock.elapsedTime;
    m.position.y = Math.sin(t * 0.55) * 0.07;
    m.rotation.x = -0.18 + Math.sin(t * 0.35) * 0.05;
  });

  // Tilting the sphere is what turns the texture's horizontal ribbons into the
  // diagonal sweep you see inside a glass marble.
  return (
    <mesh ref={ref} rotation={[-0.18, 0.6, 0.52]}>
      <sphereGeometry args={[1.35, 96, 96]} />
      <meshPhysicalMaterial
        map={texture}
        roughness={0.12}
        metalness={0}
        clearcoat={1}
        clearcoatRoughness={0.06}
        envMapIntensity={1.1}
        sheen={0.6}
        sheenRoughness={0.3}
        sheenColor="#d9beff"
      />
    </mesh>
  );
}

/**
 * A tiny procedural environment so the clearcoat has something to reflect —
 * cheaper and more predictable than fetching an HDR.
 */
function useProceduralEnvironment() {
  const { gl, scene } = useThree();

  React.useEffect(() => {
    const c = document.createElement("canvas");
    c.width = 256;
    c.height = 128;
    const g = c.getContext("2d")!;
    const sky = g.createLinearGradient(0, 0, 0, c.height);
    sky.addColorStop(0, "#ffffff");
    sky.addColorStop(0.35, "#d9c8f2");
    sky.addColorStop(0.68, "#4a1780");
    sky.addColorStop(1, "#120021");
    g.fillStyle = sky;
    g.fillRect(0, 0, c.width, c.height);
    // A bright window, so the sphere gets one crisp highlight.
    g.fillStyle = "rgba(255,255,255,0.95)";
    g.fillRect(150, 8, 54, 26);

    const tex = new THREE.CanvasTexture(c);
    tex.mapping = THREE.EquirectangularReflectionMapping;
    tex.colorSpace = THREE.SRGBColorSpace;

    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromEquirectangular(tex).texture;
    scene.environment = env;

    tex.dispose();
    pmrem.dispose();
    return () => {
      scene.environment = null;
      env.dispose();
    };
  }, [gl, scene]);

  return null;
}

function Scene({ still }: { still: boolean }) {
  useProceduralEnvironment();
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 4, 3]} intensity={2.2} color="#ffffff" />
      <pointLight position={[-3.2, -1.2, 2]} intensity={14} color="#b98bff" distance={12} />
      <pointLight position={[2, -2.5, -2.5]} intensity={10} color="#4b2bd6" distance={12} />
      <Marble still={still} />
    </>
  );
}

export default function Marble3D({ className = "" }: { className?: string }) {
  const reduced = usePrefersReducedMotion();

  return (
    <div className={className} aria-hidden="true">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 4.3], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene still={reduced} />
      </Canvas>
    </div>
  );
}
