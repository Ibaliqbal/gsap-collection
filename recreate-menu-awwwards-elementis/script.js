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
        ease: "power2.out",
      })
      .to(
        imageWrapper,
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 1,
          ease: "power2.out",
        },
        "<+0.075"
      )
      .from(".fade-out", {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "power2",
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
          ease: "power2.out",
        })
        .to(
          menu,
          {
            clipPath: "inset(0 0 100% 0)",
            duration: 0.75,
            ease: "power2.out",
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

  if (mediaQuery.matches) {
    hoverLinks.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        const srcImage = element.dataset.image;

        imageCollections.insertAdjacentHTML(
          "beforeend",
          `
        <div class="image new">
          <img src="${srcImage}" alt="" />
        </div>
      `
        );

        const newImage = imageCollections.querySelector(".image.new");
        const allImages = imageCollections.querySelectorAll(".image");

        newImage.style.zIndex = allImages.length;

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

        newImage.classList.remove("new");
      });
    });
  }
});
