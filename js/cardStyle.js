const scrollContainer = document.querySelector(".scroll-container");

// Infinite scrolling setup
scrollContainer.addEventListener("scroll", () => {
  if (
    scrollContainer.scrollLeft + scrollContainer.clientWidth >=
    scrollContainer.scrollWidth
  ) {
    scrollContainer.scrollLeft = 0; // Reset scroll
  }
});

// Optional dragging
let isDragging = false;
let startX, scrollLeft;

scrollContainer.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.pageX - scrollContainer.offsetLeft;
  scrollLeft = scrollContainer.scrollLeft;
});

scrollContainer.addEventListener("mouseleave", () => {
  isDragging = false;
});

scrollContainer.addEventListener("mouseup", () => {
  isDragging = false;
});

scrollContainer.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - scrollContainer.offsetLeft;
  const walk = (x - startX) * 2; // Adjust scroll speed
  scrollContainer.scrollLeft = scrollLeft - walk;
});

// Select all cards and modal elements
const cards = document.querySelectorAll(".card");

const modal = document.querySelector(".modal");
const modalImage = document.querySelector(".modal-image");
const closeButton = document.querySelector(".close-button");

// Add click event to each card
cards.forEach((card) => {
  card.addEventListener("click", () => {
    const imageSrc = card.querySelector(".card-image").src;
    modalImage.src = imageSrc;
    modal.classList.add("show");
  });
});

// Add click event to close button
closeButton.addEventListener("click", () => {
  modal.classList.remove("show");
});

// Close modal when clicking outside the content
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
  }
});
