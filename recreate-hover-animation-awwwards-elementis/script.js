document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".button-directional");
  let currentIndexImage = 1;
  let currentZIndex = 1;
  const duration = 1;
  const ease = "power2.out";
  const mediaQuery = window.matchMedia("(min-width: 768px)");

  function handleMouseEnter(e) {
    currentZIndex += 1;
    const indexImage = this.dataset.image;
    const rect = this.getBoundingClientRect();
    const fromTop = e.clientY < rect.top + rect.height / 2;
    const currentImage = document.querySelector(`.image-${indexImage}`);

    currentImage.style.zIndex = currentZIndex;

    const tl = gsap.timeline();

    if (currentIndexImage < indexImage) {
      tl.fromTo(
        currentImage,
        { clipPath: "inset(100% 0 0 0)", scale: 1.3 },
        {
          clipPath: "inset(0% 0 0 0)",
          scale: 1,
          duration,
          ease,
        }
      );
    } else if (currentIndexImage > indexImage) {
      tl.fromTo(
        currentImage,
        { clipPath: "inset(0 0 100% 0)", scale: 1.3 },
        {
          clipPath: "inset(0 0 0% 0)",
          scale: 1,
          duration,
          ease,
        }
      );
    }

    currentIndexImage = indexImage;

    this.classList.remove("top", "bottom");
    this.classList.add(fromTop ? "bottom" : "top");
  }

  function handleResponsive() {
    if (!mediaQuery.matches) return;
    buttons.forEach((button) => {
      button.addEventListener("mouseenter", handleMouseEnter);

      button.addEventListener("mouseleave", (e) => {
        const rect = button.getBoundingClientRect();
        const toTop = e.clientY < rect.top + rect.height / 2;

        button.classList.remove("top", "bottom");
        button.classList.add(toTop ? "bottom" : "top");
      });

      button.addEventListener("click", (e) => {
        e.preventDefault();
      });
    });
  }

  handleResponsive();

  mediaQuery.addEventListener("change", (e) => {
    if (e.matches) handleResponsive();
  });
});
