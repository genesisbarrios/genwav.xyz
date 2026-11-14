import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as Tone from "tone";

// The 3D studio homepage. The desk comes from the original workspace model; the
// room around it (wall, foam, window, neon signs, guitars, plants, lamp) is built
// here. Click the keys to play, the pads for drums, the guitars to strum them
// (hover strums too, once audio is unlocked), the speakers for "UP", and the
// monitor to open genwavOS.

const MODEL_URL = "/models/workspace2.glb";
const UP_AUDIO = "/UP/UP%20-%20gen.wav%20(Master).mp3"; // "UP" by gen.wav, served from public/UP

// Objects from the model that the original scene showed; the rest are hidden
const VISIBLE = new Set([
  "akai_lp", "cylinder", "krkspeakerl_rubber_0001", "krkspeakerl_rubber_0002",
  "object_5", "cords", "object_4001", "plane001", "table001",
]);
const SPEAKERS = ["krkspeakerl_rubber_0001", "krkspeakerl_rubber_0002"];
// Objects used to size the desk to the view
const FRAME = new Set(["akai_lp", "krkspeakerl_rubber_0001", "krkspeakerl_rubber_0002", "plane001", "cylinder", "object_4001"]);
const FIT_SIZE = 6.6;
const MONITOR_STRETCH = 1.5; // make the (very wide) monitor closer to 16:9
export const NEON_BLUE = 0x4fe3ff; // speakers, blue foam and the homepage menu text
const SPEAKER_SCALE = 1.18;
const KEYBOARD_SCALE = 1.2;
const KEYBOARD_TILT = 0.32;   // radians the MPK leans toward you on its stand
const KEYBOARD_SHIFT = 0.2;   // how far right it sits, as a fraction of the desk width

// On the MPK Mini mesh, as fractions of its local bounding box:
// u runs along the width (x), v from the back (0) to the front (1)
// (measured from the mesh: the 10 black keys sit at u = 0.028 + n * 0.0617)
const KEYS = { uStart: 0.028, uEnd: 0.953, vBack: 0.55, vFront: 0.995, blackDepth: 0.56 };
// The 8 pads and the small buttons, as [u0, u1, v0, v1] rectangles measured from the mesh
const PAD_COLS = [[0.184, 0.269], [0.291, 0.376], [0.401, 0.486], [0.509, 0.594]];
const PAD_ROWS = [[0.055, 0.205], [0.215, 0.405]]; // back row (pads 5-8), front row (pads 1-4)
const BUTTON_RECTS = [[0.03, 0.165, 0.2, 0.42], [0.64, 0.975, 0.33, 0.445]]; // left grid, row under the knobs
const WHITE_COUNT = 15; // C3..C5
// Heights (0-1 of the keyboard's height) for the MK4 colors, measured from the mesh:
// keys sit above the case front; pads, buttons and knobs rise from the deck (0.807),
// and the accent color marks the tops of the tallest ones (knob caps, joystick)
const MK4 = { keysAbove: 0.45, raisedAbove: 0.8085, knobAbove: 0.86, accentAbove: 0.95 };
const WHITE_SEMITONES = [0, 2, 4, 5, 7, 9, 11];
const HAS_BLACK_BEFORE = new Set([1, 2, 4, 5, 6]); // D, E, G, A, B have a sharp before them
const BASE_MIDI = 48; // C3

// Computer keyboard: A row = white keys, W row = black keys (like a DAW)
const QWERTY = {
  a: 0, w: 1, s: 2, e: 3, d: 4, f: 5, t: 6, g: 7, y: 8, h: 9, u: 10, j: 11,
  k: 12, o: 13, l: 14, p: 15, ";": 16, "'": 17,
};

function keyFromUV(u, v) {
  const x = (u - KEYS.uStart) / (KEYS.uEnd - KEYS.uStart);
  const z = (v - KEYS.vBack) / (KEYS.vFront - KEYS.vBack);
  if (x < 0 || x >= 1 || z < 0 || z > 1) return null;
  const w = x * WHITE_COUNT;
  const white = Math.floor(w);
  if (z < KEYS.blackDepth) {
    // Black keys straddle the line between two white keys
    const boundary = Math.round(w);
    const deg = boundary % 7;
    if (Math.abs(w - boundary) < 0.32 && boundary > 0 && boundary < WHITE_COUNT && HAS_BLACK_BEFORE.has(deg)) {
      const midi = BASE_MIDI + Math.floor(boundary / 7) * 12 + WHITE_SEMITONES[deg] - 1;
      return { midi, black: true, center: boundary / WHITE_COUNT };
    }
  }
  const midi = BASE_MIDI + Math.floor(white / 7) * 12 + WHITE_SEMITONES[white % 7];
  return { midi, black: false, center: (white + 0.5) / WHITE_COUNT };
}

function midiToKeyInfo(midi) {
  const rel = midi - BASE_MIDI;
  const octave = Math.floor(rel / 12);
  const semi = rel % 12;
  const deg = WHITE_SEMITONES.indexOf(semi);
  if (deg >= 0) return { midi, black: false, center: (octave * 7 + deg + 0.5) / WHITE_COUNT };
  return { midi, black: true, center: (octave * 7 + WHITE_SEMITONES.indexOf(semi + 1)) / WHITE_COUNT };
}

// Pad 0-7, MPK layout: front row 1-4, back row 5-8
function padFromUV(u, v) {
  const col = PAD_COLS.findIndex(([a, b]) => u >= a && u <= b);
  const row = PAD_ROWS.findIndex(([a, b]) => v >= a && v <= b);
  if (col < 0 || row < 0) return null;
  return (row === 1 ? 0 : 4) + col;
}

// ── textures drawn on canvases ────────────────────────────────────────────────

function canvasTexture(w, h, draw) {
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  draw(c.getContext("2d"), w, h);
  const t = new THREE.CanvasTexture(c);
  t.encoding = THREE.sRGBEncoding;
  t.anisotropy = 8;
  return t;
}

// The monitor screen: a genwav97 window with an Enter button
function drawScreen(ctx, hover) {
  const { width: W, height: H } = ctx.canvas;
  const S = Math.min(W, H);
  ctx.fillStyle = "#00000d";
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "rgba(115,236,255,0.04)";
  for (let y = 0; y < H; y += 6) ctx.fillRect(0, y, W, 2);

  const pad = S * 0.08;
  const barH = S * 0.11;
  ctx.strokeStyle = "#73ecff";
  ctx.lineWidth = S * 0.01;
  ctx.strokeRect(pad, pad, W - pad * 2, H - pad * 2);
  ctx.fillStyle = "#73ecff";
  ctx.fillRect(pad, pad, W - pad * 2, barH);
  ctx.fillStyle = "#00000d";
  ctx.font = `bold ${Math.round(S * 0.065)}px "Courier New", monospace`;
  ctx.textBaseline = "middle";
  ctx.textAlign = "left";
  ctx.fillText("genwav97", pad + S * 0.04, pad + barH / 2);
  ctx.textAlign = "right";
  ctx.fillText("_ □ ×", W - pad - S * 0.04, pad + barH / 2);

  ctx.textAlign = "center";
  ctx.fillStyle = "#73ecff";
  ctx.font = `bold ${Math.round(S * 0.13)}px "Courier New", monospace`;
  ctx.fillText("genwavOS", W / 2, H * 0.42);
  ctx.font = `${Math.round(S * 0.05)}px "Courier New", monospace`;
  ctx.globalAlpha = 0.75;
  ctx.fillText("click to step inside", W / 2, H * 0.53);
  ctx.globalAlpha = 1;

  const bw = S * 0.5, bh = S * 0.16, bx = (W - bw) / 2, by = H * 0.62;
  ctx.shadowColor = "#73ecff";
  ctx.shadowBlur = hover ? 40 : 18;
  ctx.fillStyle = hover ? "#73ecff" : "#00000d";
  ctx.fillRect(bx, by, bw, bh);
  ctx.shadowBlur = 0;
  ctx.lineWidth = S * 0.008;
  ctx.strokeRect(bx, by, bw, bh);
  ctx.fillStyle = hover ? "#00000d" : "#73ecff";
  ctx.font = `bold ${Math.round(S * 0.085)}px "Courier New", monospace`;
  ctx.fillText("ENTER ▸", W / 2, by + bh / 2);
}

// Miami at night: a few towers over Biscayne Bay, with a palm or two
function windowTexture(aspect = 1) {
  return canvasTexture(512, Math.round(512 / aspect), (ctx, W, H) => {
    const k = H / 512; // towers and palms scale with a shorter (landscape) window
    const sky = ctx.createLinearGradient(0, 0, 0, H * 0.72);
    sky.addColorStop(0, "#0a0b2e"); sky.addColorStop(0.65, "#3b1a5c"); sky.addColorStop(1, "#c2457a");
    ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#fff";
    for (let i = 0; i < 60; i++) { ctx.globalAlpha = Math.random() * 0.7; ctx.fillRect(Math.random() * W, Math.random() * H * 0.4, 2, 2); }
    ctx.globalAlpha = 1;
    const shore = H * 0.72;
    // [x, width, height, top style, lit color]
    const towers = [
      [10, 46, 150, "flat", "#ffd36b"], [60, 38, 210, "spire", "#9ff3ff"], [102, 58, 175, "flat", "#ffd36b"],
      [166, 52, 300, "miami", "#ff4fd8"], [224, 40, 240, "ladder", "#ffd36b"], [270, 62, 200, "flat", "#9ff3ff"],
      [338, 44, 265, "spire", "#ffd36b"], [388, 56, 185, "flat", "#ff4fd8"], [450, 50, 225, "flat", "#ffd36b"],
    ];
    for (const [x, w, h0, top, lit] of towers) {
      const h = h0 * k, y = shore - h;
      ctx.fillStyle = "#0c0a1c"; ctx.fillRect(x, y, w, h);
      ctx.fillStyle = lit;
      for (let wy = y + 12; wy < shore - 6; wy += 13) for (let wx = x + 5; wx < x + w - 6; wx += 9) {
        if (Math.random() < 0.38) ctx.fillRect(wx, wy, 4, 6);
      }
      if (top === "spire") { ctx.fillStyle = "#0c0a1c"; ctx.fillRect(x + w / 2 - 2, y - 40, 4, 40); }
      if (top === "ladder") { ctx.strokeStyle = lit; ctx.lineWidth = 2; for (let i = 0; i < 4; i++) ctx.strokeRect(x + 6, y - 8 - i * 9, w - 12, 7); }
      if (top === "miami") {
        // stepped, rounded crown lit up like the Miami Tower
        for (let i = 0; i < 3; i++) {
          ctx.fillStyle = ["#ff4fd8", "#2fd8ff", "#ffffff"][i];
          ctx.beginPath(); ctx.arc(x + w / 2, y - i * 14, w / 2 - i * 8, Math.PI, 0); ctx.fill();
        }
      }
    }
    // bay with reflections
    const bay = ctx.createLinearGradient(0, shore, 0, H);
    bay.addColorStop(0, "#1a1240"); bay.addColorStop(1, "#05040f");
    ctx.fillStyle = bay; ctx.fillRect(0, shore, W, H - shore);
    for (const [x, w, , , lit] of towers) {
      ctx.fillStyle = lit; ctx.globalAlpha = 0.25;
      for (let ry = shore + 4; ry < H; ry += 7) ctx.fillRect(x + w * 0.2 + Math.sin(ry) * 3, ry, w * 0.6, 2);
    }
    ctx.globalAlpha = 1;
    // palms in the foreground
    const palm = (px, ph) => {
      ctx.strokeStyle = "#05040c"; ctx.lineWidth = 6;
      ctx.beginPath(); ctx.moveTo(px, H); ctx.quadraticCurveTo(px + 18, H - ph / 2, px + 8, H - ph); ctx.stroke();
      ctx.lineWidth = 5;
      for (let i = 0; i < 7; i++) {
        const a = -Math.PI + (i / 6) * Math.PI;
        ctx.beginPath(); ctx.moveTo(px + 8, H - ph);
        ctx.quadraticCurveTo(px + 8 + Math.cos(a) * 30, H - ph - 18, px + 8 + Math.cos(a) * 55, H - ph + 22 + Math.abs(Math.sin(a)) * -10);
        ctx.stroke();
      }
    };
    palm(30, 190 * k); palm(455, 160 * k);
  });
}

