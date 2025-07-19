document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const lineHamburger = document.querySelectorAll(".hamburger span");
  const closeButton = document.querySelector(".close-btn");
  const lineClose = document.querySelectorAll(".close-btn span");
  const menu = document.querySelector(".menu");
  const imageWrapper = document.querySelector(".image-wrapper");
  const hoverLinks = gsap.utils.toArray(".hover-link");
  const imageCollections = document.querySelector(".images");
  const mediaQuery = window.matchMedia("(min-width: 768px)");
  let isDoneAnimation = false;

  function handleHoverEffect() {
    if (!mediaQuery.matches) return;
    hoverLinks.forEach((element) => {
      element.addEventListener("mouseenter", handleImageFunction);
    });
  }

  function handleImageFunction() {
    const srcImage = this.dataset.image;
    const newImage = document.createElement("div");
    newImage.classList.add("image");
    newImage.style.zIndex = Date.now();
    const newImg = document.createElement("img");
    newImg.src = srcImage;
    newImg.alt = "";
    newImage.append(newImg);
    imageCollections.append(newImage);

    if (imageCollections.childElementCount >= 15) {
      imageCollections.firstElementChild.remove();
    }

    const tl = gsap.timeline();

    tl.fromTo(
      newImage,
      { clipPath: "inset(100% 0 0 0)", scale: 1.3 },
      {
        clipPath: "inset(0% 0 0 0)",
        scale: 1,
        duration: 0.75,
        ease: "power2.out",
      }
    );
  }

  const tlClose = gsap.timeline({
    paused: true,
  });

  tlClose
    .to(lineClose[0], {
      x: 60,
      duration: 0.75,
      ease: "power3.out",
    })
    .to(
      lineClose[1],
      {
        y: 60,
        duration: 0.75,
        ease: "power3.out",
      },
      "<+0.25"
    );

  const tlHamburger = gsap.timeline({
    paused: true,
  });

  tlHamburger.to(lineHamburger, {
    x: 60,
    stagger: {
      each: 0.25,
    },
    duration: 0.75,
    ease: "power3.out",
  });

  hamburger.addEventListener("mouseenter", () => {
    tlHamburger.play();
  });

  hamburger.addEventListener("mouseleave", () => {
    tlHamburger.reverse();
  });

  hamburger.addEventListener("click", () => {
    const tlMenu = gsap.timeline({
      onComplete: () => {
        isDoneAnimation = true;
      },
    });
    tlMenu.set(menu, {
      clipPath: "inset(100% 0 0 0)",
    });
    tlMenu.set(imageWrapper, {
      clipPath: "inset(100% 0 0 0)",
    });

    tlMenu
      .to(".menu", {
        clipPath: "inset(0% 0 0 0)",
        duration: 1,
        ease: "power2.inOut",
      })
      .to(
        imageWrapper,
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 1,
          ease: "power2.inOut",
        },
        "<+0.075"
      )
      .from(".fade-out", {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "power2.inOut",
        stagger: {
          each: "0.05",
        },
      });
  });

  closeButton.addEventListener("click", () => {
    const tlMenu = gsap.timeline();

    if (isDoneAnimation) {
      tlMenu
        .to(imageWrapper, {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.75,
          ease: "power2.inOut",
        })
        .to(
          menu,
          {
            clipPath: "inset(0 0 100% 0)",
            duration: 0.75,
            ease: "power2.inOut",
          },
          "<+0.075"
        );
    }
  });

  closeButton.addEventListener("mouseenter", () => {
    tlClose.play();
  });

  closeButton.addEventListener("mouseleave", () => {
    tlClose.reverse();
  });

  handleHoverEffect();

  mediaQuery.addEventListener("change", (e) => {
    if (e.matches) handleHoverEffect();
  });
});
