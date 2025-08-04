const list_animations = [
  {
    title: "Page Reveal Block",
    href: "/page-reveal-block/index.html",
    preview: "/assets/images/demo/page-reveal-block.png",
    baseColor: "baseColorPageRevealBlock",
  },
  {
    title: "Text Hover Animation",
    href: "/text-hover-animation/index.html",
    preview: "/assets/images/demo/text-hover.png",
    baseColor: "baseColorTextHoverDestination",
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
    title: "Layout Transition Faint Film",
    href: "/layout-transition-faintfilm/index.html",
    preview: "/assets/images/demo/layout-faintfilm.png",
    baseColor: "primaryColor",
  },
  {
    title: "Scroll Slider Faint Film",
    href: "/scroll-slider-faintfilm/index.html",
    preview: "/assets/images/demo/scroll-slider-faintfilm.png",
    baseColor: "primaryColor",
  },
];

async function loadFont(target, config) {
  await document.fonts.ready;
  return SplitText.create(target, config);
}

function initLenis(lenis) {
  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
}

function renderListAnimations(container, lists) {
  lists.forEach((list, index) => {
    const animationContent = `
      <li class="animation not-done" data-navigation="${
        list.href
      }" data-preview="${list.preview}">
        <div class="animation-content">
          <span class="number">
            ${index + 1 < 10 ? `0${index + 1}` : index + 1}
          </span>
          <div class="wrapper-title">
            <h3 class="title">${list.title
              .split(" ")
              .map((word) =>
                word
                  .split("")
                  .map((char) =>
                    char.toUpperCase() === "O"
                      ? `<span class="highlight-char">${char}</span>`
                      : char
                  )
                  .join("")
              )
              .join(" ")}</h3>
          </div>
          <svg
            width="16"
            height="16"
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
          </svg>
        </div>
        <div class="divider"></div>
      </li>
    `;

    container.insertAdjacentHTML("beforeend", animationContent);
  });
}

function showPreview(container, src, alt, isBiggerThen) {
  const card = document.createElement("div");
  card.className = "card-preview";
  card.style.transform = "scale(1.25)";
  card.style.clipPath = isBiggerThen
    ? "inset(0% 0% 100% 0%)"
    : "inset(100% 0 0 0)";
  card.style.zIndex = container.childElementCount + 1;
  const image = document.createElement("img");
  image.src = src;
  image.alt = alt;

  card.appendChild(image);
  container.appendChild(card);

  gsap.to(card, {
    transform: "scale(1)",
    clipPath: "inset(0% 0% 0% 0%)",
    duration: 0.5,
    ease: "power1.out",
  });
}

function removeExtraImage(container) {
  while (container.childElementCount > 6) {
    container.firstElementChild.remove();
  }
}

function navigationTo(href, baseColorDestination) {
  const timeline = gsap.timeline({
    defaults: { duration: 1, ease: "power3.out" },
    onComplete: () => {
      window.location.href = href;
    },
  });
  timeline
    .to("body", {
      opacity: 0,
    })
    .to(".logo", {
      opacity: 0,
      willChange: "opacity",
    })
    .to("body", {
      backgroundColor: baseColorDestination,
    });
}

function handelResponsiveMobileFunction(mediaQuery, callback) {
  if (mediaQuery.mathces) return;
  callback();
}

