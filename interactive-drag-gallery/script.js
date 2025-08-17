document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(Observer);
  const gallery = document.querySelector(".wrapper");
  const container = document.querySelector(".container");

  const startX = (window.innerWidth - gallery.offsetWidth) / 2,
    startY = (window.innerHeight - gallery.offsetHeight) / 2;

  gsap.set(gallery, {
    x: startX,
    y: startY,
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
      xTrack += self.deltaX * 2.5;
      yTrack += self.deltaY * 2.5;

      xTrack = gsap.utils.clamp(maxX, 0, xTrack);
      yTrack = gsap.utils.clamp(maxY, 0, yTrack);

      yQuick(yTrack);
      xQuick(xTrack);
    },
    onPress: () => {
      container.classList.add("active");
    },
    onRelease: () => {
      container.classList.remove("active");
    },
    tolerance: 10,
  });
});
