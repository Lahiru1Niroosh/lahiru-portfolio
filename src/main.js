import "./fonts.css";
import "./fx.css";
import "./fx.js";
const select = (selector, root = document) => root.querySelector(selector);
const selectAll = (selector, root = document) => [
  ...root.querySelectorAll(selector),
];
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

function initMenu() {
  const menuButton = select("#siteMenuButton");
  const mobileNav = select("#siteMobileNav");
  if (!menuButton || !mobileNav) return;

  const closeMenu = () => {
    mobileNav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
  };

  menuButton.addEventListener("click", () => {
    const open = mobileNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute(
      "aria-label",
      open ? "Close navigation" : "Open navigation",
    );
  });

  selectAll("a", mobileNav).forEach((link) =>
    link.addEventListener("click", closeMenu),
  );
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
  document.addEventListener("click", (event) => {
    if (
      event.target instanceof Element &&
      !event.target.closest(".site-header")
    )
      closeMenu();
  });

  window
    .matchMedia("(min-width: 1151px)")
    .addEventListener?.("change", (event) => {
      if (event.matches) closeMenu();
    });
}

function initNavIndicator() {
  const nav = select(".site-nav");
  if (!nav) return;

  const activeLink = select('a[aria-current="page"]', nav);
  const update = (link) => {
    if (!link) {
      nav.style.setProperty("--indicator-opacity", "0");
      return;
    }
    const navBounds = nav.getBoundingClientRect();
    const linkBounds = link.getBoundingClientRect();
    nav.style.setProperty(
      "--indicator-x",
      `${linkBounds.left - navBounds.left}px`,
    );
    nav.style.setProperty("--indicator-scale", String(linkBounds.width / 100));
    nav.style.setProperty("--indicator-opacity", "1");
  };

  nav.addEventListener("pointerover", (event) => {
    const link =
      event.target instanceof Element ? event.target.closest("a") : null;
    if (link instanceof HTMLAnchorElement && nav.contains(link)) update(link);
  });
  nav.addEventListener("pointerleave", () => update(activeLink));
  nav.addEventListener("focusin", (event) => {
    const link =
      event.target instanceof Element ? event.target.closest("a") : null;
    if (link instanceof HTMLAnchorElement && nav.contains(link)) update(link);
  });
  nav.addEventListener("focusout", () => {
    window.requestAnimationFrame(() => {
      if (!nav.contains(document.activeElement)) update(activeLink);
    });
  });
  window.addEventListener("resize", () => update(activeLink));
  update(activeLink);
  document.fonts?.ready.then(() => update(activeLink));
}

function initProgress() {
  const progress = select("#siteProgress, #bar, #progress");
  if (!progress) return;

  const updateProgress = () => {
    const page = document.documentElement;
    const distance = page.scrollHeight - page.clientHeight;
    progress.style.transform = `scaleX(${distance > 0 ? page.scrollTop / distance : 0})`;
  };

  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
  updateProgress();
}

function initReveal() {
  const revealTargets = selectAll(
    ".rv, .timeline, .diagram, #architectureDiagram",
  );
  const animatedDiagrams = selectAll(".diagram svg, #architectureDiagram svg");
  const reveal = (target) => {
    target.classList.add(
      target.classList.contains("timeline") ? "in-view" : "in",
    );
    if (target.id === "architectureDiagram") target.classList.add("draw");
  };

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealTargets.forEach(reveal);
    animatedDiagrams.forEach((diagram) => diagram.pauseAnimations?.());
    return;
  }

  animatedDiagrams.forEach((diagram) => diagram.pauseAnimations?.());
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        entry.target.querySelector("svg")?.unpauseAnimations?.();
        currentObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12 },
  );

  revealTargets.forEach((target, index) => {
    if (target.classList.contains("rv"))
      target.style.transitionDelay = `${(index % 3) * 70}ms`;
    observer.observe(target);
  });
}

