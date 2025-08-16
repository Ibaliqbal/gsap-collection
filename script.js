const list_animations = [
  {
    title: "Page Reveal Block",
    href: "/page-reveal-block/index.html",
    preview: "/assets/images/demo/page-reveal-block.png",
    baseColor: "baseColorPageRevealBlock",
  },
  {
    title: "Scroll Image Gallery",
    href: "/scroll-image-gallery/index.html",
    preview: "/assets/images/demo/scroll-image-gallery.png",
    baseColor: "baseColorScrollImageGallery",
  },
  {
    title: "Menu Animation Elementis Awwward",
    href: "/recreate-menu-awwwards-elementis/index.html",
    preview: "/assets/images/demo/menu-elementis.png",
    baseColor: "baseColorElementis",
  },
  {
    title: "Page Reveal Telescope Awwward",
    href: "/recreate-animation-awwwards-telescope/index.html",
    preview: "/assets/images/demo/reveal-telescope.png",
    baseColor: "baseColorTelescope",
  },
  {
    title: "Hover Animation Bindery Awwward",
    href: "/recreate-animation-awwwards-bindery/index.html",
    preview: "/assets/images/demo/hover-bindery.png",
    baseColor: "baseColorBindery",
  },
  {
    title: "Hover Animation Elementis Awwward",
    href: "/recreate-hover-animation-awwwards-elementis/index.html",
    preview: "/assets/images/demo/hover-elementis.png",
    baseColor: "baseColorElementis",
  },
  {
    title: "Scroll Animation Elementis Awwward",
    href: "/recreate-scroll-animation-elementis/index.html",
    preview: "/assets/images/demo/scroll-elementis.png",
    baseColor: "baseColorElementis",
  },
  {
    title: "Scroll Animation Vooban Awwward",
    href: "/recreate-animation-awwward-vooban/index.html",
    preview: "/assets/images/demo/scroll-vooban.png",
    baseColor: "baseColorVooban",
  },
  {
    title: "Scroll Animation TUX",
    href: "/split-vignette/index.html",
    preview: "/assets/images/demo/split-vignette.png",
    baseColor: "primaryColor",
  },
  {
    title: "Layout Transition Faint Film Awwward",
    href: "/layout-transition-faintfilm/index.html",
    preview: "/assets/images/demo/layout-faintfilm.png",
    baseColor: "primaryColor",
  },
  {
    title: "Scroll Slider Faint Film Awwward",
    href: "/scroll-slider-faintfilm/index.html",
    preview: "/assets/images/demo/scroll-slider-faintfilm.png",
    baseColor: "primaryColor",
  },
  {
    title: "Scroll Animation Akaru Awwward",
    href: "/scroll-animation-akaru/index.html",
    preview: "/assets/images/demo/scroll-akaru.png",
    baseColor: "primaryColor",
  },
  {
    title: "Scroll Text Animation",
    href: "/scroll-text-animation/index.html",
    preview: "/assets/images/demo/scroll-text.png",
    baseColor: "baseColorScrollText",
  },
  {
    title: "Scroll Animation Cine Casero Awwward",
    href: "/scroll-animation-cinecasero/index.html",
    preview: "/assets/images/demo/scroll-cinecasero.png",
    baseColor: "baseColorScrollText",
  },
  {
    title: "Scroll Text Animation Boring Awwward",
    href: "/scroll-text-boring-awwward/index.html",
    preview: "/assets/images/demo/scroll-text-boring.png",
    baseColor: "baseColorScrollText",
  },
  {
    title: "Slide Animation Observer",
    href: "/slide-animation-observer/index.html",
    preview: "/assets/images/demo/slide-animation-observer.png",
    baseColor: "baseColorSlideObserver",
  },
  {
    title: "Horizontal Scroll Animation Tomoya Okada",
    href: "/gallery-horizontal-scroll/index.html",
    preview: "/assets/images/demo/horizontal-scroll-tomoyaokada.png",
    baseColor: "baseColorTomoyaokada",
  },
];

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

async function loadFont(target, config) {
  await document.fonts.ready;
  return SplitText.create(target, config);
}

