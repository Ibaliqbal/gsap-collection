const preloadBlocks = document.querySelectorAll(".preload-block");
const loaderPercentage = document.querySelector(".loader-percentage p");
const overlayPreload = document.querySelector(".overlay-preload");
const loaderSpinner = document.querySelector(".loader-spinner");
const splitTitle = SplitText.create(".title h1", {
  type: "chars,words",
  charsClass: "char",
});

function playAnimation() {
  const tl = gsap.timeline();

  tl.to(loaderPercentage, {
    textContent: "100%",
    duration: 4,
    snap: {
      textContent: 1,
    },
    delay: 0.75,
    ease: "none",
  })
    .to(loaderPercentage, {
      y: -100,
      duration: 1,
      delay: 0.75,
    })
    .to(loaderSpinner, {
      opacity: 0,
      duration: 0.5,
    })
    .to(".word1", {
      y: 0,
      duration: 0.75,
      ease: "power3.out",
    })
    .to(
      ".word2",
      {
        y: 0,
        duration: 0.75,
        ease: "power3.out",
      },
      "<"
    )
    .to(".word1", {
      y: -100,
      duration: 0.75,
      ease: "power3.in",
      delay: 1,
    })
    .to(
      ".word2",
      {
        y: 100,
        duration: 0.75,
        ease: "power3.in",
      },
      "<"
    )
    .to(preloadBlocks, {
      clipPath: "inset(0 0 100% 0)",
      duration: 0.75,
      stagger: {
        each: 0.015,
        from: "random",
      },
      ease: "power3.inOut",
    })
    .to(splitTitle.chars, {
      y: 0,
      duration: 0.75,
      ease: "power3.out",
      stagger: {
        each: 0.05,
        from: "start",
      },
    });
}

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(SplitText);
  playAnimation();
});
