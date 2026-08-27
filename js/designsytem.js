// ===== NAV JS (tiny, accessible) =====
(function () {
  const header = document.querySelector("[data-nav]");
  const btn = document.querySelector(".nav-toggle");
  const menu = document.getElementById("site-menu");

  // Toggle mobile menu
  btn.addEventListener("click", () => {
    const open = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!open));
    menu.classList.toggle("open", !open);
    btn.setAttribute("aria-label", !open ? "Close menu" : "Open menu");
  });

  // Close menu when clicking a link (mobile)
  menu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      btn.setAttribute("aria-expanded", "false");
      menu.classList.remove("open");
      btn.setAttribute("aria-label", "Open menu");
    });
  });

  // Add shadow on scroll
  const onScroll = () =>
    header.classList.toggle("is-scrolled", window.scrollY > 4);
  onScroll();
  window.addEventListener("scroll", onScroll);
})();

/* (() => {
  const rootStyles = getComputedStyle(document.documentElement);
  const HEADER_OFFSET =
    parseInt(rootStyles.getPropertyValue("--header-h")) || 64;

  const nav = document.querySelector(".process-nav");

  // 1) Collect ALL links (parents + subitems)
  const links = Array.from(nav.querySelectorAll('.process-list a[href^="#"]'));
  const items = links.map((a) => a.closest("li"));
  const secs = links
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  // 2) Smooth scroll with offset
  links.forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const t = document.querySelector(a.getAttribute("href"));
      const y =
        t.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET - 8;
      window.scrollTo({ top: y, behavior: "smooth" });

      // If user clicked a sub-item, ensure its parent group is open
      const parent = a.closest(".has-children");
      if (parent) openGroup(parent, true);
    });
  });

  // 3) Toggle buttons for groups
  nav.querySelectorAll(".has-children .toggle").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const li = e.currentTarget.closest(".has-children");
      const isOpen = li.getAttribute("aria-open") === "true";
      openGroup(li, !isOpen);
    });
  });

  function openGroup(li, open = true) {
    const sub = li.querySelector(".sublist");
    if (!sub) return;
    sub.hidden = !open;
    li.setAttribute("aria-open", String(open));
    const toggle = li.querySelector(".toggle");
    if (toggle) toggle.setAttribute("aria-expanded", String(open));
  }

  // 4) Active state + auto-open when a sub-section is active
  function setActive(idx) {
    items.forEach((li, i) => {
      const a = links[i];
      const active = i === idx;
      li.classList.toggle("is-active", active);
      a.classList.toggle("is-active", active);
    });

    // If an active link is inside a group, open that group
    const activeLink = links[idx];
    const parentGroup = activeLink && activeLink.closest(".has-children");
    if (parentGroup) openGroup(parentGroup, true);
  }

  // 5) Theme detection (unchanged)
  function setThemeUnderNav() {
    const r = nav.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const stack = document.elementsFromPoint(cx, cy);
    const behind = stack.find((el) => !el.closest(".process-nav"));
    const themedAncestor =
      behind && (behind.closest("[data-theme]") || behind.closest("section"));
    const theme = themedAncestor && themedAncestor.getAttribute("data-theme");
    nav.classList.toggle("is-inverse", theme === "dark");
  }

  // 6) Scroll spy (unchanged logic, now works for all links incl. subitems)
  function onScroll() {
    const y = window.scrollY + HEADER_OFFSET + 12;
    let idx = 0;
    secs.forEach((s, i) => {
      if (s.offsetTop <= y) idx = i;
    });
    const doc = document.documentElement;
    if (innerHeight + window.scrollY >= doc.scrollHeight - 2)
      idx = secs.length - 1;

    setActive(idx);
    setThemeUnderNav();
  }

  let ticking = false;
  addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        onScroll();
        ticking = false;
      });
      ticking = true;
    }
  });
  addEventListener("resize", onScroll);
  document.addEventListener("DOMContentLoaded", onScroll);
  onScroll();
})(); */

