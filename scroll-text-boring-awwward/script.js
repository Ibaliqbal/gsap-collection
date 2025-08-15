document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);
  const lenis = new Lenis();

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  const scrolling = document.querySelector(".scrolling");
  const firstTexts = document.querySelectorAll(".text-wrap h1:first-of-type");
  const lastTexts = document.querySelectorAll(".text-wrap h1:last-of-type");
  const yPercent = 120;
  const divider = document.querySelector(".divider");

  ScrollTrigger.create({
    trigger: scrolling,
    start: "clamp(top top)",
    end: "+=250%",
    pin: true,
    // markers: true,
    scrub: true,
    onUpdate: (self) => {
      const progress = self.progress * 10;

      if (progress <= 7) {
        const target = 7;
        const progressText = Math.round((progress / target) * yPercent);
        gsap.set(lastTexts, {
          y: `${yPercent - progressText}%`,
          stagger: 0,
        });
        gsap.set(firstTexts, {
          y: `-${progressText}%`,
          stagger: 0,
        });
      } else if (progress > 7) {
        gsap.set(lastTexts, {
          y: "0%",
        });
        gsap.set(firstTexts, {
          y: `${yPercent}%`,
        });
      }

      if (progress >= 7 && progress <= 10) {
        const dividerProgress = progress - 7;
        gsap.set(divider, {
          scaleX: dividerProgress,
        });
      } else if (progress < 7) {
        gsap.set(divider, {
          scaleX: 0,
        });
      } else if (progress > 9) {
        gsap.set(divider, {
          scaleX: 1,
        });
      }
    },
  });
});
