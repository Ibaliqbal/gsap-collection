function initLenis(lenis) {
  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
}

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, CustomEase);
  CustomEase.create("hop", "0.5, 1, 0.4, 0.5");
  const lenis = new Lenis();
  const playButton = document.querySelector(".play-btn");

  initLenis(lenis);

  gsap.to(".marquee-wrapper.top .marquee-inner", {
    xPercent: -49.2,
    duration: 10,
    ease: "none",
    repeat: -1,
  });

  gsap.fromTo(
    ".marquee-wrapper.bottom .marquee-inner",
    { xPercent: -67.4 },
    {
      xPercent: 0,
      duration: 10,
      ease: "none",
      repeat: -1,
    }
  );

  gsap.to(".wrapper-video", {
    "--mask-path": "inset(0% 0% 0% 0% round 0px)",
    ease: "hop",
    scrollTrigger: {
      trigger: ".wrapper-video",
      start: "top top",
      end: "bottom bottom",
      endTrigger: ".scrolling",
      scrub: 1,
      pin: true,
      onUpdate: (self) => {
        let progress = self.progress * 10;

        gsap.to(playButton, {
          top: progress > 2 ? "50%" : "75%",
          ease: "expo.out",
          duration: 1,
        });
      },
    },
  });

  document.querySelectorAll(".title").forEach((el, index) => {
    gsap.to(el, {
      y: -300,
      duration: 1.5,
      scrollTrigger: {
        trigger: ".scrolling-content",
        start: "top+=150 top",
        end: "bottom+=100 center-=250",
        scrub: 1,
      },
    });
  });
});
