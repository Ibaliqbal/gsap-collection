async function loadFont(target, config) {
  await document.fonts.ready;
  return SplitText.create(target, config);
}
document.addEventListener("DOMContentLoaded", async () => {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  const mediaQuery = window.matchMedia("(max-width: 768px)");

  const lenis = new Lenis();

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
  const wrapperText = document.querySelector(".wrapper-text");
  const end = wrapperText.offsetWidth - window.innerWidth + 2.5 * 16;
  const textSplit = await loadFont(".text", {
    type: "chars",
    charsClass: "char-text",
  });

  textSplit.chars.forEach((char) => {
    gsap.set(char, {
      rotate: "random(-30, 30)",
      rotateX: "180deg",
    });
  });

  const timelineBody = gsap
    .timeline({
      paused: true,
      onComplete: () => {
        timelineBody.kill();
      },
      defaults: {
        ease: "power2.inOut",
        duration: 0.75,
      },
    })
    .to("body", {
      backgroundColor: "black",
      color: "white",
    });

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".scrolling",
      start: "top top",
      end: `+=${end}`,
      pin: true,
      scrub: true,
      onEnter: () => {
        timelineBody.play();
      },
      onLeave: () => {
        timelineBody.reverse();
      },
      onEnterBack: () => {
        timelineBody.play();
      },
      onLeaveBack: () => {
        timelineBody.reverse();
      },
    },
  });

  timeline.to(wrapperText, {
    x: `-${end}px`,
    top: 0,
    bottom: "auto",
  });

  gsap.to(textSplit.chars, {
    rotate: 0,
    rotateX: 0,
    stagger: {
      each: mediaQuery.matches ? 0.25 : 0.075,
    },
    scrollTrigger: {
      trigger: ".scrolling",
      start: mediaQuery.matches ? "top top" : "top top+=200",
      end: `+=${end - wrapperText.offsetWidth / window.innerWidth / 2}`,
      scrub: true,
    },
  });
});