document.addEventListener("DOMContentLoaded", async () => {
  gsap.registerPlugin(
    ScrollTrigger,
    SplitText,
    CustomEase,
    CustomBounce,
    Observer
  );

  CustomEase.create("hop", "0, 0.9, 0, 1");

  let isDoneRenderAnimation = false,
    isAnimating = false,
    lastIndexImage = 0;

  const viewSiteTemplate = `
        <p>Visit Site</p>
        <svg
          width="8"
          height="8"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="icon"
          data-v-840a93c7=""
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.9966 8.5308C11.9966 8.84819 11.7334 9.11139 11.416 9.11139C11.0986 9.11139 10.8354 8.84819 10.8354 8.5308V1.98239L0.989067 11.8287C0.872949 11.9448 0.725867 11.999 0.578784 11.999C0.431702 11.999 0.284619 11.9448 0.168502 11.8287C-0.0559931 11.6042 -0.0559931 11.2326 0.168502 11.0082L10.0155 1.16118H3.46578C3.14839 1.16118 2.88519 0.897979 2.88519 0.58059C2.88519 0.263201 3.14839 0 3.46578 0H11.416C11.5014 0 11.5828 0.0190504 11.6563 0.0530812C11.7183 0.0808598 11.7763 0.119992 11.8267 0.170477C11.8841 0.227843 11.9268 0.294813 11.9549 0.366478C11.9817 0.432929 11.9966 0.505232 11.9966 0.58059V8.5308Z"
            fill="currentColor"
          ></path>
        </svg>`;

  const container = {
      left: document.querySelector(".left-container"),
      right: document.querySelector(".right-container"),
    },
    preload = {
      text: document.querySelectorAll(".text-preload span"),
      number: document.querySelector(".number-preload span"),
      divider: document.querySelector(".divider"),
      blocks: document.querySelectorAll(".preload-overlay .block"),
    };

  const splitDescription = await loadFont(".description p", {
      type: "lines",
      linesClass: "line",
      aria: "hidden",
      mask: "lines",
    }),
    splitTitleContent = await loadFont(".title-content", {
      type: "chars",
      aria: "hidden",
    });

  const baseCursor = document.querySelector(".base-cursor"),
    wrapperTitleProject = container.left.querySelector(
      ".wrapper-project .wrapper-title-project"
    ),
    numberProject = container.left.querySelector(
      ".wrapper-project .number-project-wrapper .number-project"
    ),
    totalProject = container.left.querySelector(
      ".wrapper-project .number-project-wrapper .total-project"
    ),
    slashNumberProject = container.left.querySelector(
      ".wrapper-project .number-project-wrapper .slash-number"
    ),
    images = container.right.querySelector(".images"),
    footer = document.querySelector(".footer");

  totalProject.textContent = String(list_animations.length).padStart(2, "0");

  list_animations.forEach(async (item, index) => {
    const titleElement = document.createElement("h1");
    titleElement.className = "title-project";
    titleElement.textContent = item.title;
    wrapperTitleProject.appendChild(titleElement);

    const numberElement = document.createElement("span");
    numberElement.textContent = String(index + 1).padStart(2, "0");
    numberProject.appendChild(numberElement);

    const imageWrapper = document.createElement("a");
    imageWrapper.href = item.href;
    imageWrapper.target = "_blank";
    imageWrapper.rel = "noopener noreferrer";
    imageWrapper.className = "image-wrapper";
    imageWrapper.style.zIndex = index === 0 ? 0 : -index;
    const imageElement = document.createElement("img");
    imageElement.src = item.preview;
    imageElement.alt = item.title;
    imageWrapper.appendChild(imageElement);
    images.appendChild(imageWrapper);
  });

  const imagesProject = gsap.utils.toArray(".image-wrapper"),
    totalImage = imagesProject.length,
    numbersProject = gsap.utils.toArray(".number-project span"),
    titlesProject = gsap.utils.toArray(".title-project");

  gsap.set(
    imagesProject.filter((_, index) => index !== 0),
    {
      yPercent: 100,
    }
  );

  gsap.set([footer, slashNumberProject], {
    opacity: 0,
    willChange: "opacity",
  });

  gsap.set(container.right, {
    clipPath: "inset(100% 0 0 0)",
    willChange: "clip-path",
  });

  gsap.set(container.right.querySelector(".images"), {
    scale: 1.25,
    willChange: "transform",
  });

  gsap.set(container.left.querySelector(".infinite-text-wrapper"), {
    scale: 0,
  });

  gsap.set(
    [titlesProject, numbersProject, splitDescription.lines, totalProject],
    {
      yPercent: 150,
    }
  );

  gsap.set(splitTitleContent.chars, {
    scale: 0,
    transformOrigin: (i) => (i % 2 === 0 ? "bottom" : "top"),
    willChange: "transform",
  });

  const donePreload = createReactiveValue(false, (newVal, _) => {
    if (newVal) {
      const timelineFirtsRender = gsap
        .timeline({
          defaults: {
            ease: "power4.inOut",
            duration: 1.25,
          },
          onComplete: () => {
            isDoneRenderAnimation = true;
            timelineFirtsRender.kill();
            splitTitleContent && splitTitleContent.revert();
            splitDescription && splitDescription.revert();
          },
        })
        .to(container.right, {
          clipPath: "inset(0% 0 0 0)",
        })
        .to(
          ".images",
          {
            scale: 1,
            ease: "expo.out",
            duration: 1,
          },
          "-=0.75"
        )
        .to(
          container.left.querySelector(".infinite-text-wrapper"),
          {
            scale: 1,
          },
          0
        )
        .to(
          [
            ".title-project:first-child, .number-project span:first-child",
            totalProject,
          ],
          {
            yPercent: 0,
          },
          0.5
        )
        .to(
          [footer, slashNumberProject],
          {
            opacity: 1,
          },
          "<"
        )
        .to(
          splitDescription.lines,
          {
            yPercent: 0,
            stagger: {
              each: 0.25,
              from: "random",
            },
          },
          0
        )
        .to(
          splitTitleContent.chars,
          {
            scale: 1,
            stagger: 0.15,
            ease: CustomBounce.create("titleBounce", {
              strength: 0.5,
              squash: 1,
            }),
          },
          0
        );
    }
  });

  const timelinePreloader = gsap
    .timeline({
      defaults: {
        ease: "power4.inOut",
        duration: 1.25,
      },
      onComplete: () => {
        donePreload.value = true;
        timelinePreloader.kill();
        document.querySelector(".preload-overlay").remove();
      },
    })
    .to(preload.number, {
      textContent: 100,
      snap: {
        textContent: [
          0, 5, 7, 12, 18, 21, 28, 35, 39, 40, 47, 55, 62, 65, 78, 83, 89, 91,
          95, 99, 100,
        ],
      },
      duration: 5,
      delay: 0.5,
    })
    .to(preload.number, {
      scale: 0,
    })
    .to(preload.text, {
      y: 0,
      stagger: 0.2,
    })
    .to(preload.divider, {
      scaleY: 1,
      duration: 1,
    })
    .to(preload.divider, {
      opacity: 0,
    })
    .to(preload.text, {
      yPercent: -150,
      stagger: 0.2,
    })
    .to(preload.blocks, {
      clipPath: "inset(0 0 100% 0)",
      stagger: 0.075,
    });

  document.addEventListener("mousemove", (e) => {
    gsap.to(baseCursor, {
      x: e.clientX - baseCursor.offsetWidth / 2,
      y: e.clientY + baseCursor.offsetHeight / 2,
      duration: 0.5,
      ease: "power2.out",
    });
  });

  container.right
    .querySelector(".images")
    .addEventListener("mouseenter", () => {
      const viewSite = baseCursor.querySelector(".view-site");
      if (viewSite) return;
      const viewSiteEl = document.createElement("div");
      viewSiteEl.className = "view-site";
      viewSiteEl.innerHTML = viewSiteTemplate;
      baseCursor.appendChild(viewSiteEl);

      gsap.fromTo(
        viewSiteEl,
        {
          clipPath: "inset(0 100% 0 0)",
        },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.5,
          willChange: "clip-path",
          ease: "power4.inOut",
        }
      );
    });

  container.right
    .querySelector(".images")
    .addEventListener("mouseleave", () => {
      if (!donePreload) return;
      const viewSiteEl = baseCursor.querySelector(".view-site");
      if (viewSiteEl) {
        gsap.to(viewSiteEl, {
          clipPath: "inset(0 100% 0 0)",
          duration: 0.5,
          willChange: "clip-path",
          ease: "power4.inOut",
          onComplete: () => {
            viewSiteEl.remove();
          },
        });
      }
    });

  function goToSection(index, direction) {
    isAnimating = true;

    const isGoDown = direction === 1,
      dFactor = isGoDown ? 1 : -1;

    const timeline = gsap.timeline({
      onComplete: () => {
        lastIndexImage = index;
        isAnimating = false;
      },
      defaults: {
        duration: 1.25,
        ease: "power4.inOut",
      },
    });

    const currentImg = imagesProject[index].querySelector("img");

    gsap.set(imagesProject[index], {
      yPercent: dFactor * 100,
    });

    gsap.set(currentImg, {
      scale: 1.25,
      willChange: "transform",
    });

    gsap.set([numbersProject[index], titlesProject[index]], {
      yPercent: dFactor * 150,
    });

    timeline
      .to(imagesProject[lastIndexImage], {
        yPercent: -100 * dFactor,
      })
      .to(
        imagesProject[index],
        {
          yPercent: 0,
        },
        0
      )
      .to(
        titlesProject[lastIndexImage],
        {
          yPercent: -150 * dFactor,
        },
        0
      )
      .to(
        titlesProject[index],
        {
          yPercent: 0,
        },
        0
      )
      .to(
        numbersProject[lastIndexImage],
        {
          yPercent: -150 * dFactor,
        },
        0
      )
      .to(
        numbersProject[index],
        {
          yPercent: 0,
        },
        0
      )
      .to(currentImg, {
        scale: 1,
        ease: "hop",
        duration: 1,
      });
  }

  Observer.create({
    type: "wheel,touch",
    wheelSpeed: -1,
    onUp: () =>
      isDoneRenderAnimation &&
      !isAnimating &&
      goToSection((lastIndexImage + 1) % totalImage, 1),
    onDown: () =>
      isDoneRenderAnimation &&
      !isAnimating &&
      goToSection((lastIndexImage - 1 + totalImage) % totalImage, -1),
  });
});
