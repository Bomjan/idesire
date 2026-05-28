"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";

const APPLE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 814 1000">
  <path fill="#fff" d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1-67.4 0-85.2-39.3-164.5-39.3-76.5 0-103.7 40.8-165.9 40.8-62 0-105-57.8-155.5-127.4C46.7 790.7 0 663 0 541.8c0-207.3 135.3-316.9 269-316.9 71.2 0 130.4 46.3 174.3 46.3 42.7 0 109.6-49 192.7-49 67.3 0 119.1 10 134.6 118.7z"/>
  <path fill="#fff" d="M554.1 88.4C587.5 48.3 608.5 2.2 608.5 0c0-.7-.7-1.3-2.2-1.3-4.5 0-72.3 35.4-106.3 75.9-28 31.2-56.5 85.6-56.5 129.6 0 2.6.6 4.5 2.6 4.5 5.8 0 77.4-32.5 107.9-120.3z"/>
</svg>`;

// ── Logo fill positions via triangle sampling (sync) ──────────────────────────
function buildLogoPositions(n: number): Float32Array {
  const tris: number[][] = [];
  const areas: number[] = [];
  new SVGLoader().parse(APPLE_SVG).paths.forEach(p =>
    SVGLoader.createShapes(p).forEach(shape => {
      const geo = new THREE.ShapeGeometry(shape, 6);
      const pos = geo.attributes.position, idx = geo.index!.array;
      for (let i = 0; i < idx.length; i += 3) {
        const ax = pos.getX(idx[i]),   ay = pos.getY(idx[i]);
        const bx = pos.getX(idx[i+1]), by = pos.getY(idx[i+1]);
        const cx = pos.getX(idx[i+2]), cy = pos.getY(idx[i+2]);
        const area = Math.abs((bx-ax)*(cy-ay) - (cx-ax)*(by-ay)) * 0.5;
        if (area < 0.5) continue; // skip degenerate micro-triangles (fixes leaf density)
        tris.push([ax, ay, bx, by, cx, cy]);
        areas.push(area);
      }
      geo.dispose();
    })
  );
  // Build CDF for area-weighted sampling
  const total = areas.reduce((s, a) => s + a, 0);
  const cdf = new Float64Array(areas.length);
  let acc = 0;
  for (let i = 0; i < areas.length; i++) { acc += areas[i] / total; cdf[i] = acc; }

  const S = 0.0076, out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const r = Math.random();
    let lo = 0, hi = cdf.length - 1;
    while (lo < hi) { const mid = (lo + hi) >> 1; if (cdf[mid] < r) lo = mid + 1; else hi = mid; }
    const t = tris[lo];
    let u = Math.random(), v = Math.random();
    if (u + v > 1) { u = 1 - u; v = 1 - v; }
    const w = 1 - u - v;
    out[i*3]   = (t[0]*u + t[2]*v + t[4]*w - 407) * S;
    out[i*3+1] = -(t[1]*u + t[3]*v + t[5]*w - 500) * S;
    out[i*3+2] = (Math.random() - .5) * .15;
  }
  return out;
}

// ── Fibonacci sphere ──────────────────────────────────────────────────────────
function buildSphere(n: number, r: number): Float32Array {
  const out = new Float32Array(n * 3), phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = (1 - (i / (n-1)) * 2) * r, rd = Math.sqrt(Math.max(0, r*r - y*y));
    out[i*3] = Math.cos(phi*i)*rd; out[i*3+1] = y; out[i*3+2] = Math.sin(phi*i)*rd;
  }
  return out;
}

// ── Logo particle shader — morph + gravity drop on hover ──────────────────────
const LOGO_VERT = /* glsl */`
attribute vec3  aFrom;
attribute vec3  aTo;
attribute float aSeed;

uniform float uMorphT;
uniform float uTime;
uniform float uDpr;

varying vec3  vCol;
varying float vAlpha;

float easeOut3(float t){ return 1. - pow(1.-clamp(t,.0,1.), 3.); }

