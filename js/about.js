import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

/* =====================================================
   HTML TARGETS
===================================================== */

const container = document.querySelector(".about-avatar");
const canvas = document.querySelector("#about-avatar-canvas");

if (!container || !canvas) {
  throw new Error("Avatar container or canvas not found.");
}

/* =====================================================
   GLOBAL AVATAR CONTROLS
===================================================== */

const AVATAR_SCALE = 0.68;
const AVATAR_X = 0;
const AVATAR_Y = -0.55;

/* =====================================================
   SCENE
===================================================== */

const scene = new THREE.Scene();

/* =====================================================
   CAMERA
===================================================== */

const camera = new THREE.PerspectiveCamera(
  32,
  container.clientWidth / container.clientHeight,
  0.1,
  100,
);

camera.position.set(0, 0, 8.8);

/* =====================================================
   RENDERER
===================================================== */

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderer.setSize(container.clientWidth, container.clientHeight, false);

renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setClearColor(0x000000, 0);

/* =====================================================
   COLORS
===================================================== */

const COLORS = {
  skin: 0xf0cbb4,
  hair: 0x2b2928,
  streak: 0xc3c3c0,
  glasses: 0x333333,
  eyes: 0x2c2c2c,
  earring: 0xb7b7b3,
  shirt: 0x323232,
  red: 0xa80600,
  mouth: 0x8b655e,
};

/* =====================================================
   MATERIAL HELPER
===================================================== */

function createMaterial(color, roughness = 0.7, metalness = 0) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness,
    metalness,
  });
}

const skinMaterial = createMaterial(COLORS.skin, 0.82);

const hairMaterial = createMaterial(COLORS.hair, 0.68);

const streakMaterial = createMaterial(COLORS.streak, 0.72);

const shirtMaterial = createMaterial(COLORS.shirt, 0.86);

const eyeMaterial = createMaterial(COLORS.eyes, 0.5);

const glassesMaterial = createMaterial(COLORS.glasses, 0.45, 0.18);

const earringMaterial = createMaterial(COLORS.earring, 0.25, 0.75);

/* =====================================================
   AVATAR ROOT
===================================================== */

const avatar = new THREE.Group();

avatar.scale.setScalar(AVATAR_SCALE);

avatar.position.set(AVATAR_X, AVATAR_Y, 0);

scene.add(avatar);

/* =====================================================
   SHIRT / ROUNDED BUST
===================================================== */

/* =====================================================
   SHIRT / BUST — CLEANER NECK TRANSITION
===================================================== */

const shirtGeometry = new THREE.SphereGeometry(1.5, 64, 64);

/*
  Wider shoulders,
  slightly flatter vertically,
  less depth.
*/
shirtGeometry.scale(1.28, 0.58, 0.6);

const shirt = new THREE.Mesh(shirtGeometry, shirtMaterial);

/*
  Move the bust lower so the neck is clearly visible.
*/
shirt.position.set(0, -2.42, -0.2);

avatar.add(shirt);
/* =====================================================
   NECK
===================================================== */

/* =====================================================
   NECK
===================================================== */

const neckGeometry = new THREE.CylinderGeometry(0.31, 0.36, 1.22, 48);

const neck = new THREE.Mesh(neckGeometry, skinMaterial);

neck.position.set(0, -1.46, 0.06);

avatar.add(neck);

/* =====================================================
   HEAD
===================================================== */

const headGeometry = new THREE.SphereGeometry(1.25, 64, 64);

headGeometry.scale(0.9, 1.08, 0.78);

const head = new THREE.Mesh(headGeometry, skinMaterial);

head.position.set(0, 0.05, 0);

avatar.add(head);

/* =====================================================
   EARS
===================================================== */

function createEar(x) {
  const geometry = new THREE.SphereGeometry(0.24, 32, 32);

  geometry.scale(0.58, 1, 0.45);

  const ear = new THREE.Mesh(geometry, skinMaterial);

  ear.position.set(x, 0.05, 0);

  avatar.add(ear);
}

createEar(-1.12);
createEar(1.12);

/* =====================================================
   EYES
===================================================== */

function createEye(x) {
  const eye = new THREE.Mesh(
    new THREE.SphereGeometry(0.1, 32, 32),
    eyeMaterial,
  );

  eye.position.set(x, 0.22, 0.94);

  avatar.add(eye);

  return eye;
}