// Monstera leaf with its splits and holes cut out (`variegated`: white patches,
// like a white/Albo monstera)
function monsteraTexture(variegated = false) {
  return canvasTexture(512, 512, (ctx) => {
    ctx.beginPath();
    ctx.moveTo(256, 480);
    ctx.bezierCurveTo(60, 470, 6, 250, 120, 100);
    ctx.bezierCurveTo(180, 30, 236, 40, 256, 70);
    ctx.bezierCurveTo(276, 40, 332, 30, 392, 100);
    ctx.bezierCurveTo(506, 250, 452, 470, 256, 480);
    const g = ctx.createRadialGradient(256, 300, 20, 256, 260, 260);
    g.addColorStop(0, "#3f8f3a"); g.addColorStop(1, "#1d5a24");
    ctx.fillStyle = g; ctx.fill();
    // splits from the edge toward the midrib, and a few holes
    ctx.globalCompositeOperation = "destination-out";
    for (const side of [-1, 1]) {
      for (let i = 0; i < 6; i++) {
        const a = -1.1 + i * 0.42;
        const ex = 256 + side * Math.cos(a) * 260, ey = 270 + Math.sin(a) * 230;
        const ix = 256 + side * Math.cos(a) * 70, iy = 270 + Math.sin(a) * 55;
        ctx.beginPath(); ctx.moveTo(ex, ey - 9); ctx.lineTo(ix, iy); ctx.lineTo(ex, ey + 9); ctx.closePath(); ctx.fill();
        if (i % 2 === 0) { ctx.beginPath(); ctx.ellipse(256 + side * Math.cos(a) * 45, 270 + Math.sin(a) * 38, 7, 12, a, 0, Math.PI * 2); ctx.fill(); }
      }
    }
    ctx.globalCompositeOperation = "source-atop";
    if (variegated) {
      ctx.fillStyle = "#f3f6ee";
      for (let i = 0; i < 9; i++) {
        ctx.beginPath();
        ctx.ellipse(70 + Math.random() * 370, 90 + Math.random() * 360, 30 + Math.random() * 70, 18 + Math.random() * 50, Math.random() * Math.PI, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillRect(256, 60, 256, 440); // one half-moon leaf side
    }
    ctx.strokeStyle = "#7bc46a"; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(256, 480); ctx.lineTo(256, 70); ctx.stroke();
    ctx.globalCompositeOperation = "source-over";
  });
}

// MPK Mini MK4 look on the single-material keyboard mesh: light grey top, dark
// grey sides, grey pads, white and black keys, black buttons and knobs with neon
// blue tops. Picked by
// position on the keyboard, using the key layout measured from the mesh.
// GLSL: is (u, v) inside any of these [u0, u1, v0, v1] rectangles (with a hair of margin)?
function rectTest(rects, m = 0.004) {
  return "(" + rects.map(([u0, u1, v0, v1]) => `(u > ${(u0 - m).toFixed(4)} && u < ${(u1 + m).toFixed(4)} && v > ${(v0 - m).toFixed(4)} && v < ${(v1 + m).toFixed(4)})`).join(" || ") + ")";
}

function mk4Material(box) {
  const mat = new THREE.MeshStandardMaterial({ roughness: 0.55, metalness: 0.05 });
  const c = (hex) => new THREE.Color(hex).convertSRGBToLinear(); // shader colors are linear
  mat.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, {
      uMin: { value: box.min.clone() }, uSize: { value: box.getSize(new THREE.Vector3()) },
      uTop: { value: c(0xc4c7cc) }, uSide: { value: c(0x3c3e43) }, uPad: { value: c(0x5f6268) },
      uWhite: { value: c(0xf6f6f4) }, uBlack: { value: c(0x111112) }, uAccent: { value: c(NEON_BLUE) }, uButton: { value: c(0x141416) },
    });
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nvarying vec3 vLocal;\nvarying vec3 vLocalNormal;")
      .replace("#include <begin_vertex>", "#include <begin_vertex>\nvLocal = position;\nvLocalNormal = normal;");
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", `#include <common>
varying vec3 vLocal;
varying vec3 vLocalNormal;
uniform vec3 uMin, uSize, uTop, uSide, uPad, uWhite, uBlack, uAccent, uButton;
vec3 mk4Color() {
  vec3 p = (vLocal - uMin) / uSize;           // x: along the keys, y: height, z: back(0) to front(1)
  float u = p.x, h = p.y, v = p.z;
  float kx = (u - ${KEYS.uStart.toFixed(3)}) / ${(KEYS.uEnd - KEYS.uStart).toFixed(3)};
  float kz = (v - ${KEYS.vBack.toFixed(3)}) / ${(KEYS.vFront - KEYS.vBack).toFixed(3)};
  if (kx >= 0.0 && kx < 1.0 && kz >= -0.02 && kz <= 1.02 && h > ${MK4.keysAbove.toFixed(3)}) {
    float w = kx * ${WHITE_COUNT}.0;
    float b = floor(w + 0.5);
    float deg = mod(b, 7.0);
    bool sharp = deg == 1.0 || deg == 2.0 || deg == 4.0 || deg == 5.0 || deg == 6.0;
    bool black = kz < ${KEYS.blackDepth.toFixed(3)} && abs(w - b) < 0.3 && b > 0.0 && b < ${WHITE_COUNT}.0 && sharp;
    return black ? uBlack : uWhite;
  }
  bool raised = h > ${MK4.raisedAbove.toFixed(3)};                 // above the deck
  // the 8 pads: whole pad grey, tops and sides
  if (raised && ${rectTest(PAD_COLS.flatMap(([u0, u1]) => PAD_ROWS.map(([v0, v1]) => [u0, u1, v0, v1])))}) return uPad;
  // small buttons: solid black
  if (raised && ${rectTest(BUTTON_RECTS)}) return uButton;
  // knobs and joystick (the tall controls): black with neon blue tops
  if (h > ${MK4.knobAbove.toFixed(3)} && v < 0.5) return h > ${MK4.accentAbove.toFixed(3)} ? uAccent : uButton;
  if (abs(normalize(vLocalNormal).y) < 0.45) return uSide;        // sides of the case
  return uTop;
}`)
      .replace("vec4 diffuseColor = vec4( diffuse, opacity );", "vec4 diffuseColor = vec4( mk4Color(), opacity );");
  };
  return mat;
}

// ── room props ────────────────────────────────────────────────────────────────

const std = (color, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.8, ...extra });

function neonTube(points, color, radius, closed = true) {
  const curve = new THREE.CatmullRomCurve3(points, closed, "catmullrom", 0.1);
  const group = new THREE.Group();
  const core = new THREE.Mesh(
    new THREE.TubeGeometry(curve, points.length * 12, radius, 8, closed),
    new THREE.MeshBasicMaterial({ color, toneMapped: false })
  );
  const halo = new THREE.Mesh(
    new THREE.TubeGeometry(curve, points.length * 12, radius * 3.2, 8, closed),
    new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.18, toneMapped: false, depthWrite: false, blending: THREE.AdditiveBlending })
  );
  group.add(core, halo);
  return group;
}

function alienSign(size) {
  const g = new THREE.Group();
  const head = [];
  // inverted teardrop: wide dome, narrow chin
  for (let i = 0; i < 40; i++) {
    const t = (i / 40) * Math.PI * 2;
    const x = Math.sin(t) * 0.42 * (1 - 0.35 * Math.max(0, -Math.cos(t)));
    const y = Math.cos(t) * 0.5 + (Math.cos(t) < 0 ? Math.cos(t) * 0.12 : 0);
    head.push(new THREE.Vector3(x * size, y * size, 0));
  }
  g.add(neonTube(head, NEON_BLUE, size * 0.022));
  for (const side of [-1, 1]) {
    const eye = new THREE.Shape();
    eye.absellipse(0, 0, 0.16 * size, 0.075 * size, 0, Math.PI * 2);
    const m = new THREE.Mesh(new THREE.ShapeGeometry(eye), new THREE.MeshBasicMaterial({ color: 0xff2fd1, toneMapped: false }));
    m.position.set(side * 0.17 * size, -0.02 * size, 0.01);
    m.rotation.z = side * 0.5;
    const glow = new THREE.Mesh(new THREE.ShapeGeometry(eye), new THREE.MeshBasicMaterial({ color: 0xff2fd1, transparent: true, opacity: 0.25, toneMapped: false, depthWrite: false, blending: THREE.AdditiveBlending }));
    glow.scale.setScalar(1.35); glow.position.copy(m.position); glow.position.z = 0.005; glow.rotation.z = m.rotation.z;
    g.add(m, glow);
  }
  return g;
}

function boltSign(size) {
  const pts = [[0.1, 0.5], [-0.25, -0.02], [0.02, -0.02], [-0.12, -0.5], [0.26, 0.08], [-0.02, 0.08], [0.18, 0.5]]
    .map(([x, y]) => new THREE.Vector3(x * size, y * size, 0));
  return neonTube(pts, 0xff2fd1, size * 0.025);
}

function guitarShape() {
  const s = new THREE.Shape();
  s.moveTo(0, -0.5);
  s.bezierCurveTo(0.42, -0.5, 0.47, -0.12, 0.3, 0.02);
  s.bezierCurveTo(0.24, 0.08, 0.34, 0.22, 0.3, 0.36);
  s.bezierCurveTo(0.26, 0.5, 0.08, 0.52, 0, 0.5);
  s.bezierCurveTo(-0.08, 0.52, -0.26, 0.5, -0.3, 0.36);
  s.bezierCurveTo(-0.34, 0.22, -0.24, 0.08, -0.3, 0.02);
  s.bezierCurveTo(-0.47, -0.12, -0.42, -0.5, 0, -0.5);
  return s;
}

function guitar(size, { body, acoustic }) {
  const g = new THREE.Group();
  g.add(new THREE.Mesh(
    new THREE.ExtrudeGeometry(guitarShape(), { depth: acoustic ? 0.16 : 0.08, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.02, bevelSegments: 3, curveSegments: 32 }),
    std(body, { roughness: 0.35, metalness: 0.1 })
  ));
  const front = acoustic ? 0.18 : 0.1;
  if (acoustic) {
    const hole = new THREE.Mesh(new THREE.CircleGeometry(0.11, 32), new THREE.MeshBasicMaterial({ color: 0x0a0604 }));
    hole.position.set(0, 0.12, front + 0.001);
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.11, 0.13, 32), std(0xe8d9b0));
    ring.position.set(0, 0.12, front + 0.002);
    g.add(hole, ring);
  } else {
    const guard = new THREE.Mesh(new THREE.ShapeGeometry(guitarShape()), std(0xf2f2ee, { roughness: 0.4 }));
    guard.scale.setScalar(0.62); guard.position.set(0.06, -0.08, front + 0.002);
    g.add(guard);
    for (const y of [-0.05, 0.12]) {
      const pu = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.06, 0.02), std(0x111111));
      pu.position.set(0, y, front + 0.012); g.add(pu);
    }
  }
  const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.04, 0.03), std(0x1a1210));
  bridge.position.set(0, -0.25, front + 0.015);
  const neck = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.0, 0.05), std(0x4a2c18));
  neck.position.set(0, 0.98, front - 0.02);
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.24, 0.04), std(0x1b1b1b));
  head.position.set(0, 1.58, front - 0.03);
  g.add(bridge, neck, head);
  // Strings run bridge → nut, each split into short segments so they can
  // vibrate (see the render loop). userData.strings keeps the rest positions.
  const STRING_SEGMENTS = 16;
  const pts = [];
  for (let i = 0; i < 6; i++) {
    const x = -0.03 + i * 0.012;
    const a = new THREE.Vector3(x, -0.25, front + 0.035), b = new THREE.Vector3(x, 1.47, front + 0.008);
    for (let k = 0; k < STRING_SEGMENTS; k++) {
      pts.push(a.clone().lerp(b, k / STRING_SEGMENTS), a.clone().lerp(b, (k + 1) / STRING_SEGMENTS));
    }
  }
  const stringGeo = new THREE.BufferGeometry().setFromPoints(pts);
  const strings = new THREE.LineSegments(stringGeo, new THREE.LineBasicMaterial({ color: 0xcfcfcf }));
  strings.frustumCulled = false; // the moving vertices can leave the original bounds
  g.add(strings);
  g.userData.strings = { geo: stringGeo, rest: stringGeo.attributes.position.array.slice(), segments: STRING_SEGMENTS };
  g.scale.setScalar(size);
  g.traverse((o) => { if (o.isMesh) o.castShadow = true; });
  return g;
}

// A-frame floor stand holding two guitars
function guitarStand(size) {
  const g = new THREE.Group();
  const mat = std(0x151515, { metalness: 0.6, roughness: 0.4 });
  const tube = (len, x, y, z, rx = 0, rz = 0) => {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(0.012 * size, 0.012 * size, len * size, 8), mat);
    m.position.set(x * size, y * size, z * size); m.rotation.set(rx, 0, rz);
    m.castShadow = true; g.add(m);
  };
  tube(1.6, -0.55, 0.012, 0, 0, Math.PI / 2);           // base rail
  tube(0.5, -0.55, 0.012, 0.0, Math.PI / 2, 0);         // feet
  tube(0.5, -0.55 + 0.75, 0.012, 0.0, Math.PI / 2, 0);
  tube(0.5, -0.55 - 0.75, 0.012, 0.0, Math.PI / 2, 0);
  tube(1.6, -0.55, 0.26, 0.12, 0, Math.PI / 2);          // cradle bar the bodies sit on
  tube(1.6, -0.55, 1.15, -0.2, 0, Math.PI / 2);          // neck rest
  for (const x of [-1.32, 0.22]) { tube(1.2, x, 0.6, -0.04, -0.28, 0); } // uprights, leaning back
  return g;
}

function pot(radius, height, color) {
  const g = new THREE.Group();
  const p = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius * 0.78, height, 32), std(color, { roughness: 0.9 }));
  p.position.y = height / 2;
  const soil = new THREE.Mesh(new THREE.CircleGeometry(radius * 0.94, 32), std(0x2b1d14, { roughness: 1 }));
  soil.rotation.x = -Math.PI / 2; soil.position.y = height * 0.94;
  g.add(p, soil);
  g.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  return g;
}

function monstera(size, leafTex, omit = []) {
  const g = new THREE.Group();
  const potH = 0.35 * size;
  g.add(pot(0.28 * size, potH, 0xd8d2c4));
  const leafGeo = new THREE.PlaneGeometry(1, 1);
  leafGeo.translate(0, 0.5, 0);
  const leafMat = new THREE.MeshStandardMaterial({ map: leafTex, alphaTest: 0.5, side: THREE.DoubleSide, roughness: 0.6 });
  const stemMat = std(0x3c7a34);
  const leaves = 8;
  for (let i = 0; i < leaves; i++) {
    if (omit.includes(i)) continue;
    const a = (i / leaves) * Math.PI * 2 + (i % 2) * 0.3;
    const h = (0.55 + (i % 3) * 0.22) * size;
    const r = (0.25 + (i % 2) * 0.12) * size;
    const tip = new THREE.Vector3(Math.cos(a) * r, potH + h, Math.sin(a) * r);
    const stem = new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.QuadraticBezierCurve3(new THREE.Vector3(0, potH, 0), new THREE.Vector3(Math.cos(a) * r * 0.2, potH + h * 0.7, Math.sin(a) * r * 0.2), tip), 12, 0.012 * size, 6),
      stemMat
    );
    const leaf = new THREE.Mesh(leafGeo, leafMat);
    const ls = (0.42 + (i % 3) * 0.08) * size;
    leaf.scale.set(ls, ls, ls);
    leaf.position.copy(tip);
    leaf.rotation.order = "YXZ";
    leaf.rotation.y = -a + Math.PI / 2;
    leaf.rotation.x = -0.9 + (i % 2) * 0.25; // tilt outward/down like a real monstera
    leaf.userData.leaf = true;
    g.add(stem, leaf);
  }
  g.traverse((o) => { if (o.isMesh) o.castShadow = true; });
  return g;
}

// A fern frond: midrib with paired leaflets
function fernTexture() {
  return canvasTexture(128, 512, (ctx, W, H) => {
    ctx.strokeStyle = "#4e8a3a"; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(W / 2, H); ctx.lineTo(W / 2, 8); ctx.stroke();
    for (let y = H - 20; y > 14; y -= 14) {
      const len = (W / 2 - 6) * Math.sin(((H - y) / H) * Math.PI) * 0.95 + 6;
      ctx.fillStyle = y % 28 ? "#3f8f3a" : "#4fa346";
      for (const side of [-1, 1]) {
        ctx.beginPath();
        ctx.ellipse(W / 2 + side * len / 2, y - 4, len / 2, 5, side * -0.35, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  });
}

// Boston fern: a low burst of arching fronds
function fern(size, frondTex) {
  const g = new THREE.Group();
  const potH = 0.3 * size;
  g.add(pot(0.3 * size, potH, 0x2b2b30));
  const geo = new THREE.PlaneGeometry(0.28 * size, 1.1 * size, 1, 6);
  geo.translate(0, 0.55 * size, 0);
  // bend each frond so it arches over
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i) / (1.1 * size);
    pos.setZ(i, -y * y * 0.6 * size);
  }
  geo.computeVertexNormals();
  const mat = new THREE.MeshStandardMaterial({ map: frondTex, alphaTest: 0.5, side: THREE.DoubleSide, roughness: 0.7 });
  for (let i = 0; i < 18; i++) {
    const f = new THREE.Mesh(geo, mat);
    f.position.y = potH * 0.95;
    f.rotation.order = "YXZ";
    f.rotation.y = (i / 18) * Math.PI * 2 + (i % 3) * 0.2;
    f.rotation.x = 0.25 + (i % 4) * 0.12; // lean out
    f.scale.setScalar(0.75 + (i % 5) * 0.08);
    f.userData.leaf = true;
    g.add(f);
  }
  return g;
}

function succulent(size, color, tip) {
  const g = new THREE.Group();
  const potH = 0.18 * size;
  g.add(pot(0.16 * size, potH, 0xb5603a));
  const leafGeo = new THREE.SphereGeometry(1, 10, 8);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < 22; i++) {
    const t = i / 22;
    const leaf = new THREE.Mesh(leafGeo, std(new THREE.Color(color).lerp(new THREE.Color(tip), t * 0.5), { roughness: 0.55 }));
    const len = (0.13 - t * 0.07) * size;
    leaf.scale.set(len * 0.42, len * 0.16, len);
    const a = i * golden, r = (0.11 - t * 0.09) * size;
    leaf.position.set(Math.cos(a) * r, potH + 0.02 * size + t * 0.06 * size, Math.sin(a) * r);
    leaf.rotation.order = "YXZ";
    leaf.rotation.y = -a + Math.PI / 2;
    leaf.rotation.x = -0.25 - t * 0.9; // inner leaves point up
    leaf.userData.leaf = true;
    g.add(leaf);
  }
  g.traverse((o) => { if (o.isMesh) o.castShadow = true; });
  return g;
}

// Pointy dark green succulent (haworthia/aloe style)
function pointySucculent(size) {
  const g = new THREE.Group();
  const potH = 0.2 * size;
  g.add(pot(0.15 * size, potH, 0xe6e0d4));
  const geo = new THREE.ConeGeometry(0.035 * size, 0.42 * size, 6);
  geo.translate(0, 0.21 * size, 0); // pivot at the base
  const mat = std(0x2c5a34, { roughness: 0.6, flatShading: true });
  for (let i = 0; i < 16; i++) {
    const leaf = new THREE.Mesh(geo, mat);
    const a = i * 2.4, lean = 0.25 + (i % 4) * 0.18;
    leaf.position.set(Math.cos(a) * 0.04 * size, potH * 0.95, Math.sin(a) * 0.04 * size);
    leaf.rotation.order = "YXZ";
    leaf.rotation.y = -a + Math.PI / 2;
    leaf.rotation.x = lean;
    leaf.scale.y = 0.7 + (i % 3) * 0.2;
    leaf.userData.leaf = true;
    leaf.castShadow = true;
    g.add(leaf);
  }
  return g;
}

// ── component ─────────────────────────────────────────────────────────────────

export default function Studio3D() {
  const mountRef = useRef(null);
  const navigate = useNavigate();
  const navigateRef = useRef(navigate);
  navigateRef.current = navigate;
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [nowPlaying, setNowPlaying] = useState(false);
  const [touch] = useState(() => window.matchMedia?.("(pointer: coarse)").matches);

  useEffect(() => {
    const welcomeBox = document.getElementById("welcomeBox");
    if (welcomeBox) welcomeBox.style.display = "none";
  }, []);

  useEffect(() => {
    const mount = mountRef.current;
    const debug = new URLSearchParams(window.location.search).has("debug");
    let disposed = false;
    let raf = 0;

    // ── renderer / scene / camera ──
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.physicallyCorrectLights = true;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0c0c0e);
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 200);
    let eye = null; // where to stand once the desk is placed

    // Neon key lights from the original scene (no shadows: the lamp casts them)
    const blue = new THREE.DirectionalLight(0x00d4ff, 2.2);
    blue.position.set(-1.5, 7, 3);
    const red = new THREE.DirectionalLight(0xff3300, 1.6);
    red.position.set(1.5, 7, 3);
    scene.add(blue, red, new THREE.AmbientLight(0xffffff, 0.25), new THREE.HemisphereLight(0xffffff, 0x3a3a44, 0.6));
    // Soft front light from behind the viewer, so the room isn't dark
    const front = new THREE.DirectionalLight(0xfff4e8, 1.5);
    front.castShadow = true;
    front.shadow.mapSize.set(2048, 2048);
    front.shadow.bias = -0.0004;
    scene.add(front, front.target);

    // Objects that should sit at a preferred x but never be cut off by the
    // screen edge: { obj, homeX, fallbackX }. After each camera placement, each
    // goes to homeX, or as close to it as fits (searching toward fallbackX).
    const keepOnScreen = [];
    const _corner = new THREE.Vector3();
    const fitsOnScreen = (obj) => {
      obj.updateMatrixWorld(true);
      const box = new THREE.Box3().setFromObject(obj);
      const MARGIN = 0.94; // stay a little inside the edges (NDC)
      for (let i = 0; i < 8; i++) {
        _corner.set(i & 1 ? box.max.x : box.min.x, i & 2 ? box.max.y : box.min.y, i & 4 ? box.max.z : box.min.z).project(camera);
        if (_corner.x < -MARGIN || _corner.x > MARGIN) return false;
      }
      return true;
    };
    const fitOnScreen = () => {
      camera.updateMatrixWorld(true);
      for (const { obj, homeX, fallbackX } of keepOnScreen) {
        obj.position.x = homeX;
        if (fitsOnScreen(obj)) continue;
        // Binary search between home (doesn't fit) and fallback (assumed to fit)
        let lo = homeX, hi = fallbackX;
        for (let k = 0; k < 14; k++) {
          const mid = (lo + hi) / 2;
          obj.position.x = mid;
          if (fitsOnScreen(obj)) hi = mid; else lo = mid;
        }
        obj.position.x = hi;
      }
    };

    const placeCamera = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h;
      if (eye) {
        // Eye level with the screen; back far enough that the desk fills the width
        const hfov = 2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.aspect);
        const fitWidth = camera.aspect < 1 ? eye.fitWidthNarrow : eye.fitWidth;
        const dist = Math.max((fitWidth / 2) / Math.tan(hfov / 2), eye.minDist);
        camera.position.set(eye.target.x, eye.height, eye.depth + dist);
        camera.lookAt(eye.target);
      }
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      fitOnScreen();
    };
    placeCamera();
    window.addEventListener("resize", placeCamera);

    // ── screen texture ──
    const screenCanvas = document.createElement("canvas");
    screenCanvas.width = 1024;
    screenCanvas.height = 576;
    const screenCtx = screenCanvas.getContext("2d");
    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    screenTexture.encoding = THREE.sRGBEncoding;
    screenTexture.anisotropy = 8;
    screenTexture.flipY = false; // the model's screen UVs run top-down

    // ── audio ──
    const audioNodes = [];
    let synth = null, drums = null, strummers = null;
    const startAudio = async () => {
      if (synth) return;
      await Tone.start();
      const reverb = new Tone.Reverb({ decay: 2.5, wet: 0.22 }).toDestination();
      synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: "triangle8" },
        envelope: { attack: 0.005, decay: 0.25, sustain: 0.3, release: 0.9 },
      }).connect(reverb);
      synth.volume.value = -8;
      const bus = new Tone.Volume(-4).toDestination();
      const kick = new Tone.MembraneSynth({ pitchDecay: 0.05, octaves: 6, envelope: { attack: 0.001, decay: 0.4, sustain: 0 } }).connect(bus);
      const tom = new Tone.MembraneSynth({ pitchDecay: 0.08, octaves: 3, envelope: { attack: 0.001, decay: 0.3, sustain: 0 } }).connect(bus);
      const snareFilter = new Tone.Filter(1800, "highpass").connect(bus);
      const snare = new Tone.NoiseSynth({ noise: { type: "white" }, envelope: { attack: 0.001, decay: 0.18, sustain: 0 } }).connect(snareFilter);
      const snareBody = new Tone.MembraneSynth({ pitchDecay: 0.02, octaves: 2, envelope: { attack: 0.001, decay: 0.12, sustain: 0 } }).connect(bus);
      const clapFilter = new Tone.Filter(1200, "bandpass").connect(bus);
      const clap = new Tone.NoiseSynth({ noise: { type: "pink" }, envelope: { attack: 0.001, decay: 0.14, sustain: 0 } }).connect(clapFilter);
      const metal = (decay, extra = {}) => new Tone.MetalSynth({ envelope: { attack: 0.001, decay, release: 0.05 }, harmonicity: 5.1, modulationIndex: 32, resonance: 4000, octaves: 1.5, ...extra }).connect(bus);
      const hat = metal(0.06); hat.volume.value = -14;
      const openHat = metal(0.45); openHat.volume.value = -16;
      const crash = metal(1.4, { harmonicity: 3.1, modulationIndex: 20, resonance: 5000, octaves: 2 }); crash.volume.value = -18;
      // MPK pads 1-8
      drums = [
        () => kick.triggerAttackRelease("C1", "8n"),
        () => { snare.triggerAttackRelease("16n"); snareBody.triggerAttackRelease("G2", "16n"); },
        () => hat.triggerAttackRelease(300, "32n"),
        () => clap.triggerAttackRelease("16n"),
        () => tom.triggerAttackRelease("G1", "8n"),
        () => tom.triggerAttackRelease("D2", "8n"),
        () => openHat.triggerAttackRelease(300, "8n"),
        () => crash.triggerAttackRelease(250, "2n"),
      ];
      // Guitars: six plucked strings each (Karplus-Strong), strummed a few ms apart.
      // Acoustic is clean with a little body; electric goes through an amp-ish
      // distortion and a cab-like low-pass.
      const strings = (opts, dest) => [...Array(6)].map(() => new Tone.PluckSynth(opts).connect(dest));
      const acousticBody = new Tone.Filter(5200, "lowpass").connect(reverb);
      const acoustic = strings({ attackNoise: 1.2, dampening: 4200, resonance: 0.97 }, acousticBody);
      acoustic.forEach((st) => { st.volume.value = -6; });
      const cab = new Tone.Filter(3200, "lowpass").connect(bus);
      const drive = new Tone.Distortion({ distortion: 0.65, wet: 1 }).connect(cab);
      const electric = strings({ attackNoise: 2, dampening: 3000, resonance: 0.985 }, drive);
      electric.forEach((st) => { st.volume.value = -14; });
      strummers = { acoustic, electric };
      audioNodes.push(reverb, synth, bus, kick, tom, snareFilter, snare, snareBody, clapFilter, clap, hat, openHat, crash,
        acousticBody, cab, drive, ...acoustic, ...electric);
    };

    // Chords, low string first (MIDI notes). Each strum moves to the next one.
    const CHORDS = {
      acoustic: [[43, 47, 50, 55, 59, 67], [50, 57, 62, 66], [40, 47, 52, 55, 59, 64], [48, 52, 55, 60, 64]], // G, D, Em, C
      electric: [[40, 47, 52], [43, 50, 55], [45, 52, 57], [38, 45, 50]], // E5, G5, A5, D5
    };
    const chordIndex = { acoustic: 0, electric: 0 };
    const strum = (kind) => {
      if (!strummers) return; // audio isn't unlocked until the first click or key press
      const chord = CHORDS[kind][chordIndex[kind]++ % CHORDS[kind].length];
      const now = Tone.now();
      chord.forEach((midi, i) => {
        // downstroke: each string a little later, a touch of random timing like a hand
        strummers[kind][i].triggerAttack(Tone.Frequency(midi, "midi").toFrequency(), now + i * 0.022 + Math.random() * 0.006);
      });
    };

    // "UP" plays from the site itself (public/UP), not a third-party player, so
    // it starts on the first tap everywhere, iPhone included. While it plays,
    // an analyser measures its loudness and the speakers pump to it.
    let scPlaying = false; // "is UP playing" (name kept for the test hook)
    let upLevel = 0; // smoothed loudness 0..1
    const upAudio = new Audio();
    upAudio.preload = "none"; // 4 MB: only fetched when someone presses play
    upAudio.src = UP_AUDIO;
    upAudio.addEventListener("play", () => { scPlaying = true; setNowPlaying(true); });
    upAudio.addEventListener("pause", () => { scPlaying = false; setNowPlaying(false); });
    upAudio.addEventListener("ended", () => { scPlaying = false; setNowPlaying(false); upAudio.currentTime = 0; });
    let upAnalyser = null, upBins = null;
    const connectUpAnalyser = () => {
      if (upAnalyser) return;
      try {
        const ctx = Tone.getContext().rawContext;
        const src = ctx.createMediaElementSource(upAudio);
        upAnalyser = ctx.createAnalyser();
        upAnalyser.fftSize = 512;
        upBins = new Uint8Array(upAnalyser.frequencyBinCount);
        src.connect(upAnalyser);
        upAnalyser.connect(ctx.destination);
      } catch (e) {
        console.warn("UP analyser unavailable; playing without it", e);
      }
    };
    const toggleUp = async () => {
      if (!upAudio.paused) { upAudio.pause(); return; }
      await startAudio(); // unlocks the audio context inside this click
      connectUpAnalyser();
      try { await upAudio.play(); } catch (e) { console.error("Couldn't play UP", e); }
    };

    // ── model ──
    let room = null, akai = null, screen = null, akaiBox = null;
    const speakers = [];
    const plants = []; // leaves rustle when hovered/tapped
    const guitars = []; // strum when hovered/tapped
    const highlights = [];
    const bubbles = [];
    const bubbleGeo = new THREE.SphereGeometry(1, 16, 12);
    const pivot = new THREE.Group();
    scene.add(pivot);

    // Height of the keyboard surface at a point, in its local space
    const downRay = new THREE.Raycaster();
    const keySurfaceY = (lx, lz) => {
      const from = akai.localToWorld(new THREE.Vector3(lx, akaiBox.max.y + 5, lz));
      const to = akai.localToWorld(new THREE.Vector3(lx, akaiBox.min.y, lz));
      downRay.set(from, to.clone().sub(from).normalize());
      const hit = downRay.intersectObject(akai, true).find((h) => !highlights.includes(h.object));
      return hit ? akai.worldToLocal(hit.point.clone()).y : akaiBox.max.y;
    };
    // One height per kind of control (median of samples, so rays that fall
    // between keys don't skew it)
    const topY = {};
    const surfaceFor = (kind, samples) => {
      if (topY[kind] !== undefined) return topY[kind];
      const ys = samples.map(([lx, lz]) => keySurfaceY(lx, lz)).sort((a, b) => a - b);
      return (topY[kind] = ys[Math.floor(ys.length / 2)]);
    };
    const local = (u, v) => {
      const size = akaiBox.getSize(new THREE.Vector3());
      return [akaiBox.min.x + u * size.x, akaiBox.min.z + v * size.z];
    };

    // A glowing box on the keyboard that fades out
    const flash = (u, v, w, d, y, color) => {
      const size = akaiBox.getSize(new THREE.Vector3());
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(w * size.x, size.y * 0.05, d * size.z),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.85, toneMapped: false, depthTest: false })
      );
      const [lx, lz] = local(u, v);
      mesh.position.set(lx, y + size.y * 0.03, lz);
      mesh.renderOrder = 10;
      mesh.userData.fade = performance.now();
      akai.add(mesh); // in the keyboard's own space, so it follows its transform
      highlights.push(mesh);
    };

    // Water bubbles drifting up from where a key was played
    const spawnWater = (u, tint) => {
      const [lx, lz] = local(u, KEYS.vBack + (KEYS.vFront - KEYS.vBack) * 0.6);
      const origin = akai.localToWorld(new THREE.Vector3(lx, keySurfaceY(lx, lz), lz));
      const count = 5 + Math.floor(Math.random() * 3);
      for (let i = 0; i < count; i++) {
        const mat = new THREE.MeshPhongMaterial({
          color: new THREE.Color(0x8fe6ff).lerp(new THREE.Color(tint), 0.3),
          emissive: 0x1a7a94, specular: 0xffffff, shininess: 160, transparent: true, opacity: 0.6, depthWrite: false,
        });
        const b = new THREE.Mesh(bubbleGeo, mat);
        const shine = new THREE.Mesh(bubbleGeo, new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9, toneMapped: false, depthWrite: false }));
        shine.scale.setScalar(0.28);
        shine.position.set(-0.4, 0.45, 0.6);
        b.add(shine);
        const r = 0.035 + Math.random() * 0.055;
        b.scale.setScalar(r);
        b.position.copy(origin).add(new THREE.Vector3((Math.random() - 0.5) * 0.12, Math.random() * 0.04, (Math.random() - 0.5) * 0.06));
        scene.add(b);
        bubbles.push({
          b, shine, r, x0: b.position.x, z0: b.position.z,
          born: performance.now() + i * 70, life: 2200 + Math.random() * 1000,
          speed: 0.009 + Math.random() * 0.008, phase: Math.random() * 6.28, sway: 0.02 + Math.random() * 0.03,
        });
        b.visible = false;
      }
    };

    const keyFlash = (info) => {
      const keyW = (KEYS.uEnd - KEYS.uStart) / WHITE_COUNT;
      const depth = KEYS.vFront - KEYS.vBack;
      const u = KEYS.uStart + info.center * (KEYS.uEnd - KEYS.uStart);
      const v = KEYS.vBack + depth * (info.black ? KEYS.blackDepth / 2 : 0.5);
      const y = surfaceFor(info.black ? "black" : "white", [...Array(25)].map((_, i) => midiToKeyInfo(BASE_MIDI + i))
        .filter((k) => k.black === info.black)
        .map((k) => local(KEYS.uStart + k.center * (KEYS.uEnd - KEYS.uStart), KEYS.vBack + depth * (k.black ? KEYS.blackDepth / 2 : 0.8))));
      flash(u, v, info.black ? keyW * 0.6 : keyW * 0.92, info.black ? depth * KEYS.blackDepth : depth, y, info.black ? 0xff3300 : 0x73ecff);
      return u;
    };

    const padFlash = (pad) => {
      const [u0, u1] = PAD_COLS[pad % 4], [v0, v1] = PAD_ROWS[pad < 4 ? 1 : 0];
      const y = surfaceFor("pad", PAD_COLS.flatMap(([a, b]) => PAD_ROWS.map(([c, d]) => local((a + b) / 2, (c + d) / 2))));
      flash((u0 + u1) / 2, (v0 + v1) / 2, (u1 - u0) * 0.9, (v1 - v0) * 0.9, y, 0xff2fd1);
    };

    const playKey = async (info) => {
      await startAudio();
      synth.triggerAttackRelease(Tone.Frequency(info.midi, "midi").toFrequency(), "8n");
      if (akaiBox) spawnWater(keyFlash(info), info.black ? 0xff3300 : 0x73ecff);
    };
    const playPad = async (pad) => {
      await startAudio();
      drums[pad]();
      padFlash(pad);
    };

    // ── the room around the desk ──
    const buildRoom = (table, monitorBox, speakerTop, narrow) => {
      const tw = table.max.x - table.min.x; // desk width; everything is sized from it
      const floorY = table.min.y;
      const wallZ = table.min.z - 0.15 * tw;
      const deskTop = table.max.y;
      const env = new THREE.Group();

      const wall = new THREE.Mesh(new THREE.PlaneGeometry(tw * 8, tw * 4), std(0x505056, { roughness: 0.95 }));
      wall.position.set(0, floorY + tw * 2 - 0.01, wallZ);
      wall.receiveShadow = true;
      const floor = new THREE.Mesh(new THREE.PlaneGeometry(tw * 8, tw * 6), std(0x2a2420, { roughness: 0.85 }));
      floor.rotation.x = -Math.PI / 2;
      floor.position.set(0, floorY, wallZ + tw * 3);
      floor.receiveShadow = true;
      env.add(wall, floor);

      // Foam grid spacing (the signs line up with its first row)
      const tile = tw * 0.14, gap = tw * 0.05, step = tile + gap;
      const firstRow = monitorBox.max.y + gap + tile / 2;

      // Window: on the left, or on phones a landscape one above the monitor in
      // place of the 3x2 block of foam there
      const winW = narrow ? 3 * step - gap : tw * 0.42;
      const winH = narrow ? 2 * step - gap : tw * 0.5;
      const win = new THREE.Group();
      const glass = new THREE.Mesh(new THREE.PlaneGeometry(winW, winH), new THREE.MeshBasicMaterial({ map: windowTexture(winW / winH), toneMapped: false, color: 0xbbbbcc }));
      const frameMat = std(0xe9e6df, { roughness: 0.6 });
      const bar = (w, h, x, y) => { const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, tw * 0.02), frameMat); b.position.set(x, y, tw * 0.01); win.add(b); };
      const fb = tw * 0.025;
      bar(winW + fb * 2, fb, 0, winH / 2 + fb / 2); bar(winW + fb * 2, fb, 0, -winH / 2 - fb / 2);
      bar(fb, winH, -winW / 2 - fb / 2, 0); bar(fb, winH, winW / 2 + fb / 2, 0);
      bar(fb * 0.5, winH, 0, 0); bar(winW, fb * 0.5, 0, 0);
      const sill = new THREE.Mesh(new THREE.BoxGeometry(winW + fb * 4, fb * 0.8, tw * 0.07), frameMat);
      sill.position.set(0, -winH / 2 - fb * 1.3, tw * 0.03);
      win.add(glass);
      if (!narrow) win.add(sill); // phones: no sill (the window sits right above the monitor)
      if (narrow) win.position.set(0, firstRow + step / 2, wallZ + 0.002);
      else win.position.set(-tw * 0.84, deskTop + tw * 0.34, wallZ + 0.002);
      env.add(win);
      const moon = new THREE.PointLight(0x8a7cff, 6, tw * 1.6, 2);
      moon.position.set(win.position.x, win.position.y, wallZ + tw * 0.3);
      env.add(moon);
      if (!narrow) {
        const sillY = win.position.y - winH / 2 - fb * 0.9;
        const sillPlant = succulent(tw * 0.22, 0x4f9a4a, 0x8fcf6e);
        sillPlant.position.set(win.position.x + winW * 0.29, sillY, wallZ + tw * 0.03);
        const pointy = pointySucculent(tw * 0.2);
        const pointyHome = win.position.x - winW * 0.29; // left end of the sill
        pointy.position.set(pointyHome, sillY, wallZ + tw * 0.03);
        env.add(sillPlant, pointy);
        plants.push(sillPlant, pointy);
        keepOnScreen.push({ obj: pointy, homeX: pointyHome, fallbackX: win.position.x + winW * 0.02 });
      }

      // Neon signs either side of the monitor, level with the first row of foam
      const signSize = tw * 0.128;
      const signY = firstRow;
      const signX = step * 2; // on the foam grid: two columns out from the center
      const alien = alienSign(signSize);
      alien.position.set(-signX, signY, wallZ + 0.03);
      const bolt = boltSign(signSize);
      bolt.position.set(signX, signY, wallZ + 0.03);
      env.add(alien, bolt);
      const blueGlow = new THREE.PointLight(NEON_BLUE, 9, tw * 0.9, 2);
      blueGlow.position.set(-signX, signY, wallZ + tw * 0.12);
      const pink = new THREE.PointLight(0xff2fd1, 12, tw * 0.9, 2);
      pink.position.set(signX, signY, wallZ + tw * 0.12);
      env.add(blueGlow, pink);

      // Acoustic foam: evenly spaced blue and black panels across the wall,
      // starting above the monitor and skipping the window and signs. Each
      // panel is a backing board with a 4x4 grid of real pyramids, so the
      // lights shade every face.
      const foamColors = [NEON_BLUE, 0x18181c];
      const foamSpots = [[], []];
      const winRect = { x0: win.position.x - winW / 2 - fb * 2, x1: win.position.x + winW / 2 + fb * 2, y0: win.position.y - winH / 2 - fb * 3, y1: win.position.y + winH / 2 + fb * 2 };
      const monitorRect = { x0: monitorBox.min.x - gap, x1: monitorBox.max.x + gap, y0: monitorBox.min.y, y1: monitorBox.max.y + gap / 2 };
      const signRects = [-signX, signX].map((sx) => ({ x0: sx - signSize * 0.6, x1: sx + signSize * 0.6, y0: signY - signSize * 0.62, y1: signY + signSize * 0.62 }));
      const cols = 13;
      for (let r = -1; r < 3; r++) for (let c = 0; c < cols; c++) { // row -1 sits beside the monitor
        const x = (c - (cols - 1) / 2) * step, y = firstRow + r * step;
        const hits = (rc) => x + tile / 2 > rc.x0 && x - tile / 2 < rc.x1 && y + tile / 2 > rc.y0 && y - tile / 2 < rc.y1;
        if ([winRect, monitorRect, ...signRects].some(hits)) continue;
        foamSpots[(r + c + 2) % 2].push([x, y]);
      }
      const PER = 4, sub = tile / PER, depthBoard = tile * 0.06;
      const pyramid = new THREE.ConeGeometry(sub * 0.7071, tile * 0.13, 4, 1);
      pyramid.rotateY(Math.PI / 4);   // square base lines up with the grid
      pyramid.rotateX(Math.PI / 2);   // points out of the wall
      const board = new THREE.BoxGeometry(tile, tile, depthBoard);
      const mtx = new THREE.Matrix4();
      foamColors.forEach((color, k) => {
        const spots = foamSpots[k];
        if (!spots.length) return;
        // The pyramids catch more light than the speaker cabinets, so the blue is
        // deepened a touch to read as the same neon blue on screen
        const mat = new THREE.MeshStandardMaterial({
          color: k === 0 ? new THREE.Color(color).multiplyScalar(0.62) : color, roughness: 1, flatShading: true,
        });
        const boards = new THREE.InstancedMesh(board, mat, spots.length);
        const pyr = new THREE.InstancedMesh(pyramid, mat, spots.length * PER * PER);
        let n = 0;
        spots.forEach(([x, y], i) => {
          boards.setMatrixAt(i, mtx.makeTranslation(x, y, wallZ + depthBoard / 2));
          for (let a = 0; a < PER; a++) for (let b2 = 0; b2 < PER; b2++) {
            pyr.setMatrixAt(n++, mtx.makeTranslation(x - tile / 2 + (a + 0.5) * sub, y - tile / 2 + (b2 + 0.5) * sub, wallZ + depthBoard + tile * 0.065));
          }
        });
        boards.receiveShadow = pyr.receiveShadow = true;
        env.add(boards, pyr);
      });

      // Guitars on a stand, sitting on a guitar amp right of the desk
      const standX = table.max.x + tw * 0.2, standZ = wallZ + tw * 0.2;
      const ampH = tw * 0.3, ampW = tw * 0.46, ampD = tw * 0.24;
      const amp = new THREE.Group();
      const cab = new THREE.Mesh(new THREE.BoxGeometry(ampW, ampH, ampD), std(0x161618, { roughness: 0.7 }));
      cab.position.y = ampH / 2;
      const grille = new THREE.Mesh(new THREE.PlaneGeometry(ampW * 0.88, ampH * 0.62), std(0x2a2a2e, { roughness: 1 }));
      grille.position.set(0, ampH * 0.4, ampD / 2 + 0.002);
      const panel = new THREE.Mesh(new THREE.PlaneGeometry(ampW * 0.88, ampH * 0.16), std(0xcfc7b4, { roughness: 0.5, metalness: 0.4 }));
      panel.position.set(0, ampH * 0.84, ampD / 2 + 0.002);
      amp.add(cab, grille, panel);
      for (let i = 0; i < 6; i++) {
        const knob = new THREE.Mesh(new THREE.CylinderGeometry(ampH * 0.03, ampH * 0.03, ampH * 0.03, 12), std(0x111111));
        knob.rotation.x = Math.PI / 2;
        knob.position.set(-ampW * 0.3 + i * ampW * 0.12, ampH * 0.84, ampD / 2 + ampH * 0.016);
        amp.add(knob);
      }
      amp.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
      amp.position.set(standX + tw * 0.07, floorY, standZ);
      env.add(amp);
      const standBase = floorY + ampH;
      const stand = guitarStand(tw * 0.2);
      stand.position.set(standX + tw * 0.11, standBase, standZ);
      const g1 = guitar(tw * 0.28, { body: 0xa2551e, acoustic: true });
      g1.position.set(standX - tw * 0.06, standBase + tw * 0.14, standZ + tw * 0.02);
      g1.rotation.set(-0.18, 0.15, 0.03);
      const g2 = guitar(tw * 0.26, { body: 0x111114, acoustic: false });
      g2.position.set(standX + tw * 0.2, standBase + tw * 0.13, standZ + tw * 0.01);
      g2.rotation.set(-0.18, -0.12, -0.03);
      env.add(stand, g1, g2);
      g1.userData.kind = "acoustic";
      g2.userData.kind = "electric";
      guitars.push(g1, g2);

      // Plants: monsteras in the back corners
      const leafTex = monsteraTexture();
      const m1 = monstera(tw * 0.42, leafTex);
      m1.position.set(-tw * 0.86, floorY, wallZ + tw * 0.3);
      const m2 = monstera(tw * 0.62, leafTex, [5]); // without its tallest, out-of-place leaf
      m2.position.set(tw * 0.9, floorY, wallZ + tw * 0.42); // in front of the guitars, leaves hanging over them
      m2.rotation.y = 0.6;
      [m1, m2].forEach((m) => m.traverse((o) => { o.castShadow = false; }));
      env.add(m1, m2);
      plants.push(m1, m2);
      // and shorter ones under the desk hiding the cables: white monsteras and a fern,
      // sized to stay below the desk top
      const midZ = (table.min.z + table.max.z) / 2;
      const under = deskTop - floorY;
      const albo = monsteraTexture(true);
      const low = [
        [-0.24, monstera(under * 0.44, albo), 0.4],
        [0.0, fern(under * 0.5, fernTexture()), 0],
        [0.25, monstera(under * 0.4, albo), 3.6],
      ];
      low.forEach(([x, plant, rot]) => {
        plant.position.set(tw * x, floorY, midZ - tw * 0.04);
        plant.rotation.y = rot;
        plant.traverse((o) => { o.castShadow = false; });
        env.add(plant);
        plants.push(plant);
      });

      // Aim the front light from the viewer's side, over the desk
      front.position.set(-tw * 0.4, deskTop + tw * 1.2, midZ + tw * 1.6);
      front.target.position.set(0, deskTop, midZ);
      const sc = front.shadow.camera;
      sc.left = sc.bottom = -tw * 1.6; sc.right = sc.top = tw * 1.6; sc.near = 0.1; sc.far = tw * 5;
      sc.updateProjectionMatrix();

      return env;
    };

    const loader = new GLTFLoader();
    loader.load(
      MODEL_URL,
      (gltf) => {
        if (disposed) return;
        room = gltf.scene;
        room.traverse((o) => {
          if (!o.isMesh) return;
          o.castShadow = true; o.receiveShadow = true;
          // Speakers: light neon blue cabinets, pink rings (were black and yellow)
          const name = o.material?.name;
          if (name === "Speaker_Box_Left") { o.material.color.set(NEON_BLUE); o.material.emissive?.set(0x0e5f70); }
          // Pen cup: solid neon blue instead of see-through glass
          if (name === "pen_glass 01" || name === "pen_glass 02") o.material = std(NEON_BLUE, { roughness: 0.4 });
          if (name === "Speaker_Yellow") { o.material.color.set(0xff4fd8); o.material.emissive?.set(0x6e0a52); }
        });
        room.children.forEach((child) => {
          const key = child.name.toLowerCase();
          if (!VISIBLE.has(key)) { child.visible = false; child.scale.setScalar(0); }
          if (key === "akai_lp") akai = child;
          if (SPEAKERS.includes(key)) speakers.push(child);
          if (key === "table001") {
            const top = child.children?.[1] ?? child.children?.[0];
            if (top?.material) {
              // glassy blue desk top, as in the original (no thickness: refraction drew a ghost keyboard)
              top.material = new THREE.MeshPhysicalMaterial({ color: 0x549dd2, roughness: 0, ior: 1.5, transmission: 1, thickness: 0 });
            }
          }
        });
        room.traverse((o) => { if (o.name.toLowerCase() === "plane002") screen = o; });

        // Fit the gear on the desk to a fixed size and center it
        room.updateMatrixWorld(true);
        const box = new THREE.Box3();
        room.children.forEach((c) => { if (FRAME.has(c.name.toLowerCase())) box.expandByObject(c); });
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const fit = FIT_SIZE / Math.max(size.x, size.z);
        room.scale.setScalar(fit);
        room.position.set(-center.x * fit, -center.y * fit, -center.z * fit);
        pivot.add(room);
        room.updateMatrixWorld(true);

        // Taller monitor, keeping its base where it was
        const monitor = room.children.find((c) => c.name.toLowerCase() === "plane001");
        if (monitor) {
          const before = new THREE.Box3().setFromObject(monitor).min.y;
          monitor.scale.z *= MONITOR_STRETCH; // local z is the monitor's height
          room.updateMatrixWorld(true);
          const after = new THREE.Box3().setFromObject(monitor).min.y;
          monitor.position.y += (before - after) / fit;
          room.updateMatrixWorld(true);
        }

        const tableObj = room.children.find((c) => c.name.toLowerCase() === "table001");
        const tableBox = new THREE.Box3().setFromObject(tableObj);
        const deskTop = tableBox.max.y;
        const tw = tableBox.max.x - tableBox.min.x;
        const standMat = std(0x111114, { metalness: 0.5, roughness: 0.45 });
        const props = new THREE.Group();

        // Trackpad (aluminium base + white glass top): thicker, so it isn't paper-flat
        const pad = room.children.filter((c) => ["object_4001", "object_5"].includes(c.name.toLowerCase()));
        if (pad.length) {
          const pb = new THREE.Box3(); pad.forEach((o) => pb.expandByObject(o));
          const k = (tw * 0.014) / Math.max(pb.max.y - pb.min.y, 1e-6);
          pad.forEach((o) => { o.scale.y *= k; });
          room.updateMatrixWorld(true);
          const nb = new THREE.Box3(); pad.forEach((o) => nb.expandByObject(o));
          pad.forEach((o) => { o.position.y += (pb.min.y - nb.min.y) / fit; });
          room.updateMatrixWorld(true);
        }

        // Speakers a little bigger, on small desk stands
        for (const sp of speakers) {
          const lift = tw * 0.07;
          const sit = new THREE.Box3().setFromObject(sp).min.y;
          sp.scale.multiplyScalar(SPEAKER_SCALE);
          room.updateMatrixWorld(true);
          sp.position.y += (sit - new THREE.Box3().setFromObject(sp).min.y) / fit; // still sitting on the desk
          room.updateMatrixWorld(true);
          const b0 = new THREE.Box3().setFromObject(sp);
          sp.position.y += lift / fit;
          const c = b0.getCenter(new THREE.Vector3()), sz = b0.getSize(new THREE.Vector3());
          const base = new THREE.Mesh(new THREE.BoxGeometry(sz.x * 0.85, lift * 0.12, sz.z * 0.85), standMat);
          base.position.set(c.x, b0.min.y + lift * 0.06, c.z);
          const col = new THREE.Mesh(new THREE.CylinderGeometry(lift * 0.12, lift * 0.12, lift * 0.76, 12), standMat);
          col.position.set(c.x, b0.min.y + lift * 0.5, c.z);
          const top = new THREE.Mesh(new THREE.BoxGeometry(sz.x * 0.8, lift * 0.12, sz.z * 0.8), standMat);
          top.position.set(c.x, b0.min.y + lift * 0.94, c.z);
          [base, col, top].forEach((m) => { m.castShadow = true; m.receiveShadow = true; props.add(m); });
        }

        // MPK Mini MK4: a little bigger, on an angled stand with the back raised toward you
        if (akai) {
          const kbMesh = akai.isMesh ? akai : akai.children.find((c) => c.isMesh);
          kbMesh.geometry.computeBoundingBox();
          kbMesh.material = mk4Material(kbMesh.geometry.boundingBox);
          akai.scale.multiplyScalar(KEYBOARD_SCALE);
          const yaw = new THREE.Euler().setFromQuaternion(akai.getWorldQuaternion(new THREE.Quaternion()), "YXZ").y;
          akai.rotateX(KEYBOARD_TILT);
          room.updateMatrixWorld(true);
          const kb = new THREE.Box3().setFromObject(akai);
          const lift = tw * 0.025;
          akai.position.y += (deskTop + lift - kb.min.y) / fit;
          akai.position.x += (tw * KEYBOARD_SHIFT) / fit; // a bit right, toward the monitor
          room.updateMatrixWorld(true);
          // two side plates: a wedge from the desk up to the tilted underside
          const kb2 = new THREE.Box3().setFromObject(akai);
          const mesh = akai.isMesh ? akai : akai.children.find((c) => c.isMesh);
          mesh.geometry.computeBoundingBox();
          const lb = mesh.geometry.boundingBox;
          const depth = (lb.max.z - lb.min.z) * akai.getWorldScale(new THREE.Vector3()).z * Math.cos(KEYBOARD_TILT);
          const width = (lb.max.x - lb.min.x) * akai.getWorldScale(new THREE.Vector3()).x;
          const rise = depth * Math.tan(KEYBOARD_TILT);
          const wedge = new THREE.Shape();
          wedge.moveTo(-depth / 2, 0); wedge.lineTo(depth / 2, 0); wedge.lineTo(depth / 2, lift); wedge.lineTo(-depth / 2, lift + rise); wedge.closePath();
          const plateGeo = new THREE.ExtrudeGeometry(wedge, { depth: tw * 0.008, bevelEnabled: false });
          const center = kb2.getCenter(new THREE.Vector3());
          for (const side of [-1, 1]) {
            const plate = new THREE.Mesh(plateGeo, standMat);
            const holder = new THREE.Group();
            holder.rotation.y = yaw;
            holder.position.set(center.x, deskTop, center.z);
            plate.rotation.y = -Math.PI / 2; // profile runs front-to-back
            plate.position.x = side * width * 0.36;
            plate.castShadow = true;
            holder.add(plate);
            props.add(holder);
          }
        }
        scene.add(props);
        room.updateMatrixWorld(true);

        if (screen) {
          const ss = new THREE.Box3().setFromObject(screen).getSize(new THREE.Vector3());
          screenCanvas.height = Math.round(1024 * Math.min(1, ss.y / ss.x));
          drawScreen(screenCtx, false);
          screenTexture.needsUpdate = true;
          screen.material = new THREE.MeshBasicMaterial({ map: screenTexture, toneMapped: false });
        }
        if (akai) {
          const mesh = akai.isMesh ? akai : akai.children.find((c) => c.isMesh);
          mesh.geometry.computeBoundingBox();
          akaiBox = mesh.geometry.boundingBox.clone();
          if (debug) {
            for (let m = BASE_MIDI; m <= BASE_MIDI + 24; m++) keyFlash(midiToKeyInfo(m));
            for (let p = 0; p < 8; p++) padFlash(p);
          }
        }

        const monitorBox = new THREE.Box3().setFromObject(monitor ?? tableObj);
        const speakerTop = Math.max(...speakers.map((sp) => new THREE.Box3().setFromObject(sp).max.y));
        scene.add(buildRoom(tableBox, monitorBox, speakerTop, mount.clientWidth < mount.clientHeight));

        const screenCenter = new THREE.Box3().setFromObject(screen ?? tableObj).getCenter(new THREE.Vector3());
        eye = {
          target: new THREE.Vector3(screenCenter.x, screenCenter.y - tw * 0.08, (tableBox.min.z + tableBox.max.z) / 2),
          height: screenCenter.y + tw * 0.26,
          depth: (tableBox.min.z + tableBox.max.z) / 2,
          fitWidth: tw * 1.75,
          fitWidthNarrow: tw * 1.0, // phones: zoom in on the desk
          minDist: tw * 0.9,
        };
        placeCamera();
        if (monitor) {
          const dir = camera.getWorldDirection(new THREE.Vector3());
          const pitch = Math.asin(-dir.y); // how far the camera looks down
          const before = new THREE.Box3().setFromObject(monitor);
          monitor.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), -pitch); // top leans back, screen faces up at you
          room.updateMatrixWorld(true);
          const after = new THREE.Box3().setFromObject(monitor);
          monitor.position.y += (before.min.y - after.min.y) / fit;
          monitor.position.z += (before.max.z - after.max.z) / fit;
          room.updateMatrixWorld(true);
        }
        setReady(true);
        if (debug) {
          // test hook: screen position of a point on the MPK (u, v) or of a named object
          window.__studio = {
            at: (u, v) => {
              const [lx, lz] = local(u, v);
              const p = akai.localToWorld(new THREE.Vector3(lx, keySurfaceY(lx, lz), lz)).project(camera);
              const r = renderer.domElement.getBoundingClientRect();
              return { x: r.left + (p.x + 1) / 2 * r.width, y: r.top + (1 - p.y) / 2 * r.height };
            },
            of: (obj) => {
              const p = new THREE.Box3().setFromObject(obj === "speaker" ? speakers[0] : screen).getCenter(new THREE.Vector3()).project(camera);
              const r = renderer.domElement.getBoundingClientRect();
              return { x: r.left + (p.x + 1) / 2 * r.width, y: r.top + (1 - p.y) / 2 * r.height };
            },
            playing: () => scPlaying,
          };
        }
      },
      (xhr) => { if (xhr.total) setProgress(Math.round((xhr.loaded / xhr.total) * 100)); },
      (err) => { console.error(err); setError("Couldn't load the studio."); }
    );

    // ── interaction ──
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let hoverScreen = false;
    let hoverSpeaker = false;
    const isUnder = (o, target) => { while (o) { if (o === target) return true; o = o.parent; } return false; };
    const pick = (e) => {
      const r = renderer.domElement.getBoundingClientRect();
      pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      raycaster.setFromCamera(pointer, camera);
      const targets = [akai, screen, ...speakers].filter(Boolean);
      const hit = raycaster.intersectObjects(targets, true).find((h) => !highlights.includes(h.object));
      if (!hit) return null;
      return {
        hit,
        isAkai: isUnder(hit.object, akai),
        isScreen: isUnder(hit.object, screen),
        isSpeaker: speakers.some((s) => isUnder(hit.object, s)),
      };
    };
    // What on the MPK Mini is under the pointer: { key } or { pad }
    const controlAt = (hit) => {
      const p = akai.worldToLocal(hit.point.clone());
      const size = akaiBox.getSize(new THREE.Vector3());
      const u = (p.x - akaiBox.min.x) / size.x;
      const v = (p.z - akaiBox.min.z) / size.z;
      if (debug) console.log("akai uv", u.toFixed(3), v.toFixed(3));
      const key = keyFromUV(u, v);
      if (key) return { key };
      const pad = padFromUV(u, v);
      return pad !== null ? { pad } : null;
    };

    // Which plant (if any) is under the pointer
    const plantAt = (e) => {
      if (!plants.length) return null;
      const hit = raycaster.intersectObjects(plants, true)[0];
      if (!hit) return null;
      return plants.find((pl) => isUnder(hit.object, pl)) ?? null;
    };

    // Which guitar (if any) is under the pointer
    const guitarAt = () => {
      if (!guitars.length) return null;
      const hit = raycaster.intersectObjects(guitars, true)[0];
      if (!hit) return null;
      return guitars.find((g) => isUnder(hit.object, g)) ?? null;
    };
    let hoverGuitar = null;
    const STRUM_GAP_MS = 350; // so sweeping across a guitar doesn't machine-gun it
    const playGuitar = (g) => {
      const now = performance.now();
      if (now - (g.userData.lastStrum || 0) < STRUM_GAP_MS) return;
      g.userData.lastStrum = now;
      g.userData.wobble = 1;
      g.userData.pluckedAt = now;
      strum(g.userData.kind);
    };

    const onPointerDown = async (e) => {
      const p = pick(e);
      const plant = plantAt(e);
      if (plant) plant.userData.rustle = 1;
      const g = guitarAt();
      if (g) {
        await startAudio(); // a click unlocks audio, so this strum plays
        g.userData.lastStrum = 0;
        playGuitar(g);
        return;
      }
      if (!p) return;
      if (p.isScreen) { navigateRef.current("/OS"); return; }
      if (p.isSpeaker) { toggleUp(); return; }
      if (p.isAkai && akaiBox) {
        const c = controlAt(p.hit);
        if (c?.key) playKey(c.key);
        else if (c?.pad !== undefined) playPad(c.pad);
      }
    };
    const onPointerMove = (e) => {
      const p = pick(e);
      const plant = plantAt(e);
      if (plant) plant.userData.rustle = 1;
      // Strum when the pointer moves onto a guitar (once per visit)
      const g = guitarAt();
      if (g && g !== hoverGuitar) playGuitar(g);
      hoverGuitar = g;
      const overScreen = !!p?.isScreen;
      hoverSpeaker = !!p?.isSpeaker;
      const clickable = !!g || overScreen || !!p?.isSpeaker || !!(p?.isAkai && akaiBox && controlAt(p.hit));
      renderer.domElement.style.cursor = clickable ? "pointer" : "default";
      if (overScreen !== hoverScreen) {
        hoverScreen = overScreen;
        drawScreen(screenCtx, hoverScreen);
        screenTexture.needsUpdate = true;
      }
    };
    const onKeyDown = (e) => {
      if (e.repeat || e.metaKey || e.ctrlKey) return;
      startAudio();
      // 1-8: drum pads, so you can play drums and melody together
      if (/^[1-8]$/.test(e.key)) { playPad(Number(e.key) - 1); return; }
      const idx = QWERTY[e.key.toLowerCase()];
      if (idx === undefined) return;
      playKey(midiToKeyInfo(BASE_MIDI + idx));
    };
    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointermove", onPointerMove);
    window.addEventListener("keydown", onKeyDown);

    // ── loop ──
    let hoverAmt = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const now = performance.now();
      if (!debug) {
        for (let i = highlights.length - 1; i >= 0; i--) {
          const m = highlights[i];
          const t = (now - m.userData.fade) / 350;
          m.material.opacity = Math.max(0, 0.85 * (1 - t));
          if (t >= 1) { m.parent?.remove(m); m.geometry.dispose(); m.material.dispose(); highlights.splice(i, 1); }
        }
      }
      for (let i = bubbles.length - 1; i >= 0; i--) {
        const w = bubbles[i];
        const age = now - w.born;
        if (age < 0) continue;
        w.b.visible = true;
        const t = age / w.life;
        // rise, sway side to side, wobble, then fade and pop
        w.b.position.y += w.speed;
        w.b.position.x = w.x0 + Math.sin(age / 260 + w.phase) * w.sway;
        w.b.position.z = w.z0 + Math.cos(age / 330 + w.phase) * w.sway * 0.5;
        const wob = Math.sin(age / 90 + w.phase) * 0.08;
        w.b.scale.set(w.r * (1 + wob), w.r * (1 - wob), w.r);
        const fade = t > 0.7 ? 1 - (t - 0.7) / 0.3 : 1;
        w.b.material.opacity = 0.6 * fade;
        w.shine.material.opacity = 0.9 * fade;
        if (t >= 1) {
          scene.remove(w.b); w.b.material.dispose(); w.shine.material.dispose();
          bubbles.splice(i, 1);
        }
      }
      // UP's loudness: average of the low half of the spectrum (kick + bass)
      if (scPlaying && upAnalyser) {
        upAnalyser.getByteFrequencyData(upBins);
        let sum = 0;
        const n = upBins.length >> 1;
        for (let i = 0; i < n; i++) sum += upBins[i];
        const level = sum / n / 255;
        upLevel += (level - upLevel) * (level > upLevel ? 0.6 : 0.12); // fast attack, slow release
      } else {
        upLevel *= 0.9;
      }
      // speakers grow (with a little bounce) on hover, and pump while UP plays
      hoverAmt += ((hoverSpeaker ? 1 : 0) - hoverAmt) * 0.18;
      for (const s of speakers) {
        if (!s.userData.base) s.userData.base = s.scale.clone();
        const hover = hoverAmt * (0.06 + Math.sin(now / 140) * 0.012);
        const pump = scPlaying ? upLevel * 0.06 : 0;
        s.scale.copy(s.userData.base).multiplyScalar(1 + hover + pump);
      }
      // Plucked strings: each bows sideways in its fundamental shape
      // (sin(pi * position along the string)), oscillating and decaying.
      // Strings start one after another like the strummed notes (22 ms
      // apart) and the low strings swing slower than the high ones.
      for (const g of guitars) {
        const st = g.userData.strings;
        if (!st || !g.userData.pluckedAt) continue;
        const pos = st.geo.attributes.position.array;
        const age = now - g.userData.pluckedAt;
        const DURATION = 1400;
        const done = age > DURATION + 6 * 22;
        const perString = st.segments * 2; // vertices per string
        for (let i = 0; i < 6; i++) {
          const t = age - i * 22; // this string's own age
          const amp = done || t < 0 ? 0 : 0.0045 * Math.exp(-t / 380);
          const phase = t * (0.045 + i * 0.012); // radians per ms: low strings slower
          const swing = amp * Math.sin(phase);
          for (let v = 0; v < perString; v++) {
            const k = (i * perString + v) * 3;
            const along = (Math.floor(v / 2) + (v % 2)) / st.segments; // 0 at the bridge, 1 at the nut
            pos[k] = st.rest[k] + swing * Math.sin(Math.PI * along);
          }
        }
        st.geo.attributes.position.needsUpdate = true;
        if (done) g.userData.pluckedAt = 0; // back at rest; stop updating
      }
      // strummed guitars rock on the stand and settle
      for (const g of guitars) {
        const w = g.userData.wobble || 0;
        if (!g.userData.baseRot) g.userData.baseRot = g.rotation.clone();
        if (w < 0.002) { if (g.userData.wobbling) { g.rotation.copy(g.userData.baseRot); g.userData.wobbling = false; } continue; }
        g.userData.wobbling = true;
        g.userData.wobble = w * 0.94;
        g.rotation.z = g.userData.baseRot.z + Math.sin(now / 45) * 0.035 * w;
        g.rotation.x = g.userData.baseRot.x + Math.sin(now / 70) * 0.015 * w;
      }
      // hovered plants rustle, settling back over a second or so
      for (const pl of plants) {
        const r = pl.userData.rustle || 0;
        if (r < 0.002 && !pl.userData.moving) continue;
        pl.userData.moving = r >= 0.002;
        pl.userData.rustle = r * 0.97;
        pl.traverse((o) => {
          if (!o.userData.leaf) return;
          if (!o.userData.base) { o.userData.base = o.rotation.clone(); o.userData.phase = Math.random() * 6.28; }
          const w = Math.sin(now / 110 + o.userData.phase) * 0.14 * r;
          o.rotation.x = o.userData.base.x + w;
          o.rotation.z = o.userData.base.z + w * 0.6;
        });
      }
      if (screen) screen.material.color.setScalar(0.94 + Math.sin(now / 90) * 0.03 + Math.random() * 0.03);
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", placeCamera);
      window.removeEventListener("keydown", onKeyDown);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      upAudio.pause();
      upAudio.removeAttribute("src");
      upAudio.load(); // stop any download
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        const mats = Array.isArray(o.material) ? o.material : o.material ? [o.material] : [];
        mats.forEach((m) => { Object.values(m).forEach((v) => v?.isTexture && v.dispose()); m.dispose(); });
      });
      screenTexture.dispose();
      bubbleGeo.dispose();
      audioNodes.forEach((n) => n.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", minHeight: 480, background: "#0c0c0e", overflow: "hidden" }}>
      <div ref={mountRef} style={{ position: "absolute", inset: 0 }} />

      {!ready && (
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#73ecff", fontFamily: "'Courier New', monospace" }}>
          {error ? (
            <p>{error}</p>
          ) : (
            <>
              <p style={{ marginBottom: 12 }}>loading studio… {progress}%</p>
              <div style={{ width: 220, height: 6, border: "1px solid #73ecff", borderRadius: 3 }}>
                <div style={{ width: `${progress}%`, height: "100%", background: "#73ecff", transition: "width .2s" }} />
              </div>
            </>
          )}
        </div>
      )}

      {ready && (
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 24, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, pointerEvents: "none", fontFamily: "'Courier New', monospace" }}>
          <p style={{ color: "#73ecff", fontSize: "clamp(8px, 2.4vw, 13px)", whiteSpace: "nowrap", textAlign: "center", padding: "6px 12px", margin: "0 8px", background: "rgba(0,0,13,.72)", borderRadius: 999 }}>
            {nowPlaying
              ? "now playing: UP · tap the speakers to pause"
              : touch ? "tap the keys, pads & guitars · tap the speakers to hear a masterpiece" : "keys: A–L · drums: 1–8 · strum the guitars · click the speakers to hear a masterpiece"}
          </p>
        </div>
      )}
    </div>
  );
}