(() => {
  function initProcessNav() {
    const nav = document.querySelector(".process-nav");
    if (!nav) return; // ✅ prevents crash on pages without the nav

    const rootStyles = getComputedStyle(document.documentElement);
    const HEADER_OFFSET =
      parseInt(rootStyles.getPropertyValue("--header-h")) || 64;

    // 1) Collect ALL links (parents + subitems)
    const links = Array.from(
      nav.querySelectorAll('.process-list a[href^="#"]'),
    );
    if (!links.length) return;

    const items = links.map((a) => a.closest("li"));
    const secs = links
      .map((a) => document.querySelector(a.getAttribute("href")))
      .filter(Boolean);

    // If none of the targets exist, stop gracefully
    if (!secs.length) return;

    // 2) Smooth scroll with offset
    links.forEach((a) => {
      a.addEventListener("click", (e) => {
        const href = a.getAttribute("href");
        const t = document.querySelector(href);
        if (!t) return;

        e.preventDefault();

        const y =
          t.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET - 8;

        window.scrollTo({ top: y, behavior: "smooth" });

        // If user clicked a sub-item, ensure its parent group is open
        const parent = a.closest(".has-children");
        if (parent) openGroup(parent, true);
      });
    });

    // 3) Toggle buttons for groups
    nav.querySelectorAll(".has-children .toggle").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const li = e.currentTarget.closest(".has-children");
        if (!li) return;
        const isOpen = li.getAttribute("aria-open") === "true";
        openGroup(li, !isOpen);
      });
    });

    function openGroup(li, open = true) {
      const sub = li.querySelector(".sublist");
      if (!sub) return;
      sub.hidden = !open;
      li.setAttribute("aria-open", String(open));
      const toggle = li.querySelector(".toggle");
      if (toggle) toggle.setAttribute("aria-expanded", String(open));
    }

    // 4) Active state + auto-open when a sub-section is active
    function setActive(idx) {
      items.forEach((li, i) => {
        if (!li) return;
        const a = links[i];
        const active = i === idx;
        li.classList.toggle("is-active", active);
        if (a) a.classList.toggle("is-active", active);
      });

      // If an active link is inside a group, open that group
      const activeLink = links[idx];
      const parentGroup = activeLink && activeLink.closest(".has-children");
      if (parentGroup) openGroup(parentGroup, true);
    }

    // 5) Theme detection (safe)
    function setThemeUnderNav() {
      const r = nav.getBoundingClientRect();
      if (!r.width || !r.height) return;

      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const stack = document.elementsFromPoint(cx, cy) || [];
      const behind = stack.find((el) => el && !el.closest(".process-nav"));

      const themedAncestor =
        behind && (behind.closest("[data-theme]") || behind.closest("section"));
      const theme = themedAncestor && themedAncestor.getAttribute("data-theme");

      nav.classList.toggle("is-inverse", theme === "dark");
    }

    // 6) Scroll spy
    function onScroll() {
      const y = window.scrollY + HEADER_OFFSET + 12;
      let idx = 0;

      secs.forEach((s, i) => {
        if (s.offsetTop <= y) idx = i;
      });

      const doc = document.documentElement;
      if (window.innerHeight + window.scrollY >= doc.scrollHeight - 2) {
        idx = secs.length - 1;
      }

      setActive(idx);
      setThemeUnderNav();
    }

    let ticking = false;
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            onScroll();
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true },
    );

    window.addEventListener("resize", onScroll);
    onScroll();
  }

  // ✅ init after DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initProcessNav);
  } else {
    initProcessNav();
  }
})();

(() => {
  const hero = document.querySelector(".parallax-hero");
  if (!hero) return;

  const bg = hero.querySelector(".parallax-hero__bg");
  const png = hero.querySelector(".parallax-hero__png");

  // ---------- TUNE THESE ----------
  const PNG_ROTATE_DEG = -8;

  // Start with PNG lower (more hidden), then move up (more revealed)
  const PNG_START_Y = 140; // px: bigger = starts lower (more hidden)
  const PNG_END_Y = -160; // px: more negative = ends higher (reveals more)

  // Subtle background drift (optional)
  const BG_START_Y = -10; // px
  const BG_END_Y = 10; // px
  // -------------------------------

  let rafId = null;

  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  const lerp = (a, b, t) => a + (b - a) * t;

  function getProgress() {
    const rect = hero.getBoundingClientRect();
    const vh = window.innerHeight || 1;

    // progress 0..1 as the section passes the viewport
    // 0: hero top hits bottom of viewport
    // 1: hero bottom hits top of viewport
    const raw = (vh - rect.top) / (vh + rect.height);
    return clamp(raw, 0, 1);
  }

  function render() {
    rafId = null;

    const t = getProgress();

    // Background parallax (optional)
    if (bg) {
      const bgY = lerp(BG_START_Y, BG_END_Y, t);
      bg.style.transform = `translate3d(0, ${bgY}px, 0)`;
    }

    // Foreground PNG reveal motion: down -> up
    if (png) {
      const y = lerp(PNG_START_Y, PNG_END_Y, t);
      png.style.transform = `translate3d(-50%, calc(-50% + ${y}px), 0) rotate(${PNG_ROTATE_DEG}deg)`;
    }
  }

  function onScrollOrResize() {
    if (rafId) return;
    rafId = requestAnimationFrame(render);
  }

  // Initial
  render();

  window.addEventListener("scroll", onScrollOrResize, { passive: true });
  window.addEventListener("resize", onScrollOrResize);

  // Re-render when PNG loads (prevents jump)
  if (png && !png.complete)
    png.addEventListener("load", render, { once: true });

  // Optional: if user prefers reduced motion
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (media.matches) {
    // Keep it static at the "start" position
    if (bg) bg.style.transform = `translate3d(0, 0, 0)`;
    if (png)
      png.style.transform = `translate3d(-50%, calc(-50% + ${PNG_START_Y}px), 0) rotate(${PNG_ROTATE_DEG}deg)`;
    window.removeEventListener("scroll", onScrollOrResize);
    window.removeEventListener("resize", onScrollOrResize);
  }
})();

