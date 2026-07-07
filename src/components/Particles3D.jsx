import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ---------------------------------------------------------------------------
   Particles3D — the Three.js scene.
   A sphere of ~2,600 particles colored along the signature gradient
   (green → blue → violet), slowly rotating, with a faint inner wireframe
   icosahedron, two orbital rings, and a mouse-parallax camera.

   Props:
     count      — number of particles (default 2600)
     radius     — sphere radius (default 2.3)
     opacity    — overall strength (default 1)
     morphWords — optional list of words/symbols. When set, the sphere
                  periodically dissolves and re-forms as each word
                  (sphere → word → sphere → next word → …). Words are
                  rasterized to an offscreen canvas and sampled into the
                  same particle cloud, so the morph is a pure position lerp
                  with a mid-flight swirl.

   Engineering notes:
     • DPR capped at 2; renders only while on-screen (IntersectionObserver)
     • prefers-reduced-motion → renders ONE static frame, no loop, no morph
     • Disposes geometry, materials, and the renderer on unmount
--------------------------------------------------------------------------- */

/* Rasterize a word to an offscreen canvas and sample `count` particle
   positions from its filled pixels. Returns null if nothing was drawn. */
function sampleGlyph(text, count, spanX) {
  const W = 360, H = 180;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const font = (px) => `800 ${px}px -apple-system, 'Segoe UI', 'Manrope', sans-serif`;
  let fs = 150;
  ctx.font = font(fs);
  const tw = ctx.measureText(text).width;
  if (tw > W * 0.92) fs = (fs * W * 0.92) / tw;
  ctx.font = font(fs);
  ctx.fillText(text, W / 2, H / 2);

  const img = ctx.getImageData(0, 0, W, H).data;
  const pts = [];
  for (let y = 0; y < H; y += 2)
    for (let x = 0; x < W; x += 2)
      if (img[(y * W + x) * 4 + 3] > 120) pts.push(x, y);
  if (!pts.length) return null;

  const spanY = spanX * (H / W);
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const k = ((Math.random() * (pts.length / 2)) | 0) * 2;
    out[i * 3] = (pts[k] / W - 0.5) * spanX + (Math.random() - 0.5) * 0.02;
    out[i * 3 + 1] = (0.5 - pts[k + 1] / H) * spanY + (Math.random() - 0.5) * 0.02;
    out[i * 3 + 2] = (Math.random() - 0.5) * 0.35;
  }
  return out;
}

const easeInOutCubic = (p) =>
  p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
const wrapPi = (a) => Math.atan2(Math.sin(a), Math.cos(a));

