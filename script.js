document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, SplitText, Flip, CustomBounce, CustomEase);

  const container = document.querySelector(".main-container");

  CustomBounce.create("highlightBounce", {
    strength: 0.8,
    squash: 3,
  });

  const splitTitle = SplitText.create(".logo", {
    type: "chars",
    charsClass: "chars-logo",
  });

  const splitFirstDesc = SplitText.create(".desc:nth-child(1)", {
    type: "lines",
    mask: "lines",
    linesClass: "lines",
  });

  const splitSecondDesc = SplitText.create(".desc:nth-child(2)", {
    type: "lines",
    mask: "lines",
    linesClass: "lines",
  });

  const timeline = gsap.timeline({
    defaults: {
      duration: 1,
      ease: "power2.out",
    },
  });

  timeline.to(splitTitle.chars, {
    delay: 2,
    opacity: 1,
    ease: "power1.out",
    stagger: {
      each: 0.1,
    },
    onStart: () => {
      gsap.to(".logo.active", {
        opacity: 1,
        duration: 0.1,
      });
    },
  });

  timeline.to(splitTitle.chars, {
    y: 0,
    x: 0,
    ease: "power3.out",
    stagger: {
      each: 0.15,
    },
  });

  timeline.to(".loader-spinner", {
    opacity: 0,
    ease: "power2.out",
  });

  timeline.to("body", {
    backgroundColor: "#eaeaea",
    color: "#131313",
    ease: "power2.out",
    onComplete: () => {
      const state = Flip.getState(".logo");

      document.querySelector(".logo").classList.remove("active");

      Flip.from(state, {
        duration: 3,
        absolute: true,
        ease: "expo.out",
        scale: true,
      });

      document.querySelector(".loader-spinner").style.display = "none";
    },
  });

  timeline.to(
    ".highlight",
    {
      transform: "skewX(-20deg)",
      duration: 2,
      ease: "highlightBounce",
      onComplete: () => {
        gsap.to(container, {
          opacity: 1,
          ease: "power3.out",
          duration: 0.5,
        });
      },
    },
    "+=2"
  );

  timeline.to(".about-title", {
    opacity: 1,
  });

  timeline.to(splitFirstDesc.lines, {
    y: 0,
    ease: "expo.out",
    stagger: 0.15,
  });

  timeline.to(
    splitSecondDesc.lines,
    {
      y: 0,
      ease: "expo.out",
      stagger: 0.15,
    },
    "<"
  );

  timeline.to(".animations-title", {
    opacity: 1,
  });
});
