var smoother;

// function textWpapSpan(element) {
//    const listSpan = element.querySelectorAll('span');
//    listSpan.forEach(element => {
//       const words = element.innerHTML.trim().split(' ');
//       const wordWrap = words.map(item => { return item.split('').map(e => { return `<span class="letter">${e}</span>` }).join('') })
//       element.innerHTML = `<span class="word">${wordWrap.join('</span>&#32;<span class="word">')}</span>`
//    })
// }

// function addTextAnimatePin(name) {
//    textWpapSpan(element)
//    let tl = gsap.timeline({
//       scrollTrigger: {
//          trigger: `${name}`,
//          start: "0% 0%",
//          end: `100% 0%`,
//          pin: true,
//          scrub: true,
//       }
//    })
//    const text = document.querySelectorAll(`${name} .letter`);
//    text && text.forEach((e) => {
//       tl.to(e, 1, { opacity: 1 })
//    })
// }

// function addTextAnimate(element) {
//    textWpapSpan(element)
//    let tl = gsap.timeline({
//       scrollTrigger: {
//          trigger: element,
//          start: "0% 90%",
//          end: `0% 5%`,
//          scrub: true,
//       }
//    })
//    const text = element.querySelectorAll(`.letter`);
//    text && text.forEach((e) => {
//       tl.to(e, { opacity: 1 })
//    })
// }


window.addEventListener('load', function (event) {
   gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

   // ScrollTrigger.config({ ignoreMobileResize: true });
   // ScrollTrigger.isTouch && ScrollTrigger.normalizeScroll({ allowNestedScroll: true });

   if (MIN1024.matches) {
      smoother = ScrollSmoother.create({
         wrapper: "#scroll",
         content: "#content",
         smooth: 2,
         normalizeScroll: true,
         // smoothTouch: true,
         // effects: true,
      })
      smoother.paused(true);
      setTimeout(() => { smoother.paused(false) }, 5000);
   }

   // прокрутка по якорям
   // document.body.addEventListener('click', (event) => {
   //    if (event.target.closest('[href^="#"]')) {
   //       event.preventDefault();
   //       let getName = event.target.closest('[href^="#"]').getAttribute('href');
   //       closeHeaderMenu();
   //       gsap.to(window, { scrollTo: getName, ease: "power2" })
   //    }
   // })



   // инициализация анимации текста
   // const ANIMATE_PIN = document.querySelectorAll('.js-text-animate-pin');
   // ANIMATE_PIN.forEach(element => { addTextAnimate(element) });

   // const ANIMATE_FREE = document.querySelectorAll('.js-text-animate-free');
   // ANIMATE_FREE.forEach(element => { addTextAnimate(element) });


})