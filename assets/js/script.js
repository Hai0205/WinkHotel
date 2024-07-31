$(document).ready(function () {
  const originalTitle = document.title;

  $(document).on("visibilitychange", function () {
    if (document.hidden) {
      document.title = "Quay lại đi! 😢";
    } else {
      document.title = originalTitle;
    }
  });
  AOS.init({
    once: true,
    duration: 1000,
  });
  gsap.registerPlugin(ScrollTrigger);
  scrollHeader();
  subMenuHeader();
  swiperBanner();
  scrollRoom();
  scrollFeedBack();
  menubar();
  bookingForm();
  swiperRoom();
  scrollWinkGuide();
  toggleDropdown();
  $(".comming-soon__btn--prev, .comming-soon__btn--next").on(
    "click",
    function () {
      swapImages();
    }
  );
  animationTextReveal();
  swiperDeals();
  ScrollTrigger.refresh();
});

function scrollHeader() {
  let height = $(".header__top-bar").height() * -1;
  let navTop;

  function initializeScrollTrigger() {
    navTop = gsap
      .from("header", {
        y: height,
        paused: true,
        duration: 0.5,
        ease: "power1.out",
        trigger: "header",
      })
      .progress(1);

    ScrollTrigger.create({
      start: "top top",
      end: 99999,
      onUpdate: (self) => {
        // Shrink navTop
        self.direction === -1 ? navTop.play() : navTop.reverse();
        // self.refresh();
        if (self.direction === -1) {
          $(".header__sub-menu")
            .addClass("scrolled-down")
            .removeClass("scrolled-up");
        } else {
          $(".header__sub-menu")
            .addClass("scrolled-up")
            .removeClass("scrolled-down");
        }
      },
    });
  }

  initializeScrollTrigger();

  // Re-initialize ScrollTrigger when page is refreshed
  $(window).on("load", initializeScrollTrigger);
}
function subMenuHeader() {
  let menuItem = $(".menu-item ");

  menuItem.on("mouseenter", function () {
    if ($(this).hasClass("menu-item-has-children")) {
      $(".box-img").addClass("hidden");
    }
  });

  menuItem.on("mouseleave", function () {
    if ($(this).hasClass("menu-item-has-children")) {
      $(".box-img").removeClass("hidden");
    }
  });
}

function swiperBanner() {
  var interleaveOffset = 0.9;

  var swiperBanner = new Swiper(".swiper-banner", {
    loop: true,
    speed: 1200,
    grabCursor: true,
    watchSlidesProgress: true,
    mousewheelControl: true,
    keyboardControl: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: true,
    },
    on: {
      progress: function (swiper) {
        swiper.slides.forEach(function (slide) {
          var slideProgress = slide.progress || 0;
          var innerOffset = swiper.width * interleaveOffset;
          var innerTranslate = slideProgress * innerOffset;
          // Kiểm tra nếu innerTranslate không phải là NaN
          if (!isNaN(innerTranslate)) {
            var slideInner = slide.querySelector(".slide-banner");
            if (slideInner) {
              slideInner.style.transform =
                "translate3d(" + innerTranslate + "px, 0, 0)";
            }
          }
        });
      },
      touchStart: function (swiper) {
        swiper.slides.forEach(function (slide) {
          slide.style.transition = "";
        });
      },
      setTransition: function (swiper, speed) {
        var easing = "cubic-bezier(0.25, 0.1, 0.25, 1)";
        swiper.slides.forEach(function (slide) {
          slide.style.transition = speed + "ms " + easing;
          var slideInner = slide.querySelector(".slide-banner");
          if (slideInner) {
            slideInner.style.transition = speed + "ms " + easing;
          }
        });
      },
    },
  });
}
function scrollFeedBack() {
  let btn;

  function initializeScrollTrigger() {
    btn = gsap
      .from(".feedback", {
        x: "-100%",
        paused: true,
        duration: 0.5,
      })
      .progress(1);

    ScrollTrigger.create({
      start: "top top",
      end: 99999,
      onUpdate: (self) => {
        self.direction === -1 ? btn.play() : btn.reverse();
      },
    });
  }

  initializeScrollTrigger();

  // Re-initialize ScrollTrigger when page is refreshed
  $(window).on("load", initializeScrollTrigger);
}

function scrollRoom() {
  gsap.registerPlugin(ScrollTrigger);

  // First animation: height from 0 to 365
  // Tạo timeline GSAP với ScrollTrigger
  const tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: ".wink-room",
      start: "-10px 60%",
      end: "-10px 60%",
      scrub: 1,
      // markers: true,
    },
  });

  if (window.innerWidth <= 767) {
    tl1.to(".before-elements", {
      height: 189,
      duration: 1,
      ease: "none",
    });
    console.log("mobile nè");
  } else {
    tl1.to(".before-elements", {
      height: 365,
      duration: 1,
      ease: "none",
    });
  }

  // Second animation with scrub
  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".wink-room",
      start: "400px 80%", // Start after the first animation completes
      end: "bottom 80%",
      scrub: 1,
      toggleActions: "play reverse play reverse",
      // markers: true,
    },
  });
  if (window.innerWidth <= 767) {
    const heightSlider = $(".wink-room__slide").height();
    const targetY = heightSlider + 250;
    tl2.to(".before-elements", {
      width: 32,
      height: 27,
      left: 0,
      x: 0,
      y: targetY,
      duration: 1,
    });
  } else {
    const heightSlider = $(".wink-room__slide").height();
    const targetY = heightSlider + 450;
    tl2.to(".before-elements", {
      width: 32,
      height: 27,
      left: -24,
      x: 0,
      y: targetY,
      duration: 1,
    });
  }
  ScrollTrigger.refresh();
}

