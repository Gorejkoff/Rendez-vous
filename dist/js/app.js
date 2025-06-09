"use strict"
window.addEventListener('load', function () {
   var link = document.createElement('link');
   link.rel = 'stylesheet';
   link.href = 'css/fancybox.css';
   document.head.appendChild(link);
});

// desktop or mobile (mouse or touchscreen)
const isMobile = {
   Android: function () { return navigator.userAgent.match(/Android/i) },
   BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i) },
   iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i) },
   Opera: function () { return navigator.userAgent.match(/Opera Mini/i) },
   Windows: function () { return navigator.userAgent.match(/IEMobile/i) },
   any: function () {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
   }
};
const isPC = !isMobile.any();
if (isPC) { document.body.classList.add('_pc') } else { document.body.classList.add('_touch') };

// media queries
const MIN1024 = window.matchMedia('(min-width: 1024px)');
const MIN768 = window.matchMedia('(min-width: 768px)');
const SWITCH_SLIDE = document.querySelectorAll('.js-switch-slide');
let centerWidth = window.innerWidth / 2;
let centerHeight = window.innerHeight / 2;


// variables
const HEADER = document.getElementById('header');
const MAIN_SCREEN_SLIDER = document.getElementById('main-screen-slider');


function throttle(callee, timeout) {
   let timer = null;
   return function perform(...args) {
      if (timer) return;
      timer = setTimeout(() => {
         callee(...args);
         clearTimeout(timer);
         timer = null;
      }, timeout)
   }
}

const moveElementsTrottle = throttle(moveElements, 16);
addWidthViewport();
updateVariables();
// ** ======================= RESIZE ======================  ** //
window.addEventListener('resize', () => {
   addWidthViewport();
   updateVariables();
})

// https://www.rendez-vous.ru/
// ** ======================= CLICK ======================  ** //
document.documentElement.addEventListener("click", (event) => {
   if (event.target.closest('.js-modal-follow')) {
      event.preventDefault();
      initOpenModal("modal-transition");
   }
   if (event.target.closest('.js-modal-callback')) {
      initOpenModal("modal-callback");
   }
   // if (event.target.closest('.js-switch-slide')) {
   //    switchMainSlide(event.target.closest('.js-switch-slide'));
   // } else {
   //    switchMainSlideStart();
   // }
})

if (isPC) {
   SWITCH_SLIDE.forEach((e) => {
      e.addEventListener('mouseenter', (event) => { switchMainSlide(event.target) })
   });
   SWITCH_SLIDE.forEach((e) => {
      e.addEventListener('mouseleave', (event) => { switchMainSlideStart() })
   });
   document.body.addEventListener('mousemove', (event) => {
      moveElementsTrottle(event);
   })
}

function addWidthViewport() {
   document.body.style.setProperty('--vw', window.innerWidth)
}

function switchMainSlide(target) {
   const number = target.dataset.slide;
   if (MAIN_SCREEN_SLIDER && number) {
      MAIN_SCREEN_SLIDER.style.setProperty('--offset', number);
   }
}
function switchMainSlideStart() {
   if (MAIN_SCREEN_SLIDER) {
      MAIN_SCREEN_SLIDER.style.setProperty('--offset', 0);
   }
}

function updateVariables() {
   centerWidth = window.innerWidth / 2;
   centerHeight = window.innerHeight / 2;
}

function moveElements(event) {
   let mouseX = (event.clientX - centerWidth) / centerWidth;
   let mouseY = (event.clientY - centerHeight) / centerHeight;
   document.body.style.setProperty('--mouseX', mouseX.toFixed(3));
   document.body.style.setProperty('--mouseY', mouseY.toFixed(3));
}

const ICON_CIRCLE_ANIMATE = document.querySelectorAll('.icon-circle-animate');
if (ICON_CIRCLE_ANIMATE.length > 0) {
   ICON_CIRCLE_ANIMATE.forEach((el) => {
      let stop = false;
      el.addEventListener('animationend', (event) => {
         el.classList.remove('icon-circle-animate');
         if (!stop) {
            setTimeout(() => {
               el.classList.add('icon-circle-animate');
            }, 100)
         }
      })
      el.addEventListener('mouseenter', () => {
         stop = true;
      })
      el.addEventListener('mouseleave', () => {
         stop = false;
         el.classList.add('icon-circle-animate');
      })
   })
}



// Fancybox.bind('[data-fancybox]', {});
Fancybox.bind("[data-fancybox]", {
   hideScrollbar: false,
});




