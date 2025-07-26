function createReactiveValue(initialValue, callback) {
  return new Proxy(
    { value: initialValue },
    {
      set(target, prop, newValue) {
        if (prop === "value") {
          const oldValue = target[prop];
          target[prop] = newValue;
          if (oldValue !== newValue) {
            callback(newValue, oldValue);
          }
        } else {
          target[prop] = newValue;
        }
        return true;
      },
    }
  );
}

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);
  let smoother = ScrollSmoother.create({
    smooth: 2,
    effects: true,
    smoothTouch: 0.1,
  });
  
  smoother.effects(".scrolling-wrapper", {
    speed: 1,
  });

  SplitText.create(".title", {
    type: "lines",
    linesClass: "lines",
    autoSplit: true,
    mask: "lines",
  });

  SplitText.create(".desc", {
    type: "lines",
    linesClass: "lines",
    autoSplit: true,
    mask: "lines",
  });

  const totalImage = 5;

  const backgroundImages = document.querySelectorAll(
    ".bg .bg-wrapper .image:not(:first-child)"
  );
  const posterImages = document.querySelectorAll(
    ".image-inner .image:not(:first-child)"
  );

  const progressState = createReactiveValue(0, (newVal, oldVal) => {
    gsap.to(`.title:nth-child(${oldVal + 1}) .lines`, {
      y: newVal > oldVal ? "-150%" : "150%",
      stagger: 0,
      ease: "expo.out",
      duration: 1.25,
      overwrite: true,
    });
    gsap.to(`.title:nth-child(${newVal + 1}) .lines`, {
      y: 0,
      delay: 0.3,
      duration: 1,
      ease: "expo.out",
      overwrite: true,
      stagger: {
        each: newVal > oldVal ? 0.15 : 0.1,
        from: newVal > oldVal ? "start" : "end",
      },
    });
    gsap.to(`.desc:nth-child(${oldVal + 1}) .lines`, {
      y: newVal > oldVal ? "-150%" : "150%",
      stagger: 0,
      ease: "expo.out",
      duration: 1.25,
      overwrite: true,
    });
    gsap.to(`.desc:nth-child(${newVal + 1}) .lines`, {
      y: 0,
      delay: 0.3,
      duration: 1,
      ease: "expo.out",
      overwrite: true,
      stagger: {
        each: newVal > oldVal ? 0.1 : 0.05,
        from: newVal > oldVal ? "start" : "end",
      },
    });
  });

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".scrolling-wrapper",
      start: "center center",
      end: `+=${(totalImage - 1) * 100}%`,
      scrub: 1,
      pin: true,
      invalidateOnRefresh: true,
    },
    defaults: {
      ease: "none",
    },
  });

  gsap.from(".poster", {
    yPercent: 200,
    ease: "power4.out",
    willChange: "transform",
    duration: 1.6,
    scrollTrigger: {
      trigger: ".scrolling-wrapper",
      start: "top center",
    },
  });

  const maskArray = [
    `linear-gradient(0deg, #000 0% 0%, transparent 0% 0%, #000 0% 0%, transparent 0% 0%, #000 0% 0%, transparent 0% 0%,#000 0% 0%, transparent 0% 0%, #000 0% 0%, transparent 0% 0%, #000 0% 0%, transparent 0% 0%, #000 0% 0%, transparent 0% 0%, #000 0% 0%, transparent 0% 0%, #000 0% 0%, transparent 0% 0%, #000 0% 0%, transparent 0% 0%, #000 0% 0%, transparent 0% 0%, #000 0% 0%, transparent 0% 0%, #000 0% 0%, transparent 0% 0%, #000 0% 0%, transparent 0% 0%, #000 0% 0%, transparent 0% 0%, #000 0% 0%, transparent 0% 0%, #000 0% 0%, transparent 0% 0%, #000 0% 0%, transparent 0% 0%, #000 0% 0%, transparent 0% 0%, #000 0% 0%, transparent 0% 0%, #000 0% 0%, transparent 0% 0%, #000 0% 0%, transparent 0% 0%,#000 0% 0%, transparent 0% 0%, #000 0% 0%, transparent 0% 0%, #000 0% 0%, transparent 0% 0%, #000 0% 0%, transparent 0% 0%, #000 0% 0%, transparent 0% 0%, #000 0% 0%, transparent 0% 0%, #000 0% 0%, transparent 0% 0%, #000 0% 0%, transparent 0% 0%)`,
    `linear-gradient(
    0deg,
    black 0% 1.45%, transparent 1.45% 3.33%, black 3.33% 4.59%, transparent 4.59% 6.66%, black 6.66% 7.72%, transparent 7.72% 10%, black 10% 10.85%, transparent 10.85% 13.33%, black 13.33% 13.99%, transparent 13.99% 16.66%, black 16.66% 17.12%, transparent 17.12% 20%, black 20% 20.25%, transparent 20.25% 23.33%, black 23.33% 23.39%, transparent 23.39% 26.66%, black 26.66% 26.66%, transparent 26.66% 30%, black 30% 30%, transparent 30% 33.33%, black 33.33% 33.33%, transparent 33.33% 36.66%, black 36.66% 36.66%, transparent 36.66% 40%, black 40% 40%, transparent 40% 43.33%, black 43.33% 43.33%, transparent 43.33% 46.66%, black 46.66% 46.66%, transparent 46.66% 50%, black 50% 50%, transparent 50% 53.33%, black 53.33% 53.33%, transparent 53.33% 56.66%, black 56.66% 56.66%, transparent 56.66% 60%, black 60% 60%, transparent 60% 63.33%, black 63.33% 63.33%, transparent 63.33% 66.66%, black 66.66% 66.66%, transparent 66.66% 70%, black 70% 70%, transparent 70% 73.33%, black 73.33% 73.33%, transparent 73.33% 76.66%, black 76.66% 76.66%, transparent 76.66% 80%, black 80% 80%, transparent 80% 83.33%, black 83.33% 83.33%, transparent 83.33% 86.66%, black 86.66% 86.66%, transparent 86.66% 90%, black 90% 90%, transparent 90% 93.33%, black 93.33% 93.33%, transparent 93.33% 96.66%, black 96.66% 96.66%, transparent 96.66% 100%)`,
    `linear-gradient(
    0deg,
    black 0% 2.99%, transparent 2.99% 3.33%, black 3.33% 6.12%, transparent 6.12% 6.66%, black 6.66% 9.25%, transparent 9.25% 10%, black 10% 12.39%, transparent 12.39% 13.33%, black 13.33% 15.52%, transparent 15.52% 16.66%, black 16.66% 18.65%, transparent 18.65% 20%, black 20% 21.79%, transparent 21.79% 23.33%, black 23.33% 24.92%, transparent 24.92% 26.66%, black 26.66% 28.05%, transparent 28.05% 30%, black 30% 31.19%, transparent 31.19% 33.33%, black 33.33% 34.32%, transparent 34.32% 36.66%, black 36.66% 37.45%, transparent 37.45% 40%, black 40% 40.59%, transparent 40.59% 43.33%, black 43.33% 43.72%, transparent 43.72% 46.66%, black 46.66% 46.85%, transparent 46.85% 50%, black 50% 50%, transparent 50% 53.33%, black 53.33% 53.33%, transparent 53.33% 56.66%, black 56.66% 56.66%, transparent 56.66% 60%, black 60% 60%, transparent 60% 63.33%, black 63.33% 63.33%, transparent 63.33% 66.66%, black 66.66% 66.66%, transparent 66.66% 70%, black 70% 70%, transparent 70% 73.33%, black 73.33% 73.33%, transparent 73.33% 76.66%, black 76.66% 76.66%, transparent 76.66% 80%, black 80% 80%, transparent 80% 83.33%, black 83.33% 83.33%, transparent 83.33% 86.66%, black 86.66% 86.66%, transparent 86.66% 90%, black 90% 90%, transparent 90% 93.33%, black 93.33% 93.33%, transparent 93.33% 96.66%, black 96.66% 96.66%, transparent 96.66% 100%)`,
    `linear-gradient(
    0deg,
    black 0% 3.33%, transparent 3.33% 3.33%, black 3.33% 6.66%, transparent 6.66% 6.66%, black 6.66% 10%, transparent 10% 10%, black 10% 13.33%, transparent 13.33% 13.33%, black 13.33% 16.66%, transparent 16.66% 16.66%, black 16.66% 20%, transparent 20% 20%, black 20% 23.32%, transparent 23.32% 23.33%, black 23.33% 26.46%, transparent 26.46% 26.66%, black 26.66% 29.59%, transparent 29.59% 30%, black 30% 32.72%, transparent 32.72% 33.33%, black 33.33% 35.86%, transparent 35.86% 36.66%, black 36.66% 38.99%, transparent 38.99% 40%, black 40% 42.12%, transparent 42.12% 43.33%, black 43.33% 45.26%, transparent 45.26% 46.66%, black 46.66% 48.39%, transparent 48.39% 50%, black 50% 51.52%, transparent 51.52% 53.33%, black 53.33% 54.66%, transparent 54.66% 56.66%, black 56.66% 57.79%, transparent 57.79% 60%, black 60% 60.92%, transparent 60.92% 63.33%, black 63.33% 64.06%, transparent 64.06% 66.66%, black 66.66% 67.19%, transparent 67.19% 70%, black 70% 70.32%, transparent 70.32% 73.33%, black 73.33% 73.46%, transparent 73.46% 76.66%, black 76.66% 76.66%, transparent 76.66% 80%, black 80% 80%, transparent 80% 83.33%, black 83.33% 83.33%, transparent 83.33% 86.66%, black 86.66% 86.66%, transparent 86.66% 90%, black 90% 90%, transparent 90% 93.33%, black 93.33% 93.33%, transparent 93.33% 96.66%, black 96.66% 96.66%, transparent 96.66% 100%)`,
    `linear-gradient(
    0deg,
    black 0% 3.33%, transparent 3.33% 3.33%, black 3.33% 6.66%, transparent 6.66% 6.66%, black 6.66% 10%, transparent 10% 10%, black 10% 13.33%, transparent 13.33% 13.33%, black 13.33% 16.66%, transparent 16.66% 16.66%, black 16.66% 20%, transparent 20% 20%, black 20% 23.33%, transparent 23.33% 23.33%, black 23.33% 26.66%, transparent 26.66% 26.66%, black 26.66% 30%, transparent 30% 30%, black 30% 33.33%, transparent 33.33% 33.33%, black 33.33% 36.66%, transparent 36.66% 36.66%, black 36.66% 40%, transparent 40% 40%, black 40% 43.33%, transparent 43.33% 43.33%, black 43.33% 46.66%, transparent 46.66% 46.66%, black 46.66% 49.92%, transparent 49.92% 50%, black 50% 53.06%, transparent 53.06% 53.33%, black 53.33% 56.19%, transparent 56.19% 56.66%, black 56.66% 59.32%, transparent 59.32% 60%, black 60% 62.46%, transparent 62.46% 63.33%, black 63.33% 65.59%, transparent 65.59% 66.66%, black 66.66% 68.72%, transparent 68.72% 70%, black 70% 71.86%, transparent 71.86% 73.33%, black 73.33% 74.99%, transparent 74.99% 76.66%, black 76.66% 78.12%, transparent 78.12% 80%, black 80% 81.26%, transparent 81.26% 83.33%, black 83.33% 84.39%, transparent 84.39% 86.66%, black 86.66% 87.52%, transparent 87.52% 90%, black 90% 90.66%, transparent 90.66% 93.33%, black 93.33% 93.79%, transparent 93.79% 96.66%, black 96.66% 96.92%, transparent 96.92% 100%)`,
    `linear-gradient(
    0deg,
    black 0% 3.33%, transparent 3.33% 3.33%, black 3.33% 6.66%, transparent 6.66% 6.66%, black 6.66% 10%, transparent 10% 10%, black 10% 13.33%, transparent 13.33% 13.33%, black 13.33% 16.66%, transparent 16.66% 16.66%, black 16.66% 20%, transparent 20% 20%, black 20% 23.33%, transparent 23.33% 23.33%, black 23.33% 26.66%, transparent 26.66% 26.66%, black 26.66% 30%, transparent 30% 30%, black 30% 33.33%, transparent 33.33% 33.33%, black 33.33% 36.66%, transparent 36.66% 36.66%, black 36.66% 40%, transparent 40% 40%, black 40% 43.33%, transparent 43.33% 43.33%, black 43.33% 46.66%, transparent 46.66% 46.66%, black 46.66% 50%, transparent 50% 50%, black 50% 53.33%, transparent 53.33% 53.33%, black 53.33% 56.66%, transparent 56.66% 56.66%, black 56.66% 60%, transparent 60% 60%, black 60% 63.33%, transparent 63.33% 63.33%, black 63.33% 66.66%, transparent 66.66% 66.66%, black 66.66% 70%, transparent 70% 70%, black 70% 73.33%, transparent 73.33% 73.33%, black 73.33% 76.53%, transparent 76.53% 76.66%, black 76.66% 79.66%, transparent 79.66% 80%, black 80% 82.79%, transparent 82.79% 83.33%, black 83.33% 85.93%, transparent 85.93% 86.66%, black 86.66% 89.06%, transparent 89.06% 90%, black 90% 92.19%, transparent 92.19% 93.33%, black 93.33% 95.33%, transparent 95.33% 96.66%, black 96.66% 98.46%, transparent 98.46% 100%)`,
    `linear-gradient(
    0deg,
    black 0% 3.33%, transparent 3.33% 3.33%, black 3.33% 6.66%, transparent 6.66% 6.66%, black 6.66% 10%, transparent 10% 10%, black 10% 13.33%, transparent 13.33% 13.33%, black 13.33% 16.66%, transparent 16.66% 16.66%, black 16.66% 20%, transparent 20% 20%, black 20% 23.33%, transparent 23.33% 23.33%, black 23.33% 26.66%, transparent 26.66% 26.66%, black 26.66% 30%, transparent 30% 30%, black 30% 33.33%, transparent 33.33% 33.33%, black 33.33% 36.66%, transparent 36.66% 36.66%, black 36.66% 40%, transparent 40% 40%, black 40% 43.33%, transparent 43.33% 43.33%, black 43.33% 46.66%, transparent 46.66% 46.66%, black 46.66% 50%, transparent 50% 50%, black 50% 53.33%, transparent 53.33% 53.33%, black 53.33% 56.66%, transparent 56.66% 56.66%, black 56.66% 60%, transparent 60% 60%, black 60% 63.33%, transparent 63.33% 63.33%, black 63.33% 66.66%, transparent 66.66% 66.66%, black 66.66% 70%, transparent 70% 70%, black 70% 73.33%, transparent 73.33% 73.33%, black 73.33% 76.66%, transparent 76.66% 76.66%, black 76.66% 80%, transparent 80% 80%, black 80% 83.33%, transparent 83.33% 83.33%, black 83.33% 86.66%, transparent 86.66% 86.66%, black 86.66% 90%, transparent 90% 90%, black 90% 93.33%, transparent 93.33% 93.33%, black 93.33% 96.66%, transparent 96.66% 96.66%, black 96.66% 100%, transparent 100% 100%)`,
    `linear-gradient(
    0deg,
    black 0% 3.33%, transparent 3.33% 3.33%, black 3.33% 6.66%, transparent 6.66% 6.66%, black 6.66% 10%, transparent 10% 10%, black 10% 13.33%, transparent 13.33% 13.33%, black 13.33% 16.66%, transparent 16.66% 16.66%, black 16.66% 20%, transparent 20% 20%, black 20% 23.33%, transparent 23.33% 23.33%, black 23.33% 26.66%, transparent 26.66% 26.66%, black 26.66% 30%, transparent 30% 30%, black 30% 33.33%, transparent 33.33% 33.33%, black 33.33% 36.66%, transparent 36.66% 36.66%, black 36.66% 40%, transparent 40% 40%, black 40% 43.33%, transparent 43.33% 43.33%, black 43.33% 46.66%, transparent 46.66% 46.66%, black 46.66% 50%, transparent 50% 50%, black 50% 53.33%, transparent 53.33% 53.33%, black 53.33% 56.66%, transparent 56.66% 56.66%, black 56.66% 60%, transparent 60% 60%, black 60% 63.33%, transparent 63.33% 63.33%, black 63.33% 66.66%, transparent 66.66% 66.66%, black 66.66% 70%, transparent 70% 70%, black 70% 73.33%, transparent 73.33% 73.33%, black 73.33% 76.66%, transparent 76.66% 76.66%, black 76.66% 80%, transparent 80% 80%, black 80% 83.33%, transparent 83.33% 83.33%, black 83.33% 86.66%, transparent 86.66% 86.66%, black 86.66% 90%, transparent 90% 90%, black 90% 93.33%, transparent 93.33% 93.33%, black 93.33% 96.66%, transparent 96.66% 96.66%, black 96.66% 100%, transparent 100% 100%)`,
  ];

  for (let index = 0; index < totalImage - 1; index++) {
    maskArray.forEach((y) => {
      timeline.to(backgroundImages[index], {
        "--mask-image": y,
        duration: 1,
      });
    });

    timeline.to(
      backgroundImages[index],
      {
        transform: "scale(1)",
        duration: (maskArray.length - 1) * 1,
      },
      "-=100%"
    );

    timeline.fromTo(
      posterImages[index],
      { "--mask-clip-path": "inset(100% 0 0 0)" },
      {
        "--mask-clip-path": "inset(0% 0 0 0)",
        transform: "scale(1.1)",
        duration: (maskArray.length - 1) * 1,
      },
      "-=100%"
    );

    timeline.to(
      backgroundImages[index],
      {
        onStart: () => {
          const newProgress = progressState.value + 1;
          progressState.value = newProgress;
        },
        onReverseComplete: () => {
          const newProgress = progressState.value - 1;
          progressState.value = newProgress;
        },
        duration: 0.1,
      },
      `-=${((maskArray.length - 1) * 1) / 2}`
    );
  }

  gsap.fromTo(
    ".bg-wrapper .image-0",
    {
      yPercent: -30,
      transform: "scale(1.1)",
    },
    {
      yPercent: 0,
      transform: "scale(1)",
      ease: "none",
      scrollTrigger: {
        trigger: ".scrolling-wrapper",
        start: "top bottom",
        end: "center center",
        scrub: true,
        invalidateOnRefresh: true,
      },
    }
  );

  gsap.fromTo(
    `.bg-wrapper .image:last-child`,
    {
      yPercent: 0,
    },
    {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: timeline.scrollTrigger?.spacer,
        start: `100% bottom`,
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    }
  );
});