function initCounters() {
  const counters = selectAll("[data-count]");
  const format = (element, value) => {
    const decimals = Number(element.dataset.dec || 0);
    const suffix = element.dataset.suffix || "";
    return `${value.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}${suffix}`;
  };
  const showCounter = (element, animate) => {
    const end = Number(element.dataset.count);
    if (!Number.isFinite(end)) return;
    if (!animate) {
      element.textContent = format(element, end);
      return;
    }

    const start = performance.now();
    const decimals = Number(element.dataset.dec || 0);
    const step = (now) => {
      const progress = Math.min((now - start) / 1400, 1);
      const value = end * (1 - (1 - progress) ** 3);
      element.textContent = format(
        element,
        decimals ? value : Math.round(value),
      );
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  if (reduceMotion || !("IntersectionObserver" in window)) {
    counters.forEach((element) => showCounter(element, false));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        showCounter(entry.target, true);
        currentObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.6 },
  );
  counters.forEach((element) => observer.observe(element));
}

function initTilt() {
  if (reduceMotion || !window.matchMedia("(hover: hover)").matches) return;

  selectAll(".tilt").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const bounds = card.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      card.style.setProperty("--cx", `${x}px`);
      card.style.setProperty("--cy", `${y}px`);
      card.style.transform = `perspective(1100px) rotateX(${(y / bounds.height - 0.5) * -3}deg) rotateY(${(x / bounds.width - 0.5) * 3}deg) translateY(-3px)`;
    });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });

  selectAll("#projectGrid .card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const bounds = card.getBoundingClientRect();
      card.style.setProperty("--cx", `${event.clientX - bounds.left}px`);
      card.style.setProperty("--cy", `${event.clientY - bounds.top}px`);
    });
  });
}

function initScrollSpy() {
  const links = selectAll("[data-scroll-spy] a[href^='#']");
  if (!links.length || !("IntersectionObserver" in window)) return;

  const targets = links
    .map((link) => select(link.getAttribute("href")))
    .filter((target) => target instanceof HTMLElement);
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;

      links.forEach((link) => {
        if (link.hash === `#${visible.target.id}`)
          link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    },
    { rootMargin: "-15% 0px -70% 0px", threshold: [0, 0.25, 0.5, 1] },
  );

  targets.forEach((target) => observer.observe(target));
}

function initFilters() {
  const grid = select("#projectGrid");
  const buttons = selectAll(".filter");
  if (!grid || !buttons.length) return;

  const cards = [...grid.children];
  const resultsCount = select("#resultsCount");
  const emptyState = select("#emptyState");

  buttons.forEach((button) => {
    const filter = button.dataset.filter;
    const total =
      filter === "all"
        ? cards.length
        : cards.filter((card) =>
            card.dataset.categories.split(" ").includes(filter),
          ).length;
    const count = select(".filter-count", button);
    if (count) count.textContent = `(${total})`;
  });

  const applyFilter = (filter) => {
    let visible = 0;
    cards.forEach((card) => {
      const show =
        filter === "all" || card.dataset.categories.split(" ").includes(filter);
      card.hidden = !show;
      if (show) visible++;
    });
    buttons.forEach((button) => {
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.filter === filter),
      );
    });
    if (resultsCount)
      resultsCount.textContent = `${visible} project${visible === 1 ? "" : "s"} shown`;
    if (emptyState) emptyState.style.display = visible ? "none" : "block";
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => applyFilter(button.dataset.filter));
  });
  applyFilter(
    buttons.find((button) => button.dataset.filter === "all")?.dataset.filter ||
      "all",
  );
}

function initIssuerFilters() {
  const cards = selectAll('[data-credential]');
  const buttons = selectAll('.issuer-filter');
  if (!cards.length) return;
  const apply = issuer => {
    let count = 0;
    cards.forEach(card => {
      card.hidden = issuer !== 'all' && card.dataset.issuer !== issuer;
      card.inert = card.hidden;
      if (!card.hidden) { count++; card.classList.add('in'); }
    });
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.issuer === issuer)));
    const result = select('#issuerResults');
    if (result) result.textContent = `${count} certification${count === 1 ? '' : 's'} shown`;
  };
  buttons.forEach(button => button.addEventListener('click', () => apply(button.dataset.issuer)));
  apply('all');
}