export default function Particles3D({ count = 2600, radius = 2.3, opacity = 1, morphWords = null }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* --- renderer / scene / camera --- */
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.z = 5.4;

    /* --- gradient particle sphere --- */
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const cA = new THREE.Color("#30d158"); // green
    const cB = new THREE.Color("#46b7f5"); // blue
    const cC = new THREE.Color("#a06bfa"); // violet
    const tmp = new THREE.Color();

    const paintByX = (arr, j, xspan) => {
      const g = Math.min(Math.max((arr[j] / xspan + 1) / 2, 0), 1);
      if (g < 0.5) tmp.copy(cA).lerp(cB, g * 2);
      else tmp.copy(cB).lerp(cC, (g - 0.5) * 2);
      colors[j] = tmp.r;
      colors[j + 1] = tmp.g;
      colors[j + 2] = tmp.b;
    };

    for (let i = 0; i < count; i++) {
      // even-ish distribution on a sphere (golden spiral) + radial jitter
      const t = i / count;
      const phi = Math.acos(1 - 2 * t);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = radius * (0.92 + Math.random() * 0.16);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.cos(phi);
      const z = r * Math.sin(phi) * Math.sin(theta);
      positions.set([x, y, z], i * 3);
      paintByX(positions, i * 3, radius); // gradient sweep left → right
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.028,
      vertexColors: true,
      transparent: true,
      opacity: 0.85 * opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    /* --- faint inner wireframe --- */
    const wireGeo = new THREE.IcosahedronGeometry(radius * 0.52, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x8a8a92,
      wireframe: true,
      transparent: true,
      opacity: 0.1 * opacity,
    });
    const wire = new THREE.Mesh(wireGeo, wireMat);
    scene.add(wire);

    /* --- orbital rings (thin, additive, counter-rotating) --- */
    const ringGeo = new THREE.TorusGeometry(radius * 1.28, 0.0045, 8, 160);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x46b7f5,
      transparent: true,
      opacity: 0.22 * opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const ring1 = new THREE.Mesh(ringGeo, ring1Mat);
    ring1.rotation.set(Math.PI / 2.15, 0.4, 0);
    scene.add(ring1);

    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xa06bfa,
      transparent: true,
      opacity: 0.16 * opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const ring2 = new THREE.Mesh(ringGeo, ring2Mat);
    ring2.rotation.set(Math.PI / 1.85, -0.55, 0);
    scene.add(ring2);

    /* --- word-morph setup --- */
    const glyphSpanX = radius * 2.7;
    const glyphs = !reduced && morphWords?.length
      ? morphWords.map((w) => sampleGlyph(w, count, glyphSpanX)).filter(Boolean)
      : null;
    const basePos = positions.slice();
    // random outward swirl, strongest mid-morph so the cloud "bursts" in transit
    const swirl = new Float32Array(count * 3);
    for (let i = 0; i < swirl.length; i++) swirl[i] = (Math.random() - 0.5) * 0.7;

    const DUR = { sphere: 5, in: 1.6, hold: 3.4, out: 1.6 };
    let phase = "sphere";
    let phaseT = -2.5; // linger a bit longer before the very first morph
    let glyphIdx = 0;
    let dirty = false;

    /* --- interaction / loop --- */
    const mouse = { x: 0, y: 0 };
    const onMouse = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    // scroll adds angular velocity to the sphere, decaying each frame
    let spinVel = 0;
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      spinVel = Math.max(-0.03, Math.min(0.03, spinVel + (y - lastY) * 0.00009));
      lastY = y;
    };

    let raf = 0;
    let running = true;
    const clock = new THREE.Clock();
    let tPrev = 0;
    let rotY = 0;

    const renderFrame = () => {
      const t = clock.getElapsedTime();
      const dt = Math.min(Math.max(t - tPrev, 0), 0.05);
      tPrev = t;

      /* morph state machine */
      let morphW = 0;
      if (glyphs?.length) {
        phaseT += dt;
        if (phase === "sphere" && phaseT > DUR.sphere) { phase = "in"; phaseT = 0; }
        else if (phase === "in" && phaseT > DUR.in) { phase = "hold"; phaseT = 0; }
        else if (phase === "hold" && phaseT > DUR.hold) { phase = "out"; phaseT = 0; }
        else if (phase === "out" && phaseT > DUR.out) {
          phase = "sphere"; phaseT = 0;
          glyphIdx = (glyphIdx + 1) % glyphs.length;
        }
        morphW =
          phase === "in" ? phaseT / DUR.in :
          phase === "hold" ? 1 :
          phase === "out" ? 1 - phaseT / DUR.out : 0;

        const e = easeInOutCubic(morphW);
        if (e > 0 || dirty) {
          const tgt = glyphs[glyphIdx];
          const arr = geo.attributes.position.array;
          const bulge = Math.sin(Math.PI * e); // peaks mid-transit
          const xspan = radius + (glyphSpanX / 2 - radius) * e;
          for (let i = 0; i < count; i++) {
            const j = i * 3;
            arr[j] = basePos[j] + (tgt[j] - basePos[j]) * e + swirl[j] * bulge;
            arr[j + 1] = basePos[j + 1] + (tgt[j + 1] - basePos[j + 1]) * e + swirl[j + 1] * bulge;
            arr[j + 2] = basePos[j + 2] + (tgt[j + 2] - basePos[j + 2]) * e + swirl[j + 2] * bulge;
            paintByX(arr, j, xspan); // gradient tracks the moving cloud
          }
          geo.attributes.position.needsUpdate = true;
          geo.attributes.color.needsUpdate = true;
          dirty = e > 0;
        }
      }

      /* rotation: normal spin as a sphere; unwinds to face the camera as a word */
      spinVel *= 0.92;
      if (morphW > 0.001) {
        rotY = wrapPi(rotY) * Math.pow(0.002, dt * morphW);
      } else {
        rotY += dt * 0.055 + spinVel;
      }
      points.rotation.y = rotY;
      points.rotation.x = Math.sin(t * 0.12) * 0.12 * (1 - morphW);
      points.position.y = Math.sin(t * 0.8) * 0.06 * morphW; // words float gently

      /* fit the word inside the viewport on narrow screens: shrink the cloud
         toward whatever scale makes the glyph span fit the camera's visible
         width. Recomputed every frame, so rotation/resize just works. */
      const visW = 2 * camera.position.z * Math.tan((camera.fov * Math.PI) / 360) * camera.aspect;
      const fitScale = Math.min(1, (visW * 0.88) / glyphSpanX);
      const s = 1 + (fitScale - 1) * easeInOutCubic(morphW);
      points.scale.setScalar(s);

      mat.size =
        0.028 * (1 + 0.14 * Math.sin(t * 1.35)) * (1 - 0.3 * morphW) * Math.max(Math.sqrt(s), 0.6);

      /* supporting cast fades while a word is up */
      wire.rotation.y = -t * 0.03;
      wire.rotation.z = t * 0.02;
      wireMat.opacity = 0.1 * opacity * (1 - morphW);
      ring1.rotation.z = t * 0.12;
      ring2.rotation.z = -t * 0.09;
      ring1Mat.opacity = 0.22 * opacity * (1 - 0.8 * morphW);
      ring2Mat.opacity = 0.16 * opacity * (1 - 0.8 * morphW);

      // mouse parallax, eased
      camera.position.x += (mouse.x * 0.55 - camera.position.x) * 0.04;
      camera.position.y += (-mouse.y * 0.4 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };

    const loop = () => {
      if (!running) return;
      renderFrame();
      raf = requestAnimationFrame(loop);
    };

    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      if (reduced) renderFrame(); // keep the static frame crisp
    };
    window.addEventListener("resize", onResize);

    if (reduced) {
      renderFrame(); // one static frame, no animation, no listeners
    } else {
      window.addEventListener("mousemove", onMouse, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });
      loop();
    }

    // pause when off-screen (perf)
    const io = new IntersectionObserver(([e]) => {
      const wasRunning = running;
      running = e.isIntersecting && !reduced;
      if (running && !wasRunning) loop();
      if (!running) cancelAnimationFrame(raf);
    });
    io.observe(mount);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
      geo.dispose();
      mat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      ringGeo.dispose();
      ring1Mat.dispose();
      ring2Mat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, [count, radius, opacity, morphWords]);

  return <div ref={mountRef} className="three-layer" aria-hidden="true" />;
}
