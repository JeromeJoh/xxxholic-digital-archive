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




// Characters Page

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
  .to('main', {
    backgroundColor: '#fa8647',
    duration: 1
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
  }, '<')

document.querySelector('.unfold').addEventListener('click', () => {
  reelTween.play()
})




// Episodes Page

const episodeInfo = [
  {
    name: 'xxxHolic',
    date: '2006',
    otherName: '',
    episodeNumber: 24,
    link: 'https://www.bilibili.com/bangumi/play/ep247620/?share_source=copy_web',
  },

  {
    name: 'xxxHolic: Sequel',
    date: '2008',
    otherName: '继',
    episodeNumber: 13,
    link: 'https://www.bilibili.com/bangumi/play/ep247644/?share_source=copy_web'
  },

  {
    name: 'xxxHOLiC Spring Dreams Chronicle',
    otherName: '春夢記',
    date: '2009',
    episodeNumber: 13,
    link: 'https://www.bilibili.com/bangumi/play/ep84771/?share_source=copy_web'
  },

  {
    name: 'xxxHolic Cage',
    otherName: '籠',
    date: '2010',
    link: 'https://www.bilibili.com/bangumi/play/ep84773/?share_source=copy_web'
  },

  {
    name: 'xxxHOLiC: Manatsu no Yoru no Yume',
    otherName: '真夏ノ夜ノ夢',
    date: '2005-08-20',
    link: 'https://www.bilibili.com/bangumi/play/ep84775/?share_source=copy_web'
  },
]

const prevEpisode = document.querySelector('.prev-episode')
const nextEpisode = document.querySelector('.next-episode')
const episodeName = document.querySelector('.episode-name')
const watchButton = document.querySelector('.watch')

episodeName.innerHTML = `
  <p>${episodeInfo[0].name}<span>${episodeInfo[0].otherName ? ` (${episodeInfo[0].otherName})` : ''}</span></p>
  <p>- ${episodeInfo[0].date} -</p>
`

let currentEpisode = 0

document.querySelector('.activate').addEventListener('click', () => {
  document.querySelector('.deck svg').classList.add('running')

  gsap.to('.activate', {
    opacity: 0
  })

  gsap.to(prevEpisode, {
    left: '10rem'
  })

  gsap.to(nextEpisode, {
    right: '10rem'
  })

  gsap.to('main', {
    backgroundColor: '#eee'
  })

  gsap.to('.deck svg .name', {
    opacity: 1
  })

  gsap.to('.episode-decor .watch', {
    y: 0
  })

  gsap.to('.episode-decor .episode-name', {
    y: 0
  })

  setTimeout(() => {
    prevEpisode.classList.add('attention-seeker')
    nextEpisode.classList.add('attention-seeker')
    prevEpisode.style.pointerEvents = 'auto'
    nextEpisode.style.pointerEvents = 'auto'
  }, 1500)
})

const tweens = Array.from({ length: 4 }, () => gsap.timeline({
  paused: true
}))

tweens[0]
  .to('.svg-group>img:nth-child(1)', {
    rotate: 60,
    opacity: 1,
    ease: 'power1.out'
  })
tweens[1]
  .to('.svg-group>img:nth-child(2)', {
    x: 0,
    y: 0,
    opacity: 1,
    ease: 'power1.out'
  })

tweens[2]
  .to('.svg-group>img:nth-child(3)', {
    rotateY: 360,
    opacity: 1,
    ease: 'power1.out'
  })

tweens[3]
  .to('.svg-group>img:nth-child(4)', {
    x: 0,
    y: 0,
    opacity: 1,
    ease: 'power1.out'
  })

nextEpisode.addEventListener('click', () => {
  if (currentEpisode === tweens.length) return

  if (currentEpisode === 0) {
    tweens[currentEpisode].play()
  } else {
    tweens[currentEpisode - 1].reverse()
    tweens[currentEpisode].play()
  }

  currentEpisode++

  episodeName.innerHTML = `
    <p>${episodeInfo[currentEpisode].name}<span>${episodeInfo[currentEpisode].otherName ? ` (${episodeInfo[currentEpisode].otherName})` : ''}</span></p>
    <p>- ${episodeInfo[currentEpisode].date} -</p>
`
})

prevEpisode.addEventListener('click', () => {
  if (currentEpisode === 0) return

  if (currentEpisode === 1) {
    tweens[currentEpisode - 1].reverse()
  } else {
    tweens[currentEpisode - 1].reverse()
    tweens[currentEpisode - 2].play()
  }
  currentEpisode--

  episodeName.innerHTML = `
  <p>${episodeInfo[currentEpisode].name}<span>${episodeInfo[currentEpisode].otherName ? ` (${episodeInfo[currentEpisode].otherName})` : ''}</span></p>
  <p>- ${episodeInfo[currentEpisode].date} -</p>
`
})

watchButton.addEventListener('click', () => {
  window.open(episodeInfo[currentEpisode].link, '_blank')
})