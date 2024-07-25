$(document).ready(function () {
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
  $(".comming-soon__container").on("click", swapImages);
  animationTextReveal();
  ScrollTrigger.refresh();
  AOS.init({
    once: true,
    duration: 1000,
  });
});

function scrollHeader() {
  let height = $(".header__top-bar").height();
  let navTop;

  function initializeScrollTrigger() {
    navTop = gsap
      .from("header", {
        y: "-" + height,
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
  console.log("aa");
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

  const heightSlider = $(".wink-room__slide").height();
  const targetY = heightSlider + 450;

  // First animation: height from 0 to 365
  const tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: ".wink-room",
      start: "-10px 60%",
      end: "-10px 60%",
    },
  });

  tl1.to(".before-elements", {
    height: 365,
    duration: 1, // Quick but noticeable
  });

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

  tl2.to(".before-elements", {
    width: 32,
    height: 27,
    left: -24,
    x: 0,
    y: targetY,
    duration: 1,
  });
}

function menubar() {
  var bar = $(".bar");

  bar.on("click", function () {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active").addClass("not-active");
    } else {
      $(this).removeClass("not-active").addClass("active");
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

  gsap.to(".banner-guides__img", {
    clipPath: "polygon(13% 25%, 87% 25%, 87% 90%, 13% 90%)",
    duration: 1,
    scrollTrigger: {
      trigger: ".banner-guides__container",
      start: "top 50%",
      end: "bottom bottom",
      // pin: true,
      // markers: true,
      scrub: 1,
      toggleActions: "play reverse play reverse",
    },
  });
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

function fadeOut(element, duration, callback) {
  element.style.transition = `opacity ${duration}ms ease-in-out`;
  element.style.opacity = 0.8;

  setTimeout(function () {
    if (callback) callback();
  }, duration);
}

function fadeIn(element, duration) {
  element.style.transition = `opacity ${duration}ms ease-in-out`;
  element.style.opacity = 1;
}

function swapImages() {
  const imageFront1 = document.getElementById("image-front1");
  const imageFront2 = document.getElementById("image-front2");
  const imageBack1 = document.getElementById("image-back1");
  const imageBack2 = document.getElementById("image-back2");
  const textFront1 = document.getElementById("text-front1");
  const textBack1 = document.getElementById("text-back1");
  const textFront2 = document.getElementById("text-front2");
  const textBack2 = document.getElementById("text-back2");

  imageFront1.style.opacity = 1;
  imageBack1.style.opacity = 1;
  imageFront2.style.opacity = 0;
  imageBack2.style.opacity = 0;

  imageFront1.id = "image-back2";
  imageBack1.id = "image-front2";
  imageFront2.id = "image-back1";
  imageBack2.id = "image-front1";

  textFront1.id = "text-back1";
  textBack1.id = "text-front1";

  textFront2.id = "text-back2";
  textBack2.id = "text-front2";
}

function toggleDropdown() {
  const $dropdowns = $(".dropdown-custom");

  $dropdowns.each(function () {
    const $dropdown = $(this);
    const $btnDropdown = $dropdown.find(".dropdown-custom__btn");
    const $dropdownMenu = $dropdown.find(".dropdown-custom__menu");
    const $dropdownItems = $dropdown.find(".dropdown-custom__item");
    const $textDropdown = $dropdown.find(".dropdown-custom__text");

    // Xử lý sự kiện click cho nút dropdown
    $btnDropdown.on("click", function (e) {
      e.stopPropagation();
      closeAllDropdowns($dropdown);
      $dropdownMenu.toggleClass("dropdown--active");
    });

    // Xử lý sự kiện click cho tài liệu
    $(document).on("click", function (e) {
      if (!$(e.target).closest(".dropdown-custom").length) {
        closeAllDropdowns();
      }
    });

    $dropdownItems.on("click", function (e) {
      e.stopPropagation();
      const $menu = $dropdown.find(".dropdown-custom__menu");
      const tmp = $textDropdown.text();
      $textDropdown.text($(this).text());
      if ($(this).hasClass("language__item")) {
        $(this).text(tmp);
      }
      closeAllDropdowns();
    });

    function closeAllDropdowns(exception) {
      $dropdowns.each(function () {
        const $this = $(this);
        if (!exception || !exception.is($this)) {
          $this.find(".dropdown-custom__menu").removeClass("dropdown--active");
        }
      });
    }
  });
}