document.addEventListener("DOMContentLoaded", async () => {
  gsap.registerPlugin(ScrollTrigger, SplitText, Flip, CustomBounce, CustomEase);
  CustomBounce.create("highlightBounce", {
    strength: 0.8,
    squash: 3,
  });
  CustomEase.create("hoverEase", "0.65, 0.05, 0, 1");
  CustomEase.create("easeInOutQuart", ".645, .045, .355, 1");
  const lenis = new Lenis();

  initLenis(lenis);

  lenis.stop();

  const rootStyle = getComputedStyle(document.documentElement);
  const rootVariableCss = {
    primaryColor: rootStyle.getPropertyValue("--primary-color"), // #eaeaea
    secondaryColor: rootStyle.getPropertyValue("--secondary-color"), // #131313
    baseColorElementis: rootStyle.getPropertyValue("--base-elementis-color"), // #2b3530
    baseColorTextHoverDestination: rootStyle.getPropertyValue(
      "--base-text-hover-color"
    ), // #eaeaea
    baseColorScrollImageGallery: rootStyle.getPropertyValue(
      "--base-scroll-image-gallery-color"
    ), // #f0f0f0
    baseColorBindery: rootStyle.getPropertyValue("--base-bindery-color"), // #e7e789
    baseColorPageRevealBlock: rootStyle.getPropertyValue(
      "--base-page-reveal-color"
    ), // #ff4d07
    baseColorTelescope: rootStyle.getPropertyValue("--base-telescope-color"), // #f4f3f0
    baseColorVooban: rootStyle.getPropertyValue("--base-vooban-color"), // #1458e4
  };

  const container = document.querySelector(".main-container");
  const listAnimationContainer = document.querySelector(".list-animations");
  const previewContainer = document.querySelector(".preview-animation");
  const listWrapper = document.querySelector(".list-wrapper");
  let lastIndexHoverListAnimation = 0;
  const mediaQuery = window.matchMedia("(min-width: 768px)");
  const marquee = document.querySelector(".infinite-text-wrapper");

  renderListAnimations(listAnimationContainer, list_animations);

  const allAnimation = document.querySelectorAll(".animation");

  allAnimation.forEach(async (element, index) => {
    const wrapperTitle = element.querySelector(
      ".animation-content .wrapper-title"
    );
    const originalTitle = wrapperTitle.querySelector(".title");
    const cloneTitle = originalTitle.cloneNode(true);
    wrapperTitle.appendChild(cloneTitle);

    const splitFirstTitle = await loadFont(originalTitle, {
      type: "chars",
      mask: "chars",
      charsClass: "chars-title",
      aria: "hidden",
    });

    const splitSecondTitle = await loadFont(cloneTitle, {
      type: "chars",
      mask: "chars",
      charsClass: "chars-title",
      aria: "hidden",
    });

    const timeline = gsap.timeline({
      paused: true,
      defaults: {
        ease: "hoverEase",
        duration: 0.15,
        stagger: {
          from: "random",
          each: 0.05,
        },
      },
    });

    timeline
      .to(splitFirstTitle.chars, {
        y: "-150%",
      })
      .to(splitSecondTitle.chars, {
        y: 0,
      });

    element.addEventListener("mouseenter", (e) => {
      if (element.classList.contains("not-done")) return;
      timeline.play();

      handelResponsiveMobileFunction(mediaQuery, () => {
        showPreview(
          previewContainer,
          element.dataset.preview,
          originalTitle.textContent,
          index + 1 > lastIndexHoverListAnimation
        );

        removeExtraImage(previewContainer);

        lastIndexHoverListAnimation = index + 1;

        const rect = element.getBoundingClientRect();
        const fromTop = e.clientY < rect.top + rect.height / 2;
        element.classList.remove("top", "bottom");
        element.classList.add(fromTop ? "bottom" : "top");
      });
    });

    element.addEventListener("mouseleave", (e) => {
      if (element.classList.contains("not-done")) return;
      timeline.reverse();
      handelResponsiveMobileFunction(mediaQuery, () => {
        const rect = element.getBoundingClientRect();
        const toTop = e.clientY < rect.top + rect.height / 2;

        element.classList.remove("top", "bottom");
        element.classList.add(toTop ? "bottom" : "top");
      });
    });

    element.addEventListener("click", function () {
      if (element.classList.contains("not-done")) return;
      const destination = this.dataset.navigation;
      const baseColor =
        rootVariableCss[
          list_animations.find((anim) => anim.href === destination).baseColor
        ];
      navigationTo(destination, baseColor);
    });
  });

  handelResponsiveMobileFunction(mediaQuery, () => {
    listWrapper.addEventListener("pointerleave", () => {
      const lastPreview = previewContainer.querySelector(
        ".card-preview:last-child"
      );

      if (!lastPreview) return;

      gsap.to(previewContainer.querySelectorAll(".card-preview"), {
        clipPath: "inset(100% 0 0 0)",
        duration: 1,
        ease: "power2.out",
      });
    });
  });

  // document.addEventListener("mousemove", (e) => {
  //   gsap.to(".base-cursor", {
  //     x: e.clientX,
  //     y: e.clientY,
  //     duration: 0.5,
  //     ease: "power2.out",
  //   });
  // });

  const splitPreloadLogo = await loadFont(".preload-logo", {
    type: "chars",
    charsClass: "chars-logo",
  });

  const splitFirstDesc = await loadFont(".desc:nth-child(1)", {
    type: "lines",
    mask: "lines",
    linesClass: "lines",
    aria: "hidden",
  });

  const splitSecondDesc = await loadFont(".desc:nth-child(2)", {
    type: "lines",
    mask: "lines",
    linesClass: "lines",
    aria: "hidden",
  });

  const splitThirdDesc = await loadFont(".desc:nth-child(3)", {
    type: "lines",
    mask: "lines",
    linesClass: "lines",
    aria: "hidden",
  });

  const timeline = gsap.timeline({
    defaults: {
      duration: 1,
      ease: "power2.out",
    },
    onComplete: () => {
      timeline.kill();
    },
  });

  timeline.to(splitPreloadLogo.chars, {
    delay: 1.5,
    clipPath: "inset(0% 0% 0% 0%)",
    ease: "power3.inOut",
    stagger: {
      each: 0.1,
    },
    onStart: () => {
      gsap.to(".preload-logo", {
        opacity: 1,
        duration: 0.1,
      });
    },
  });

  timeline.to(splitPreloadLogo.chars, {
    y: 0,
    x: 0,
    ease: "power4.out",
    stagger: {
      each: 0.1,
    },
  });

  timeline.to(".loader-spinner", {
    opacity: 0,
    ease: "power2.out",
  });

  timeline.to(".preloader", {
    backgroundColor: rootVariableCss.primaryColor,
    color: rootVariableCss.secondaryColor,
    ease: "power2.out",
    onComplete: () => {
      const state = Flip.getState(".logo, .preload-logo");

      document.querySelector(".logo").classList.add("active");
      document.querySelector(".preload-logo").classList.add("active");

      Flip.from(state, {
        duration: 3,
        absolute: true,
        ease: "expo.inOut",
        scale: true,
      });

      lenis.start();

      document.querySelector(".preloader").remove();
    },
  });

  timeline.to(
    ".highlight",
    {
      "--text-fill": rootVariableCss.primaryColor,
      "--text-stroke-color": rootVariableCss.secondaryColor,
      "--stroke-size": !mediaQuery.matches ? "1px" : "2px",
    },
    "+=3"
  );

  timeline.to(".highlight", {
    transform: "skewX(-20deg)",
    duration: 2,
    ease: "highlightBounce",
    onComplete: () => {
      gsap.to(listWrapper, {
        pointerEvents: "auto",
        ease: "power3.out",
        duration: 0.5,
      });
      gsap.to(container, {
        pointerEvents: "auto",
        ease: "power3.out",
        duration: 0.5,
      });
      gsap.to(".rotate-char-l-logo", {
        rotateX: 540,
        repeat: -1,
        duration: 2,
        repeatDelay: 1.5,
        yoyo: true,
        ease: "easeInOutQuart",
      });
      gsap.to(marquee, {
        y: 0,
        duration: 1,
        ease: "power3.inOut",
      });
    },
  });

  timeline.to(".about-title", {
    opacity: 1,
  });

  timeline.to(splitFirstDesc.lines, {
    y: 0,
    ease: "expo.out",
    stagger: 0.15,
  });

  timeline.to(
    splitSecondDesc.lines,
    {
      y: 0,
      ease: "expo.out",
      stagger: 0.15,
    },
    "<"
  );

  timeline.to(
    splitThirdDesc.lines,
    {
      y: 0,
      ease: "expo.out",
      stagger: 0.15,
    },
    "<"
  );

  handelResponsiveMobileFunction(mediaQuery, () => {
    timeline.to(".keep-scroll", {
      opacity: 1,
      onComplete: () => {
        const timelineKeepScroll = gsap.timeline({
          defaults: {
            repeat: -1,
            ease: "power4.inOut",
            duration: 1,
            repeatDelay: 2.5,
          },
        });

        timelineKeepScroll.to(".scrollbar-animation", {
          scaleY: 1,
          transformOrigin: "top",
        });

        timelineKeepScroll.to(
          [".scrollbar-animation-left", ".scrollbar-animation-right"],
          {
            scaleY: 1,
            transformOrigin: "bottom",
          },
          "<+.25"
        );

        timelineKeepScroll.to(
          ".scrollbar-animation",
          {
            scaleY: 0,
            transformOrigin: "bottom",
          },
          "+=0.25"
        );

        timelineKeepScroll.to(
          [".scrollbar-animation-left", ".scrollbar-animation-right"],
          {
            scaleY: 0,
            transformOrigin: "top",
          },
          "<+.25"
        );
      },
    });
  });

  timeline.to(".animations-title", {
    opacity: 1,
  });

  timeline.to(".divider", {
    transform: "scaleX(1)",
    duration: 0.75,
    ease: "power3.out",
    stagger: {
      each: 0.25,
    },
  });

  timeline.to(
    ".animation-content",
    {
      opacity: 1,
      duration: 1,
      ease: "expo.in",
      stagger: {
        each: 0.1,
      },
      onComplete: () => {
        document.querySelectorAll(".animation").forEach((el) => {
          el.classList.remove("not-done");
        });
      },
    },
    "-=1"
  );
});