function initLightbox() {
  const triggers = selectAll("[data-lightbox]");
  if (!triggers.length) return;

  const dialog = document.createElement("dialog");
  dialog.className = "image-lightbox";
  dialog.setAttribute("aria-label", "Credential image preview");
  const close = document.createElement("button");
  close.type = "button";
  close.className = "image-lightbox-close";
  close.setAttribute("aria-label", "Close image preview");
  close.textContent = "×";
  const image = document.createElement("img");
  const fallback = document.createElement("p");
  fallback.className = "image-lightbox-fallback";
  fallback.setAttribute("role", "status");
  fallback.hidden = true;
  dialog.append(close, image, fallback);
  document.body.append(dialog);

  image.addEventListener("load", () => {
    image.hidden = false;
    fallback.hidden = true;
  });
  image.addEventListener("error", () => {
    image.hidden = true;
    fallback.textContent = "Certificate preview could not be loaded.";
    fallback.hidden = false;
  });
  close.addEventListener("click", () => dialog.close());
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      dialog.close();
    }
  });
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  triggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      image.hidden = true;
      fallback.textContent = "Loading self-hosted certificate preview…";
      fallback.hidden = false;
      image.src = trigger.dataset.lightbox;
      image.alt =
        trigger.getAttribute("aria-label") ||
        trigger.querySelector("img")?.alt ||
        "Image preview";
      if (!dialog.open) dialog.showModal();
      close.focus();
    });
  });
}

function initCopy() {
  selectAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      const value = button.dataset.copy;
      if (!value) return;
      const feedback = button.dataset.copyFeedback
        ? select(button.dataset.copyFeedback)
        : null;
      try {
        await navigator.clipboard.writeText(value);
        if (feedback) feedback.textContent = "Copied";
      } catch (error) {
        if (feedback)
          feedback.textContent = "Copy failed. Please copy the text manually.";
        else
          button.setAttribute(
            "aria-label",
            "Copy failed. Please copy the text manually.",
          );
        console.error("Clipboard write failed.", error);
      }
    });
  });
}