// перемещение блоков при адаптиве
// data-da=".class,3,768" 
// класс родителя куда перемещать
// порядковый номер в родительском блоке куда перемещается начиная с 0 как индексы массива
// ширина экрана min-width
// два перемещения: data-da=".class,3,768,.class2,1,1024"
const ARRAY_DATA_DA = document.querySelectorAll('[data-da]');
ARRAY_DATA_DA.forEach(function (e) {
   const dataArray = e.dataset.da.split(',');
   const addressMove = searchDestination(e, dataArray[0]);
   const addressMoveSecond = dataArray[3] && searchDestination(e, dataArray[3]);
   const addressParent = e.parentElement;
   const listChildren = addressParent.children;
   const mediaQuery = window.matchMedia(`(min-width: ${dataArray[2]}px)`);
   const mediaQuerySecond = dataArray[5] && window.matchMedia(`(min-width: ${dataArray[5]}px)`);
   for (let i = 0; i < listChildren.length; i++) { !listChildren[i].dataset.n && listChildren[i].setAttribute('data-n', `${i}`) };
   mediaQuery.matches && startChange(mediaQuery, addressMove, e, listChildren, addressParent, dataArray);
   if (mediaQuerySecond && mediaQuerySecond.matches) moving(e, dataArray[4], addressMoveSecond);
   mediaQuery.addEventListener('change', () => { startChange(mediaQuery, addressMove, e, listChildren, addressParent, dataArray) });
   if (mediaQuerySecond) mediaQuerySecond.addEventListener('change', () => {
      if (mediaQuerySecond.matches) { moving(e, dataArray[4], addressMoveSecond); return; };
      startChange(mediaQuery, addressMove, e, listChildren, addressParent, dataArray);
   });
});

function startChange(mediaQuery, addressMove, e, listChildren, addressParent, dataArray) {
   if (mediaQuery.matches) { moving(e, dataArray[1], addressMove); return; }
   if (listChildren.length > 0) {
      for (let z = 0; z < listChildren.length; z++) {
         if (listChildren[z].dataset.n > e.dataset.n) {
            listChildren[z].before(e);
            break;
         } else if (z == listChildren.length - 1) {
            addressParent.append(e);
         }
      }
      return;
   }
   addressParent.prepend(e);
};

function searchDestination(e, n) {
   if (e.classList.contains(n.slice(1))) { return e }
   if (e.parentElement.querySelector(n)) { return e.parentElement.querySelector(n) };
   return searchDestination(e.parentElement, n);
}

function moving(e, order, addressMove) {
   if (order == "first") { addressMove.prepend(e); return; };
   if (order == "last") { addressMove.append(e); return; };
   if (addressMove.children[order]) { addressMove.children[order].before(e); return; }
   addressMove.append(e);
}





/* открывает, закрывает модальные окна. */
/*
добавить классы
js-modal-hidden - родительский контейнер модального окна который скрывается и показывается, задать стили скрытия
js-modal-visible - задать стили открытия
js-modal-close - кнопка закрытия модального окна находится внутри js-modal-hidde
кнопка открытия, любая:
js-modal-open - кнопка открытия модального окна
data-modal_open="id" - id модального окна
если надо что бы окно закрывалось при клике на пустое место (фон), добавляется атрибут js-modal-stop-close.
js-modal-stop-close - атрибут указывает на поле, при клике на которое не должно происходить закрытие окна, 
т.е. контейнер контента, при этом внешний родительский контейнет помечается атрибутом js-modal-close.
допускается дополнительно кнопка закрытия внутри js-modal-stop-close.
*/
document.addEventListener('click', (event) => {
   if (event.target.closest('.js-modal-open')) { openModal(event) }
   if (event.target.closest('.js-modal-close')) { testModalStopClose(event) }
})
function openModal(event) {
   let id = event.target.closest('.js-modal-open').dataset.modal_open;
   if (typeof id !== "undefined") { initOpenModal(id) };
}
function testModalStopClose(event) {
   if (event.target.closest('.js-modal-stop-close') &&
      event.target.closest('.js-modal-stop-close') !==
      event.target.closest('.js-modal-close').closest('.js-modal-stop-close')) {
      return
   }
   closeModal(event);
}
function closeModal(event) {
   event.target.closest('.js-modal-hidden').classList.remove('js-modal-visible');
   activeScrollCloseModal();
}
// функция закрытия модального окна (передать id модального окна)
function initCloseModal(id) {
   if (document.querySelector(`#${id}`)) {
      document.querySelector(`#${id}`).classList.remove('js-modal-visible');
   }
   activeScrollCloseModal();
}
// функция открытия модального окна (передать id модального окна)
function initOpenModal(id) {
   if (document.querySelector(`#${id}`)) {
      document.querySelector(`#${id}`).classList.add('js-modal-visible');
      document.body.classList.add('body-overflow')
   }
}
function activeScrollCloseModal() {
   if (!document.querySelector('.js-modal-visible')) {
      document.body.classList.remove('body-overflow');
   }
}

