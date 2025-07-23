document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);
  ScrollSmoother.create({
    smooth: 2,
    effects: true,
    smoothTouch: 0.1,
  });

  ScrollTrigger.create({
    trigger: document.body,
    start: "top top",
    end: "bottom bottom",
    invalidateOnRefresh: true,
    scrub: true,
    onUpdate: (self) => {
      gsap.to(".scrollbar", {
        transform: `scaleX(${self.progress})`,
        ease: "none",
      });
    },
  });
});