// const u = [
//   {
//     elInner: {
//       from: {
//         x: "0%",
//       },
//       to: {
//         x: "100%",
//       },
//     },
//     el: {
//       from: {
//         x: "0%",
//       },
//       to: {
//         x: "-100%",
//       },
//     },
//     image: {
//       from: {
//         transformOrigin: "bottom 100%",
//         x: "-60%",
//         scale: 1,
//       },
//       to: {
//         transformOrigin: "bottom 100%",
//         x: "-150%",
//         scale: 0.8,
//       },
//     },
//     imageInner: {
//       from: {
//         transformOrigin: "bottom 100%",
//         x: "-60%",
//         scale: 1,
//       },
//       to: {
//         transformOrigin: "bottom 100%",
//         x: "-100%",
//         scale: 0.8,
//       },
//     },
//   },
//   {
//     elInner: {
//       from: {
//         x: "-80%",
//       },
//       to: {
//         x: "0%",
//       },
//     },
//     el: {
//       from: {
//         x: "80%",
//       },
//       to: {
//         x: "0%",
//       },
//     },
//     image: {
//       from: {
//         transformOrigin: "bottom 100%",
//         x: "-15%",
//         scale: 0.45,
//       },
//       to: {
//         transformOrigin: "bottom 100%",
//         x: "-60%",
//         scale: 1,
//       },
//     },
//   },
//   {
//     elInner: {
//       from: {
//         x: "-95%",
//       },
//       to: {
//         x: "-80%",
//       },
//     },
//     el: {
//       from: {
//         x: "95%",
//       },
//       to: {
//         x: "80%",
//       },
//     },
//     image: {
//       from: {
//         transformOrigin: "bottom 100%",
//         x: 0,
//         scale: 0.15,
//       },
//       to: {
//         transformOrigin: "bottom 100%",
//         x: "-15%",
//         scale: 0.45,
//       },
//     },
//   },
//   {
//     elInner: {
//       from: {
//         x: "-100%",
//       },
//       to: {
//         x: "-95%",
//       },
//     },
//     el: {
//       from: {
//         x: "100%",
//       },
//       to: {
//         x: "95%",
//       },
//     },
//     image: {
//       from: {
//         transformOrigin: "bottom 100%",
//         scale: 0,
//       },
//       to: {
//         transformOrigin: "bottom 100%",
//         scale: 0.15,
//       },
//     },
//   },
// ];

