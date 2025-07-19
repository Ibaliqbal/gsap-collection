document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".button-directional");

  buttons.forEach((button) => {
    button.addEventListener("mouseenter", (e) => {
      const rect = button.getBoundingClientRect();
      const fromTop = e.clientY < rect.top + rect.height / 2;

      button.classList.remove("top", "bottom");
      button.classList.add(fromTop ? "bottom" : "top");
    });

    button.addEventListener("mouseleave", (e) => {
      const rect = button.getBoundingClientRect();
      const toTop = e.clientY < rect.top + rect.height / 2;

      button.classList.remove("top", "bottom");
      button.classList.add(toTop ? "bottom" : "top");
    });
  });
});
