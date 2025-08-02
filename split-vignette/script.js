document.addEventListener("DOMContentLoaded", () => {
  const lenis = new Lenis();

  // Use requestAnimationFrame to continuously update the scroll
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  gsap.to(".overlay", {
    delay: 1,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    onComplete: () => {
      document.querySelector(".overlay").remove();
    },
  });

  const posters = document.querySelectorAll(".poster");
  const posterOutro = document.querySelector(".outro .poster");
  const hoverText = document.querySelectorAll(".hover-text");

  document.addEventListener("mousemove", (e) => {
    posters.forEach((poster) => {
      const rect = poster.getBoundingClientRect();
      const moveX = e.clientX - rect.width / 2;
      const moveY = e.clientY - rect.height / 2;
      gsap.to(poster, {
        x: moveX,
        y: moveY,
        duration: 0.5,
        ease: "power2.out",
      });
    });
  });

  hoverText.forEach((text) => {
    const source = text.dataset.image;
    text.addEventListener("mouseenter", () => {
      const card = document.createElement("div");
      card.className = "card-image";
      card.style.zIndex = posterOutro.childElementCount + 1;
      const newImg = document.createElement("img");
      newImg.src = source;
      newImg.alt = "";

      card.appendChild(newImg);

      if (posterOutro.childElementCount > 8) {
        posterOutro.firstElementChild.remove();
      }

      posterOutro.appendChild(card);

      gsap.fromTo(
        card,
        {
          scale: 0,
        },
        {
          scale: 1,
          duration: 1,
          ease: "power4.out",
        }
      );
    });
  });
});
