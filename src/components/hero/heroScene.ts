/**
 * Three.js hero scene — "live diagnostic scan".
 *
 * The car illustration (public/media/hero-car.png) drives onto a holographic
 * turntable, wheels turning, and parks. A scanning beam then sweeps across it:
 * behind the beam the car switches to its hologram version (hero-car-holo.png),
 * and diagnostic hotspots ping as the beam reaches them (the engine flags a fault
 * in orange). The beam sweeps back and the car is restored. The switch uses two
 * clipping planes that move with the beam — one on the normal car, the mirror one
 * on the hologram — so the two images always meet exactly at the beam.
 *
 * Both images come from scripts/build-hero-car.mjs. Loaded on demand by Hero3D —
 * never part of the initial bundle.
 */
import * as THREE from "three";
import { asset } from "@/lib/basePath";

export type SceneHandle = { dispose: () => void };

const YELLOW = 0xf5b301;

/** Car image size in scene units (aspect from build-hero-car.mjs: 1180×430). */
const CAR_W = 4.8;
const CAR_H = CAR_W / (1180 / 430);
/** Image v (0 = top) where the tyres touch the ground. */
const GROUND_V = 0.955;
/** Wheel centres and radius, as fractions of the image (u from left, v from top). */
const WHEELS = [{ u: 0.214, v: 0.756 }, { u: 0.802, v: 0.756 }];
const WHEEL_R_U = 45 / 590;

/** Image (u, v) → car-local position. */
const uv = (u: number, v: number, z = 0) => new THREE.Vector3((u - 0.5) * CAR_W, (GROUND_V - v) * CAR_H, z);

/** A disc that shows (and can rotate) the wheel region of a car texture. */
function wheelGeometry(cu: number, cv: number) {
  const r = WHEEL_R_U * CAR_W;
  const g = new THREE.CircleGeometry(r, 40);
  const pos = g.attributes.position, uvs = g.attributes.uv;
  const ru = WHEEL_R_U, rv = (WHEEL_R_U * CAR_W) / CAR_H;
  for (let i = 0; i < pos.count; i++) {
    // Texture v runs bottom→top, image v top→bottom.
    uvs.setXY(i, cu + (pos.getX(i) / r) * ru, 1 - cv + (pos.getY(i) / r) * rv);
  }
  return g;
}

