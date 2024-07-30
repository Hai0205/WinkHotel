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

function swiperImages() {
  const isMobile = window.innerWidth <= 768

  if (isMobile) {
    const swiper1 = new Swiper('.featured-image__list', {
      loop: true,
      grabCursor: true,
      spaceBetween: 20,
      slidesPerView: '1.2',
    });

    const swiper2 = new Swiper('.featured-image__list.reverse', {
      loop: true,
      grabCursor: true,
      spaceBetween: 20,
      slidesPerView: '1.5',
      centeredSlides: true,
    });

  }
}

function toggleDropdown() {
  const dropdowns = document.querySelectorAll(".dropdown-custom")

  dropdowns.forEach(dropdown => {
    const btnDropdown = dropdown.querySelector('.dropdown-custom__btn')
    const dropdownMenu = dropdown.querySelector(".dropdown-custom__menu");
    const dropdownItems = dropdown.querySelectorAll(".dropdown-custom__item");
    const textDropdown = dropdown.querySelector(".dropdown-custom__text");
    
    btnDropdown.onclick = function (e) {
      closeAllDropdowns(dropdown)
      dropdownMenu.classList.toggle("dropdown--active")
    }

    document.onclick = function (e) {
      if (!e.target.closest(".dropdown-custom")) {
        closeAllDropdowns();
      }
    }

    dropdownItems.forEach(item => {
      item.onclick = function(e) {
        let tmp = textDropdown.textContent;
        textDropdown.textContent = e.target.textContent;
        if (e.target.classList.contains("language__item")) {
          item.textContent = tmp
        }
        closeAllDropdowns()
      }
    })

    function closeAllDropdowns(exception) {
      dropdowns.forEach(dropdown => {
        if (dropdown !== exception) {
          const menu = dropdown.querySelector('.dropdown-custom__menu');
          menu.classList.remove('dropdown--active');
        }
      });
    }
  })
}

toggleDropdown()
swiperDeals()
swiperImages()