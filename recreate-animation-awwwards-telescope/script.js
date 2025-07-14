document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(SplitText);
  const titles = document.querySelectorAll(".text-intro h1");
  const images = gsap.utils.toArray(".card-img");
  const logoSplit = SplitText.create(".logo", {
    type: "chars,words",
    charsClass: "char",
    autoSplit: true,
  });

  gsap.set(titles, { y: 100, opacity: 0 });
  gsap.set(images, { z: -500, opacity: 0 });

  const timeline = gsap.timeline();

  timeline
    .to(logoSplit.chars, {
      y: 0,
      duration: 1,
      ease: "power3.inOut",
      stagger: 0.05,
    })
    .to(titles[0], {
      duration: 1,
      y: 0,
      ease: "power1.out",
      opacity: 1,
    })
    .to(
      titles[1],
      {
        duration: 1,
        y: 0,
        ease: "power1.out",
        opacity: 1,
      },
      "<=0.5"
    )
    .to(images, {
      // delay: 0.5,
      duration: 1,
      opacity: 1,
      ease: "power1.out",
      stagger: 0.2,
      z: 0,
      onComplete: () => {
        images.forEach((img) => {
          const hover = img.querySelector(".hover");
          const image = img.querySelector("img");

          console.log(hover, image);

          let targetX = 0,
            targetY = 0;
          let currentX = 0,
            currentY = 0;

          // Saat mouse bergerak DI DALAM wrapper
          hover.addEventListener("mousemove", (e) => {
            const rect = hover.getBoundingClientRect();
            const percentX = (e.clientX - rect.left) / rect.width - 0.5;
            const percentY = (e.clientY - rect.top) / rect.height - 0.5;

            targetX = percentX * 40;
            targetY = percentY * 40;
          });

          // Saat mouse keluar dari wrapper
          hover.addEventListener("mouseleave", () => {
            // Reset target ke tengah (0,0)
            targetX = 0;
            targetY = 0;
          });

          // Loop animasi
          gsap.ticker.add(() => {
            // Transisi halus menggunakan LERP
            currentX += (targetX - currentX) * 0.1;
            currentY += (targetY - currentY) * 0.1;

            gsap.set(image, {
              x: currentX,
              y: currentY,
              ease: "power4.inOut",
            });
          });
        });
      },
    });
});
