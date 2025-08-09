async function loadFont(target, config) {
  await document.fonts.ready;
  return SplitText.create(target, config);
}

document.addEventListener("DOMContentLoaded", async () => {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  const lenis = new Lenis();

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  const leftGallery = document.querySelector(".left");
  const leftOuterGallery = document.querySelector(".left-outer");
  const rigthGallery = document.querySelector(".right");
  const rightOuterGallery = document.querySelector(".right-outer");
  const spitTitle = await loadFont(".title", {
    type: "words",
  });
  const video = document.querySelector(".overlay video");

  const wordsTitle = spitTitle.words;

  const yWords = 20;

  gsap.set(wordsTitle, {
    opacity: 0,
    y: yWords,
  });

  ScrollTrigger.create({
    trigger: ".scrolling",
    start: "top top",
    pin: true,
    scrub: true,
    end: "+=200%",
    onEnter: () => {
      video.play();
    },
    onUpdate: (self) => {
      const percentageTopBottomMask = 20;
      const percentageLeftRightMask = 35;
      const progress = self.progress;
      const maskTopBottomProgress = `${
        (1 - self.progress) * percentageTopBottomMask
      }%`;
      const maskLeftRightProgress = `${
        (1 - self.progress) * percentageLeftRightMask
      }%`;
      const borderProgress = (1 - progress) * 15;

      gsap.set(".overlay", {
        "--mask-path": `inset(${maskTopBottomProgress} ${maskLeftRightProgress} ${maskTopBottomProgress} ${maskLeftRightProgress} round ${borderProgress}px)`,
      });

      if (progress <= 0.9) {
        const galleryProgress = progress / 0.9;
        const distance = window.innerWidth / 3;

        gsap.set(leftGallery, {
          x: `-${galleryProgress * distance}`,
        });
        gsap.set(leftOuterGallery, {
          x: `-${galleryProgress * distance}`,
        });
        gsap.set(rightOuterGallery, {
          x: `${galleryProgress * distance}`,
        });
        gsap.set(rigthGallery, {
          x: `${galleryProgress * distance}`,
        });
      }

      if (progress >= 0.5 && progress <= 0.9) {
        const titleProgress = (progress - 0.5) / 0.2;
        const totalWords = wordsTitle.length;
        const yProgress = (0.9 - progress) * 10 * (yWords / 2);

        gsap.set(wordsTitle, {
          y: yProgress,
        });

        wordsTitle.forEach((word, i) => {
          const wordStartDelay = i / totalWords;
          const wordEndDelay = (i + 1.5) / totalWords;

          let wordOpacity = 0;

          if (titleProgress >= wordEndDelay) {
            wordOpacity = 1;
          } else if (titleProgress >= wordStartDelay) {
            const wordProgress =
              (titleProgress - wordStartDelay) /
              (wordEndDelay - wordStartDelay);
            wordOpacity = wordProgress;
          }

          gsap.set(word, { opacity: wordOpacity });
        });
      } else if (progress < 0.5) {
        gsap.set(wordsTitle, {
          opacity: 0,
          y: yWords,
        });
      } else if (progress > 0.9) {
        gsap.set(wordsTitle, {
          opacity: 1,
          y: 0,
        });
      }
    },
  });
});
