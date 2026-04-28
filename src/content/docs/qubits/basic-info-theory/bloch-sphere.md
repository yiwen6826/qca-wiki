---
title: "The Bloch Sphere"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Bloch Sphere Simulator</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: system-ui, sans-serif;
      background: #0f0f13;
      color: #e2e2e2;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2rem 1rem;
    }

    h1 {
      font-size: 1.4rem;
      font-weight: 500;
      margin-bottom: 0.25rem;
      color: #fff;
    }

    .subtitle {
      font-size: 0.8rem;
      color: #888;
      margin-bottom: 1.5rem;
    }

    .panel {
      display: flex;
      gap: 24px;
      align-items: flex-start;
      flex-wrap: wrap;
      justify-content: center;
    }

    canvas {
      display: block;
      border-radius: 12px;
      background: #16161e;
      border: 0.5px solid rgba(255,255,255,0.08);
      cursor: grab;
    }
    canvas:active { cursor: grabbing; }

    .controls {
      width: 220px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .ctrl-group label {
      font-size: 11px;
      color: #888;
      display: block;
      margin-bottom: 4px;
    }

    .val {
      font-size: 12px;
      font-weight: 600;
      color: #c2c2c2;
      min-width: 36px;
      display: inline-block;
      text-align: right;
    }

    input[type="range"] {
      width: 100%;
      accent-color: #378add;
    }

    .section-title {
      font-size: 12px;
      font-weight: 600;
      color: #aaa;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-bottom: 6px;
    }

    .gate-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    button {
      font-size: 12px;
      padding: 5px 10px;
      border-radius: 6px;
      border: 0.5px solid rgba(255,255,255,0.15);
      background: rgba(255,255,255,0.05);
      color: #ddd;
      cursor: pointer;
      transition: background 0.15s;
    }
    button:hover { background: rgba(255,255,255,0.12); }
    button:active { transform: scale(0.97); }

    .state-box {
      background: rgba(255,255,255,0.04);
      border: 0.5px solid rgba(255,255,255,0.08);
      border-radius: 8px;
      padding: 10px 12px;
      font-size: 12px;
      color: #888;
      line-height: 1.9;
    }
    .state-box span {
      font-weight: 500;
      color: #ddd;
    }
  </style>
</head>
<body>

  <h1>Bloch Sphere Simulator</h1>
  <p class="subtitle">Drag the sphere to rotate the view · Use sliders or gates to change qubit state</p>

  <div class="panel">
    <canvas id="bc" width="380" height="380"></canvas>

    <div class="controls">
      <div>
        <div class="section-title">State angles</div>
        <div class="ctrl-group" style="margin-bottom:10px">
          <label>θ (theta) — polar &nbsp;<span class="val" id="tv">90°</span></label>
          <input type="range" min="0" max="180" value="90" id="ts">
        </div>
        <div class="ctrl-group">
          <label>φ (phi) — azimuthal &nbsp;<span class="val" id="pv">0°</span></label>
          <input type="range" min="0" max="360" value="0" id="ps">
        </div>
      </div>

      <div>
        <div class="section-title">Quantum gates</div>
        <div class="gate-row">
          <button onclick="applyGate('H')">H</button>
          <button onclick="applyGate('X')">X (NOT)</button>
          <button onclick="applyGate('Y')">Y</button>
          <button onclick="applyGate('Z')">Z</button>
          <button onclick="applyGate('S')">S</button>
          <button onclick="applyGate('T')">T</button>
          <button onclick="applyGate('reset')">Reset |0⟩</button>
        </div>
      </div>

      <div class="state-box">
        <div style="color:#aaa;margin-bottom:2px">State vector</div>
        <div>|ψ⟩ = <span id="s0">1.000</span>|0⟩ + <span id="s1">0.000</span>|1⟩</div>
        <div>P(|0⟩) = <span id="p0">100%</span></div>
        <div>P(|1⟩) = <span id="p1">0%</span></div>
        <div style="margin-top:4px">
          Bloch: (<span id="bx">0.00</span>, <span id="by">0.00</span>, <span id="bz">1.00</span>)
        </div>
      </div>
    </div>
  </div>

  <script>
    const canvas = document.getElementById('bc');
    const ctx = canvas.getContext('2d');

    let theta = Math.PI / 2, phi = 0;
    let dragging = false, lastX = 0, lastY = 0;
    let camTheta = 0.4, camPhi = 0.6;

    // ── helpers ──────────────────────────────────────────────────────────
    function blochToCartesian(th, ph) {
      return {
        x: Math.sin(th) * Math.cos(ph),
        y: Math.sin(th) * Math.sin(ph),
        z: Math.cos(th)
      };
    }

    function project(x, y, z) {
      const ct = Math.cos(camTheta), st = Math.sin(camTheta);
      const cp = Math.cos(camPhi),  sp = Math.sin(camPhi);
      // rotate around Z then X
      const x1 = x * ct - y * st, y1 = x * st + y * ct;
      const x2 = x1, y2 = y1 * cp - z * sp;
      const scale = 140, cx = 190, cy = 200;
      return { px: cx + x2 * scale, py: cy - y2 * scale };
    }

    // ── drawing ──────────────────────────────────────────────────────────
    function drawSphere() {
      ctx.clearRect(0, 0, 380, 380);

      /* sphere fill */
      ctx.beginPath();
      ctx.arc(190, 200, 140, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.04)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.14)';
      ctx.lineWidth = 1;
      ctx.stroke();

      /* equator */
      ctx.beginPath();
      for (let a = 0; a <= Math.PI * 2; a += 0.05) {
        const p = project(Math.cos(a), Math.sin(a), 0);
        a === 0 ? ctx.moveTo(p.px, p.py) : ctx.lineTo(p.px, p.py);
      }
      ctx.strokeStyle = 'rgba(255,255,255,0.1)';
      ctx.lineWidth = 1;
      ctx.stroke();

      /* meridians (dashed) */
      for (let angle = 0; angle < Math.PI; angle += Math.PI / 4) {
        ctx.beginPath();
        for (let a = 0; a <= Math.PI * 2; a += 0.05) {
          const p = project(
            Math.cos(angle) * Math.cos(a),
            Math.sin(angle) * Math.cos(a),
            Math.sin(a)
          );
          a === 0 ? ctx.moveTo(p.px, p.py) : ctx.lineTo(p.px, p.py);
        }
        ctx.setLineDash([3, 6]);
        ctx.strokeStyle = 'rgba(255,255,255,0.07)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
        ctx.setLineDash([]);
      }

      /* axes */
      const axes = [
        { dir: [1, 0, 0], neg: [-1, 0, 0], label: '+X', nlabel: '-X' },
        { dir: [0, 1, 0], neg: [0, -1, 0], label: '+Y', nlabel: '-Y' },
        { dir: [0, 0, 1], neg: [0, 0, -1], label: '|0⟩', nlabel: '|1⟩' },
      ];
      axes.forEach(ax => {
        const p1 = project(...ax.dir), p2 = project(...ax.neg);
        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.strokeStyle = 'rgba(255,255,255,0.22)';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.font = '13px system-ui, sans-serif';
        ctx.fillStyle = 'rgba(255,255,255,0.65)';
        ctx.textAlign = 'center';
        ctx.fillText(ax.label, p1.px, p1.py - 10);
        ctx.fillStyle = 'rgba(255,255,255,0.35)';
        ctx.fillText(ax.nlabel, p2.px, p2.py + 16);
      });

      /* state vector */
      const bv = blochToCartesian(theta, phi);
      const tip  = project(bv.x, bv.y, bv.z);
      const orig = project(0, 0, 0);
      const equP = project(bv.x, bv.y, 0);

      /* projection dashes */
      ctx.setLineDash([4, 5]);
      ctx.strokeStyle = 'rgba(255,255,255,0.12)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(tip.px, tip.py);  ctx.lineTo(equP.px, equP.py); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(equP.px, equP.py); ctx.lineTo(orig.px, orig.py); ctx.stroke();
      ctx.setLineDash([]);

      /* arrow shaft */
      ctx.beginPath();
      ctx.moveTo(orig.px, orig.py);
      ctx.lineTo(tip.px, tip.py);
      ctx.strokeStyle = '#378add';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      /* arrowhead */
      const dx = tip.px - orig.px, dy = tip.py - orig.py;
      const len = Math.sqrt(dx * dx + dy * dy);
      if (len > 0) {
        const nx = dx / len, ny = dy / len, hs = 10;
        ctx.beginPath();
        ctx.moveTo(tip.px, tip.py);
        ctx.lineTo(tip.px - nx * hs - ny * hs * 0.5, tip.py - ny * hs + nx * hs * 0.5);
        ctx.lineTo(tip.px - nx * hs + ny * hs * 0.5, tip.py - ny * hs - nx * hs * 0.5);
        ctx.closePath();
        ctx.fillStyle = '#185fa5';
        ctx.fill();
      }

      /* tip dot */
      ctx.beginPath();
      ctx.arc(tip.px, tip.py, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#1d9e75';
      ctx.fill();
    }

    // ── state readout ────────────────────────────────────────────────────
    function updateState() {
      const bv  = blochToCartesian(theta, phi);
      const th2 = theta / 2;
      const alpha = Math.cos(th2);
      const betaR = Math.sin(th2) * Math.cos(phi);
      const betaI = Math.sin(th2) * Math.sin(phi);
      const p0 = (alpha * alpha * 100).toFixed(1);
      const p1 = (100 - parseFloat(p0)).toFixed(1);

      const fmtC = (r, i) => {
        if (Math.abs(i) < 0.001) return r.toFixed(3);
        const sign = i >= 0 ? '+' : '';
        return `${r.toFixed(2)}${sign}${i.toFixed(2)}i`;
      };

      document.getElementById('s0').textContent = alpha.toFixed(3);
      document.getElementById('s1').textContent = fmtC(betaR, betaI);
      document.getElementById('p0').textContent = p0 + '%';
      document.getElementById('p1').textContent = p1 + '%';
      document.getElementById('bx').textContent = bv.x.toFixed(2);
      document.getElementById('by').textContent = bv.y.toFixed(2);
      document.getElementById('bz').textContent = bv.z.toFixed(2);
      document.getElementById('tv').textContent = Math.round(theta * 180 / Math.PI) + '°';
      document.getElementById('pv').textContent = Math.round(phi  * 180 / Math.PI) + '°';
      document.getElementById('ts').value = Math.round(theta * 180 / Math.PI);
      document.getElementById('ps').value = Math.round(phi   * 180 / Math.PI);
    }

    function render() { drawSphere(); updateState(); }

    // ── sliders ──────────────────────────────────────────────────────────
    document.getElementById('ts').addEventListener('input', e => {
      theta = parseFloat(e.target.value) * Math.PI / 180; render();
    });
    document.getElementById('ps').addEventListener('input', e => {
      phi = parseFloat(e.target.value) * Math.PI / 180; render();
    });

    // ── mouse drag to rotate camera ───────────────────────────────────────
    canvas.addEventListener('mousedown', e => { dragging = true; lastX = e.clientX; lastY = e.clientY; });
    window.addEventListener('mouseup',   () => dragging = false);
    window.addEventListener('mousemove', e => {
      if (!dragging) return;
      camTheta += (e.clientX - lastX) * 0.01;
      camPhi   += (e.clientY - lastY) * 0.01;
      camPhi    = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camPhi));
      lastX = e.clientX; lastY = e.clientY;
      render();
    });

    // ── touch drag ───────────────────────────────────────────────────────
    canvas.addEventListener('touchstart', e => {
      dragging = true; lastX = e.touches[0].clientX; lastY = e.touches[0].clientY;
    });
    canvas.addEventListener('touchend', () => dragging = false);
    canvas.addEventListener('touchmove', e => {
      if (!dragging) return;
      camTheta += (e.touches[0].clientX - lastX) * 0.01;
      camPhi   += (e.touches[0].clientY - lastY) * 0.01;
      camPhi    = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camPhi));
      lastX = e.touches[0].clientX; lastY = e.touches[0].clientY;
      render(); e.preventDefault();
    }, { passive: false });

    // ── gate animation ───────────────────────────────────────────────────
    function animateTo(newTheta, newPhi, duration = 500) {
      const from = { theta, phi };
      let dp = newPhi - from.phi;
      while (dp >  Math.PI) dp -= Math.PI * 2;
      while (dp < -Math.PI) dp += Math.PI * 2;
      const start = performance.now();
      (function step(now) {
        const t = Math.min((now - start) / duration, 1);
        const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        theta = from.theta + (newTheta - from.theta) * ease;
        phi   = from.phi   + dp * ease;
        render();
        if (t < 1) requestAnimationFrame(step);
      })(start);
    }

    function applyGate(gate) {
      const map = {
        H:     () => animateTo(Math.PI / 2, theta < Math.PI / 2 ? 0 : Math.PI),
        X:     () => animateTo(Math.PI - theta, phi + Math.PI),
        Y:     () => animateTo(Math.PI - theta, -phi + Math.PI),
        Z:     () => animateTo(theta, phi + Math.PI),
        S:     () => animateTo(theta, phi + Math.PI / 2),
        T:     () => animateTo(theta, phi + Math.PI / 4),
        reset: () => animateTo(0, 0),
      };
      map[gate]?.();
    }

    render();
  </script>
</body>
</html>
