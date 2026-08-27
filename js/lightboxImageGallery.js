/* ================================
   HORIZONTAL SCROLL / DRAG
================================ */
const track = document.querySelector(".lightbox-gallery__track");

track.addEventListener("scroll", () => {
  if (track.scrollLeft + track.clientWidth >= track.scrollWidth) {
    track.scrollLeft = 0;
  }
});

let isDragging = false;
let startX;
let scrollStart;

track.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.pageX - track.offsetLeft;
  scrollStart = track.scrollLeft;
});

track.addEventListener("mouseleave", () => {
  isDragging = false;
});

track.addEventListener("mouseup", () => {
  isDragging = false;
});

track.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - track.offsetLeft;
  const walk = (x - startX) * 2;
  track.scrollLeft = scrollStart - walk;
});

/* ================================
   LIGHTBOX
================================ */
const galleryItems = document.querySelectorAll(".lightbox-gallery__item");
const lightbox = document.querySelector("#lightbox-modal");
const lightboxImage = lightbox.querySelector(".lightbox__image");
const closeButton = lightbox.querySelector(".lightbox__close");

// Open lightbox
galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const img = item.querySelector(".lightbox-gallery__thumbnail");
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt || "Expanded image";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

// Close via button
closeButton.addEventListener("click", () => {
  closeLightbox();
});

// Close by clicking overlay
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Close via ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox.classList.contains("is-open")) {
    closeLightbox();
  }
});

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
}

(() => {
  const carousels = document.querySelectorAll(".js-carousel");
  if (!carousels.length) return;

  carousels.forEach((root) => {
    const track = root.querySelector(".track");
    const slides = Array.from(root.querySelectorAll(".slide"));
    if (!track || !slides.length) return;

    const prev = root.querySelector(".phases-prev");
    const next = root.querySelector(".phases-next");

    // Scoped header per carousel instance
    const phaseHeader = root.querySelector(".js-phaseHeader");

    // Peek button is optional per carousel
    const peekBtn = root.querySelector(".peek-btn");
    let peekPinned = false;

    const MAX_WIDTH = parseInt(root.dataset.maxWidth || "1000", 10);

    let index = 0;
    let offsets = [];

    // Scale based on main image only (one per slide)
    const mainImgs = slides
      .map((s) => s.querySelector("img.slide-main") || s.querySelector("img"))
      .filter(Boolean);

    function waitForImages(imgList) {
      return Promise.all(
        imgList.map((img) => {
          if (img.complete && img.naturalWidth) return Promise.resolve();
          return new Promise((res) =>
            img.addEventListener("load", res, { once: true })
          );
        })
      );
    }

    function getGapPx() {
      const style = getComputedStyle(track);
      const gap = parseFloat(style.gap || "0");
      return Number.isFinite(gap) ? gap : 0;
    }

    function buildOffsets() {
      offsets = [];
      let acc = 0;
      const gap = getGapPx();
      slides.forEach((slide) => {
        offsets.push(acc);
        acc += slide.getBoundingClientRect().width + gap;
      });
    }

    function isAtEnd() {
      const viewport = root.querySelector(".viewport");
      if (!viewport) return true;
      const viewportWidth = viewport.getBoundingClientRect().width;
      const trackWidth = track.scrollWidth;
      const currentX = offsets[index] || 0;
      return trackWidth - currentX <= viewportWidth + 1;
    }

    function updateHeader() {
      if (!phaseHeader) return;
      const active = slides[index];
      const phase = active?.dataset?.phase;
      const title = active?.dataset?.title;
      if (phase && title) phaseHeader.textContent = `${phase} – ${title}`;
      else if (phase) phaseHeader.textContent = phase;
    }

    // ---------------------------
    // Peek behavior: swap main image src
    // Only active if peekBtn exists
    // ---------------------------
    function applyPeek() {
      if (!peekBtn) return;

      const activeSlide = slides[index];
      const mainImg =
        activeSlide?.querySelector("img.slide-main") || mainImgs[index];
      const peekSrc = activeSlide?.dataset?.peek;

      if (!mainImg || !peekSrc) return;

      // store original once
      if (!mainImg.dataset.originalSrc) {
        mainImg.dataset.originalSrc = mainImg.src;
      }

      // swap to peek
      mainImg.src = peekSrc;
    }

    function removePeek() {
      if (!peekBtn) return;

      const activeSlide = slides[index];
      const mainImg =
        activeSlide?.querySelector("img.slide-main") || mainImgs[index];
      if (!mainImg) return;

      const original = mainImg.dataset.originalSrc;
      if (original) mainImg.src = original;
    }

    // Ensure current slide is showing correct state after navigation
    function syncPeekStateAfterNav() {
      if (!peekBtn) return;

      // If pinned, keep peek image on the new slide (if it has data-peek)
      if (peekPinned) {
        applyPeek();
        return;
      }

      // Not pinned => always show original after nav
      removePeek();
    }

    function update() {
      buildOffsets();
      index = Math.max(0, Math.min(index, slides.length - 1));

      const x = offsets[index] || 0;
      track.style.transform = `translateX(-${x}px)`;

      if (prev) prev.disabled = index === 0;
      if (next) next.disabled = isAtEnd();

      updateHeader();
      syncPeekStateAfterNav();
    }

    function scaleAllImagesSameRatio() {
      if (!mainImgs.length) return;

      const maxNaturalWidth = Math.max(
        ...mainImgs.map((i) => i.naturalWidth || 1)
      );
      const scale = Math.min(1, MAX_WIDTH / maxNaturalWidth);

      slides.forEach((slide, i) => {
        const img = mainImgs[i];
        if (!img) return;

        const w = Math.round((img.naturalWidth || 1) * scale);
        slide.style.width = `${w}px`;

        img.style.width = "100%";
        img.style.height = "auto";
        img.style.display = "block";
      });

      update();
    }

    next?.addEventListener("click", () => {
      if (!isAtEnd() && index < slides.length - 1) {
        index++;
        update();
      }
    });

    prev?.addEventListener("click", () => {
      if (index > 0) {
        index--;
        update();
      }
    });

    // Peek interactions only when button exists
    if (peekBtn) {
      peekBtn.addEventListener("mouseenter", () => {
        if (!peekPinned) applyPeek();
      });

      peekBtn.addEventListener("mouseleave", () => {
        if (!peekPinned) removePeek();
      });

      // optional click pin/unpin
      peekBtn.addEventListener("click", () => {
        peekPinned = !peekPinned;

        if (peekPinned) {
          applyPeek();
        } else {
          removePeek();
        }
      });
    }

    window.addEventListener("resize", scaleAllImagesSameRatio);
    waitForImages(mainImgs).then(scaleAllImagesSameRatio);
  });
})();

