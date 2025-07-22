document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);
  ScrollSmoother.create({
    smooth: 2,
    effects: true,
    smoothTouch: 0.1,
  });
});