function initTyping() {
  const typed = select("#typed");
  if (!typed) return;

  const phrases = [
    "streaming F1 data through Kafka",
    "catching silent drift between databases",
    "testing controls with injected faults",
    "learning Spark and Airflow",
  ];

  if (reduceMotion) {
    typed.textContent = phrases[0];
    return;
  }

  let phraseIndex = 0;
  let characterIndex = 0;
  let deleting = false;

  const type = () => {
    const phrase = phrases[phraseIndex];
    typed.textContent = phrase.slice(0, characterIndex);
    if (!deleting && characterIndex === phrase.length) {
      deleting = true;
      window.setTimeout(type, 1600);
      return;
    }
    if (deleting && characterIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
    characterIndex += deleting ? -1 : 1;
    window.setTimeout(type, deleting ? 26 : 52);
  };

  type();
}

function initImageFallbacks() {
  selectAll("img[data-fallback]").forEach((image) => {
    const showFallback = () => {
      if (!image.isConnected) return;
      const fallback = document.createElement("span");
      fallback.className = "image-fallback";
      fallback.textContent = image.dataset.fallback || "Image unavailable";
      fallback.setAttribute("role", "img");
      fallback.setAttribute("aria-label", fallback.textContent);
      image.replaceWith(fallback);
    };

    if (image.complete && image.naturalWidth === 0) showFallback();
    else image.addEventListener("error", showFallback, { once: true });
  });

  selectAll(".chip img[data-m]").forEach((image) => {
    const showInitial = () => {
      if (!image.isConnected) return;
      const badge = document.createElement("span");
      badge.className = "mono";
      badge.textContent = image.dataset.m || "•";
      image.replaceWith(badge);
    };

    if (image.complete && image.naturalWidth === 0) showInitial();
    else image.addEventListener("error", showInitial, { once: true });
  });
}

function initPointerAtmosphere() {
  if (reduceMotion || !window.matchMedia("(hover: hover)").matches) return;

  window.addEventListener(
    "pointermove",
    (event) => {
      const style = document.documentElement.style;
      style.setProperty("--mx", `${event.clientX}px`);
      style.setProperty("--my", `${event.clientY}px`);
    },
    { passive: true },
  );
}


function initDataBackground() {
  const cv = document.createElement("canvas");
  cv.className = "site-canvas"; cv.setAttribute("aria-hidden", "true");
  const anchor = select(".site-atmosphere") || select(".fx");
  anchor ? anchor.after(cv) : document.body.prepend(cv);
  const ctx = cv.getContext("2d");
  let w, h, nodes = [], pulses = [], raf, dpr = Math.min(devicePixelRatio || 1, 1.5);
  const mouse = { x: -999, y: -999 };
  const cols = ["99,234,215", "122,168, 255", "255,189,124"];
  const size = () => {
    w = cv.width = innerWidth * dpr; h = cv.height = innerHeight * dpr;
    cv.style.width = innerWidth + "px"; cv.style.height = innerHeight + "px";
    const n = Math.min(70, Math.round((innerWidth * innerHeight) / 24000));
    nodes = Array.from({ length: n }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25 * dpr, vy: (Math.random() - 0.5) * 0.25 * dpr,
      c: cols[(Math.random() * 3) | 0],
    }));
  };
  const link = 150 * dpr;
  const frame = () => {
    ctx.clearRect(0, 0, w, h);
    for (const a of nodes) {
      if (!reduceMotion) { a.x += a.vx; a.y += a.vy; }
      if (a.x < 0 || a.x > w) a.vx *= -1;
      if (a.y < 0 || a.y > h) a.vy *= -1;
      const dm = Math.hypot(a.x - mouse.x * dpr, a.y - mouse.y * dpr);
      if (dm < 140 * dpr && !reduceMotion) { a.x += (a.x - mouse.x * dpr) * 0.004; a.y += (a.y - mouse.y * dpr) * 0.004; }
      ctx.fillStyle = `rgba(${a.c},.55)`;
      ctx.beginPath(); ctx.arc(a.x, a.y, 1.6 * dpr, 0, 6.283); ctx.fill();
    }
    for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i], b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < link) {
        ctx.strokeStyle = `rgba(122,168,255,${0.16 * (1 - d / link)})`; ctx.lineWidth = dpr * 0.7;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        if (!reduceMotion && pulses.length < 14 && Math.random() < 0.0008) pulses.push({ a, b, t: 0, c: a.c });
      }
    }
    pulses = pulses.filter((p) => (p.t += 0.012) < 1);
    for (const p of pulses) {
      ctx.fillStyle = `rgba(${p.c},.95)`; ctx.shadowColor = `rgba(${p.c},1)`; ctx.shadowBlur = 10 * dpr;
      ctx.beginPath(); ctx.arc(p.a.x + (p.b.x - p.a.x) * p.t, p.a.y + (p.b.y - p.a.y) * p.t, 2.4 * dpr, 0, 6.283); ctx.fill();
    }
    ctx.shadowBlur = 0;
    if (!reduceMotion) raf = requestAnimationFrame(frame);
  };
  size(); frame();
  addEventListener("resize", () => { size(); if (reduceMotion) frame(); });
  addEventListener("pointermove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
  document.addEventListener("visibilitychange", () => {
    cancelAnimationFrame(raf); if (!document.hidden && !reduceMotion) frame();
  });
}

function initCardGlow() {
  if (reduceMotion || !matchMedia("(hover: hover)").matches) return;
  document.addEventListener("pointermove", (e) => {
    const c = e.target instanceof Element && e.target.closest(".card, .credential-card, .mini-card, .grp");
    if (!c) return;
    const r = c.getBoundingClientRect();
    c.style.setProperty("--gx", e.clientX - r.left + "px");
    c.style.setProperty("--gy", e.clientY - r.top + "px");
  }, { passive: true });
}


initCardGlow();

initMenu();
initNavIndicator();
initProgress();
initReveal();
initCounters();

initTyping();
initImageFallbacks();
initPointerAtmosphere();
initScrollSpy();
initIssuerFilters();
initLightbox();
initCopy();


if (select("#projectGrid")) {
  import("./projects-page.js").then(({ initProjectsPage }) => {
    initProjectsPage();
    initFilters();
  }).catch(() => {
    const note = select("#resultsCount");
    if (note) note.textContent = "Projects could not load. Please refresh the page.";
  });
}

if (select("#contactForm")) {
  import("./contact-form.js").catch(() => {
    // Native POST action still works if the optional enhancement fails to load.
    const note = select("#contactNote");
    if (note) note.textContent = "Send your message using the form, or email me directly.";
  });
}
