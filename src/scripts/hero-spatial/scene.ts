/**
 * Evidence Axis — spatial hero scene (Three.js).
 * Procedural, editorial, graphic (flat MeshBasic — no photorealism).
 * Concept made spatial: scattered evidence → classified → aligned onto the
 * Axis → a decision layer, with Unknown deliberately left unresolved.
 *
 * One renderer, one update path. No per-frame geometry rebuilds, no idle
 * float. Motion is driven only by scroll progress + restrained pointer
 * parallax, so aligned evidence reads as settled.
 */
import * as THREE from 'three';
import { COLORS, EVIDENCE, TIMING, type EvidenceItem } from './config';

const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const hex = (n: number) => new THREE.Color(n);

interface Card {
  group: THREE.Group;
  item: EvidenceItem;
  mat: THREE.MeshBasicMaterial;
  fillTarget: number;
}

export class HeroScene {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private root = new THREE.Group();
  private cards: Card[] = [];
  private inferenceLinks: { line: THREE.LineSegments; mat: THREE.LineDashedMaterial }[] = [];
  private decisionLinks: { line: THREE.Line; mat: THREE.LineBasicMaterial }[] = [];
  private decision!: THREE.Group;
  private axisMat!: THREE.LineBasicMaterial;
  private disposables: { dispose(): void }[] = [];

  private targetP = 0;
  private dispP = 0;
  private targetPx = 0;
  private targetPy = 0;
  private px = 0;
  private py = 0;
  private lastT = 0;

