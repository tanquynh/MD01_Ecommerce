const validRegexEmail =
  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

/*=============== SHOW MENU ===============*/

/*===== Menu Show =====*/
/* Validate if constant exists */

/*===== Hide Show =====*/
/* Validate if constant exists */

/*=============== IMAGE GALLERY ===============*/
function imgGallery() {
  const maiImg = document.querySelector(".details_img");
  smallImg = document.querySelectorAll(".details_small_img");
  smallImg.forEach((img) => {
    img.addEventListener("click", function () {
      maiImg.src = this.src;
    });
  });
}
imgGallery();

/*=============== SWIPER CATEGORIES ===============*/
var swiperCategories = new Swiper(".categories_container", {
  spaceBetween: 24,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
    1400: {
      slidesPerView: 6,
      spaceBetween: 24,
    },
  },
});

/*=============== SWIPER PRODUCTS ===============*/
var swiperProducts = new Swiper(".new_container", {
  spaceBetween: 24,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
    1400: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
  },
});
/*=============== PRODUCTS TABS ===============*/
const tabs = document.querySelectorAll("[data-target]");
tabsContent = document.querySelectorAll("[content]");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    // clicked =event.target
    const target = document.querySelector(tab.dataset.target);
    tabsContent.forEach((tabsContent) => {
      tabsContent.classList.remove("active-tab");
    });
    target.classList.add("active-tab");
    tabs.forEach((tab) => {
      tab.classList.remove("active-tab");
    });
    tab.classList.add("active-tab");
  });
});

// const countdown = function() {

//     const countDate = new Date('July 29 2023 6:30:00').getTime();
//     const now = new Date().getTime();
//     const gap = countDate - now;

//     const second = 1000;
//     const minute = second * 60;
//     const hour = minute * 60;
//     const day = hour * 24;
//     const textDay = Math.floor(gap / day);
//     const textHour = Math.floor((gap % day) / hour);
//     const textMinute = Math.floor((gap % hour) / minute)
//     const textSecond = Math.floor((gap % minute) / second);
//     console.log(textSecond)
//     document.querySelector('#days1').innerHTML = textDay
//     document.querySelector('#hours1').innerHTML = textHour
//     document.querySelector('#minutes1').innerHTML = textMinute
//     document.querySelector('#seconds1').innerHTML = textSecond

// };
// setInterval(countdown, 1000)

// const countdown1 = function() {
//   const countDate = new Date('July 29 2023 12:25:45').getTime();
//   const now = new Date().getTime();
//   const gap = countDate - now;

//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;
//   const textDay = Math.floor(gap / day);
//   const textHour = Math.floor((gap % day) / hour);
//   const textMinute = Math.floor((gap % hour) / minute)
//   const textSecond = Math.floor((gap % minute) / second);

//   document.querySelector('#days2').innerHTML = textDay
//   document.querySelector('#hours2').innerHTML = textHour
//   document.querySelector('#minutes2').innerHTML = textMinute
//   document.querySelector('#seconds2').innerHTML = textSecond

// };
// setInterval(countdown1, 1000)
