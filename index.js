// smooth scroll
// const lenis = new Lenis();

// function raf(time) {
//   lenis.raf(time);
//   requestAnimationFrame(raf);
// }

// requestAnimationFrame(raf);


// scroll animation
// gsap.registerPlugin(ScrollTrigger);

// const slider = document.querySelector('.slider');
// const sections = gsap.utils.toArray('.slider section');

// const scrollTween = gsap.to(sections, {
//   xPercent: -100 * (sections.length - 1),
//   ease: 'none',
//   scrollTrigger: {
//     trigger: slider,
//     pin: true,
//     scrub: 1,
//     snap: 1 / (sections.length - 1),
//     end: () => `+=${slider.offsetWidth}`
//   }
// });



const key = document.querySelector('.key button')

const tween = gsap.timeline({
  duration: 0.5,
  ease: 'power1.in',
  paused: true
})

tween
  .to('header', {
    yPercent: -100,
    ease: 'none'
  })
  .to('footer', {
    yPercent: 100,
    ease: 'none'
  }, '<')
  .to(['.left-side', '.right-side'], {
    opacity: 0
  })
  .to('.key div', {
    scale: 6,
    opacity: 0,
  }, '<')
  .to('.key button', {
    y: '15rem'
  }, '<')
  .to('.wheel', {
    y: '-1.5rem'
  },)
  .to('.decoration', {
    opacity: 1
  })

let flag = false;

key.addEventListener('click', () => {
  if (!flag) {
    tween.play()
    flag = true
  } else {
    tween.reverse()
    flag = false
  }
})

const reelTween = gsap.timeline({
  ease: 'power1.inOut',
  paused: true
})

reelTween
  .from('.content', {
    rotate: 90
  })
  .to('.reel-l', {
    left: 0,
    duration: 1,
  }, 0.5)
  .to('.reel-r', {
    right: 0,
    duration: 1,
  }, '<')
  .to('.pic-l', {
    width: '50%',
    duration: 1,
  }, '<')
  .to('.pic-r', {
    width: '50%',
    duration: 1,
  }, '<')



// Testing Code
let generalFlag = false;

document.querySelector('.btn').addEventListener('click', () => {

  if (!generalFlag) {
    reelTween.play()
    generalFlag = true
  } else {
    reelTween.reverse()
    generalFlag = false
  }
})