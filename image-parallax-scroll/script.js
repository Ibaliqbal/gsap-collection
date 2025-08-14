document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
  const scrollerImages = document.querySelectorAll(".scroller-image");
  ScrollSmoother.create({
    smooth: 2,
    effects: true,
    smoothTouch: 0.1,
    // normalizeScroll: true,
  });

  scrollerImages.forEach((container, index) => {
    const direction = container.dataset.direction;
    gsap.to(container, {
      yPercent: direction === "bottom" ? -16 + (index + 1) : 16 + (index + 1),
      ease: "power1",
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });
});