function menubar() {
  var bar = $(".bar");
  gsap.config({
    autoSleep: 60,
    force3D: true,
    nullTargetWarn: false,
  });
  // Tạo timeline cho animation mở và đóng
  var menuTl = gsap.timeline({ paused: true });
  menuTl
    .from(
      ".menu-container li, .sub-menu__bottom",
      {
        duration: 0.5,
        autoAlpha: 0,
        stagger: 0.1,
        marginLeft: 50,
      },
      0.7
    )
    .from(
      ".box-img",
      {
        duration: 1,
        autoAlpha: 0,
      },
      1.2
    );

  bar.on("click", function () {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active").addClass("not-active");
      menuTl.reverse();
    } else {
      $(this).removeClass("not-active").addClass("active");
      menuTl.play();
    }
    $(".header__sub-menu").toggleClass("active");
    // check when menu active
    const $body = $("body");
    const $header = $("header");

    if ($body.hasClass("overflow-hidden")) {
      $body.removeClass("overflow-hidden").css("width", "");
      $header.css("width", "");
    } else {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      $body
        .addClass("overflow-hidden")
        .css("width", `calc(100% - ${scrollBarWidth}px)`);
      $header.css("width", `calc(100% - ${scrollBarWidth}px)`);
    }
  });

  // check hover submenu
  // $(".menu-container .menu-item").hover(function () {
  //   $(".menu-container .menu-item").removeClass("active");
  //   $(this).addClass("active");
  // });
}
function toggleScrollLock() {
  const body = $("body");

  if (body.hasClass("no-scroll")) {
    body.removeClass("no-scroll");
    body.css("padding-right", "");
  } else {
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    body.addClass("no-scroll");
    body.css("padding-right", scrollBarWidth + "px");
  }
}

function bookingForm() {
  var picker = new Lightpick({
    field: document.getElementById("startday"),
    secondField: document.getElementById("endday"),
    singleDate: false,
    minDate: moment().startOf("now"),
    numberOfMonths: 2,
    startDate: moment().startOf("day").toDate(),
    endDate: moment().startOf("day").add(1, "days").toDate(),
    onOpen: function () {
      var input = picker._opts.field;
      var rect = input.getBoundingClientRect();
      var calendar = picker.el;
      if (rect.top >= window.innerHeight / 2) {
        calendar.style.top =
          rect.top + window.scrollY - calendar.offsetHeight + "px";
        calendar.style.left = rect.left + window.scrollX + "px";
      } else {
        calendar.style.top = rect.bottom + window.scrollY + "px";
        calendar.style.left = rect.left + window.scrollX + "px";
      }
    },
  });

  $(".dropdown-custom__hotels").on("click", function (e) {
    const clickYPosition = e.clientY;
    const viewportHeight = $(window).height();

    if (clickYPosition > viewportHeight / 2) {
      console.log("aa");
      $(".dropdown-custom__menu").addClass("dropdown-up");
    } else {
      console.log("abb");
      $(".dropdown-custom__menu").removeClass("dropdown-up");
    }
  });
}

