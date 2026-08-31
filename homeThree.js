import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/controls/OrbitControls.js";

/* ---------- Basic setup ---------- */
const canvas = document.getElementById("hero");
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
});
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
scene.background = new THREE.Color("#ffffff");

const camera = new THREE.PerspectiveCamera(
  40,
  canvas.clientWidth / canvas.clientHeight,
  0.1,
  100,
);
camera.position.set(5.6, 4.7, 9.6);
camera.position.multiplyScalar(1.3);
scene.add(camera);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.rotateSpeed = 0.7;
controls.enableZoom = false;
controls.enablePan = false;
controls.target.set(0, 0, 0);
// Move the scene visually to the right
const shiftAmount = 1.5;

// Camera's horizontal direction
const cameraRight = new THREE.Vector3(1, 0, 0).applyQuaternion(
  camera.quaternion,
);

const shift = cameraRight.multiplyScalar(-shiftAmount);

camera.position.add(shift);
controls.target.add(shift);
controls.update();
controls.update();

/* ---------- Lights + floor ---------- */
scene.add(new THREE.HemisphereLight(0xffffff, 0xcccccc, 2));
const dir = new THREE.DirectionalLight(0xffffff, 0.85);
dir.position.set(6, 10, 6);
dir.castShadow = true;

/* Increase the shadow-rendering area */
dir.shadow.camera.left = -25;
dir.shadow.camera.right = 25;
dir.shadow.camera.top = 20;
dir.shadow.camera.bottom = -20;

dir.shadow.camera.near = 0.1;
dir.shadow.camera.far = 60;

/* Improve shadow quality */
dir.shadow.mapSize.set(2048, 2048);
dir.shadow.bias = -0.0005;
dir.shadow.normalBias = 0.02;

scene.add(dir);

// SHADOW-ONLY FLOOR
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(5000, 5000),
  new THREE.ShadowMaterial({ opacity: 0.1 }), // only renders shadow
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -3.2;
floor.receiveShadow = true;
scene.add(floor);

/* ---------- Load your six images ---------- */
const loader = new THREE.TextureLoader();
const TEX = await Promise.all([
  loader.loadAsync("/assets/hierarchy-01.png"), // 0
  loader.loadAsync("/assets/contrast-02.png"), // 1
  loader.loadAsync("/assets/repetition-03.png"), // 2
  loader.loadAsync("/assets/emphasis-04.png"), // 3
  loader.loadAsync("/assets/movement-05.png"), // 4
  loader.loadAsync("/assets/balance-06.png"), // 5
]);
TEX.forEach((t) => {
  t.anisotropy = renderer.capabilities.getMaxAnisotropy?.() || 1;
  t.colorSpace = THREE.SRGBColorSpace;
});

/* Map faces -> images (change if you like)
   FRONT(+Z)   = hierarchy
   BACK(-Z)    = contrast
   RIGHT(+X)   = movement
   LEFT(-X)    = balance
   TOP(+Y)     = repetition
   BOTTOM(-Y)  = emphasis
*/
const FACE_IMG = {
  FRONT: TEX[0],
  BACK: TEX[1],
  TOP: TEX[2],
  BOTTOM: TEX[3],
  RIGHT: TEX[4],
  LEFT: TEX[5],
};

/* ---------- Helpers: tile a single image across 3×3 ---------- */
function tileMaterialFrom(texture, uIndex, vIndex) {
  const t = texture.clone();
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(1 / 3, 1 / 3);
  t.offset.set(uIndex / 3, vIndex / 3); // v=0 bottom … v=2 top
  t.needsUpdate = true;
  return new THREE.MeshStandardMaterial({
    map: t,
    color: 0xffffff,
    roughness: 0.55,
    metalness: 0.06,
  });
}

/* ---------- Build the 27 cubes ---------- */
const group = new THREE.Group();
group.position.set(2.0, 0.5, -1.5); // X, Y, Z in world units
scene.add(group);

const CUBE = 1,
  GAP = 0.01;
const cubes = [];
const targetPos = []; // assembled
const scatterPos = []; // scattered
const geo = new THREE.BoxGeometry(CUBE, CUBE, CUBE);

// Box material order:
// 0:-X (left)  1:+X (right)  2:+Y (top)  3:-Y (bottom)  4:+Z (front)  5:-Z (back)
// BoxGeometry material order (r160):
// 0:+X (right), 1:-X (left), 2:+Y (top), 3:-Y (bottom), 4:+Z (front), 5:-Z (back)

function materialsFor(pos) {
  const mats = new Array(6).fill().map(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#dfe4e8",
        metalness: 0.08,
        roughness: 0.55,
      }),
  );

  // grid indices u (left→right), v (bottom→top) for the 3×3 tiling
  const u = pos.x + 1; // -1,0,1 → 0,1,2
  const v = pos.y + 1; // -1,0,1 → 0,1,2

  // FRONT (+Z)
  if (pos.z === 1) mats[4] = tileMaterialFrom(FACE_IMG.FRONT, u, v);

  // BACK (-Z) — mirror horizontally so the image reads left→right
  if (pos.z === -1) mats[5] = tileMaterialFrom(FACE_IMG.BACK, 2 - u, v);

  // RIGHT (+X) — note index 0 (not 1)
  // rotate mapping so the image is upright when viewed from +X
  if (pos.x === 1) {
    const uRight = 2 - (pos.z + 1); // map z->u, mirrored
    mats[0] = tileMaterialFrom(FACE_IMG.RIGHT, uRight, v);
  }

  // LEFT (-X) — note index 1 (not 0)
  if (pos.x === -1) {
    const uLeft = pos.z + 1; // map z->u
    mats[1] = tileMaterialFrom(FACE_IMG.LEFT, uLeft, v);
  }

  // TOP (+Y)
  if (pos.y === 1) {
    const vTop = 2 - (pos.z + 1); // map z->v (rotated), keep text upright
    mats[2] = tileMaterialFrom(FACE_IMG.TOP, u, vTop);
  }

  // BOTTOM (-Y)
  if (pos.y === -1) {
    const vBot = pos.z + 1;
    mats[3] = tileMaterialFrom(FACE_IMG.BOTTOM, u, vBot);
  }

  return mats;
}

