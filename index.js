// smooth scroll
// const lenis = new Lenis()

// function raf(time) {
//   lenis.raf(time)
//   requestAnimationFrame(raf)
// }

// requestAnimationFrame(raf)


// scroll animation
// gsap.registerPlugin(ScrollTrigger);




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

let flag = false

key.addEventListener('click', () => {
  if (!flag) {
    tween.play()
    flag = true
  } else {
    tween.reverse()
    flag = false
  }

  document.querySelector('aside').style.pointerEvents = 'none'
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
  .to('.unfold', {
    opacity: 0
  })
  .to('.pointer-group', {
    opacity: 1
  })




document.querySelector('.unfold').addEventListener('click', () => {
  reelTween.play()
})



// Intro Page Animation

const paragraphs = gsap.utils.toArray('.caption .wrapper p')
gsap.set(paragraphs[0], {
  opacity: 0
})

let lineIndex = 0, characterIndex = 0

const audios = {
  0: new Audio('./assets/audios/watanuki.wav'),
  4: new Audio('./assets/audios/yuko.wav'),
  10: new Audio('./assets/audios/domeki.wav'),
  11: new Audio('./assets/audios/rei.wav'),
}






document.querySelector('.next').addEventListener('click', () => {

  if (lineIndex === paragraphs.length) {
    return
  }

  if (lineIndex === paragraphs.length - 1) {
    gsap.to('.next', {
      opacity: 0
    })
  }

  if (audios[lineIndex]) {
    audios[lineIndex].play()
    gsap.to('.c-' + (characterIndex + 1), {
      backgroundColor: '#ddd'
    })
    characterIndex++
  }

  if (lineIndex === 0) {

    gsap.to('main', {
      backgroundColor: '#eee'
    })

    gsap.to('.next', {
      opacity: 0.5
    })

    gsap.to('.decor-l', {
      left: 0
    })

    gsap.to('.decor-r', {
      right: 0
    })

    gsap.to(paragraphs[lineIndex++], {
      opacity: 1
    })

    return
  }


  const line = new SplitType(paragraphs[lineIndex])

  gsap.to('.wrapper', {
    y: -(lineIndex * 3) + 'rem'
  })

  gsap.from(line.chars, {
    opacity: 0,
    stagger: 0.01,
  })

  lineIndex++
})

