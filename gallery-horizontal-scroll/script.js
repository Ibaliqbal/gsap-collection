document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);
  const lenis = new Lenis();

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  const galleryItems = gsap.utils.toArray(".gallery-item");
  const imageContent = document.querySelector(".wrapper-image img");
  const containerHorizontal = document.querySelector(".list-gallery");

  const calculateXPercent = 50 + window.innerWidth / 50;

  const tweenContainer = gsap.to(containerHorizontal, {
    xPercent: -calculateXPercent,
    ease: "none",
    scrollTrigger: {
      trigger: ".scrolling",
      start: "top top",
      end: "+=2000",
      scrub: 1,
      pin: true,
      invalidateOnRefresh: true,
    },
  });

  galleryItems.forEach((item) => {
    ScrollTrigger.create({
      trigger: item,
      start: "left center",
      end: "right center",
      containerAnimation: tweenContainer,
      onEnter: () => {
        const imageSrc = item.querySelector("img").getAttribute("src");
        imageContent.setAttribute("src", imageSrc);
      },
      onEnterBack: () => {
        const imageSrc = item.querySelector("img").getAttribute("src");
        imageContent.setAttribute("src", imageSrc);
      },
      invalidateOnRefresh: true,
    });
  });
});
