import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as Tone from "tone";

// /os2 — the 3D studio homepage, rebuilt. Same workspace model, camera angle and
// neon lighting as the original (Experience.js), but self-contained so it cleans
// up on unmount. Click the MIDI keyboard to play it; click the monitor screen
// (or the Enter button) to open genwavOS.

const MODEL_URL = "/models/workspace2.glb";
// Objects the camera frames
const FRAME = new Set(["akai_lp", "krkspeakerl_rubber_0001", "krkspeakerl_rubber_0002", "plane001", "cylinder", "object_4001"]);
const FIT_SIZE = 6.6; // widest side of the desktop setup, in view units (the view is 5 tall)

// Objects from the model that the original scene showed; the rest are hidden
const VISIBLE = new Set([
  "akai_lp", "cylinder", "krkspeakerl_rubber_0001", "krkspeakerl_rubber_0002",
  "object_5", "cords", "object_4001", "plane001", "table001",
]);

// Where the 25 keys sit on the AKAI LPK25 mesh, as fractions of its local
// bounding box: u runs along the width (x), v from the back (0) to the front (1)
const KEYS = { uStart: 0.255, uEnd: 0.985, vBack: 0.52, vFront: 0.98, blackDepth: 0.6 };
const WHITE_COUNT = 15; // C3..C5
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
  if (deg >= 0) {
    const white = octave * 7 + deg;
    return { midi, black: false, center: (white + 0.5) / WHITE_COUNT };
  }
  const boundary = octave * 7 + WHITE_SEMITONES.indexOf(semi + 1);
  return { midi, black: true, center: boundary / WHITE_COUNT };
}

// The monitor screen: a little genwavOS window with an Enter button
function drawScreen(ctx, hover) {
  const { width: W, height: H } = ctx.canvas;
  ctx.fillStyle = "#00000d";
  ctx.fillRect(0, 0, W, H);
  // scanlines
  ctx.fillStyle = "rgba(115,236,255,0.04)";
  for (let y = 0; y < H; y += 6) ctx.fillRect(0, y, W, 2);

  const pad = W * 0.08;
  ctx.strokeStyle = "#73ecff";
  ctx.lineWidth = W * 0.008;
  ctx.strokeRect(pad, pad, W - pad * 2, H - pad * 2);
  ctx.fillStyle = "#73ecff";
  ctx.fillRect(pad, pad, W - pad * 2, H * 0.11);
  ctx.fillStyle = "#00000d";
  ctx.font = `bold ${Math.round(H * 0.065)}px "Courier New", monospace`;
  ctx.textBaseline = "middle";
  ctx.textAlign = "left";
  ctx.fillText("genwav95", pad + W * 0.03, pad + H * 0.057);
  ctx.textAlign = "right";
  ctx.fillText("_ □ ×", W - pad - W * 0.03, pad + H * 0.057);

  ctx.textAlign = "center";
  ctx.fillStyle = "#73ecff";
  ctx.font = `bold ${Math.round(H * 0.1)}px "Courier New", monospace`;
  ctx.fillText("genwavOS", W / 2, H * 0.4);
  ctx.font = `${Math.round(H * 0.045)}px "Courier New", monospace`;
  ctx.globalAlpha = 0.75;
  ctx.fillText("play the keyboard ♪  or step inside", W / 2, H * 0.5);
  ctx.globalAlpha = 1;

  const bw = W * 0.36, bh = H * 0.14, bx = (W - bw) / 2, by = H * 0.6;
  ctx.shadowColor = "#73ecff";
  ctx.shadowBlur = hover ? 40 : 18;
  ctx.fillStyle = hover ? "#73ecff" : "#00000d";
  ctx.fillRect(bx, by, bw, bh);
  ctx.shadowBlur = 0;
  ctx.lineWidth = W * 0.007;
  ctx.strokeRect(bx, by, bw, bh);
  ctx.fillStyle = hover ? "#00000d" : "#73ecff";
  ctx.font = `bold ${Math.round(H * 0.075)}px "Courier New", monospace`;
  ctx.fillText("ENTER ▸", W / 2, by + bh / 2);
}

