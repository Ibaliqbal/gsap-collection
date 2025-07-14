document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

  const splitTextOutro = SplitText.create(".outro h1", {
      type: "lines, words, chars",
      charsClass: "char",
      autoSplit: true,
    }),
    splitTextIntro = SplitText.create(".intro h1", {
      type: "lines, words, chars",
      charsClass: "char",
      autoSplit: true,
    });

  const cards = gsap.utils.toArray(".card");

  gsap.to(splitTextIntro.chars, {
    y: 0,
    stagger: 0.05,
    ease: "power3.out",
    duration: 1,
  });

  let smoother = ScrollSmoother.create({
    smooth: 2,
    effects: true,
    smoothTouch: 0.1,
    // normalizeScroll: true,
  });

  smoother.effects(".card", {
    lag: 0.8,
    speed: 1,
  });

  // smoother.kill();

  ScrollTrigger.create({
    tigger: document.body,
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => {
      const progress = self.progress;
      gsap.to(".progress-scroll", {
        scaleY: progress,
        ease: "none",
      });
    },
  });

  cards.forEach((card) => {
    gsap.to(card, {
      yPercent: -100,
      ease: "none",
      scrollTrigger: {
        trigger: card,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  gsap.to(splitTextOutro.chars, {
    y: 0,
    stagger: 0.05,
    ease: "power3.out",
    duration: 1,
    scrollTrigger: {
      trigger: ".outro",
      start: "top center",
      end: "bottom bottom",
      scrub: true,
    },
  });

  ScrollTrigger.create({
    trigger: ".gallery-title",
    start: "top top",
    end: "bottom bottom",
    pin: true,
    endTrigger: ".gallery",
  });
});