const leftEye = createEye(-0.42);
const rightEye = createEye(0.42);

/* =====================================================
   NOSE
===================================================== */

const noseGeometry = new THREE.SphereGeometry(0.15, 32, 32);

noseGeometry.scale(0.55, 1.45, 0.62);

const nose = new THREE.Mesh(noseGeometry, skinMaterial);

nose.position.set(0, -0.02, 1.02);

avatar.add(nose);

/* =====================================================
   MOUTH
===================================================== */

const mouthCurve = new THREE.EllipseCurve(
  0,
  0,
  0.2,
  0.085,
  Math.PI * 0.15,
  Math.PI * 0.85,
  false,
  0,
);

const mouthPoints = mouthCurve.getPoints(24);

const mouthGeometry = new THREE.BufferGeometry().setFromPoints(mouthPoints);

const mouthMaterial = new THREE.LineBasicMaterial({
  color: COLORS.mouth,
});

const mouth = new THREE.Line(mouthGeometry, mouthMaterial);

mouth.position.set(0, -0.48, 1.01);

mouth.rotation.z = Math.PI;

avatar.add(mouth);

/* =====================================================
   GLASSES
===================================================== */

function createLens(x) {
  const lens = new THREE.Mesh(
    new THREE.TorusGeometry(0.36, 0.025, 12, 64),
    glassesMaterial,
  );

  lens.position.set(x, 0.24, 1.01);

  avatar.add(lens);
}

createLens(-0.42);
createLens(0.42);

/* GLASSES BRIDGE */

const bridge = new THREE.Mesh(
  new THREE.CylinderGeometry(0.018, 0.018, 0.22, 16),
  glassesMaterial,
);

bridge.rotation.z = Math.PI / 2;

bridge.position.set(0, 0.24, 1.02);

avatar.add(bridge);

/* GLASSES ARMS */

function createGlassesArm(x) {
  const arm = new THREE.Mesh(
    new THREE.CylinderGeometry(0.017, 0.017, 0.34, 12),
    glassesMaterial,
  );

  arm.rotation.z = Math.PI / 2;

  arm.position.set(x, 0.24, 0.9);

  avatar.add(arm);
}

createGlassesArm(-0.93);
createGlassesArm(0.93);

/* =====================================================
   EARRINGS
===================================================== */

function createEarring(x) {
  const earring = new THREE.Mesh(
    new THREE.TorusGeometry(0.18, 0.035, 16, 48),
    earringMaterial,
  );

  earring.position.set(x, -0.34, 0.05);

  avatar.add(earring);
}

createEarring(-1.14);
createEarring(1.14);

/* =====================================================
   HAIR HELPER
===================================================== */

function createHairPiece({
  x,
  y,
  z,
  scaleX,
  scaleY,
  scaleZ,
  rotationZ = 0,
  rotationY = 0,
  mat = hairMaterial,
}) {
  const geometry = new THREE.SphereGeometry(0.7, 40, 40);

  geometry.scale(scaleX, scaleY, scaleZ);

  const mesh = new THREE.Mesh(geometry, mat);

  mesh.position.set(x, y, z);

  mesh.rotation.z = rotationZ;

  mesh.rotation.y = rotationY;

  avatar.add(mesh);

  return mesh;
}

/* =====================================================
   BACK HAIR
===================================================== */

createHairPiece({
  x: -0.62,
  y: -0.02,
  z: -0.45,

  scaleX: 0.95,
  scaleY: 1.95,
  scaleZ: 0.68,

  rotationZ: 0.03,
});

createHairPiece({
  x: 0.62,
  y: -0.02,
  z: -0.45,

  scaleX: 0.95,
  scaleY: 1.95,
  scaleZ: 0.68,

  rotationZ: -0.03,
});

/* =====================================================
   FRONT HAIR
===================================================== */

createHairPiece({
  x: -0.57,
  y: 0.9,
  z: 0.54,

  scaleX: 0.74,
  scaleY: 1.17,
  scaleZ: 0.24,

  rotationZ: -0.64,
});

createHairPiece({
  x: 0.57,
  y: 0.9,
  z: 0.54,

  scaleX: 0.74,
  scaleY: 1.17,
  scaleZ: 0.24,

  rotationZ: 0.64,
});

/* =====================================================
   SIDE HAIR
===================================================== */

