(() => {
  const section = document.querySelector("#layout-fidelity");
  const buttons = section.querySelectorAll(".seg__btn");

  const setState = (state) => {
    section.dataset.state = state;
    buttons.forEach((b) => {
      const active = b.dataset.set === state;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-pressed", active);
    });
    localStorage.setItem("fidelity", state); // remember choice (optional)
  };

  buttons.forEach((btn) =>
    btn.addEventListener("click", () => setState(btn.dataset.set))
  );

  // keyboard: ← → to switch
  section.addEventListener("keydown", (e) => {
    if (!["ArrowLeft", "ArrowRight"].includes(e.key)) return;
    const current = section.dataset.state || "low";
    setState(
      e.key === "ArrowRight"
        ? current === "low"
          ? "mid"
          : "low"
        : current === "mid"
        ? "low"
        : "mid"
    );
  });

  // restore last choice
  setState(localStorage.getItem("fidelity") || "low");
})();
