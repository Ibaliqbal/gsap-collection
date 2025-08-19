document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(Observer);
  const gallery = document.querySelector(".wrapper");
  const container = document.querySelector(".container");

  let startX = (window.innerWidth - gallery.offsetWidth) / 2,
    startY = (window.innerHeight - gallery.offsetHeight) / 2,
    isDoneCentredAnimation = false;

  gsap.to(gallery, {
    x: startX,
    y: startY,
    duration: 4,
    ease: "power4.inOut",
    onComplete: () => {
      isDoneCentredAnimation = true;
    },
  });

  const yQuick = gsap.quickTo(gallery, "y", {
      ease: "sine",
      duration: 1,
    }),
    xQuick = gsap.quickTo(gallery, "x", {
      ease: "sine",
      duration: 1,
    });

  const maxX = -(gallery.offsetWidth - window.innerWidth);
  const maxY = -(gallery.offsetHeight - window.innerHeight);

  let xTrack = startX,
    yTrack = startY;

  Observer.create({
    type: "pointer,touch",
    onChange: (self) => {
      function runAnimation() {
        xTrack += self.deltaX * 1.5;
        yTrack += self.deltaY * 1.5;

        xTrack = gsap.utils.clamp(maxX, 0, xTrack);
        yTrack = gsap.utils.clamp(maxY, 0, yTrack);

        yQuick(yTrack);
        xQuick(xTrack);
      }

      isDoneCentredAnimation && runAnimation();
    },
    onPress: () => {
      container.classList.add("dragging");
    },
    onRelease: () => {
      container.classList.remove("dragging");
    },
    tolerance: 10,
  });

  document.addEventListener("resize", () => {
    startX = (window.innerWidth - gallery.offsetWidth) / 2;
    startY = (window.innerHeight - gallery.offsetHeight) / 2;

    gsap.set(gallery, {
      x: startX,
      y: startY,
    });
  });
});