createHairPiece({
  x: -0.91,
  y: -0.35,
  z: -0.05,

  scaleX: 0.38,
  scaleY: 1.15,
  scaleZ: 0.5,

  rotationZ: 0.03,
});

createHairPiece({
  x: 0.91,
  y: -0.35,
  z: -0.05,

  scaleX: 0.38,
  scaleY: 1.15,
  scaleZ: 0.5,

  rotationZ: -0.03,
});

/* =====================================================
   GRAY HAIR STREAKS
===================================================== */

createHairPiece({
  x: -0.57,
  y: 0.93,
  z: 0.72,

  scaleX: 0.1,
  scaleY: 0.86,
  scaleZ: 0.08,

  rotationZ: -0.64,

  mat: streakMaterial,
});

createHairPiece({
  x: 0.57,
  y: 0.93,
  z: 0.72,

  scaleX: 0.1,
  scaleY: 0.86,
  scaleZ: 0.08,

  rotationZ: 0.64,

  mat: streakMaterial,
});

/* =====================================================
   LIGHTING
===================================================== */

const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xd8d4ce, 2.3);

scene.add(hemisphereLight);

const keyLight = new THREE.DirectionalLight(0xffffff, 4.2);

keyLight.position.set(4, 5, 6);

scene.add(keyLight);

const fillLight = new THREE.DirectionalLight(0xffffff, 1.5);

fillLight.position.set(-4, 2, 4);

scene.add(fillLight);

const softRedLight = new THREE.DirectionalLight(COLORS.red, 0.35);

softRedLight.position.set(-3, -1, 3);

scene.add(softRedLight);

/* =====================================================
   POINTER
===================================================== */

const pointer = {
  x: 0,
  y: 0,
};

container.addEventListener("pointermove", (event) => {
  const rect = container.getBoundingClientRect();

  pointer.x = (event.clientX - rect.left) / rect.width - 0.5;

  pointer.y = (event.clientY - rect.top) / rect.height - 0.5;
});

container.addEventListener("pointerleave", () => {
  pointer.x = 0;
  pointer.y = 0;
});

/* =====================================================
   FLOATING OBJECT ROOT
===================================================== */

const floatingObjects = new THREE.Group();

scene.add(floatingObjects);

/* =====================================================
   01 — SYSTEMS / UI CARD
===================================================== */

const systemsCard = new THREE.Group();

const systemsBg = new THREE.Mesh(
  new THREE.BoxGeometry(1.55, 1.15, 0.1),

  new THREE.MeshStandardMaterial({
    color: 0xf5f3ef,
    roughness: 0.8,
    metalness: 0,
  }),
);

systemsCard.add(systemsBg);

function createUiLine(width, y, x = -0.2, color = 0x8a8883) {
  const line = new THREE.Mesh(
    new THREE.BoxGeometry(width, 0.075, 0.035),

    new THREE.MeshStandardMaterial({
      color,
      roughness: 0.8,
    }),
  );

  line.position.set(x, y, 0.075);

  systemsCard.add(line);
}

createUiLine(0.65, 0.36, -0.28, 0x575550);

createUiLine(0.55, 0.08);

createUiLine(0.78, -0.12);

createUiLine(0.62, -0.32);

function createUiDot(x, y, color = 0xd0cec9) {
  const dot = new THREE.Mesh(
    new THREE.SphereGeometry(0.065, 24, 24),

    new THREE.MeshStandardMaterial({
      color,
      roughness: 0.65,
    }),
  );

  dot.position.set(x, y, 0.1);

  systemsCard.add(dot);
}

createUiDot(0.38, 0.08);

createUiDot(0.58, 0.08);

createUiDot(0.38, -0.12);

createUiDot(0.58, -0.12);

createUiDot(0.38, -0.32);

createUiDot(0.58, -0.32, COLORS.red);

/* RED CTA */

const systemsButton = new THREE.Mesh(
  new THREE.BoxGeometry(0.3, 0.16, 0.05),

  new THREE.MeshStandardMaterial({
    color: COLORS.red,
    roughness: 0.6,
  }),
);

systemsButton.position.set(0.46, -0.47, 0.1);

systemsCard.add(systemsButton);

systemsCard.position.set(-1.15, 1.65, -0.1);

systemsCard.rotation.set(-0.04, 0.18, -0.03);

systemsCard.scale.setScalar(0.88);