(() => {
  document.querySelectorAll(".wj").forEach((root) => {
    const track = root.querySelector(".wj__track");
    const slides = Array.from(root.querySelectorAll(".wj__slide"));
    const caption =
      root.querySelector("#wjCaption") || root.querySelector(".wj__caption");

    const stepBtns = Array.from(root.querySelectorAll(".wj__step"));
    const toggleBtns = Array.from(root.querySelectorAll(".wj__toggle-btn"));

    const prev = root.querySelector(".wj__prev");
    const next = root.querySelector(".wj__next");

    let currentStep = "entry";
    let currentFidelity = "low";
    let currentIndex = 0;

    function visibleSlides() {
      return slides.filter(
        (s) =>
          s.dataset.step === currentStep &&
          s.dataset.fidelity === currentFidelity
      );
    }

    // In this design: each step+fidelity can have multiple screens (carousel)
    function update() {
      const group = visibleSlides();
      if (!group.length) return;

      currentIndex = Math.max(0, Math.min(currentIndex, group.length - 1));

      // Find the global index of the active visible slide
      const activeSlide = group[currentIndex];
      const globalIndex = slides.indexOf(activeSlide);

      track.style.transform = `translateX(-${globalIndex * 100}%)`;

      if (caption) caption.textContent = activeSlide.dataset.caption || "";

      if (prev) prev.disabled = currentIndex === 0;
      if (next) next.disabled = currentIndex === group.length - 1;
    }

    // Step switching
    stepBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        stepBtns.forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");

        currentStep = btn.dataset.step;
        currentIndex = 0;
        update();
      });
    });

    // Fidelity toggle
    toggleBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        toggleBtns.forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");

        currentFidelity = btn.dataset.fidelity;
        currentIndex = 0;
        update();
      });
    });

    // Nav
    next?.addEventListener("click", () => {
      const group = visibleSlides();
      if (currentIndex < group.length - 1) {
        currentIndex++;
        update();
      }
    });

    prev?.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        update();
      }
    });

    // Init defaults (activate first buttons)
    stepBtns[0]?.classList.add("is-active");
    toggleBtns[0]?.classList.add("is-active");
    update();
  });
})();

