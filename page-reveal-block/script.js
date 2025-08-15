const preloadBlocks = document.querySelectorAll(".preload-block");
const loaderPercentage = document.querySelector(".loader-percentage p");
const overlayPreload = document.querySelector(".overlay-preload");
const loaderSpinner = document.querySelector(".loader-spinner");
const splitTitle = SplitText.create(".title h1", {
  type: "chars",
  charsClass: "char",
});
const images = gsap.utils.toArray(".image-container");
gsap.set(splitTitle.chars, {
  yPercent: 150,
});

function playAnimation() {
  const tl = gsap.timeline({
    onComplete: () => {
      let state = Flip.getState(".image-container");

      images.forEach((image) => {
        image.classList.remove("ordered");
      });

      Flip.from(state, {
        absolute: true,
        duration: 1,
        ease: "power3.inOut",
      });
    },
  });

  tl.to(loaderPercentage, {
    textContent: "100%",
    duration: 4,
    snap: {
      textContent: [7, 11, 24, 36, 41, 54, 62, 70, 88, 98, 99, 100],
    },
    delay: 1,
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
      opacity: 0,
      duration: 0.5,
      stagger: {
        each: 0.015,
        from: "random",
      },
      ease: "power3.inOut",
      onComplete: () => {
        overlayPreload.style.display = "none";
      },
    })
    .to(splitTitle.chars, {
      yPercent: 0,
      duration: 0.75,
      ease: "power3.out",
      stagger: {
        each: 0.05,
        from: "start",
      },
    })
    .to(".image-container", {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      duration: 1,
      ease: "power3.inOut",
      stagger: {
        each: 0.25,
        from: "start",
      },
    });
}

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(SplitText, Flip);
  playAnimation();
});
