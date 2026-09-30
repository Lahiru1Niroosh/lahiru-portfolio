// fx.js: animated network background, marquee, cursor glow, magnetic buttons, contact tools.
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
const hover = matchMedia("(hover:hover)").matches;

function initBackground() {
  const host = $(".site-atmosphere");
  if (!host) return;
  ["a", "b", "c", "d"].forEach((k) => {
    const s = document.createElement("span");
    s.className = `fx-blob ${k}`;
    host.append(s);
  });
  if (calm) return;

  const cv = document.createElement("canvas");
  cv.className = "fx-canvas";
  host.prepend(cv);
  const ctx = cv.getContext("2d");
  if (!ctx) return;
  const cols = ["99,234,215", "122,168,255", "179,136,255", "255,189,124", "255,122,182"];
  const dpr = Math.min(devicePixelRatio || 1, 1.5);
  let w = 0, h = 0, nodes = [], packets = [], mx = -999, my = -999, raf = 0;

  const resize = () => {
    w = innerWidth; h = innerHeight;
    cv.width = w * dpr; cv.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(Math.min(78, Math.max(26, (w * h) / 23000)));
    nodes = Array.from({ length: n }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
      c: cols[(Math.random() * cols.length) | 0], r: 1 + Math.random() * 1.7,
    }));
    packets = [];
  };

  const frame = () => {
    ctx.clearRect(0, 0, w, h);
    for (const p of nodes) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < -20) p.x = w + 20; if (p.x > w + 20) p.x = -20;
      if (p.y < -20) p.y = h + 20; if (p.y > h + 20) p.y = -20;
    }
    const maxD = 150;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < maxD) {
          ctx.strokeStyle = `rgba(${a.c},${(1 - d / maxD) * 0.3})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      const dm = Math.hypot(a.x - mx, a.y - my);
      if (dm < 190) {
        ctx.strokeStyle = `rgba(${a.c},${(1 - dm / 190) * 0.55})`;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mx, my); ctx.stroke();
      }
      ctx.fillStyle = `rgba(${a.c},.85)`;
      ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, 6.283); ctx.fill();
    }
    // data packets travelling along nearby connections
    if (packets.length < 9 && Math.random() < 0.06) {
      const a = (Math.random() * nodes.length) | 0;
      for (let k = 0; k < nodes.length; k++) {
        if (k !== a && Math.hypot(nodes[a].x - nodes[k].x, nodes[a].y - nodes[k].y) < maxD) {
          packets.push({ a, b: k, t: 0 }); break;
        }
      }
    }
    packets = packets.filter((p) => (p.t += 0.018) < 1);
    for (const p of packets) {
      const a = nodes[p.a], b = nodes[p.b];
      ctx.fillStyle = "rgba(255,189,124,.95)";
      ctx.shadowColor = "rgba(255,189,124,.9)"; ctx.shadowBlur = 10;
      ctx.beginPath(); ctx.arc(a.x + (b.x - a.x) * p.t, a.y + (b.y - a.y) * p.t, 2.3, 0, 6.283); ctx.fill();
      ctx.shadowBlur = 0;
    }
    raf = requestAnimationFrame(frame);
  };

  resize();
  addEventListener("resize", resize, { passive: true });
  addEventListener("pointermove", (e) => { mx = e.clientX; my = e.clientY; }, { passive: true });
  document.addEventListener("visibilitychange", () => {
    cancelAnimationFrame(raf);
    if (!document.hidden) raf = requestAnimationFrame(frame);
  });
  raf = requestAnimationFrame(frame);
}

function initMarquee() {
  $$(".marquee-track").forEach((t) => { t.innerHTML += t.innerHTML; });
}

function autoGlow() {
  $$(".card,.credential-card,.mini-card,.f1-card,.ct-card,.svc,.pr,.grp,.tile").forEach((el) => el.setAttribute("data-glow", ""));
}

function initGlow() {
  autoGlow();
  if (!hover) return;
  $$("[data-glow]").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--cx", `${e.clientX - r.left}px`);
      el.style.setProperty("--cy", `${e.clientY - r.top}px`);
    });
  });
  if (calm) return;
  $$(".cbtn.p,.ct-submit,.header-cv").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.12}px,${(e.clientY - r.top - r.height / 2) * 0.2 - 2}px)`;
    });
    el.addEventListener("pointerleave", () => { el.style.transform = ""; });
  });
}

function initContact() {
  $$("[data-copy-text]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      try { await navigator.clipboard.writeText(btn.dataset.copyText); } catch { return; }
      const old = btn.textContent;
      btn.textContent = "Copied"; btn.classList.add("done");
      setTimeout(() => { btn.textContent = old; btn.classList.remove("done"); }, 1600);
    });
  });

}

initBackground();
initMarquee();
initGlow();
initContact();