if (document.querySelector('.description-material__swiper')) {
   const SWIPER_BODY = document.querySelector('.description-material__body');
   const SWIPER_SLIDES = document.querySelectorAll('.swiper-slide');

   const swiper = new Swiper(document.querySelector('.description-material__swiper'), {
      keyboard: {
         enabled: true,
         onlyInViewport: true,
      },
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

if (document.querySelector('.feedback__swiper')) {
   const swiperItem = document.querySelector('.feedback__swiper');

   const swiper = new Swiper(swiperItem.querySelector('.swiper'), {
      spaceBetween: 46,
      speed: 300,
      slidesPerView: 1,
      grabCursor: true,
      initialSlide: 0,
      centeredSlides: true,
      breakpoints: {
         1024: {
            slidesPerView: 2,
            initialSlide: 1,
         },
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

// js-tabs-body - тело вкладки, в открытом состоянии добавляется класс js-tabs-open.
// js-tabs-hover - работает hover на ПК, отключает клик на ПК, для touchscreen надо раставить js-tabs-click или js-tabs-toggle
// js-tabs-closing - вместе с js-tabs-bod закрыть вкладку при событии вне данной вкладки
// js-tabs-click - открыть при клике (зона клика)
// js-tabs-toggle - открыть или закрыть при клике (зона клика)
// js-tabs-shell - оболочка скрывающая js-tabs-inner
// js-tabs-inner - оболочка контента
// 
// 
//  работает в связке с определением touchscreen  (isPC)


class Tabs {
   constructor() {
      this.listClosingTabs = document.querySelectorAll('.js-tabs-closing');
      this.listHover = document.querySelectorAll('.js-tabs-hover');
      this.listTabsBody = document.querySelectorAll('.js-tabs-body');
   };
   init = () => {
      document.body.addEventListener('click', this.eventClick);
      if (isPC) document.body.addEventListener('mouseover', this.eventMouseOver)
      window.addEventListener('resize', this.resize);
   };
   eventMouseOver = (event) => {
      if (event.target.closest('.js-tabs-hover')) this.openTabs(event);
      this.closeAllHover(event);
   };
   eventClick = (event) => {
      if (isPC && event.target.closest('.js-tabs-hover')) return;
      this.closeAll(event);
      if (event.target.closest('.js-tabs-click')) this.openTabs(event);
      if (event.target.closest('.js-tabs-toggle')) this.toggleTabs(event);
   };
   openTabs = (event) => {
      const body = event.target.closest('.js-tabs-body');
      if (!body) return;
      body.classList.add('js-tabs-open');
      this.setHeight(body);
   };
   closeTabs = (body) => {
      body.classList.remove('js-tabs-open');
      this.clearHeight(body);
   };
   closeAll = (event) => {
      const body = event.target.closest('.js-tabs-body');
      if (this.listClosingTabs.length == 0 && body) return;
      this.listClosingTabs.forEach((e) => { if (e !== body) this.closeTabs(e); })
   };
   closeAllHover = (event) => {
      const body = event.target.closest('.js-tabs-hover');
      if (this.listHover.length == 0 && body) return;
      this.listHover.forEach((e) => { if (e !== body) this.closeTabs(e) })
   };
   setHeight = (body) => {
      const heightValue = body.querySelector('.js-tabs-inner').offsetHeight;
      body.querySelector('.js-tabs-shell').style.height = heightValue + "px";
   };
   clearHeight = (body) => { body.querySelector('.js-tabs-shell').style.height = "" }
   toggleTabs = (event) => {
      const body = event.target.closest('.js-tabs-body');
      if (body.classList.contains('js-tabs-open')) {
         this.closeTabs(body);
         return;
      }
      this.openTabs(event);
   };
   throttle = () => {
      let timer = null;
      return () => {
         if (timer) return;
         timer = setTimeout(() => {
            const unlocked = document.querySelectorAll('.js-tabs-open');
            unlocked.forEach((e) => { this.setHeight(e) })
            clearTimeout(timer);
            timer = null;
         }, 100)
      }
   };
   resize = this.throttle();
}
const tabs = new Tabs();
tabs.init();









class TabsSwitching {
   constructor(button_name, tab_name, execute) {
      this.name_button = button_name;
      this.list_buttons = document.querySelectorAll(button_name);
      this.list_tabs = document.querySelectorAll(tab_name);
      this.execute = execute;
   }
   init = () => {
      document.body.addEventListener('click', (event) => {
         if (event.target.closest(this.name_button)) {
            actionTabsSwitching(event, event.target.closest(this.name_button), this.list_buttons, this.list_tabs, this.execute)
         }
      })
   }
}

function actionTabsSwitching(event, target_button, list_buttons, list_tabs, execute) {
   let number = target_button.dataset.button_ts;
   if (!number) return;
   list_buttons.forEach((e) => { e.classList.toggle('active', e.dataset.button_ts == number) });
   if (list_tabs.length > 0) { list_tabs.forEach((e) => { e.classList.toggle('active', e.dataset.tab_ts == number) }) }
   if (execute) { this.execute(event) };
}

if (document.querySelector('.js-models-tab-btn') && document.querySelector('.js-models-tab')) {
   let tab = new TabsSwitching('.js-models-tab-btn', '.js-models-tab');
   tab.init();
}

