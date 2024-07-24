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
      spaceBetween: 20,
      
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      breakpoints: {
        768: {
          slidesPerView: '1',
        }
      }
    });
  // }
}

function toggleDropdown(e) {
  document.onclick = function (e) {
    const dropdownMenu = document.querySelector(".dropdown-custom__menu");
    const dropdownItems = document.querySelectorAll(".dropdown-custom__item");
    const btnDropdown = document.querySelector(".dropdown-custom__btn h5");
    if (e.target.parentElement.classList.contains("dropdown-custom__btn") ||
      e.target.parentElement.classList.contains("dropdown-custom")
    ) {
      dropdownMenu.classList.toggle("dropdown--active")
    } else {
      dropdownMenu.classList.remove("dropdown--active")
    }

    dropdownItems.forEach(item => {
      item.onclick = function (e) {
        btnDropdown.textContent = e.target.textContent;
      }
    })
  }
}

toggleDropdown()
swiperDeals()
