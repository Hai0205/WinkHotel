function swiperDeals() {
  const breakpoint = window.matchMedia('(min-width: 768px)');

  let swiper;
  
  const breakpointChecker = function () {
    if (breakpoint.matches == true) {
      if (swiper !== undefined) swiper.destroy(true, true);
    } else if (breakpoint.matches == false) {
      return enableSwiper();
    }
  }

  breakpointChecker()
}

function enableSwiper() {
  // const isMobile = window.innerWidth <= 768

  // if (isMobile) {
    swiper = new Swiper('.box__container', {
      loop: true,
      grabCursor: true,
      
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      breakpoints: {
        768: {
          slidesPerView: '1',
          spaceBetween: 20,
        }
      }
    });
  // }
}

swiperDeals()