(() => {
  // Find all cards that support swapping
  const cards = document.querySelectorAll(
    ".project-feature[data-img-research][data-img-design]",
  );
  if (!cards.length) return;

  const preload = (url) => {
    if (!url) return;
    const img = new Image();
    img.src = url;
  };

  cards.forEach((card) => {
    const imgEl = card.querySelector(".project-feature__img");
    const btnResearch = card.querySelector(".js-cta-research");
    const btnDesign = card.querySelector(".js-cta-design");

    if (!imgEl || !btnDesign) return;

    const imgResearch = card.getAttribute("data-img-research");
    const imgDesign = card.getAttribute("data-img-design");

    // Preload both so swaps feel instant
    preload(imgResearch);
    preload(imgDesign);

    let pinned = "research"; // "research" | "design"

    const swapTo = (mode) => {
      const nextSrc = mode === "design" ? imgDesign : imgResearch;
      if (!nextSrc || imgEl.src.includes(nextSrc)) return;

      // fade out -> swap src -> fade in
      imgEl.classList.add("is-swapping");
      window.setTimeout(() => {
        imgEl.src = nextSrc;
        // Wait a frame so opacity transition applies
        requestAnimationFrame(() => imgEl.classList.remove("is-swapping"));
      }, 140);
    };

    const showResearch = () => swapTo("research");
    const showDesign = () => swapTo("design");

    // ---- Hover preview (desktop) ----
    btnDesign.addEventListener("mouseenter", () => showDesign());
    btnDesign.addEventListener("mouseleave", () => {
      // If user clicked/pinned Design, keep it; otherwise revert
      if (pinned !== "design") showResearch();
    });

    // Optional: hovering Research returns to research image
    if (btnResearch) {
      btnResearch.addEventListener("mouseenter", () => showResearch());
    }

    // ---- Keyboard accessibility (focus) ----
    btnDesign.addEventListener("focus", () => showDesign());
    btnDesign.addEventListener("blur", () => {
      if (pinned !== "design") showResearch();
    });

    if (btnResearch) {
      btnResearch.addEventListener("focus", () => showResearch());
      btnResearch.addEventListener("click", () => {
        pinned = "research";
        showResearch();
      });
    }

    // ---- Click to "pin" Design image ----
    btnDesign.addEventListener("click", (e) => {
      // If your Design button navigates away immediately, you won’t see the pin.
      // If it’s a section toggle or opens a modal, pinning is useful.
      pinned = "design";
      showDesign();
    });

    // ---- When the cursor leaves the whole card, reset to research ----
    card.addEventListener("mouseleave", () => {
      pinned = "research";
      showResearch();
    });

    // Initial state
    showResearch();
  });
})();

const caseOverlay = document.getElementById("caseOverlay");
const caseStudyFrame = document.getElementById("caseStudyFrame");
const closeCaseOverlay = document.getElementById("closeCaseOverlay");
const openCaseFullPage = document.getElementById("openCaseFullPage");

const quickCaseStudyButtons = document.querySelectorAll(".js-open-case-study");

function openQuickCaseStudy(url) {
  caseStudyFrame.src = url;
  openCaseFullPage.href = url;

  caseOverlay.classList.add("is-open");
  caseOverlay.setAttribute("aria-hidden", "false");

  document.body.classList.add("case-overlay-open");
}

function closeQuickCaseStudy() {
  caseOverlay.classList.remove("is-open");
  caseOverlay.setAttribute("aria-hidden", "true");

  document.body.classList.remove("case-overlay-open");

  /*
   Optional:
   remove iframe page after modal closes.
   This stops videos/animations running in background.
  */

  setTimeout(() => {
    caseStudyFrame.src = "";
  }, 220);
}

quickCaseStudyButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();

    const url = button.dataset.caseStudy || button.getAttribute("href");

    openQuickCaseStudy(url);
  });
});

closeCaseOverlay.addEventListener("click", closeQuickCaseStudy);

/* close when clicking grey background */

caseOverlay.addEventListener("click", (event) => {
  if (event.target === caseOverlay) {
    closeQuickCaseStudy();
  }
});

/* close with Escape */

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && caseOverlay.classList.contains("is-open")) {
    closeQuickCaseStudy();
  }
});
