$(document).ready(function () {
  const originalTitle = document.title;

  $(document).on("visibilitychange", function () {
    if (document.hidden) {
      document.title = "Quay lại đi! 😢";
    } else {
      document.title = originalTitle;
    }
  });
  scrollHeader();
  subMenuHeader();
  swiperBanner();
  scrollRoom();
  scrollFeedBack();
  scrollMess();
  menubar();
  selectMap();
  bookingForm();
  commingSoon();
  swiperRoom();
  scrollWinkRewards();
  toggleDropdown();
  animationTextReveal();
  swiperDeals();
  customAnimation();
  displayRatings();
  swiperRoomSuites();
});
function displayRatings() {
  $(".rating-number").each(function () {
    const rating = parseFloat($(this).text().trim());

    const $container = $(this).siblings(".rating-container");
    $container.empty();

    const fullCircles = Math.floor(rating);
    const partialCircle = rating % 1 !== 0;

    // Create full circles
    for (let i = 0; i < fullCircles; i++) {
      const $circle = $("<div>").addClass("circle");
      $container.append($circle);
    }

    // Create partial circle if necessary
    if (partialCircle) {
      const $partial = $("<div>").addClass("circle partial");

      const percentageMissing = (5 - rating) * 100;
      const $coverCircle = $("<div>")
        .addClass("cover-circle")
        .css("width", `${percentageMissing}%`);

      $partial.append($coverCircle);
      $container.append($partial);
    }
  });
}

function customAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".data-fade-in").forEach((element, i) => {
    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 20,
      },
      {
        scrollTrigger: {
          trigger: element,
          start: "top 59%",
          end: "bottom 59%",
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "sine.out",
        stagger: 0.1,
      }
    );
  });
}
function scrollHeader() {
  let height;
  if ($("body").hasClass("page-details-hotels")) {
    height =
      ($(".header__top-bar").height() + $(".header__main").height()) * -1;
  } else {
    height = $(".header__top-bar").height() * -1;
  }

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
  swiperBanner.navigation.destroy();
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
function scrollMess() {
  let btnMess;

  function initializeScrollTrigger() {
    btnMess = gsap
      .from(".cta-mess", {
        x: "200%",
        paused: true,
        duration: 0.5,
      })
      .progress(1);

    ScrollTrigger.create({
      start: "top top",
      end: 99999,
      onUpdate: (self) => {
        self.direction === -1 ? btnMess.play() : btnMess.reverse();
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
  //----------------------------------------------------
  // date
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
  //----------------------------------------------------
  //----------------------------------------------------
  // select hotels
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
  // end select hotels
  //----------------------------------------------------
  //----------------------------------------------------
  // select adults
  const unitsDisplay = $(".units-display");
  const selectBox = $(".select-box");
  const adultValElement = $('span[name="adult-val"]');
  const childValElement = $('span[name="child-val"]');
  const adultVal = $(".adult .val");
  const childVal = $(".child .val");
  const totalSum = $("#total-sum");

  function updateDisplay() {
    adultValElement.text(adultVal.text());
    childValElement.text(childVal.text());
    const totalSumVal = parseInt(adultVal.text()) + parseInt(childVal.text());
    totalSum.text(totalSumVal);
  }

  unitsDisplay.on("click", function (e) {
    const clickYPosition = e.clientY;
    const viewportHeight = $(window).height();
    selectBox
      .toggleClass("dropdown-up", clickYPosition > viewportHeight / 2)
      .toggleClass("active");
    e.stopPropagation();
  });

  $(".select .min").on("click", function () {
    const valElement = $(this).next();
    let currentValue = parseInt(valElement.text());
    if (currentValue > 0) {
      valElement.text(--currentValue);
      updateDisplay();
    }
  });

  $(".select .plus").on("click", function () {
    const valElement = $(this).prev();
    let currentValue = parseInt(valElement.text());
    valElement.text(++currentValue);
    updateDisplay();
  });

  $(document).on("click", function (e) {
    if (!$(e.target).closest(".units").length) {
      selectBox.removeClass("active");
    }
  });
  // end select adults
  //----------------------------------------------------
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
      const tmpText = $textDropdown.text();
      const tmpImgSrc = $textDropdown.find("img").attr("src"); // Get the current image src if present
      const $img = $item.find("img"); // Check if the clicked item contains an img

      // Swap text content
      $textDropdown.text($item.text());

      // If the item has an image, swap the img src
      if ($img.length) {
        $textDropdown.html($item.html()); // Swap the entire HTML, including the img
        $item.html(
          `${tmpImgSrc ? `<img src="${tmpImgSrc}" />` : ""} ${tmpText}`
        ); // Swap img and text back to the item
      } else if ($item.hasClass("language__item")) {
        $item.text(tmpText);
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
  if ($(".swiper-deals").length) {
    const swiperDeals = new Swiper(".swiper-deals", {
      slidesPerView: 3,
      spaceBetween: 40,
      // loop: true,
      pagination: {
        el: ".deals-sec .swiper-pagination",
        type: "fraction",
      },
      navigation: {
        nextEl: ".deals__list .swiper-button-next",
        prevEl: ".deals__list .swiper-button-prev",
      },
    });
  }
}

function commingSoon() {
  if ($(".cooming-sec").length) {
    gsap.registerPlugin(ScrollTrigger);

    const panels = gsap.utils.toArray(".animate-right");
    const content = gsap.utils.toArray(".animate-left");
    const numberStart = $(".number-start");
    const totalSlides = $(".panel").length;
    let currentSlide = 1;

    numberStart.text(currentSlide);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".comming-soon",
        start: "top 3%",
        end: () => "+=" + 100 * panels.length + "%",
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          // Xác định slide hiện tại dựa trên progress của ScrollTrigger
          const newSlide = Math.min(
            Math.max(1, Math.ceil(self.progress * totalSlides)),
            totalSlides
          );

          // Cập nhật số đếm khi có thay đổi slide
          if (newSlide !== currentSlide) {
            currentSlide = newSlide;
            numberStart.text(currentSlide); // Thay đổi số đếm
          }
        },
      },
    });

    panels.forEach((panel, index) => {
      // Hiệu ứng cho .animate-right như trước
      tl.from(
        panel,
        {
          yPercent: 100,
          ease: "none",
          duration: 1,
        },
        "+=0.5"
      );

      // Thay đổi .animate-left thành dạng fade
      tl.from(
        content[index],
        {
          // yPercent: 10,
          autoAlpha: 0,
          ease: "none",
        },
        "<"
      );
    });
    ScrollTrigger.refresh();
  }
}
function selectMap() {
  let activeMarker = null;

  $(".marker").on("click", function (e) {
    $(".marker").addClass("hidden");
    if ($(window).width() < 767) {
      // Remove 'active' class from all marker-detail elements
      $(".marker-detail").removeClass("active");
    }
    const city = $(this).data("city");
    $(this).addClass("hidden");
    $(".map-img").addClass("zoom");
    $(".map-content-wrapper").addClass("show");

    $(".map-content").removeClass("show");
    $(`.map-content[data-city-map="${city}"]`).addClass("show");
  });

  $(".icon-back").on("click", function (e) {
    $(".map-content-wrapper").removeClass("show");
    $(".marker-detail").removeClass("active");
    $(".map-content-detail").removeClass("show");

    $(".map-content").removeClass("show");
    $(".marker").removeClass("hidden");
  });

  $(".icon-back-lv2").on("click", function (e) {
    $(".map-content-detail").removeClass("show");
  });
  if ($(window).width() < 767) {
    // Remove 'active' class from all marker-detail elements
    $(".marker-detail").removeClass("active");
  }
  $(".box-body .item").on("click", function (e) {
    const city = $(this).data("city-item");
    console.log(city);
    $(".marker-detail").removeClass("active");
    $(`.marker-detail[data-city="${city}"]`).addClass("active");
    $(`.map-content-detail[data-hotel="${city}"]`).addClass("show");
  });

  $(".marker-detail").on("click", function (e) {
    const city = $(this).data("city");
    const citys = $(this).data("v2-city");
    console.log(city, citys);

    // Xóa các lớp 'show' và 'active' trước
    // $(".map-content").removeClass("show");
    $(".marker-detail").removeClass("active");
    $(".map-content-detail").removeClass("show");

    // Thêm lớp 'active' cho marker được click
    $(this).addClass("active");

    // Hiển thị map-content và map-content-detail theo city
    // $(`.map-content[data-city-map="${city}"]`).addClass("show");
    $(`.map-content-detail[data-hotel="${city}"]`).addClass("show");

    // Nếu citys tồn tại, thực hiện cập nhật thêm
    if (citys) {
      // Ẩn các nội dung liên quan đến city ban đầu
      $(".map-content").removeClass("show");
      $(".marker-detail").removeClass("active");

      // Thêm lớp 'active' và hiển thị map-content theo citys
      $(this).addClass("active");
      $(`.map-content[data-city-map="${citys}"]`).addClass("show");
    }
  });
}
function scrollWinkRewards() {
  if ($(".rewards-sec").length) {
    gsap.registerPlugin(ScrollTrigger);

    function getClipPathForSmallScreens(pixelValue, viewportWidth) {
      const percentage = (pixelValue / viewportWidth) * 100;
      return `polygon(${pixelValue}px 10%, ${100 - percentage}% 10%, ${
        100 - percentage
      }% 90%, ${pixelValue}px 90%)`;
    }

    function applyClipPathAnimation(clipPathValue, startTrigger, endTrigger) {
      gsap.to(".rewards-sec__img", {
        clipPath: clipPathValue,
        duration: 1,
        scrollTrigger: {
          trigger: ".rewards-sec",
          start: startTrigger,
          end: endTrigger,
          scrub: 1,
          toggleActions: "play reverse play reverse",
          pin: true,
        },
      });
    }

    const viewportWidth = window.innerWidth;
    const pixelValue = viewportWidth <= 767 ? 24 : 80;

    if (viewportWidth <= 767) {
      const clipPathValue = getClipPathForSmallScreens(
        pixelValue,
        viewportWidth
      );
      applyClipPathAnimation(clipPathValue, "top 30%", "bottom bottom");
    } else {
      const clipPathValue = getClipPathForSmallScreens(
        pixelValue,
        viewportWidth
      );
      applyClipPathAnimation(clipPathValue, "top 7%", "bottom bottom");
    }
  }
}

function swiperRoomSuites() {
  if ($(".wink-room-sec").length) {
    const swiperParentRoom = new Swiper(".swiper-parent-room", {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 40,
      // loop: true,
      pagination: {
        el: ".swiper-control-parent .swiper-pagination",
        type: "fraction",
      },
      navigation: {
        nextEl: ".swiper-control-parent .swiper-button-next",
        prevEl: ".swiper-control-parent .swiper-button-prev",
      },
    });

    var swiperChildImage = $(".swiper-child-img");
    swiperChildImage.each(function () {
      var $this = $(this); // Cache the current Swiper element

      // Initialize Swiper for each element
      new Swiper($this[0], {
        slidesPerView: 1,
        allowTouchMove: false,
        pagination: {
          el: $this.find(".swiper-pagination")[0],
          type: "fraction",
        },
        navigation: {
          nextEl: $this.find(".swiper-button-next")[0],
          prevEl: $this.find(".swiper-button-prev")[0],
        },
      });
    });
  }
}