floatingObjects.add(systemsCard);

/* =====================================================
   02 — WIREFRAME OBJECT
===================================================== */

const wireframeObject = new THREE.Group();

const blockMaterial = new THREE.MeshStandardMaterial({
  color: 0xe5e2dd,
  roughness: 0.82,
});

function createBlock(width, height, depth, x, y, z) {
  const block = new THREE.Mesh(
    new THREE.BoxGeometry(width, height, depth),
    blockMaterial,
  );

  block.position.set(x, y, z);

  wireframeObject.add(block);

  return block;
}

createBlock(0.65, 0.42, 0.55, 0.28, -0.34, 0);

createBlock(0.48, 0.42, 0.55, 0.18, 0.06, 0);

createBlock(0.3, 0.42, 0.55, 0.1, 0.46, 0);

const wireGeometry = new THREE.BoxGeometry(1.45, 1.45, 1.3);

const wireEdges = new THREE.EdgesGeometry(wireGeometry);

const wireMaterial = new THREE.LineBasicMaterial({
  color: 0xb7b0a8,
  transparent: true,
  opacity: 0.9,
});

const cubeWireframe = new THREE.LineSegments(wireEdges, wireMaterial);

wireframeObject.add(cubeWireframe);

const diagonalMaterial = new THREE.LineBasicMaterial({
  color: 0xc8c2ba,
  transparent: true,
  opacity: 0.8,
});

function createLine(start, end) {
  const geometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(...start),
    new THREE.Vector3(...end),
  ]);

  const line = new THREE.Line(geometry, diagonalMaterial);

  wireframeObject.add(line);
}

createLine([-0.72, -0.72, 0.65], [0.72, 0.72, 0.65]);

createLine([-0.72, 0.72, 0.65], [0.72, -0.72, 0.65]);

wireframeObject.position.set(2.15, 1.45, -0.15);

wireframeObject.rotation.set(-0.08, -0.25, 0.02);

wireframeObject.scale.setScalar(0.86);

floatingObjects.add(wireframeObject);

/* =====================================================
   03 — CODE CARD
===================================================== */

const codeCard = new THREE.Group();

const codeBg = new THREE.Mesh(
  new THREE.BoxGeometry(1.55, 1.42, 0.12),

  new THREE.MeshStandardMaterial({
    color: 0x292929,
    roughness: 0.88,
  }),
);

codeCard.add(codeBg);

function createCodeLine(width, y, color = 0x77746f) {
  const line = new THREE.Mesh(
    new THREE.BoxGeometry(width, 0.075, 0.04),

    new THREE.MeshStandardMaterial({
      color,
      roughness: 0.8,
    }),
  );

  line.position.set(-0.15, y, 0.08);

  codeCard.add(line);
}

createCodeLine(0.65, 0.1);

createCodeLine(0.92, -0.15);

createCodeLine(0.62, -0.4);

createCodeLine(0.48, -0.6, COLORS.red);

const slashMaterial = new THREE.MeshStandardMaterial({
  color: COLORS.red,
  roughness: 0.65,
});

function createSlash(x, rotation) {
  const slash = new THREE.Mesh(
    new THREE.BoxGeometry(0.07, 0.5, 0.055),
    slashMaterial,
  );

  slash.position.set(x, 0.4, 0.09);

  slash.rotation.z = rotation;

  codeCard.add(slash);
}

createSlash(-0.18, -0.55);

createSlash(0.18, 0.55);

const centerSlash = new THREE.Mesh(
  new THREE.BoxGeometry(0.055, 0.5, 0.055),
  slashMaterial,
);

centerSlash.position.set(0, 0.4, 0.09);

centerSlash.rotation.z = -0.18;

codeCard.add(centerSlash);

codeCard.position.set(-2.05, -1.4, 0);

codeCard.rotation.set(0.06, 0.16, -0.02);

codeCard.scale.setScalar(0.88);

floatingObjects.add(codeCard);

/* =====================================================
   CAPABILITY HOVER INTERACTION
===================================================== */

const capabilityRows = document.querySelectorAll(".capability-row");

const capabilityMap = {
  systems: systemsCard,
  foundations: wireframeObject,
  interface: codeCard,
};

/*
  Store target scales separately.
  We animate toward these values inside animate().
*/

const objectScaleTargets = {
  systems: 0.88,
  foundations: 0.86,
  interface: 0.88,
};