void main(){
  float stemDist = length(aTo.xy - vec2(0., 2.6)) / 7.5;
  float delay    = stemDist * 0.30;
  float e        = easeOut3((uMorphT - delay) / (1.0 - delay));

  vec3 pos = mix(aFrom, aTo, e);

  vec4 mv = modelViewMatrix * vec4(pos, 1.);
  gl_Position  = projectionMatrix * mv;
  gl_PointSize = mix(2.6, 5.4, e) * uDpr / (-mv.z);

  float warmth = smoothstep(0.6, 1., e) * (1. - stemDist);
  vCol   = mix(vec3(.55,.70,1.), mix(vec3(.90,.93,1.), vec3(1.,.92,.80), warmth), e);
  vAlpha = mix(.08, .92, e * e);
}`;

const LOGO_FRAG = /* glsl */`
varying vec3  vCol;
varying float vAlpha;
void main(){
  float d = length(gl_PointCoord-.5)*2.;
  float a = exp(-d*d*4.8) * vAlpha;
  if(a < .012) discard;
  gl_FragColor = vec4(vCol, a);
}`;

// ── Wandering ambient particles ───────────────────────────────────────────────
const WANDER_VERT = /* glsl */`
attribute vec3  aBase;
attribute float aSeed;
uniform   float uTime;
uniform   float uDpr;
uniform   vec2  uMouseWorld;
uniform   vec2  uMouseVel;
varying   float vA;
varying   vec3  vCol;

void main(){
  vec3 p = aBase;

  // Slow organic 2-D drift
  p.x += sin(uTime*.10+aSeed*6.28)*.85 + sin(uTime*.04+aSeed*4.0)*.30;
  p.y += cos(uTime*.08+aSeed*5.4)*.65 + cos(uTime*.03+aSeed*2.9)*.25;
  p.x += sin(uTime*.018+aSeed*1.1)*1.4;
  p.y += cos(uTime*.014+aSeed*0.9)*1.1;

  vec2  toMouse  = p.xy - uMouseWorld;
  float mDist    = length(toMouse);
  vec2  mDir     = toMouse / max(mDist, 0.01);
  vec2  tangent  = vec2(-mDir.y, mDir.x); // CCW perpendicular for swirl

  // Swirl — particles orbit the cursor (0 – 6 units)
  float swirl    = smoothstep(6.0, 0.0, mDist);
  p.xy          += tangent * swirl * 0.65;

  // Antigravity lift (0 – 5 units)
  float lift     = smoothstep(5.0, 0.0, mDist);
  p.y           += lift * lift * 1.8;

  // Velocity wake — mouse speed blows particles along its path
  float speed    = length(uMouseVel);
  float wake     = smoothstep(5.0, 0.0, mDist) * min(speed * 0.06, 1.0);
  p.xy          += uMouseVel * wake * 0.22;

  vec4 mv = modelViewMatrix * vec4(p, 1.);
  gl_Position  = projectionMatrix * mv;

  float activity = max(swirl, lift);
  gl_PointSize = (2.0 + sin(aSeed*9.)*.4 + activity*1.8) * uDpr;

  float c    = fract(aSeed * 5.17);
  vec3 col0  = vec3(.38, .55, .98);
  vec3 col1  = vec3(.45, .82, .96);
  vec3 col2  = vec3(.72, .55, .98);
  vec3 col3  = vec3(.88, .91, 1.00);
  vec3 col   = c < .33 ? mix(col0, col1, c*3.) :
               c < .66 ? mix(col1, col2, (c-.33)*3.) :
                         mix(col2, col3, (c-.66)*3.);
  vCol = mix(col, vec3(1.), activity * 0.4);
  vA   = (.045 + sin(aSeed*7.3)*.012) * (1.0 + activity * 0.7);
}`;

const WANDER_FRAG = /* glsl */`
varying float vA;
varying vec3  vCol;
void main(){
  float d = length(gl_PointCoord-.5)*2.;
  float a = exp(-d*d*5.) * vA;
  if(a<.01) discard;
  gl_FragColor = vec4(vCol, a);
}`;

// ── Blue accent particles ─────────────────────────────────────────────────────
const BLUE_VERT = /* glsl */`
attribute vec3  aBase;
attribute float aSeed;
uniform   float uTime;
uniform   float uDpr;
varying   float vA;

