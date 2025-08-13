document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(Observer, SplitText, CustomEase);

  CustomEase.create("hop", "0.7, 0, 0, 1");

  let lastIndex = 0,
    isAnimating = true;

  const slides = gsap.utils.toArray(".slide"),
    totalSlide = slides.length,
    scaleSlide = 0.75,
    grayscaleSlide = "grayscale(0.7)",
    splitTitle = gsap.utils.toArray(".title-slide").map((title) =>
      SplitText.create(title, {
        type: "chars",
        autoSplit: true,
        onSplit: (self) => {
          gsap.set(self.chars, {
            scale: 0,
            transformOrigin: (i) => (i % 2 === 0 ? "bottom" : "top"),
          });

          return gsap.to(self.chars, {
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            onComplete: () => {
              isAnimating = false;
            },
          });
        },
      })
    );

  gsap.set(
    slides.filter((_, index) => index !== 0),
    {
      xPercent: 100,
      scale: scaleSlide,
      filter: grayscaleSlide,
    }
  );

  gsap.to(".main-content", {
    opacity: 1,
    duration: 0.75,
    ease: "power4.inOut",
  });

  function goToSection(index, direction) {
    isAnimating = true;

    const isGoDown = direction === 1,
      dFactor = isGoDown ? 1 : -1;

    const timeline = gsap.timeline({
      onComplete: () => {
        lastIndex = index;
        isAnimating = false;
      },
      defaults: {
        duration: 1.25,
        ease: "power4.inOut",
      },
    });

    gsap.set(slides[index], {
      scale: scaleSlide,
      filter: grayscaleSlide,
      xPercent: 100 * dFactor,
    });
    gsap.set(splitTitle[index].chars, {
      scale: 0,
      transformOrigin: (i) => (i % 2 === 0 ? "bottom" : "top"),
    });

    timeline
      .to(splitTitle[lastIndex].chars, {
        scale: 0,
        transformOrigin: (i) => (i % 2 === 0 ? "top" : "bottom"),
        stagger: 0.1,
        duration: 0.5,
      })
      .to(
        slides[lastIndex],
        {
          scale: scaleSlide,
          filter: grayscaleSlide,
        },
        `-=${
          splitTitle[lastIndex].chars.length /
          (splitTitle[lastIndex].chars.length / 2)
        }`
      )
      .to(slides[lastIndex], {
        xPercent: -100 * dFactor,
        ease: "hop",
      })
      .to(
        slides[index],
        {
          xPercent: 0,
          ease: "hop",
        },
        "<"
      )
      .to(slides[index], {
        scale: 1,
        filter: "grayscale(0)",
      })
      .to(
        splitTitle[index].chars,
        {
          scale: 1,
          stagger: 0.1,
          duration: 0.45,
        },
        "-=.95"
      );
  }

  Observer.create({
    type: "wheel,touch",
    onDown: () => {
      !isAnimating &&
        goToSection((lastIndex - 1 + totalSlide) % totalSlide, -1);
    },
    onUp: () => {
      !isAnimating && goToSection((lastIndex + 1) % totalSlide, 1);
    },
    wheelSpeed: -1,
  });
});