const objectScaleDefaults = {
  systems: 0.88,
  foundations: 0.86,
  interface: 0.88,
};

const HOVER_SCALE_MULTIPLIER = 1.22;

function activateCapability(targetName) {
  capabilityRows.forEach((row) => {
    row.classList.toggle("is-active", row.dataset.target === targetName);
  });

  Object.keys(capabilityMap).forEach((key) => {
    const baseScale = objectScaleDefaults[key];

    objectScaleTargets[key] =
      key === targetName ? baseScale * HOVER_SCALE_MULTIPLIER : baseScale;
  });
}

function resetCapabilities() {
  capabilityRows.forEach((row) => {
    row.classList.remove("is-active");
  });

  Object.keys(capabilityMap).forEach((key) => {
    objectScaleTargets[key] = objectScaleDefaults[key];
  });
}

capabilityRows.forEach((row) => {
  row.addEventListener("mouseenter", () => {
    activateCapability(row.dataset.target);
  });

  row.addEventListener("focus", () => {
    activateCapability(row.dataset.target);
  });

  row.addEventListener("mouseleave", resetCapabilities);
  row.addEventListener("blur", resetCapabilities);
});

/* =====================================================
   CLOCK
===================================================== */

const clock = new THREE.Clock();

/* =====================================================
   ANIMATION
===================================================== */

function animate() {
  const time = clock.getElapsedTime();

  /* AVATAR FLOAT */

  avatar.position.y = AVATAR_Y + Math.sin(time * 0.85) * 0.025;

  /* POINTER FOLLOW */

  avatar.rotation.y += (pointer.x * 0.14 - avatar.rotation.y) * 0.035;

  avatar.rotation.x += (-pointer.y * 0.05 - avatar.rotation.x) * 0.035;

  /* EYES */

  leftEye.position.x = -0.42 + pointer.x * 0.1;

  rightEye.position.x = 0.42 + pointer.x * 0.1;

  leftEye.position.y = 0.22 - pointer.y * 0.1;

  rightEye.position.y = 0.22 - pointer.y * 0.1;

  /* SYSTEM CARD */

  systemsCard.position.y = 1.65 + Math.sin(time * 0.75) * 0.06;

  /* WIREFRAME */

  wireframeObject.position.y = 1.45 + Math.sin(time * 0.65 + 1.5) * 0.07;

  /* CODE */

  codeCard.position.y = -1.4 + Math.sin(time * 0.8 + 3) * 0.05;

  /* ROTATE WIREFRAME */

  wireframeObject.rotation.y += 0.0015;

  /* PARALLAX */

  floatingObjects.rotation.y +=
    (pointer.x * 0.06 - floatingObjects.rotation.y) * 0.03;

  floatingObjects.rotation.x +=
    (-pointer.y * 0.035 - floatingObjects.rotation.x) * 0.03;

  /* =========================
   CAPABILITY SCALE ANIMATION
========================= */

  systemsCard.scale.x +=
    (objectScaleTargets.systems - systemsCard.scale.x) * 0.08;

  systemsCard.scale.y +=
    (objectScaleTargets.systems - systemsCard.scale.y) * 0.08;

  systemsCard.scale.z +=
    (objectScaleTargets.systems - systemsCard.scale.z) * 0.08;

  wireframeObject.scale.x +=
    (objectScaleTargets.foundations - wireframeObject.scale.x) * 0.08;

  wireframeObject.scale.y +=
    (objectScaleTargets.foundations - wireframeObject.scale.y) * 0.08;

  wireframeObject.scale.z +=
    (objectScaleTargets.foundations - wireframeObject.scale.z) * 0.08;

  codeCard.scale.x += (objectScaleTargets.interface - codeCard.scale.x) * 0.08;

  codeCard.scale.y += (objectScaleTargets.interface - codeCard.scale.y) * 0.08;

  codeCard.scale.z += (objectScaleTargets.interface - codeCard.scale.z) * 0.08;

  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}

animate();

/* =====================================================
   RESIZE
===================================================== */

function resizeAvatar() {
  const width = container.clientWidth;

  const height = container.clientHeight;

  if (!width || !height) {
    return;
  }

  camera.aspect = width / height;

  camera.updateProjectionMatrix();

  renderer.setSize(width, height, false);

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

window.addEventListener("resize", resizeAvatar);

resizeAvatar();