let idx = 0;
for (let x = -1; x <= 1; x++) {
  for (let y = -1; y <= 1; y++) {
    for (let z = -1; z <= 1; z++) {
      const pos = { x, y, z };
      const mesh = new THREE.Mesh(geo, materialsFor(pos));
      mesh.castShadow = true;

      // assembled slot
      targetPos.push(
        new THREE.Vector3(x * (CUBE + GAP), y * (CUBE + GAP), z * (CUBE + GAP)),
      );
      // scattered start
      scatterPos.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 25,
          (Math.random() - 0.2) * 10,
          (Math.random() - 0.5) * 12,
        ),
      );
      mesh.position.copy(scatterPos[idx]);
      mesh.rotation.set(
        Math.random() * 0.2,
        Math.random() * 0.2,
        Math.random() * 0.2,
      );

      group.add(mesh);
      cubes.push(mesh);
      idx++;
    }
  }
}

/* ---------- Assemble / Scatter tweens ---------- */
let assembled = false;
function toAssembled() {
  assembled = true;
  cubes.forEach((cube, i) => {
    const t = targetPos[i];
    gsap.to(cube.position, {
      x: t.x,
      y: t.y,
      z: t.z,
      duration: 2,
      ease: "power2.inOut",
      delay: i * 0.01,
    });
    gsap.to(cube.rotation, {
      x: 0,
      y: 0,
      z: 0,
      duration: 1.2,
      ease: "power2.out",
      delay: i * 0.01,
    });
  });
}
function toScatter() {
  assembled = false;
  cubes.forEach((cube, i) => {
    const s = scatterPos[i]
      .clone()
      .add(
        new THREE.Vector3(
          (Math.random() - 0.5) * 1.5,
          (Math.random() - 0.5) * 1.5,
          (Math.random() - 0.5) * 1.5,
        ),
      );
    gsap.to(cube.position, {
      x: s.x,
      y: s.y,
      z: s.z,
      duration: 1.4,
      ease: "power2.inOut",
      delay: i * 0.005,
    });
    gsap.to(cube.rotation, {
      x: Math.random() * 0.6,
      y: Math.random() * 0.6,
      z: Math.random() * 0.6,
      duration: 1.2,
      ease: "power2.out",
      delay: i * 0.005,
    });
  });
}

// Start scattered, assemble after a moment
toScatter();
setTimeout(toAssembled, 700);

/* ---------- UI & interactions ---------- */
// Select the new CTA button
const cubeToggleBtn = document.querySelector("[data-toggle-cube]");

if (cubeToggleBtn) {
  cubeToggleBtn.addEventListener("click", (e) => {
    e.preventDefault(); // stop the instant #mywork jump

    // Trigger the assemble/scatter toggle
    assembled ? toScatter() : toAssembled();

    // Then scroll smoothly to #mywork (optional)
    const target = document.querySelector("#mywork");
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 900); // delay matches cube animation
    }
  });
}
// Scroll: down => scatter, up => assemble
let lastY = window.scrollY;
window.addEventListener(
  "scroll",
  () => {
    const d = window.scrollY - lastY;
    lastY = window.scrollY;
    if (Math.abs(d) < 2) return;
    if (d > 0 && assembled) toScatter();
    if (d < 0 && !assembled) toAssembled();
  },
  { passive: true },
);

/* ---------- Render loop ---------- */
const clock = new THREE.Clock();
function tick() {
  requestAnimationFrame(tick);
  const t = clock.getElapsedTime();

  // gentle idle bob
  cubes.forEach((m, i) => {
    m.position.y += Math.sin(t + i * 0.33) * 0.003 * (assembled ? 0.4 : 1);
  });

  controls.update();
  const w = canvas.clientWidth,
    h = canvas.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
}
tick();

/* ---------- Resize ---------- */
addEventListener("resize", () => {
  const w = canvas.clientWidth,
    h = canvas.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
});

// ===== Proximity toggle for the CTA =====
const btn = document.querySelector("[data-toggle-cube]");
if (btn) {
  const RADIUS = 140; // px: trigger radius
  const HYSTERESIS = 24; // px: avoid flicker
  const MAGNET = 12; // px: drift toward cursor
  let hot = false;
  let rafId = null;

  // Proximity hover effect
  function onMove(e) {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      // Magnet transform
      const m = Math.min(1, dist === 0 ? 0 : MAGNET / dist);
      btn.style.transform = `translate(${dx * m}px, ${dy * m}px)`;

      // Scatter/assemble only (no scroll!)
      if (!hot && dist < RADIUS) {
        hot = true;
        btn.classList.add("is-hot");
        assembled ? toScatter() : toAssembled();
      } else if (hot && dist > RADIUS + HYSTERESIS) {
        hot = false;
        btn.classList.remove("is-hot");
      }
    });
  }

  // Reset transform
  function onLeave() {
    btn.style.transform = "translate(0,0)";
    btn.classList.remove("is-hot");
    hot = false;
  }

  window.addEventListener("mousemove", onMove, { passive: true });
  window.addEventListener("mouseleave", onLeave);

  // Normal click scroll works via href="#mywork"
  // Optional: smooth scroll instead of jump
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector("#mywork");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}
