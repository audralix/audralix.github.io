const DESIGN_WIDTH = 1440;
const DESIGN_HEIGHT = 1024;

/* =========================================================
   SCALE CASE STUDY
   ========================================================= */

function scaleCaseStudy() {
  const viewport = document.querySelector(".case-study-viewport");
  const shell = document.querySelector(".case-study-scale-shell");
  const stage = document.querySelector(".case-study-stage");

  if (!viewport || !shell || !stage) return;

  const scale = Math.min(
    viewport.clientWidth / DESIGN_WIDTH,
    viewport.clientHeight / DESIGN_HEIGHT,
  );

  stage.style.transform = `scale(${scale})`;

  shell.style.width = `${DESIGN_WIDTH * scale}px`;
  shell.style.height = `${DESIGN_HEIGHT * scale}px`;
}

/* =========================================================
   UPDATE VIEWPORT BACKGROUND
   ========================================================= */

function updateSlideSurface(activeSlide) {
  const viewport = document.querySelector(".case-study-viewport");

  if (!viewport || !activeSlide) return;

  const usesGraySurface = activeSlide.classList.contains("case-slide--gray");

  viewport.classList.toggle("case-study-viewport--gray", usesGraySurface);
}

/* =========================================================
   DETECT CURRENT / VISIBLE SLIDE
   ========================================================= */

function updateSurfaceFromVisibleSlide() {
  const slides = document.querySelectorAll(".case-slide");

  if (!slides.length) return;

  const viewportCenter = window.innerHeight / 2;

  let closestSlide = null;
  let closestDistance = Infinity;

  slides.forEach((slide) => {
    const rect = slide.getBoundingClientRect();

    const slideCenter = rect.top + rect.height / 2;

    const distance = Math.abs(slideCenter - viewportCenter);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestSlide = slide;
    }
  });

  if (closestSlide) {
    updateSlideSurface(closestSlide);
  }
}

/* =========================================================
   INITIALISE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  scaleCaseStudy();
  updateSurfaceFromVisibleSlide();
});

/* =========================================================
   RESIZE
   ========================================================= */

window.addEventListener("resize", () => {
  scaleCaseStudy();
  updateSurfaceFromVisibleSlide();
});

/* =========================================================
   SCROLL
   ========================================================= */

window.addEventListener("scroll", updateSurfaceFromVisibleSlide, {
  passive: true,
});
