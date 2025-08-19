document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, Flip);

  const lenis = new Lenis();

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  const targetFullscreen = Flip.getState(".container-fullscreen .fullscreen");
  const video = document.querySelector(".target-fullscreen");

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".wrapper-about",
      start: "center center",
      end: "center center",
      endTrigger: ".container-fullscreen",
      scrub: true,
      onEnter: () => {
        video.play();
      },
      onLeaveBack: () => {
        video.pause();
      },
    },
  });

  tl.add(
    Flip.fit(video, targetFullscreen, {
      ease: "none",
      duration: 2,
      scale: true,
    })
  );
});