export function createHeroScene(container: HTMLElement, opts: { animate: boolean }): SceneHandle {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.localClippingEnabled = true;
  renderer.domElement.setAttribute("aria-hidden", "true");
  renderer.domElement.style.cssText = "width:100%;height:100%;display:block";
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 2.2, 11.8);
  camera.lookAt(0, 0.62, 0);

  const disposables: { dispose: () => void }[] = [];
  const keep = <T extends { dispose: () => void }>(d: T) => (disposables.push(d), d);

  // Clipping planes that follow the beam: car keeps x ≥ beam, hologram keeps x ≤ beam.
  // Three.js clips in world space, so the car-space planes are re-projected every frame.
  const localSolid = new THREE.Plane(new THREE.Vector3(1, 0, 0), 0);
  const localHolo = new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0);
  const solidClip = new THREE.Plane();
  const holoClip = new THREE.Plane();

  // Textures
  let ready = false;
  const manager = new THREE.LoadingManager(() => {
    ready = true;
    car.visible = true;
    if (!opts.animate) drawStill();
  });
  const loader = new THREE.TextureLoader(manager);
  const load = (path: string) => {
    const t = keep(loader.load(asset(path)));
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = renderer.capabilities.getMaxAnisotropy();
    return t;
  };
  const carTex = load("/media/hero-car.png");
  const holoTex = load("/media/hero-car-holo.png");

  const carMat = keep(new THREE.MeshBasicMaterial({ map: carTex, transparent: true, depthWrite: false, clippingPlanes: [solidClip] }));
  const holoMat = keep(new THREE.MeshBasicMaterial({ map: holoTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, clippingPlanes: [holoClip] }));

  // Car: the image on a plane, with the wheels as separate rotating discs on top.
  const car = new THREE.Group();
  car.visible = false;
  const body = keep(new THREE.PlaneGeometry(CAR_W, CAR_H));
  body.translate(0, (GROUND_V - 0.5) * CAR_H, 0); // image centre → so the tyres sit on y = 0
  car.add(new THREE.Mesh(body, carMat), new THREE.Mesh(body, holoMat));
  const wheels = WHEELS.map(({ u, v }) => {
    const geo = keep(wheelGeometry(u, v));
    const group = new THREE.Group();
    group.position.copy(uv(u, v, 0.004));
    group.add(new THREE.Mesh(geo, carMat), new THREE.Mesh(geo, holoMat));
    car.add(group);
    return group;
  });

  // Diagnostic hotspots on the car: [image u, v, fault?]
  const spotGeo = keep(new THREE.SphereGeometry(0.06, 16, 12));
  const ringGeo = keep(new THREE.RingGeometry(0.09, 0.12, 32));
  const hotspots = ([
    [0.85, 0.46, true], // engine bay: fault found
    [0.802, 0.756, false], // front brake
    [0.44, 0.33, false], // cabin electronics
    [0.214, 0.756, false], // rear suspension
    [0.06, 0.68, false], // exhaust
  ] as const).map(([u, v, fault]) => {
    const color = fault ? 0xff6a1f : 0xffd24a;
    const dotMat = keep(new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0 }));
    const ringMat = keep(new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false }));
    const pos = uv(u, v, 0.08);
    const dot = new THREE.Mesh(spotGeo, dotMat);
    const ring = new THREE.Mesh(ringGeo, ringMat);
    dot.position.copy(pos);
    ring.position.copy(pos);
    car.add(dot, ring);
    return { x: pos.x, ring, dotMat, ringMat, pinged: -10 };
  });

  // Scanner beam: a bright vertical laser line with a soft horizontal glow.
  const beam = new THREE.Group();
  const glowCanvas = document.createElement("canvas");
  glowCanvas.width = 64;
  glowCanvas.height = 1;
  const gctx = glowCanvas.getContext("2d")!;
  const grad = gctx.createLinearGradient(0, 0, 64, 0);
  grad.addColorStop(0, "rgba(255,210,74,0)");
  grad.addColorStop(0.5, "rgba(255,210,74,1)");
  grad.addColorStop(1, "rgba(255,210,74,0)");
  gctx.fillStyle = grad;
  gctx.fillRect(0, 0, 64, 1);
  const glowTex = keep(new THREE.CanvasTexture(glowCanvas));
  glowTex.colorSpace = THREE.SRGBColorSpace;
  const BEAM_H = CAR_H * 1.25;
  const lineMat = keep(new THREE.MeshBasicMaterial({ color: 0xfff0b8, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
  const glowMat = keep(new THREE.MeshBasicMaterial({ map: glowTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
  const line = new THREE.Mesh(keep(new THREE.PlaneGeometry(0.035, BEAM_H)), lineMat);
  const glow = new THREE.Mesh(keep(new THREE.PlaneGeometry(0.9, BEAM_H)), glowMat);
  const foot = new THREE.Mesh(keep(new THREE.CircleGeometry(0.28, 32)), glowMat);
  line.position.set(0, BEAM_H / 2 - 0.08, 0.12);
  glow.position.set(0, BEAM_H / 2 - 0.08, 0.1);
  foot.rotation.x = -Math.PI / 2;
  foot.position.set(0, 0.01, 0.3);
  beam.add(glow, line, foot);
  car.add(beam);

  // Turntable: polar grid, rim ring and a rotating scanning arc
  const table = new THREE.Group();
  const grid = new THREE.PolarGridHelper(3.2, 16, 6, 64, YELLOW, YELLOW);
  const gridMat = keep(grid.material as THREE.LineBasicMaterial);
  keep(grid.geometry);
  gridMat.transparent = true;
  table.add(grid);
  const rimRingGeo = keep(new THREE.RingGeometry(3.14, 3.22, 96));
  rimRingGeo.rotateX(-Math.PI / 2);
  const rimRingMat = keep(new THREE.MeshBasicMaterial({ color: YELLOW, transparent: true, opacity: 0.55, side: THREE.DoubleSide }));
  const arcGeo = keep(new THREE.RingGeometry(2.4, 3.1, 64, 1, 0, Math.PI / 5));
  arcGeo.rotateX(-Math.PI / 2);
  const arcMat = keep(new THREE.MeshBasicMaterial({ color: YELLOW, transparent: true, side: THREE.DoubleSide, depthWrite: false }));
  table.add(new THREE.Mesh(rimRingGeo, rimRingMat));
  const arc = new THREE.Mesh(arcGeo, arcMat);
  arc.position.y = 0.005;
  table.add(arc);
  scene.add(table, car);

  // Follow the site theme: additive glow vanishes on a light page, so the light theme
  // uses normal blending and deeper amber for the hologram, beam and turntable.
  let light = false;
  const applyTheme = () => {
    light = document.documentElement.getAttribute("data-theme") === "light";
    const glowBlend = light ? THREE.NormalBlending : THREE.AdditiveBlending;
    holoMat.color.set(light ? 0x8a5a00 : 0xffffff);
    lineMat.color.set(light ? 0xc48a00 : 0xfff0b8);
    glowMat.color.set(light ? 0xe0a000 : 0xffffff);
    gridMat.opacity = light ? 0.4 : 0.18;
    rimRingMat.color.set(light ? 0xc48a00 : YELLOW);
    arcMat.opacity = light ? 0.2 : 0.12;
    arcMat.blending = glowBlend;
    [holoMat, lineMat, glowMat, arcMat].forEach((m) => { m.blending = glowBlend; m.needsUpdate = true; });
    if (!opts.animate && ready) drawStill();
  };
  applyTheme();
  const themeObserver = new MutationObserver(applyTheme);
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  // Interaction
  const pointer = { x: 0, y: 0 };
  const onPointer = (e: PointerEvent) => {
    const r = container.getBoundingClientRect();
    pointer.x = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2));
    pointer.y = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2));
  };
  window.addEventListener("pointermove", onPointer, { passive: true });
  let scrollTilt = 0;
  const onScroll = () => { scrollTilt = Math.min(window.scrollY / 900, 1); };
  window.addEventListener("scroll", onScroll, { passive: true });

  const resize = () => {
    const w = container.clientWidth, h = container.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    if (!opts.animate && ready) drawStill();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(container);
  resize();

  let visible = true;
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; loop(); });
  io.observe(container);

  // Timeline: drive in and park, then repeat: sweep (→ hologram), hold, sweep back, hold.
  const DRIVE = 1.8, SWEEP = 2.6, HOLD = 1.1, CYCLE = 2 * (SWEEP + HOLD);
  const easeInOut = (x: number) => (x < 0.5 ? 2 * x * x : 1 - (-2 * x + 2) ** 2 / 2);
  const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);
  const START = -CAR_W / 2 - 0.25, END = CAR_W / 2 + 0.25;
  const scanAt = (s: number) => {
    if (s < 0) return { x: START, on: 0, moving: false };
    const c = s % CYCLE;
    if (c < SWEEP) return { x: START + (END - START) * easeInOut(c / SWEEP), on: 1, moving: true };
    if (c < SWEEP + HOLD) return { x: END, on: 0.2, moving: false };
    if (c < 2 * SWEEP + HOLD) return { x: END - (END - START) * easeInOut((c - SWEEP - HOLD) / SWEEP), on: 1, moving: true };
    return { x: START, on: 0.2, moving: false };
  };

  const setBeam = (x: number, on: number, moving: boolean, t: number) => {
    localSolid.constant = -x;
    localHolo.constant = x;
    beam.position.x = x;
    lineMat.opacity = on;
    glowMat.opacity = (light ? 0.35 : 0.5) * on;
    // Hotspots ping when the beam passes and stay lit while that area is a hologram.
    hotspots.forEach((h) => {
      const scanned = x > h.x && on > 0;
      if (scanned && moving && t - h.pinged > SWEEP) h.pinged = t;
      const since = t - h.pinged;
      const pulse = 0.75 + Math.sin(t * 5 + h.x) * 0.25;
      h.dotMat.opacity = scanned ? pulse : Math.max(0, h.dotMat.opacity - 0.08);
      const ringT = since < 1.2 ? since / 1.2 : (since % 1.6) / 1.6;
      h.ring.scale.setScalar(scanned ? 1 + ringT * 2.2 : 1);
      h.ringMat.opacity = scanned ? (1 - ringT) * 0.8 : 0;
      h.ring.lookAt(camera.position);
    });
  };

  const syncClip = () => {
    car.updateMatrixWorld();
    solidClip.copy(localSolid).applyMatrix4(car.matrixWorld);
    holoClip.copy(localHolo).applyMatrix4(car.matrixWorld);
  };

  const timer = new THREE.Timer();
  let readyAt = -1;
  let wheelAngle = 0;
  let raf = 0;
  const render = () => {
    timer.update();
    const t = timer.getElapsed();
    const dt = Math.min(timer.getDelta(), 0.05);
    if (ready && readyAt < 0) readyAt = t;
    const since = readyAt < 0 ? 0 : t - readyAt;

    // Drive in from the left, decelerating to a stop; wheels roll to match.
    const drive = easeOut(Math.min(since / DRIVE, 1));
    const prevX = car.position.x;
    car.position.x = -7.5 * (1 - drive);
    wheelAngle -= (car.position.x - prevX) / (WHEEL_R_U * CAR_W);
    wheels.forEach((w) => { w.rotation.z = wheelAngle; });
    car.position.y = since < DRIVE ? Math.abs(Math.sin(since * 14)) * 0.02 * (1 - drive) : 0;

    const { x, on, moving } = scanAt(since - DRIVE - 0.3);
    setBeam(x, on, moving, t);

    // The car always faces the viewer, with a gentle sway and pointer parallax;
    // the turntable keeps turning underneath.
    const yaw = Math.sin(t * 0.35) * 0.07 + pointer.x * 0.16;
    car.rotation.y += (yaw - car.rotation.y) * 0.06;
    const pitch = -0.02 + pointer.y * 0.05 + scrollTilt * 0.12;
    car.rotation.x += (pitch - car.rotation.x) * 0.06;
    table.rotation.y += dt * 0.12;
    arc.rotation.y = -t * 0.8;

    syncClip();
    renderer.render(scene, camera);
  };
  function loop() {
    cancelAnimationFrame(raf);
    if (!opts.animate || !visible || document.hidden) return;
    const tick = () => { render(); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
  }
  const onVis = () => loop();
  document.addEventListener("visibilitychange", onVis);

  /** Still frame for reduced motion: parked, half scanned, beam in the middle. */
  function drawStill() {
    car.position.set(0, 0, 0);
    car.rotation.set(-0.02, 0, 0);
    setBeam(0.15, 1, true, 10);
    syncClip();
    renderer.render(scene, camera);
  }

  if (opts.animate) loop();

  return {
    dispose() {
      cancelAnimationFrame(raf);
      timer.dispose();
      themeObserver.disconnect();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
