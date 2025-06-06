"use strict"

// window.addEventListener('load', (event) => {});

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

// Fancybox.bind('[data-fancybox]', {});
Fancybox.bind("[data-fancybox]", {
   hideScrollbar: false,
});