void main(){
  vec3 p = aBase;
  p.x += sin(uTime*.07 + aSeed*6.28)*2.2 + sin(uTime*.03 + aSeed*3.1)*1.0;
  p.y += cos(uTime*.05 + aSeed*5.1)*1.8 + cos(uTime*.02 + aSeed*1.9)*.8;

  vec4 mv = modelViewMatrix * vec4(p, 1.);
  gl_Position  = projectionMatrix * mv;
  gl_PointSize = (4.5 + sin(aSeed*11.)*1.2) * uDpr;
  vA = .28 + sin(uTime*.4 + aSeed*6.28)*.10;
}`;

const BLUE_FRAG = /* glsl */`
varying float vA;
void main(){
  float d = length(gl_PointCoord-.5)*2.;
  float a = exp(-d*d*3.2) * vA;
  if(a<.008) discard;
  gl_FragColor = vec4(.20, .50, 1.0, a);
}`;

// ── Component ─────────────────────────────────────────────────────────────────
export default function HeroCanvas() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current!;
    let W = el.clientWidth, H = el.clientHeight;
    const DPR = Math.min(window.devicePixelRatio, 2);
    const N   = 14000;
    const NW  = 480; // wandering count

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: "high-performance" });
    renderer.setSize(W, H); renderer.setPixelRatio(DPR);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    Object.assign(renderer.domElement.style, { position:"absolute", inset:"0", width:"100%", height:"100%" });
    el.appendChild(renderer.domElement);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(44, W/H, .1, 100);
    camera.position.z = 15;

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(new THREE.Vector2(W, H), 0.75, 0.7, 0.68);
    composer.addPass(bloom);
    composer.addPass(new OutputPass());

    // ── Logo particles ────────────────────────────────────────────────────────
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("aFrom",    new THREE.BufferAttribute(buildSphere(N, 7), 3));
    geo.setAttribute("aTo",      new THREE.BufferAttribute(buildLogoPositions(N), 3));
    geo.setAttribute("aSeed",    new THREE.BufferAttribute(new Float32Array(N).map(() => Math.random()), 1));
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(N * 3), 3));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 12);

    const logoUni = {
      uMorphT: { value: 0 },
      uTime:   { value: 0 },
      uDpr:    { value: DPR },
    };
    const logoPoints = new THREE.Points(geo, new THREE.ShaderMaterial({
      vertexShader: LOGO_VERT, fragmentShader: LOGO_FRAG, uniforms: logoUni,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    }));
    scene.add(logoPoints);

    // ── Wandering particles ───────────────────────────────────────────────────
    const wBase  = new Float32Array(NW * 3);
    const wSeeds = new Float32Array(NW);
    for (let i = 0; i < NW; i++) {
      const leftBias = i < NW * 0.55; // 55% populate the left/text region
      if (leftBias) {
        // Scatter across the left half of the scene (-12 to 0 x, -6 to 6 y)
        wBase[i*3]   = -12 + Math.random() * 11;
        wBase[i*3+1] = (Math.random() - 0.5) * 12;
        wBase[i*3+2] = (Math.random() - 0.5) * 4;
      } else {
        const r = 4 + Math.random() * 10;
        const phi = Math.acos(2 * Math.random() - 1), theta = Math.random() * Math.PI * 2;
        wBase[i*3]   = r * Math.sin(phi) * Math.cos(theta);
        wBase[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
        wBase[i*3+2] = r * Math.cos(phi);
      }
      wSeeds[i] = Math.random();
    }
    const wGeo = new THREE.BufferGeometry();
    wGeo.setAttribute("aBase",    new THREE.BufferAttribute(wBase,  3));
    wGeo.setAttribute("aSeed",    new THREE.BufferAttribute(wSeeds, 1));
    wGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(NW*3), 3));
    wGeo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 20);

    const wanderUni = { uTime: { value: 0 }, uDpr: { value: DPR }, uMouseWorld: { value: new THREE.Vector2(999, 999) }, uMouseVel: { value: new THREE.Vector2(0, 0) } };
    const wanderPoints = new THREE.Points(wGeo, new THREE.ShaderMaterial({
      vertexShader: WANDER_VERT, fragmentShader: WANDER_FRAG, uniforms: wanderUni,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    }));
    scene.add(wanderPoints);

    // ── Blue accent particles ─────────────────────────────────────────────────
    const NB = 28;
    const bBase = new Float32Array(NB * 3), bSeeds = new Float32Array(NB);
    for (let i = 0; i < NB; i++) {
      bBase[i*3]   = (Math.random() - 0.5) * 22;
      bBase[i*3+1] = (Math.random() - 0.5) * 14;
      bBase[i*3+2] = (Math.random() - 0.5) * 6;
      bSeeds[i]    = Math.random();
    }
    const bGeo = new THREE.BufferGeometry();
    bGeo.setAttribute("aBase",    new THREE.BufferAttribute(bBase,  3));
    bGeo.setAttribute("aSeed",    new THREE.BufferAttribute(bSeeds, 1));
    bGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(NB*3), 3));
    bGeo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 20);
    const blueUni = { uTime: { value: 0 }, uDpr: { value: DPR } };
    const bluePoints = new THREE.Points(bGeo, new THREE.ShaderMaterial({
      vertexShader: BLUE_VERT, fragmentShader: BLUE_FRAG, uniforms: blueUni,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    }));
    scene.add(bluePoints);

    // ── Reusable objects for mouse → world projection ─────────────────────────
    const raycaster    = new THREE.Raycaster();
    const mouseNDC     = new THREE.Vector2();
    const hoverPlane   = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const worldHitPos  = new THREE.Vector3();

    // ── State ─────────────────────────────────────────────────────────────────
    let mouseScreenX = W / 2, mouseScreenY = H / 2;
    let prevMouseX = W / 2, prevMouseY = H / 2;
    let mouseVelX = 0, mouseVelY = 0;
    let morphCur = 0, rotY = 0;
    let prev = performance.now(), elapsed = 0;

    const scrollMorphT = () =>
      Math.min(Math.max((window.scrollY / window.innerHeight - 0.05) / 0.75, 0), 1);

    const onMove  = (e: MouseEvent) => { mouseScreenX = e.clientX; mouseScreenY = e.clientY; };
    const onLeave = () => {
      wanderUni.uMouseWorld.value.set(999, 999);
      wanderUni.uMouseVel.value.set(0, 0);
      mouseVelX = 0; mouseVelY = 0;
    };
    const onResize = () => {
      W = el.clientWidth; H = el.clientHeight;
      camera.aspect = W/H; camera.updateProjectionMatrix();
      renderer.setSize(W,H); composer.setSize(W,H); bloom.resolution.set(W,H);
    };
    el.addEventListener("mousemove",  onMove,   { passive: true });
    el.addEventListener("mouseleave", onLeave,  { passive: true });
    window.addEventListener("resize", onResize);

    let id = 0;
    const frame = () => {
      id = requestAnimationFrame(frame);
      const now = performance.now(), dt = Math.min((now - prev) / 1000, .1);
      prev = now; elapsed += dt;

      const morphTarget = scrollMorphT();
      morphCur += (morphTarget - morphCur) * .07;
      logoUni.uMorphT.value = morphCur;
      logoUni.uTime.value   = elapsed;
      wanderUni.uTime.value = elapsed;
      blueUni.uTime.value   = elapsed;

      // Only apply mouse interactions when canvas is visible in the viewport
      const rect = el.getBoundingClientRect();
      const canvasVisible = rect.bottom > 0 && rect.top < H;

      if (canvasVisible) {
        // Project mouse to world at z=0 (for wandering particles only)
        mouseNDC.set((mouseScreenX/W)*2-1, -(mouseScreenY/H)*2+1);
        raycaster.setFromCamera(mouseNDC, camera);
        raycaster.ray.intersectPlane(hoverPlane, worldHitPos);
        wanderUni.uMouseWorld.value.set(worldHitPos.x, worldHitPos.y);

        const rawVx = (mouseScreenX - prevMouseX) / W * 28;
        const rawVy = -(mouseScreenY - prevMouseY) / H * 28;
        mouseVelX += (rawVx - mouseVelX) * 0.18;
        mouseVelY += (rawVy - mouseVelY) * 0.18;
        prevMouseX = mouseScreenX; prevMouseY = mouseScreenY;
        wanderUni.uMouseVel.value.set(mouseVelX, mouseVelY);
      } else {
        wanderUni.uMouseWorld.value.set(999, 999);
        wanderUni.uMouseVel.value.set(0, 0);
        mouseVelX = 0; mouseVelY = 0;
      }

      // Rotation: stops completely once logo is formed
      rotY += dt * .008 * (1 - morphCur);
      logoPoints.rotation.y  = rotY;
      // no object rotation on wandering particles — keeps z-depth stable

      // Mouse parallax only while canvas is visible
      if (canvasVisible) {
        const mx = (mouseScreenX/W - .5) * 2;
        const my = -(mouseScreenY/H - .5) * 2;
        const tilt = 1 - morphCur * .92;
        logoPoints.rotation.x += (my*.09*tilt - logoPoints.rotation.x) * .05;
        logoPoints.rotation.z += (-mx*.04*tilt - logoPoints.rotation.z) * .05;
      }

      const targetZ = 15 - morphCur * 4;
      const dz = targetZ - camera.position.z;
      if (Math.abs(dz) > 0.0005) camera.position.z += dz * .04;

      composer.render();
    };
    frame();

    return () => {
      cancelAnimationFrame(id);
      el.removeEventListener("mousemove",  onMove);
      el.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize",    onResize);
      composer.dispose(); renderer.dispose();
      bGeo.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={ref} style={{
      position: "absolute", inset: 0,
      background: "radial-gradient(ellipse 90% 80% at 50% 45%, #05051a 0%, #000 60%)",
    }} />
  );
}
