document.addEventListener("DOMContentLoaded", () => {
  const mediaQuery = window.matchMedia("(min-width: 768px)");
  gsap.registerPlugin(ScrollTrigger);
  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  const slides = document.querySelector(".slides");
  const cardImages = document.querySelectorAll(".card-slide");
  const wrapperSlider = document.querySelector(".wrapper-slider");
  const cardWidth = cardImages[0].getBoundingClientRect().width;
  const wrapperBg = document.querySelectorAll(".wrapper-bg");

  gsap.to(wrapperSlider, {
    x: `-${cardWidth * cardImages.length + cardWidth * 0.4 - cardWidth}px`,
    scrollTrigger: {
      trigger: slides,
      pin: true,
      start: "top top",
      end: `+=10000px`,
      scrub: 1,
      invalidateOnRefresh: 1,
    },
  });

  cardImages.forEach((card) => {
    const img = card.querySelector(".image");
    const id = card.dataset.id;

    img.addEventListener("mouseenter", () => {
      gsap.to(wrapperBg[Number(id) - 1], {
        opacity: 1,
        ease: "power3.inOut",
        duration: 0.75,
      });
    });

    img.addEventListener("mouseleave", () => {
      gsap.to(wrapperBg[Number(id) - 1], {
        opacity: 0,
        ease: "power3.inOut",
        duration: 0.75,
      });
    });
  });
});
