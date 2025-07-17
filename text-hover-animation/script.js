document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(SplitText, CustomEase);
  CustomEase.create("customEase", "0.65, 0.05, 0, 1");
  const text = document.querySelector(".text");
  const topText = SplitText.create(".top", {
    type: "chars",
    autoSplit: true,
  });

  const bottomText = SplitText.create(".bottom", {
    type: "chars",
    autoSplit: true,
  });

  gsap.set(bottomText.chars, { y: "100%" });

  const tl = gsap.timeline({
    paused: true,
    defaults: {
      ease: "customEase",
      duration: 0.75,
    },
  });

  tl.to(topText.chars, {
    y: "-100%",
    stagger: 0.05,
  }).to(
    bottomText.chars,
    {
      y: 0,
      stagger: 0.05,
    },
    "<"
  );

  text.addEventListener("mouseenter", () => {
    tl.play();
  });

  text.addEventListener("mouseleave", () => {
    tl.reverse();
  });
});
