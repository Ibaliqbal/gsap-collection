document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(SplitText);
  const hoverContainer = document.querySelector(".hover");
  const hoverImage = document.querySelector(".hover-image");
  const splitText = SplitText.create(".image-center p", {
    type: "chars",
    charsClass: "char",
  });

  const floatingImages = [
    ".image-bottom-left",
    ".image-top-one",
    ".image-top-two",
    ".image-bottom",
    ".image-top-left",
    ".image-right",
  ];

  floatingImages.forEach((selector) => {
    gsap.set(selector, {
      top: "50%",
      left: "50%",
      xPercent: -50,
      yPercent: -50,
    });
  });

  const tlHoverImageEnter = gsap.timeline({
    paused: true,
    ease: "expo.out",
  });

  tlHoverImageEnter
    .to(splitText.chars, {
      y: 0,
      stagger: 0.05,
    })
    .to(
      ".image-center img",
      {
        filter: "blur(5px)",
      },
      "<"
    )
    .to(
      ".image-center",
      {
        scale: 0.5,
      },
      "<"
    )
    .to(
      ".image-bottom-left",
      {
        top: "30%",
        left: "-23%",
        xPercent: 0,
        yPercent: 0,
      },
      "<"
    )
    .to(
      ".image-top-left",
      {
        top: "3%",
        left: "-40%",
        xPercent: 0,
        yPercent: 0,
      },
      "<"
    )
    .to(
      ".image-top-one",
      {
        top: "-40%",
        left: "-5%",
        xPercent: 0,
        yPercent: 0,
      },
      "<"
    )
    .to(
      ".image-top-two",
      {
        top: "-40%",
        left: "35%",
        xPercent: 0,
        yPercent: 0,
      },
      "<"
    )
    .to(
      ".image-bottom",
      {
        top: "45%",
        left: "23%",
        xPercent: 0,
        yPercent: 0,
      },
      "<"
    )
    .to(
      ".image-right",
      {
        top: "0%",
        left: "70%",
        xPercent: 0,
        yPercent: 0,
      },
      "<"
    );

  hoverContainer.addEventListener("pointermove", () => {
    hoverImage.style.pointerEvents = "auto";
    hoverImage.style.visibility = "visible";
    gsap.to(hoverImage, {
      opacity: 1,
      ease: "power1.inOut",
    });
  });

  hoverContainer.addEventListener("pointerleave", () => {
    gsap.to(hoverImage, {
      opacity: 0,
      duration: 0.75,
      ease: "power1.inOut",
      onComplete: () => {
        hoverImage.style.pointerEvents = "none";
        hoverImage.style.visibility = "hidden";
      },
    });
  });

  hoverImage.addEventListener("pointerenter", () => {
    tlHoverImageEnter.play();
  });

  hoverImage.addEventListener("pointerleave", () => {
    tlHoverImageEnter.reverse();
  });

  hoverContainer.addEventListener("pointermove", (e) => {
    gsap.to(hoverImage, {
      x: e.pageX + "px",
      y: e.pageY + "px",
      ease: "power1.out",
      duration: 2,
    });
  });
});
