document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(Flip);

  const lenis = new Lenis();

  // Use requestAnimationFrame to continuously update the scroll
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  const buttonGrid = document.querySelector(".grid-button");
  const buttonSlides = document.querySelector(".slides-button");
  const bgWhiteButton = document.querySelector(".bg-white");
  const previewImage = document.querySelector(".preview-image");
  const wrapperImages = document.querySelector(".wrapper-images");
  const mainContainer = document.querySelector(".main-content");
  let isAnimating = false;
  const allImage = document.querySelectorAll(".card-image");

  buttonGrid.addEventListener("click", () => {
    if (isAnimating) return;
    isAnimating = true;
    buttonSlides.disabled = true;

    gsap.to(bgWhiteButton, {
      translateX: 0,
      ease: "power2.inOut",
      duration: 1,
    });

    buttonSlides.classList.remove("is-current");
    buttonGrid.classList.add("is-current");

    const state = Flip.getState(allImage);

    mainContainer.classList.remove("slides");
    wrapperImages.classList.remove("slides");

    Flip.from(state, {
      absolute: true,
      duration: 1.4,
      ease: "power3.inOut",
      onComplete: () => {
        gsap.to(previewImage, {
          "--mask-path": "inset(0% 0% 0% 0%)",
          ease: "power1.inOut",
          duration: 1,
          onComplete: () => {
            isAnimating = false;
            buttonSlides.disabled = false;
          },
        });
      },
    });
  });

  buttonSlides.addEventListener("click", () => {
    if (isAnimating) return;
    buttonGrid.disabled = true;
    isAnimating = true;
    lenis.scrollTo(0, {
      duration: 0.001,
    });

    gsap.to(bgWhiteButton, {
      translateX: 80,
      ease: "power2.inOut",
      duration: 1,
    });

    buttonGrid.classList.remove("is-current");
    buttonSlides.classList.add("is-current");
    gsap.to(previewImage, {
      "--mask-path": "inset(0% 0% 0% 100%)",
      ease: "power1.inOut",
      duration: 0.75,
    });

    const state = Flip.getState(allImage);

    mainContainer.classList.add("slides");
    wrapperImages.classList.add("slides");

    Flip.from(state, {
      absolute: true,
      delay: 0.3,
      duration: 1.4,
      ease: "power3.inOut",
      stagger: {
        each: 0.02,
        from: "start",
      },
      onComplete: () => {
        isAnimating = false;
        buttonGrid.disabled = false;
      },
    });
  });
});
