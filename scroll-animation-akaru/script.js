document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis();

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  const galleryItemsWrapper = document.querySelectorAll(
    ".gallery-item-wrapper"
  );
  const galleryItems = document.querySelectorAll(".gallery-item");
  const galleryImageContainers = document.querySelectorAll(
    ".gallery-item-image"
  );
  const galleryImageInner = document.querySelectorAll(".gallery-image-inner");

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".gallery",
      start: "top top",
      end: `+=${galleryItemsWrapper.length * 100}%`,
      pin: true,
      scrub: true,
    },
  });

  const configGallerySlider = [
    {
      elInner: {
        from: {
          x: "0%",
        },
        to: {
          x: "100%",
        },
      },
      el: {
        from: {
          x: "0%",
        },
        to: {
          x: "-100%",
        },
      },
      image: {
        from: {
          transformOrigin: "bottom 100%",
          x: "-60%",
          scale: 1,
        },
        to: {
          transformOrigin: "bottom 100%",
          x: "-150%",
          scale: 0.8,
        },
      },
      imageInner: {
        from: {
          transformOrigin: "bottom 100%",
          x: "-60%",
          scale: 1,
        },
        to: {
          transformOrigin: "bottom 100%",
          x: "-100%",
          scale: 0.8,
        },
      },
    },
    {
      elInner: {
        from: {
          x: "-80%",
        },
        to: {
          x: "0%",
        },
      },
      el: {
        from: {
          x: "80%",
        },
        to: {
          x: "0%",
        },
      },
      image: {
        from: {
          transformOrigin: "bottom 100%",
          x: "-15%",
          scale: 0.45,
        },
        to: {
          transformOrigin: "bottom 100%",
          x: "-60%",
          scale: 1,
        },
      },
    },
    {
      elInner: {
        from: {
          x: "-95%",
        },
        to: {
          x: "-80%",
        },
      },
      el: {
        from: {
          x: "95%",
        },
        to: {
          x: "80%",
        },
      },
      image: {
        from: {
          transformOrigin: "bottom 100%",
          x: 0,
          scale: 0.15,
        },
        to: {
          transformOrigin: "bottom 100%",
          x: "-15%",
          scale: 0.45,
        },
      },
    },
    {
      elInner: {
        from: {
          x: "-100%",
        },
        to: {
          x: "-95%",
        },
      },
      el: {
        from: {
          x: "100%",
        },
        to: {
          x: "95%",
        },
      },
      image: {
        from: {
          transformOrigin: "bottom 100%",
          scale: 0,
        },
        to: {
          transformOrigin: "bottom 100%",
          scale: 0.15,
        },
      },
    },
  ];

  const duration = 0.5;
  let delayPerTransition = 0;

  for (let j = 0; j < galleryItemsWrapper.length - 1; j++) {
    let configIndex = 0;

    for (let N = 0; N < galleryItemsWrapper.length; N++) {
      const targetIndex = N + j;

      if (
        targetIndex >= galleryItemsWrapper.length ||
        configIndex >= configGallerySlider.length
      ) {
        continue;
      }

      const config = configGallerySlider[configIndex];

      tl.fromTo(
        galleryItems[targetIndex],
        config.elInner.from,
        {
          ...config.elInner.to,
          duration,
          ease: "power1.inOut",
        },
        delayPerTransition
      );

      tl.fromTo(
        galleryItemsWrapper[targetIndex],
        config.el.from,
        {
          ...config.el.to,
          duration,
          ease: "power1.inOut",
        },
        delayPerTransition
      );

      tl.fromTo(
        galleryImageInner[targetIndex],
        {
          transformOrigin: "center center",
          scale: 2 - config.image.from.scale,
        },
        {
          scale: 2 - config.image.to.scale,
          duration,
          ease: "power1.inOut",
        },
        delayPerTransition
      );
      if (
        targetIndex === galleryItemsWrapper.length - 1 &&
        j === galleryItemsWrapper.length - 3
      ) {
        tl.fromTo(
          galleryImageContainers[targetIndex],
          {
            ...config.image.from,
            x: 0,
          },
          {
            ...config.image.to,
            scale: 0.6,
            x: 0,
            duration,
            ease: "power1.inOut",
          },
          delayPerTransition
        );
      } else if (
        targetIndex === galleryItemsWrapper.length - 1 &&
        j === galleryItemsWrapper.length - 2
      ) {
        tl.fromTo(
          galleryImageContainers[targetIndex],
          {
            ...config.image.from,
            x: 0,
            scale: 0.6,
          },
          {
            ...config.image.to,
            x: "-60%",
            duration,
            ease: "power1.inOut",
          },
          delayPerTransition
        );
      } else {
        tl.fromTo(
          galleryImageContainers[targetIndex],
          config.image.from,
          {
            ...config.image.to,
            duration,
            ease: "power1.inOut",
          },
          delayPerTransition
        );
      }

      configIndex++;
    }

    delayPerTransition += 0.5;
  }
});