(function () {
  const root = document.getElementById("workflowUserJourney");
  if (!root) return;

  const viewport = root.querySelector(".wuj__viewport");
  const pills = Array.from(root.querySelectorAll(".wuj__pill"));
  const tabs = Array.from(root.querySelectorAll(".wuj__tab"));
  const allSlides = Array.from(root.querySelectorAll(".wuj__slide"));
  const prevBtn = root.querySelector('.wuj__nav[data-dir="prev"]');
  const nextBtn = root.querySelector('.wuj__nav[data-dir="next"]');

  let fidelity = "low";
  let activeGroup = "entry";
  const indexByGroup = { entry: 0, data: 0, reco: 0, review: 0, submit: 0 };

  const getImgs = () => Array.from(root.querySelectorAll(".wuj__img"));

  // ✅ always same slide width relative to the viewport
  function setSlideWidth() {
    const w = viewport.clientWidth;
    const slideW = Math.round(w * 0.75); // 75% -> 25% peek
    root.style.setProperty("--slideW", slideW + "px");
  }

  function applyFidelity(next) {
    fidelity = next;

    pills.forEach((p) => {
      const on = p.dataset.fidelity === fidelity;
      p.classList.toggle("is-active", on);
      p.setAttribute("aria-pressed", on ? "true" : "false");
    });

    // swap ALL images everywhere
    getImgs().forEach((img) => {
      const low = img.getAttribute("data-low");
      const mid = img.getAttribute("data-mid");
      img.src = (fidelity === "mid" ? mid : low) || img.src;
    });
  }

  function visibleSlides() {
    return allSlides.filter((s) => s.dataset.group === activeGroup);
  }

  function updateHidden() {
    allSlides.forEach((s) => (s.hidden = s.dataset.group !== activeGroup));
  }

  function updateNavState() {
    const total = visibleSlides().length;
    const idx = indexByGroup[activeGroup] || 0;

    prevBtn.disabled = idx <= 0;
    nextBtn.disabled = idx >= total - 1;

    // flag single-slide tab (keeps container stable, just disables nav)
    root.classList.toggle("is-single", total <= 1);
  }

  function goTo(idx) {
    const slides = visibleSlides();
    const total = slides.length;
    if (!total) return;

    const clamped = Math.max(0, Math.min(idx, total - 1));
    indexByGroup[activeGroup] = clamped;

    const target = slides[clamped];
    viewport.scrollTo({ left: target.offsetLeft, behavior: "smooth" });

    updateNavState();
  }

  function setGroup(group) {
    activeGroup = group;

    tabs.forEach((t) => {
      const on = t.dataset.tab === group;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", on ? "true" : "false");
    });

    updateHidden();
    viewport.scrollLeft = 0;
    goTo(indexByGroup[group] || 0);
  }

  // Events
  pills.forEach((p) =>
    p.addEventListener("click", () => applyFidelity(p.dataset.fidelity))
  );
  tabs.forEach((t) =>
    t.addEventListener("click", () => setGroup(t.dataset.tab))
  );

  prevBtn.addEventListener("click", () =>
    goTo((indexByGroup[activeGroup] || 0) - 1)
  );
  nextBtn.addEventListener("click", () =>
    goTo((indexByGroup[activeGroup] || 0) + 1)
  );

  window.addEventListener("resize", () => {
    setSlideWidth();
    goTo(indexByGroup[activeGroup] || 0);
  });

  // Init
  setSlideWidth();
  applyFidelity("mid");
  setGroup("entry");
})();
