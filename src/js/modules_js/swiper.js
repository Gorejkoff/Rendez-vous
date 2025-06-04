

if (document.querySelector('.description-material__swiper')) {
   const SWIPER_BODY = document.querySelector('.description-material__body');
   const SWIPER_SLIDES = document.querySelectorAll('.swiper-slide');

   const swiper = new Swiper(document.querySelector('.description-material__swiper'), {
      keyboard: {
         enabled: true,
         onlyInViewport: true,
      },
      // allowTouchMove: true,
      loop: true,
      spaceBetween: 10,
      speed: 300,
      slidesPerView: 1,
      grabCursor: true,
      navigation: {
         nextEl: ".description-material__next",
         prevEl: ".description-material__prev",
      },
      on: {
         slideChangeTransitionEnd: playVideo,
      }
   });

   if (SWIPER_SLIDES.length <= 1) {
      SWIPER_BODY.classList.add('button-hidden');
   }

   function playVideo() {
      SWIPER_SLIDES.forEach((e) => {
         if (!e.querySelector('video')) { return }
         e.classList.contains('swiper-slide-active') ?
            e.querySelector('video').play() :
            e.querySelector('video').pause();
      })
   }
}


if (document.querySelector('.health__swiper')) {
   let swiperState;
   let swiper;
   changeStateSlider();
   window.addEventListener('resize', () => {
      changeStateSlider();
   })
   function initswiper() {
      swiper = new Swiper('.health__swiper', {
         allowTouchMove: true,
         loop: false,
         speed: 300,
         slidesPerView: 1.1,
         spaceBetween: 10,
      });
   }
   function changeStateSlider() {
      if (!MIN1024.matches) {
         if (!swiperState) {
            swiperState = true;
            initswiper();
         }
      } else {
         if (swiperState) {
            swiperState = false;
            swiper.destroy(true, true);
         }
      }
   }
}

if (document.querySelector('.js-models__swiper')) {
   const swipers = document.querySelectorAll('.js-models__swiper');

   swipers.forEach((e) => { addSwiper(e) });

   function addSwiper(target) {
      const wrapper = target.querySelector('.swiper-wrapper');
      const slides = target.querySelectorAll('.swiper-slide');
      const swiper = new Swiper(target, {
         spaceBetween: 10,
         speed: 300,
         // slidesPerView: 1.5,
         slidesPerView: 'auto',
         // freeMode: {
         //    enabled: true,
         //    momentum: false // Отключаем инерцию для точного позиционирования
         // },
         grid: {
            rows: 2,
            fill: 'row'
         },
         breakpoints: {
            1024: {
               spaceBetween: 14,
               slidesPerView: 'auto',
               grid: {
                  rows: 1,
                  fill: 'row'
               },
               // freeMode: {
               //    enabled: false,
               //    momentum: false // Отключаем инерцию для точного позиционирования
               // },
            }
         },
         navigation: {
            nextEl: target.querySelector('.js-swiper-next'),
            prevEl: target.querySelector('.js-swiper-prev'),
         },
         pagination: {
            el: target.querySelector('.swiper-pagination'),
            type: 'fraction',
         },

         // observer: true, // Следит за изменениями DOM
         // observeSlideChildren: true, // Реакция на изменение слайдов
         // observeParents: true, // Реакция на изменение контейнера

      });

      // function addCastomWidth() {
      //    slides.forEach((e) => {
      //       console.log(e.offsetWidth);
      //       e.style.width = e.offsetWidth + "px";
      //    })
      // }
      // setTimeout(addCastomWidth, 1000)

   }
}


if (document.querySelector('.shops__swiper')) {
   const swiperItem = document.querySelector('.shops__swiper');
   const swiper = new Swiper(swiperItem.querySelector('.swiper'), {
      allowTouchMove: true,
      spaceBetween: 10,
      speed: 300,
      slidesPerView: 'auto',
      grabCursor: true,
      breakpoints: {
         1300: { spaceBetween: 28 },
         1024: { spaceBetween: 18 }
      },
      navigation: {
         nextEl: swiperItem.querySelector('.js-swiper-next'),
         prevEl: swiperItem.querySelector('.js-swiper-prev'),
      },
      pagination: {
         el: swiperItem.querySelector('.swiper-pagination'),
         type: 'fraction',

      },
   });
}






/* пример инициализации слайдера */
// if (document.querySelector('.swiper')) {
//    const swiper = new Swiper('.swiper', {
//       keyboard: {
//          enabled: true,
//          onlyInViewport: true,
//       },
//       allowTouchMove: false,
//       loop: true,
//       spaceBetween: 10,
//       speed: 300,
//       slidesPerView: 2.5,
//       grabCursor: true,
//       initialSlide: 2,
//       centeredSlides: true,
//       breakpoints: {
//          1024: {
//             spaceBetween: 20,
//             slidesPerView: 3
//          },
//          768: {
//             slidesPerView: 2
//          }
//       },
//       navigation: {
//          nextEl: ".next",
//          prevEl: ".prev",
//       },
//       pagination: {
//          el: '.pagination__body',
//          type: 'bullets',
//          type: 'fraction',
//          clickable: true,
//       },
//       autoplay: {
//          delay: 2000,
//       },
//       virtual: {
//          enabled: true,
//       },
//    });
// }

/* создание и ликвидация состояния слайдера в зависимости от ширины вьюпорта */
// if (document.querySelector('.swiper')) {
//    let swiperState;
//    let swiper;
//    changeStateSlider();
//    window.addEventListener('resize', () => {
//       changeStateSlider();
//    })
//    function initswiper() {
//       swiper = new Swiper('.swiper', {
//          keyboard: {
//             enabled: true,
//             onlyInViewport: true,
//          },
//          allowTouchMove: true,
//          loop: false,
//          speed: 300,
//          slidesPerView: 1.3,
//          spaceBetween: 24,
//       });
//    }
//    function changeStateSlider() {
//       if (!MIN768.matches) {
//          if (!swiperState) {
//             swiperState = true;
//             initswiper();
//          }
//       } else {
//          if (swiperState) {
//             swiperState = false;
//             swiper.destroy(true, true);
//          }
//       }
//    }
// }