// const h = 0.5;
// let x = 0;
// for (let j = 0; j < n.value.length - 1; j++) {
//   let O = 0;
//   for (let N = 0; N < n.value.length; N++)
//     u[O]
//       ? (c.fromTo(
//           (v = n.value[N + j]) == null ? void 0 : v.refElInner,
//           u[O].elInner.from,
//           {
//             ...u[O].elInner.to,
//             duration: h,
//             ease: "power1.inOut",
//           },
//           x
//         ),
//         c.fromTo(
//           (I = n.value[N + j]) == null ? void 0 : I.refEl,
//           u[O].el.from,
//           {
//             ...u[O].el.to,
//             duration: h,
//             ease: "power1.inOut",
//           },
//           x
//         ),
//         c.fromTo(
//           (A = n.value[N + j]) == null ? void 0 : A.refImage,
//           {
//             transformOrigin: "center center",
//             scale: 2 - u[O].image.from.scale,
//           },
//           {
//             scale: 2 - u[O].image.to.scale,
//             duration: h,
//             ease: "power1.inOut",
//           },
//           x
//         ),
//         N + j === n.value.length - 1 && j === n.value.length - 3
//           ? c.fromTo(
//               ($ = n.value[N + j]) == null ? void 0 : $.refImageContainer,
//               {
//                 ...u[O].image.from,
//                 x: 0,
//               },
//               {
//                 ...u[O].image.to,
//                 scale: 0.6,
//                 x: 0,
//                 duration: h,
//                 ease: "power1.inOut",
//               },
//               x
//             )
//           : N + j === n.value.length - 1 && j === n.value.length - 2
//           ? c.fromTo(
//               (b = n.value[N + j]) == null ? void 0 : b.refImageContainer,
//               {
//                 ...u[O].image.from,
//                 x: 0,
//                 scale: 0.6,
//               },
//               {
//                 ...u[O].image.to,
//                 x: "-60%",
//                 duration: h,
//                 ease: "power1.inOut",
//               },
//               x
//             )
//           : c.fromTo(
//               (B = n.value[N + j]) == null ? void 0 : B.refImageContainer,
//               u[O].image.from,
//               {
//                 ...u[O].image.to,
//                 duration: h,
//                 ease: "power1.inOut",
//               },
//               x
//             ))
//       : c.set(
//           (R = n.value[N + j]) == null ? void 0 : R.refElInner,
//           {
//             x: "100%",
//           },
//           0
//         ),
//       O++;
//   c.to(
//     p.value,
//     {
//       x: `${-100 + ((j + 2) * 100) / n.value.length}%`,
//       duration: h,
//       ease: "power1.inOut",
//     },
//     x
//   ),
//   x += 0.5;
// }
