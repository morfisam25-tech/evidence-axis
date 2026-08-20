import * as THREE from 'three';

const stage = document.querySelector<HTMLElement>('[data-axis-stage]');
const canvas = stage?.querySelector<HTMLCanvasElement>('[data-axis-canvas]');

if (stage && canvas) {
  const probe = document.createElement('canvas');
  const supportsWebGL = Boolean(probe.getContext('webgl2') || probe.getContext('webgl'));

  if (!supportsWebGL) {
    stage.classList.add('axis-stage--fallback');
  } else {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let disposed = false;
  let visible = true;
  let raf = 0;
  let targetX = -0.11;
  let targetY = 0.16;
  let rotX = targetX;
  let rotY = targetY;
  let last = performance.now();

  try {
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(31, 1, 0.1, 100);
    camera.position.set(0, 0.1, 10.2);
    camera.lookAt(0, 0, 0);

    const root = new THREE.Group();
    root.rotation.set(rotX, rotY, 0);
    scene.add(root);

    scene.add(new THREE.HemisphereLight(0xbfd8ff, 0x06101c, 2.8));
    const key = new THREE.PointLight(0x58f2e8, 36, 18, 1.8);
    key.position.set(4, 4, 6);
    scene.add(key);
    const rim = new THREE.PointLight(0x7098ff, 28, 16, 2);
    rim.position.set(-4, -1, 5);
    scene.add(rim);

    const bodyMat = new THREE.MeshPhysicalMaterial({
      color: 0x12335d,
      emissive: 0x07192f,
      emissiveIntensity: 1.3,
      roughness: 0.24,
      metalness: 0.32,
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const capMat = new THREE.MeshPhysicalMaterial({
      color: 0x10284a,
      emissive: 0x071a31,
      emissiveIntensity: 1.2,
      roughness: 0.18,
      metalness: 0.55,
      transparent: true,
      opacity: 0.68,
    });

    const body = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.2, 5.45, 72, 1, true), bodyMat);
    root.add(body);

    const capGeo = new THREE.CylinderGeometry(2.24, 2.24, 0.22, 72);
    const topCap = new THREE.Mesh(capGeo, capMat);
    topCap.position.y = 2.72;
    root.add(topCap);
    const bottomCap = new THREE.Mesh(capGeo, capMat);
    bottomCap.position.y = -2.72;
    root.add(bottomCap);

    const edgeMat = new THREE.MeshBasicMaterial({ color: 0x679cff, transparent: true, opacity: 0.55 });
    const edgeGeo = new THREE.TorusGeometry(2.24, 0.018, 10, 96);
    const topEdge = new THREE.Mesh(edgeGeo, edgeMat);
    topEdge.rotation.x = Math.PI / 2;
    topEdge.position.y = 2.83;
    root.add(topEdge);
    const bottomEdge = topEdge.clone();
    bottomEdge.position.y = -2.83;
    root.add(bottomEdge);

    const beam = new THREE.Mesh(
      new THREE.CylinderGeometry(0.018, 0.018, 5.25, 10),
      new THREE.MeshBasicMaterial({ color: 0x63fff1, transparent: true, opacity: 0.85 })
    );
    root.add(beam);

    const glowBeam = new THREE.Mesh(
      new THREE.CylinderGeometry(0.075, 0.075, 5.1, 12),
      new THREE.MeshBasicMaterial({ color: 0x47dcd5, transparent: true, opacity: 0.08, depthWrite: false })
    );
    root.add(glowBeam);

    const ringSpecs = [
      { y: 1.55, color: 0x4fe1d7 },
      { y: 0, color: 0xf1aa49 },
      { y: -1.55, color: 0xa67bff },
    ];
    ringSpecs.forEach(({ y, color }) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1.77, 0.035, 12, 96),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.95 })
      );
      ring.rotation.x = Math.PI / 2;
      ring.position.y = y;
      root.add(ring);

      const halo = new THREE.Mesh(
        new THREE.TorusGeometry(1.78, 0.12, 12, 96),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.08, depthWrite: false })
      );
      halo.rotation.x = Math.PI / 2;
      halo.position.y = y;
      root.add(halo);
    });

    const grid = new THREE.GridHelper(8.8, 18, 0x204872, 0x17314f);
    grid.position.y = -3.0;
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0.24;
    root.add(grid);

    const pCount = 150;
    const positions = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 2.7 + Math.random() * 1.6;
      positions[i * 3] = Math.cos(a) * r;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6.2;
      positions[i * 3 + 2] = Math.sin(a) * r * 0.55;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({ color: 0x6da2ff, size: 0.025, transparent: true, opacity: 0.42, depthWrite: false })
    );
    root.add(particles);

    const resize = () => {
      const r = stage.getBoundingClientRect();
      const w = Math.max(1, r.width);
      const h = Math.max(1, r.height);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(stage);

    const onPointer = (event: PointerEvent) => {
      if (reduced.matches) return;
      const r = stage.getBoundingClientRect();
      const nx = (event.clientX - r.left) / r.width - 0.5;
      const ny = (event.clientY - r.top) / r.height - 0.5;
      targetY = nx * 0.55;
      targetX = -ny * 0.28 - 0.08;
      stage.style.setProperty('--pointer-x', `${nx * 12}px`);
      stage.style.setProperty('--pointer-y', `${ny * 9}px`);
    };
    const onLeave = () => {
      targetX = -0.1;
      targetY = 0.14;
      stage.style.setProperty('--pointer-x', '0px');
      stage.style.setProperty('--pointer-y', '0px');
    };
    stage.addEventListener('pointermove', onPointer, { passive: true });
    stage.addEventListener('pointerleave', onLeave, { passive: true });

    const io = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      if (visible && !raf) raf = requestAnimationFrame(frame);
    }, { threshold: 0.05 });
    io.observe(stage);

    const frame = (now: number) => {
      raf = 0;
      if (disposed || !visible || document.hidden) return;
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;
      const k = 1 - Math.exp(-dt / 0.11);
      rotX += (targetX - rotX) * k;
      rotY += (targetY - rotY) * k;
      root.rotation.x = rotX;
      root.rotation.y = rotY + (reduced.matches ? 0 : Math.sin(now * 0.00025) * 0.025);
      particles.rotation.y = reduced.matches ? 0 : now * 0.000035;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    };

    const onVisibility = () => {
      if (!document.hidden && visible && !raf) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);
    raf = requestAnimationFrame(frame);

    window.addEventListener('pagehide', () => {
      disposed = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      stage.removeEventListener('pointermove', onPointer);
      stage.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      body.geometry.dispose();
      bodyMat.dispose();
      capGeo.dispose();
      capMat.dispose();
      edgeGeo.dispose();
      edgeMat.dispose();
      pGeo.dispose();
      (particles.material as THREE.Material).dispose();
      renderer.dispose();
    }, { once: true });

    stage.classList.add('axis-stage--webgl');
  } catch {
    stage.classList.add('axis-stage--fallback');
  }
  }
}
