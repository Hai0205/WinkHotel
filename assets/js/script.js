$(document).ready(function () {
  gsap.registerPlugin(ScrollTrigger);
  scrollHeader();
  swiperBanner();
  scrollRoom();
  scrollFeedBack();
  selectLanguage();
  bookingForm();
  swiperRoom();
  scrollWinkGuide();
  $(".comming-soon__btn-prev").on("click", swapImages);
  $(".comming-soon__btn-next").on("click", swapImages);
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
      },
    });
  }

  initializeScrollTrigger();

  // Re-initialize ScrollTrigger when page is refreshed
  $(window).on("load", initializeScrollTrigger);
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

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".wink-room",
      start: "top 80%",
      end: "bottom 80%",
      scrub: 1,
      toggleActions: "play reverse play reverse",
      // markers: true,
    },
  });

  // First animation: height from 0 to 365 with scrub
  tl.to(".before-elements", {
    height: 365,
    duration: 1,
  });

  // Second animation with scrub
  tl.to(".before-elements", {
    width: 32,
    height: 27,
    left: -24,
    x: 0,
    y: targetY,
    duration: 1,
  });
}

function selectLanguage() {
  // $(".language__head").on("click", function (event) {
  //   event.stopPropagation();
  //   $(".language__body").toggleClass("show");
  // });
  // $(document).on("click", function () {
  //   $(".language__body").removeClass("show");
  // });

  $(".language__body").on("click", function (event) {
    event.stopPropagation();
  });
  var bar = $(".bar");

  bar.on("click", function () {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active").addClass("not-active");
    } else {
      $(this).removeClass("not-active").addClass("active");
    }
  });
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

  if (window.innerWidth <= 768) {
    gsap.to(".banner-guides__img", {
      clipPath: "polygon(10% 16%, 93% 16%, 93% 100%, 9% 100%)",
      duration: 1,
      scrollTrigger: {
        trigger: ".banner-guides__container",
        start: "top 30%",
        end: "bottom bottom",
        scrub: 1,
        toggleActions: "play reverse play reverse",
      },
    });
  } else {
    gsap.to(".banner-guides__img", {
      clipPath: "polygon(13% 25%, 87% 25%, 87% 90%, 13% 90%)",
      duration: 1,
      scrollTrigger: {
        trigger: ".banner-guides__container",
        start: "top 8%",
        end: "bottom bottom",
        scrub: 1,
        toggleActions: "play reverse play reverse",
      },
    });
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

let isVisible = true
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
    })
  
    imageBack1.style.zIndex = "-1"
    imageFront1.style.zIndex = "1"
  
    gsap.to("#image-back1", {
      xPercent: 0,
      yPercent: 0,
      opacity: 1,
      ease: "power3.out"
    })
  } 
  else {
    gsap.to("#image-front1", {
      xPercent: 7,
      yPercent: 16,
      opacity: 1,
      ease: "power3.out"
    })
  
    imageFront1.style.zIndex = "-1"
    imageBack1.style.zIndex = "1"
  
    gsap.to("#image-back1", {
      xPercent: -7,
      yPercent: -16,
      opacity: 1,
      ease: "power3.out"
    })
  }

  isVisible = !isVisible
}