  constructor(canvas: HTMLCanvasElement, dpr: number, w: number, h: number) {
    // WebGL2 required (checked by capability gate before we get here).
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      failIfMajorPerformanceCaveat: false,
    });
    this.renderer.setPixelRatio(Math.min(dpr, window.devicePixelRatio || 1));
    this.renderer.setClearColor(0x000000, 0);

    this.camera = new THREE.PerspectiveCamera(30, (w || 1) / (h || 1), 0.1, 100);
    this.camera.position.set(0.3, 0.05, 13.6);
    this.camera.lookAt(0, 0, 0);

    this.scene.fog = new THREE.Fog(COLORS.bg, 10.5, 18.5);
    // Weight the composition to the right so it sits clear of the copy column.
    this.root.position.x = 0.7;
    this.scene.add(this.root);

    this.buildAxis();
    this.buildCards();
    this.buildInferenceLinks();
    this.buildDecision();

    this.resize(w, h);
  }

  // ---- construction ------------------------------------------------------
  private track<T extends { dispose(): void }>(o: T): T {
    this.disposables.push(o);
    return o;
  }

  private buildAxis() {
    const g = this.track(new THREE.BufferGeometry());
    g.setAttribute(
      'position',
      new THREE.Float32BufferAttribute([0, -2.5, 0, 0, 2.4, 0], 3)
    );
    this.axisMat = this.track(
      new THREE.LineBasicMaterial({ color: hex(COLORS.axis), transparent: true, opacity: 0.5 })
    );
    this.root.add(new THREE.Line(g, this.axisMat));

    // coordinate ticks along the axis
    const ticks: number[] = [];
    for (let y = -2.4; y <= 2.4; y += 0.6) {
      const len = Math.abs(y % 1.2) < 0.01 ? 0.2 : 0.11;
      ticks.push(-len, y, 0, len, y, 0);
    }
    const tg = this.track(new THREE.BufferGeometry());
    tg.setAttribute('position', new THREE.Float32BufferAttribute(ticks, 3));
    const tm = this.track(
      new THREE.LineBasicMaterial({ color: hex(COLORS.axis), transparent: true, opacity: 0.25 })
    );
    this.root.add(new THREE.LineSegments(tg, tm));

    // a faint back reference plane for depth
    const pg = this.track(new THREE.PlaneGeometry(9, 7));
    const pm = this.track(
      new THREE.MeshBasicMaterial({
        color: hex(COLORS.faint),
        transparent: true,
        opacity: 0.06,
        side: THREE.DoubleSide,
        depthWrite: false,
      })
    );
    const plane = new THREE.Mesh(pg, pm);
    plane.position.z = -3.2;
    this.root.add(plane);
  }

  private labelTexture(item: EvidenceItem): THREE.CanvasTexture {
    const W = 320;
    const H = 104;
    const c = document.createElement('canvas');
    c.width = W;
    c.height = H;
    const ctx = c.getContext('2d')!;
    const stroke =
      item.state === 'fact'
        ? '#69c0a2'
        : item.state === 'inference'
          ? '#d8ab63'
          : '#a2a9b3';
    ctx.clearRect(0, 0, W, H);
    // card fill
    ctx.fillStyle = 'rgba(24,28,34,0.72)';
    roundRect(ctx, 4, 4, W - 8, H - 8, 10);
    ctx.fill();
    // border per state
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 3;
    if (item.state === 'inference') ctx.setLineDash([10, 8]);
    else if (item.state === 'unknown') ctx.setLineDash([2, 9]);
    else ctx.setLineDash([]);
    roundRect(ctx, 4, 4, W - 8, H - 8, 10);
    ctx.stroke();
    ctx.setLineDash([]);
    // state glyph
    const gx = 30;
    const gy = 34;
    ctx.fillStyle = stroke;
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 3;
    if (item.state === 'fact') {
      ctx.fillRect(gx - 7, gy - 7, 14, 14);
    } else if (item.state === 'inference') {
      ctx.beginPath();
      ctx.arc(gx, gy, 8, -Math.PI / 2, Math.PI / 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(gx, gy, 8, 0, Math.PI * 2);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(gx, gy, 7.5, 0, Math.PI * 2);
      ctx.stroke();
    }
    // state word
    ctx.fillStyle = stroke;
    ctx.font = '600 15px "IBM Plex Mono", monospace';
    ctx.textBaseline = 'middle';
    ctx.fillText(item.state.toUpperCase(), 52, gy);
    // label
    ctx.fillStyle = '#f1ede3';
    ctx.font = '500 27px "IBM Plex Mono", monospace';
    ctx.fillText(item.label, 24, 74);

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    this.track(tex);
    return tex;
  }

  private buildCards() {
    const geo = this.track(new THREE.PlaneGeometry(1.32, 0.43));
    for (const item of EVIDENCE) {
      const mat = this.track(
        new THREE.MeshBasicMaterial({
          map: this.labelTexture(item),
          transparent: true,
          opacity: 0.34,
          depthWrite: false,
          side: THREE.DoubleSide,
        })
      );
      const mesh = new THREE.Mesh(geo, mat);
      const group = new THREE.Group();
      group.add(mesh);
      group.position.set(...item.scatter);
      group.rotation.set(0, item.rot, item.rot * 0.4);
      this.root.add(group);
      const fillTarget = item.state === 'unknown' ? 0.55 : item.state === 'inference' ? 0.82 : 0.98;
      this.cards.push({ group, item, mat, fillTarget });
    }
  }

  private buildInferenceLinks() {
    for (const item of EVIDENCE) {
      if (item.state !== 'inference' || item.derivesFrom == null) continue;
      const fact = EVIDENCE[item.derivesFrom];
      const g = this.track(new THREE.BufferGeometry());
      g.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(
          [...fact.aligned, ...item.aligned],
          3
        )
      );
      const mat = this.track(
        new THREE.LineDashedMaterial({
          color: hex(COLORS.inference),
          transparent: true,
          opacity: 0,
          dashSize: 0.14,
          gapSize: 0.1,
        })
      );
      const line = new THREE.LineSegments(g, mat);
      line.computeLineDistances();
      this.root.add(line);
      this.inferenceLinks.push({ line, mat });
    }
  }

  private decisionTexture(): THREE.CanvasTexture {
    const W = 360;
    const H = 96;
    const c = document.createElement('canvas');
    c.width = W;
    c.height = H;
    const ctx = c.getContext('2d')!;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(46,60,102,0.82)';
    roundRect(ctx, 3, 3, W - 6, H - 6, 10);
    ctx.fill();
    ctx.strokeStyle = '#a7bce6';
    ctx.lineWidth = 3;
    roundRect(ctx, 3, 3, W - 6, H - 6, 10);
    ctx.stroke();
    ctx.fillStyle = '#eef2fb';
    ctx.font = '600 34px "Space Grotesk", sans-serif';
    ctx.textBaseline = 'middle';
    ctx.fillText('→ Decision', 26, H / 2 + 2);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    this.track(tex);
    return tex;
  }

  private buildDecision() {
    this.decision = new THREE.Group();
    // decision node — a labelled plane, the structured outcome
    const barG = this.track(new THREE.PlaneGeometry(1.86, 0.5));
    const barM = this.track(
      new THREE.MeshBasicMaterial({
        map: this.decisionTexture(),
        transparent: true,
        opacity: 0,
        depthWrite: false,
      })
    );
    const bar = new THREE.Mesh(barG, barM);
    this.decision.add(bar);
    const eg = this.track(new THREE.EdgesGeometry(barG));
    const em = this.track(
      new THREE.LineBasicMaterial({ color: hex(COLORS.axisBright), transparent: true, opacity: 0 })
    );
    this.decision.add(new THREE.LineSegments(eg, em));
    this.decision.position.set(0, -2.3, 0);
    this.decisionMat = barM;
    this.decisionEdge = em;
    this.root.add(this.decision);

    // converging lines from each fact's aligned position to the decision node
    for (const item of EVIDENCE) {
      if (item.state !== 'fact') continue;
      const g = this.track(new THREE.BufferGeometry());
      g.setAttribute(
        'position',
        new THREE.Float32BufferAttribute([...item.aligned, 0, -2.3, 0], 3)
      );
      const mat = this.track(
        new THREE.LineBasicMaterial({ color: hex(COLORS.decision), transparent: true, opacity: 0 })
      );
      const line = new THREE.Line(g, mat);
      this.root.add(line);
      this.decisionLinks.push({ line, mat });
    }
  }
  private decisionMat!: THREE.MeshBasicMaterial;
  private decisionEdge!: THREE.LineBasicMaterial;

  // ---- runtime -----------------------------------------------------------
  setProgress(p: number) {
    this.targetP = Math.min(1, Math.max(0, p));
  }
  get progress() {
    return this.dispP;
  }
  setPointer(nx: number, ny: number) {
    this.targetPx = nx;
    this.targetPy = ny;
  }

  private applyProgress(p: number) {
    // movement from scatter → aligned
    const move = smoothstep(0.12, 0.72, p);
    const eased = move * move * (3 - 2 * move);
    const classify = smoothstep(0.08, 0.46, p);

    for (const card of this.cards) {
      const { group, item } = card;
      group.position.set(
        lerp(item.scatter[0], item.aligned[0], eased),
        lerp(item.scatter[1], item.aligned[1], eased),
        lerp(item.scatter[2], item.aligned[2], eased)
      );
      const rz = lerp(item.rot * 0.4, 0, eased);
      const ry = lerp(item.rot, 0, eased);
      group.rotation.set(0, ry, rz);
      card.mat.opacity = lerp(0.44, card.fillTarget, classify);
    }
    this.axisMat.opacity = lerp(0.28, 0.6, classify);

    // inference connectors
    const inf = smoothstep(0.58, 0.82, p);
    for (const l of this.inferenceLinks) l.mat.opacity = inf * 0.75;

    // decision
    const dec = smoothstep(0.8, 1, p);
    this.decisionMat.opacity = dec * 0.9;
    this.decisionEdge.opacity = dec;
    this.decision.scale.setScalar(lerp(0.7, 1, dec));
    for (const l of this.decisionLinks) l.mat.opacity = dec * 0.5;
  }

  frame() {
    // Frame-rate-independent smoothing: convergence depends on elapsed time,
    // not on how many frames render, so the feel is consistent across refresh
    // rates and slower GPUs.
    const now = (typeof performance !== 'undefined' ? performance.now() : Date.now()) / 1000;
    let dt = this.lastT ? now - this.lastT : 1 / 60;
    this.lastT = now;
    if (dt > 0.1) dt = 0.1; // clamp long stalls
    const kP = 1 - Math.exp(-dt / TIMING.progressTau);
    const kPtr = 1 - Math.exp(-dt / TIMING.pointerTau);
    this.dispP = lerp(this.dispP, this.targetP, kP);
    this.px = lerp(this.px, this.targetPx, kPtr);
    this.py = lerp(this.py, this.targetPy, kPtr);
    this.applyProgress(this.dispP);
    this.root.rotation.y = this.px * TIMING.pointerAmpX;
    this.root.rotation.x = -this.py * TIMING.pointerAmpY;
    this.renderer.render(this.scene, this.camera);
  }

  resize(w: number, h: number) {
    if (!w || !h) return;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h, false);
  }

  dispose() {
    for (const d of this.disposables) {
      try {
        d.dispose();
      } catch {
        /* noop */
      }
    }
    this.renderer.dispose();
  }
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