export default function Studio3D() {
  const mountRef = useRef(null);
  const navigate = useNavigate();
  const navigateRef = useRef(navigate);
  navigateRef.current = navigate;
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [lastNote, setLastNote] = useState("");
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

    // ── renderer / scene / camera (matches the original look) ──
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.physicallyCorrectLights = true;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.CineonToneMapping;
    renderer.toneMappingExposure = 1.75;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const frustum = 5;
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -50, 50);
    camera.position.set(0, 5.65, 10);
    camera.rotation.x = -Math.PI / 6;
    scene.add(camera);
    // Rotates around the desk's center (the room inside is offset to center it)
    const pivot = new THREE.Group();
    scene.add(pivot);

    const neonBlue = new THREE.Color(0x00d4ff);
    const neonRed = new THREE.Color(0xff3300);
    const blue = new THREE.DirectionalLight(neonBlue, 7);
    blue.position.set(-1.5, 7, 3);
    blue.castShadow = true;
    blue.shadow.mapSize.set(2048, 2048);
    blue.shadow.normalBias = 0.05;
    const red = new THREE.DirectionalLight(neonRed, 5);
    red.position.set(1.5, 7, 3);
    red.castShadow = true;
    red.shadow.mapSize.set(2048, 2048);
    red.shadow.normalBias = 0.05;
    scene.add(blue, red, new THREE.AmbientLight(new THREE.Color().addColors(neonBlue, neonRed), 2.5));

    const resize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      const aspect = w / h;
      // Zoom out on narrow screens so the whole desk fits the width
      const f = Math.max(frustum, (FIT_SIZE * 1.06) / aspect);
      camera.left = (-aspect * f) / 2;
      camera.right = (aspect * f) / 2;
      camera.top = f / 2;
      camera.bottom = -f / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    resize();
    window.addEventListener("resize", resize);

    // ── screen texture ──
    const screenCanvas = document.createElement("canvas");
    screenCanvas.width = 1024;
    screenCanvas.height = 640;
    const screenCtx = screenCanvas.getContext("2d");
    drawScreen(screenCtx, false);
    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    screenTexture.encoding = THREE.sRGBEncoding;
    screenTexture.anisotropy = 8;
    screenTexture.flipY = false; // the model's screen UVs run top-down

    // ── audio ──
    let synth = null;
    const startAudio = async () => {
      if (synth) return synth;
      await Tone.start();
      synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: "triangle8" },
        envelope: { attack: 0.005, decay: 0.25, sustain: 0.3, release: 0.9 },
      });
      const reverb = new Tone.Reverb({ decay: 2.5, wet: 0.25 });
      synth.chain(reverb, Tone.Destination);
      synth.volume.value = -8;
      return synth;
    };

    // ── model ──
    let room = null, akai = null, screen = null, akaiBox = null;
    const highlights = [];
    const notes = [];
    const noteGeo = new THREE.SphereGeometry(1, 12, 12);

    // Height of the key top at a point on the keyboard, in its local space
    const downRay = new THREE.Raycaster();
    const surfaceCache = new Map();
    const keySurfaceY = (lx, lz) => {
      const k = `${lx.toFixed(1)},${lz.toFixed(1)}`;
      if (surfaceCache.has(k)) return surfaceCache.get(k);
      const from = akai.localToWorld(new THREE.Vector3(lx, akaiBox.max.y + 5, lz));
      const to = akai.localToWorld(new THREE.Vector3(lx, akaiBox.min.y, lz));
      downRay.set(from, to.clone().sub(from).normalize());
      const hit = downRay.intersectObject(akai, true).find((h) => !highlights.includes(h.object));
      const y = hit ? akai.worldToLocal(hit.point.clone()).y : akaiBox.max.y;
      surfaceCache.set(k, y);
      return y;
    };

    // One height for all white keys and one for all black keys (median of
    // samples, so rays that fall between keys don't skew it)
    const topY = {};
    const keyTopY = (black) => {
      if (topY[black] !== undefined) return topY[black];
      const size = new THREE.Vector3(); akaiBox.getSize(size);
      const ys = [];
      for (let m = BASE_MIDI; m <= BASE_MIDI + 24; m++) {
        const info = midiToKeyInfo(m);
        if (info.black !== black) continue;
        const u = KEYS.uStart + info.center * (KEYS.uEnd - KEYS.uStart);
        const v = KEYS.vBack + (KEYS.vFront - KEYS.vBack) * (black ? KEYS.blackDepth / 2 : 0.8);
        ys.push(keySurfaceY(akaiBox.min.x + u * size.x, akaiBox.min.z + v * size.z));
      }
      ys.sort((a, b) => a - b);
      return (topY[black] = ys[Math.floor(ys.length / 2)]);
    };

    const keyHighlight = (info) => {
      if (!akai || !akaiBox) return;
      const size = new THREE.Vector3(); akaiBox.getSize(size);
      const keyW = size.x * (KEYS.uEnd - KEYS.uStart) / WHITE_COUNT;
      const depth = size.z * (KEYS.vFront - KEYS.vBack);
      const w = info.black ? keyW * 0.6 : keyW * 0.92;
      const d = info.black ? depth * KEYS.blackDepth : depth;
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(w, size.y * 0.05, d),
        new THREE.MeshBasicMaterial({ color: info.black ? 0xff3300 : 0x73ecff, transparent: true, opacity: 0.85, toneMapped: false, depthTest: false })
      );
      const u = KEYS.uStart + info.center * (KEYS.uEnd - KEYS.uStart);
      // Black keys only cover the back part of the key bed
      const v = KEYS.vBack + (KEYS.vFront - KEYS.vBack) * (info.black ? KEYS.blackDepth / 2 : 0.5);
      const lx = akaiBox.min.x + u * size.x, lz = akaiBox.min.z + v * size.z;
      mesh.position.set(lx, keyTopY(info.black) + size.y * 0.03, lz);
      mesh.renderOrder = 10;
      mesh.userData.fade = performance.now();
      akai.add(mesh); // in the keyboard's own space, so it follows its transform
      highlights.push(mesh);
    };

    const spawnNote = (info) => {
      if (!akai || !akaiBox) return;
      const size = new THREE.Vector3(); akaiBox.getSize(size);
      const u = KEYS.uStart + info.center * (KEYS.uEnd - KEYS.uStart);
      const local = new THREE.Vector3(akaiBox.min.x + u * size.x, akaiBox.max.y, akaiBox.min.z + 0.5 * size.z);
      const world = akai.localToWorld(local);
      const m = new THREE.Mesh(noteGeo, new THREE.MeshBasicMaterial({ color: info.black ? 0xff3300 : 0x73ecff, transparent: true, toneMapped: false }));
      m.scale.setScalar(0.05);
      m.position.copy(world);
      scene.add(m);
      notes.push({ m, born: performance.now(), drift: (Math.random() - 0.5) * 0.4 });
    };

    const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    const play = async (info) => {
      const s = await startAudio();
      const name = NOTE_NAMES[info.midi % 12] + (Math.floor(info.midi / 12) - 1);
      s.triggerAttackRelease(Tone.Frequency(info.midi, "midi").toFrequency(), "8n");
      keyHighlight(info);
      spawnNote(info);
      setLastNote(name);
    };

    const loader = new GLTFLoader();
    loader.load(
      MODEL_URL,
      (gltf) => {
        if (disposed) return;
        room = gltf.scene;
        room.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
        room.children.forEach((child) => {
          const key = child.name.toLowerCase();
          child.scale.multiplyScalar(VISIBLE.has(key) ? 1 : 0);
          if (!VISIBLE.has(key)) child.visible = false;
          if (key === "akai_lp") akai = child;
          if (key === "table001") {
            const top = child.children?.[1] ?? child.children?.[0];
            if (top?.material) {
              // Original: glassy blue desk top
              top.material = new THREE.MeshPhysicalMaterial({ color: 0x549dd2, roughness: 0, ior: 1.5, transmission: 1, thickness: 0 }); // no thickness: refraction drew a ghost keyboard
            }
          }
        });
        room.traverse((o) => { if (o.name.toLowerCase() === "plane002") screen = o; });
        if (screen) {
          screen.material = new THREE.MeshBasicMaterial({ map: screenTexture, toneMapped: false });
        }
        if (akai) {
          const mesh = akai.isMesh ? akai : akai.children.find((c) => c.isMesh);
          mesh.geometry.computeBoundingBox();
          akaiBox = mesh.geometry.boundingBox.clone();
          if (debug) {
            for (let m = BASE_MIDI; m <= BASE_MIDI + 24; m++) keyHighlight(midiToKeyInfo(m));
          }
        }
        // Fit the visible desk to the view (the model's units are much smaller
        // than the old hard-coded 0.11 scale assumed)
        room.updateMatrixWorld(true);
        const box = new THREE.Box3();
        // Frame the gear on the desk (not the table legs or the hanging cables)
        room.children.forEach((c) => { if (FRAME.has(c.name.toLowerCase())) box.expandByObject(c); });
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const fit = FIT_SIZE / Math.max(size.x, size.z);
        room.scale.setScalar(fit);
        room.position.set(-center.x * fit, -center.y * fit + 0.45, -center.z * fit); // nudged up, clear of the buttons below
        pivot.add(room);
        setReady(true);
      },
      (xhr) => { if (xhr.total) setProgress(Math.round((xhr.loaded / xhr.total) * 100)); },
      (err) => { console.error(err); setError("Couldn't load the studio."); }
    );

    // ── interaction ──
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let hoverScreen = false;
    const pick = (e) => {
      const r = renderer.domElement.getBoundingClientRect();
      pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      raycaster.setFromCamera(pointer, camera);
      const targets = [akai, screen].filter(Boolean);
      const hit = raycaster.intersectObjects(targets, true)[0];
      if (!hit) return null;
      let o = hit.object, isAkai = false, isScreen = false;
      while (o) { if (o === akai) isAkai = true; if (o === screen) isScreen = true; o = o.parent; }
      return { hit, isAkai, isScreen };
    };
    const keyAt = (hit) => {
      const local = akai.worldToLocal(hit.point.clone());
      const size = new THREE.Vector3(); akaiBox.getSize(size);
      const u = (local.x - akaiBox.min.x) / size.x;
      const v = (local.z - akaiBox.min.z) / size.z;
      if (debug) console.log("akai uv", u.toFixed(3), v.toFixed(3));
      return keyFromUV(u, v);
    };

    const onPointerDown = (e) => {
      const p = pick(e);
      if (!p) return;
      if (p.isScreen) { navigateRef.current("/OS"); return; }
      if (p.isAkai && akaiBox) {
        const info = keyAt(p.hit);
        if (info) play(info);
      }
    };
    const onPointerMove = (e) => {
      const p = pick(e);
      const overScreen = !!p?.isScreen;
      const overKey = !!(p?.isAkai && akaiBox && keyAt(p.hit));
      renderer.domElement.style.cursor = overScreen || overKey ? "pointer" : "default";
      if (overScreen !== hoverScreen) {
        hoverScreen = overScreen;
        drawScreen(screenCtx, hoverScreen);
        screenTexture.needsUpdate = true;
      }
      // Gentle parallax, like the original's mouse lerp
      targetRot = ((e.clientX / window.innerWidth) - 0.5) * 0.12;
    };
    const onKeyDown = (e) => {
      if (e.repeat || e.metaKey || e.ctrlKey) return;
      const idx = QWERTY[e.key.toLowerCase()];
      if (idx === undefined) return;
      play(midiToKeyInfo(BASE_MIDI + idx));
    };
    let targetRot = 0, rot = 0;
    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointermove", onPointerMove);
    window.addEventListener("keydown", onKeyDown);

    // ── loop ──
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const now = performance.now();
      rot += (targetRot - rot) * 0.06;
      pivot.rotation.y = rot;
      if (!debug) {
        for (let i = highlights.length - 1; i >= 0; i--) {
          const m = highlights[i];
          const t = (now - m.userData.fade) / 350;
          m.material.opacity = Math.max(0, 0.85 * (1 - t));
          if (t >= 1) { m.parent?.remove(m); m.geometry.dispose(); m.material.dispose(); highlights.splice(i, 1); }
        }
      }
      for (let i = notes.length - 1; i >= 0; i--) {
        const n = notes[i];
        const t = (now - n.born) / 1600;
        n.m.position.y += 0.012;
        n.m.position.x += n.drift * 0.01;
        n.m.material.opacity = Math.max(0, 1 - t);
        if (t >= 1) { scene.remove(n.m); n.m.material.dispose(); notes.splice(i, 1); }
      }
      if (screen) {
        // subtle flicker on the monitor
        screen.material.color.setScalar(0.94 + Math.sin(now / 90) * 0.03 + Math.random() * 0.03);
      }
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", onKeyDown);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        const mats = Array.isArray(o.material) ? o.material : o.material ? [o.material] : [];
        mats.forEach((m) => { Object.values(m).forEach((v) => v?.isTexture && v.dispose()); m.dispose(); });
      });
      screenTexture.dispose();
      noteGeo.dispose();
      synth?.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "calc(100vh - 64px)", minHeight: 480, background: "#000", overflow: "hidden" }}>
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
          <p style={{ color: "#73ecff", opacity: 0.8, fontSize: 13, textAlign: "center", padding: "0 16px" }}>
            {lastNote ? `♪ ${lastNote}` : touch ? "tap the keys to play" : "click the keyboard to play · or use A–L on your keyboard"}
          </p>
          <button
            type="button"
            onClick={() => navigate("/OS")}
            style={{ pointerEvents: "auto", background: "#00000d", color: "#73ecff", border: "1px solid #73ecff", borderRadius: 8, padding: "10px 22px", fontFamily: "inherit", fontWeight: 700, letterSpacing: 1, cursor: "pointer", boxShadow: "0 0 18px rgba(115,236,255,.35)" }}
          >
            ENTER genwavOS ▸
          </button>
        </div>
      )}
    </div>
  );
}