function swiperRoom() {
  var interleaveOffset = 0.9;

  var swiper = new Swiper(".swiper-room", {
    loop: true,
    speed: 1000,
    grabCursor: true,
    watchSlidesProgress: true,
    mousewheelControl: true,
    keyboardControl: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: true,
    },
    // navigation: {
    //   nextEl: ".swiper-button-next",
    //   prevEl: ".swiper-button-prev",
    // },
    on: {
      progress: function (swiper) {
        swiper.slides.forEach(function (slide) {
          var slideProgress = slide.progress || 0;
          var innerOffset = swiper.width * interleaveOffset;
          var innerTranslate = slideProgress * innerOffset;
          // Kiểm tra nếu innerTranslate không phải là NaN
          if (!isNaN(innerTranslate)) {
            var slideInner = slide.querySelector(".slide-inner");
            if (slideInner) {
              slideInner.style.transform =
                "translate3d(" + innerTranslate + "px, 0, 0)";
            }
          }
        });
      },
      touchStart: function (swiper) {
        swiper.slides.forEach(function (slide) {
          slide.style.transition = "";
        });
      },
      setTransition: function (swiper, speed) {
        var easing = "cubic-bezier(0.25, 0.1, 0.25, 1)";
        swiper.slides.forEach(function (slide) {
          slide.style.transition = speed + "ms " + easing;
          var slideInner = slide.querySelector(".slide-inner");
          if (slideInner) {
            slideInner.style.transition = speed + "ms " + easing;
          }
        });
      },
    },
  });
}
function scrollWinkGuide() {
  gsap.registerPlugin(ScrollTrigger);

  function getClipPathForSmallScreens(pixelValue, viewportWidth) {
    const percentage = (pixelValue / viewportWidth) * 100;
    return `polygon(${pixelValue}px 20%, ${100 - percentage}% 20%, ${
      100 - percentage
    }% 95%, ${pixelValue}px 95%)`;
  }

  function applyClipPathAnimation(clipPathValue, startTrigger, endTrigger) {
    gsap.to(".banner-guides__img", {
      clipPath: clipPathValue,
      duration: 1,
      scrollTrigger: {
        trigger: ".banner-guides__container",
        start: startTrigger,
        end: endTrigger,
        scrub: 1,
        toggleActions: "play reverse play reverse",
      },
    });
  }

  const viewportWidth = window.innerWidth;
  const pixelValue = 24;

  if (viewportWidth <= 767) {
    const clipPathValue = getClipPathForSmallScreens(pixelValue, viewportWidth);
    applyClipPathAnimation(clipPathValue, "top 30%", "bottom bottom");
  } else {
    applyClipPathAnimation(
      "polygon(13% 25%, 87% 25%, 87% 90%, 13% 90%)",
      "top 20%",
      "bottom bottom"
    );
  }
}
function animationTextReveal() {
  gsap.registerPlugin(SplitType, ScrollTrigger);

  $(".offer__text p").each(function (index, element) {
    const split = new SplitType(element, {
      type: "chars",
      wordsClass: "char",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top 70%",
        end: "bottom 70%",
        scrub: true,
        // pin: true,
        // markers: true,
      },
    });

    // Animate the characters
    tl.set(
      split.chars,
      {
        color: "#c22033",
        stagger: 0.1,
      },
      0.1
    );
  });
}

let isVisible = true;
function swapImages() {
  const imageFront1 = document.getElementById("image-front1");
  const imageBack1 = document.getElementById("image-back1");
  const textFront1 = document.getElementById("text-front1");
  const textBack1 = document.getElementById("text-back1");
  const textFront2 = document.getElementById("text-front2");
  const textBack2 = document.getElementById("text-back2");

  textFront1.id = "text-back1";
  textBack1.id = "text-front1";

  textFront2.id = "text-back2";
  textBack2.id = "text-front2";

  if (!isVisible) {
    gsap.to("#image-front1", {
      xPercent: 0,
      yPercent: 0,
      opacity: 1,
      ease: "power3.out",
    });

    imageBack1.style.zIndex = "-1";
    imageFront1.style.zIndex = "1";

    gsap.to("#image-back1", {
      xPercent: 0,
      yPercent: 0,
      opacity: 1,
      ease: "power3.out",
    });
  } else {
    gsap.to("#image-front1", {
      xPercent: 7,
      yPercent: 16,
      opacity: 1,
      ease: "power3.out",
    });

    imageFront1.style.zIndex = "-1";
    imageBack1.style.zIndex = "1";

    gsap.to("#image-back1", {
      xPercent: -7,
      yPercent: -16,
      opacity: 1,
      ease: "power3.out",
    });
  }

  isVisible = !isVisible;
}

function toggleDropdown() {
  const $dropdowns = $(".dropdown-custom");

  $dropdowns.each(function () {
    const $dropdown = $(this);
    const $btnDropdown = $dropdown.find(".dropdown-custom__btn");
    const $dropdownMenu = $dropdown.find(".dropdown-custom__menu");
    const $dropdownItems = $dropdown.find(".dropdown-custom__item");
    const $textDropdown = $dropdown.find(".dropdown-custom__text");

    $btnDropdown.on("click", function (e) {
      e.stopPropagation();
      closeAllDropdowns($dropdown);
      $dropdownMenu.toggleClass("dropdown--active");
    });

    $(document).on("click", function () {
      closeAllDropdowns();
    });

    $dropdownItems.on("click", function (e) {
      e.stopPropagation();
      const $item = $(this);
      const tmp = $textDropdown.text();
      $textDropdown.text($item.text());
      if ($item.hasClass("language__item")) {
        $item.text(tmp);
      }
      closeAllDropdowns();
    });

    function closeAllDropdowns(exception) {
      $dropdowns.each(function () {
        const $menu = $(this).find(".dropdown-custom__menu");
        if (!exception || !$(this).is(exception)) {
          $menu.removeClass("dropdown--active");
        }
      });
    }
  });
}

function swiperDeals() {
  const breakpoint = window.matchMedia("(min-width: 768px)");

  let swiper;

  const breakpointChecker = function () {
    if (breakpoint.matches == true) {
      if (swiper !== undefined) swiper.destroy(true, true);
    } else if (breakpoint.matches == false) {
      return enableSwiper();
    }
  };

  breakpointChecker();
}

function enableSwiper() {
  // const isMobile = window.innerWidth <= 768

  // if (isMobile) {
  swiper = new Swiper(".swiper-deals", {
    loop: true,
    grabCursor: true,
    spaceBetween: 20,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    breakpoints: {
      768: {
        slidesPerView: "1",
      },
    },
  });
  // }
}
