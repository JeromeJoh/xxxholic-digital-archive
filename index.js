
const key = document.querySelector('.key button')

const keyTl = gsap.timeline({
  duration: 0.5,
  ease: 'power1.in',
  paused: true
})

keyTl.flag = false

keyTl
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
  .to('.key .display', {
    scale: 6,
    opacity: 0,
  }, '<')
  .to('.key button', {
    y: '15rem'
  }, '<')
  .to('.decoration', {
    opacity: 1,
    onComplete: () => {
      document.querySelector('#corner').classList.toggle('running')
      document.querySelector('aside').style.pointerEvents = 'none'
    },
    onReverseComplete: () => {
      document.querySelector('#corner').classList.toggle('running')
    }
  }, '<')

key.addEventListener('click', () => {
  const flag = keyTl.flag

  if (!flag) {
    gsap.to('.wheel', {
      y: '-2rem',
    },)
    keyTl.play()
  } else {
    gsap.to('.wheel', {
      y: 0,
    },)
    keyTl.reverse()
  }

  keyTl.flag = !flag
})

key.addEventListener('mouseenter', () => keyTl.flag && gsap.to('.wheel', { y: '-4rem' }))

key.addEventListener('mouseleave', () => keyTl.flag && gsap.to('.wheel', { y: '-2rem' }))




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
  11: new Audio('./assets/audios/kunogi.wav'),
}

document.querySelector('.next').addEventListener('click', () => {

  if (lineIndex === paragraphs.length - 1) {
    gsap.fromTo('.figure img', 1.5, {
      backgroundColor: '#000',
    }, {
      backgroundColor: '#fff',
    })
  }

  if (lineIndex === paragraphs.length) {
    return
  }

  if (lineIndex === paragraphs.length - 1) {
    gsap.to('.next', {
      opacity: 0,
      onComplete: () => {
        document.querySelector('.next').remove()
      }
    })
  }

  if (audios[lineIndex]) {
    audios[lineIndex].play()
    gsap.to('.c-' + (characterIndex + 1), {
      backgroundColor: '#fff'
    })
    characterIndex++
  }

  if (lineIndex === 0) {

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
const characters = [
  {
    name: 'Shizuka Dōmeki',
    brief: "Shizuka Dōmeki (百目鬼 静, Dōmeki Shizuka) is Watanuki's classmate and one-sided rival. He is part of the school's archery club and often participates in school competitions. He lives in a shrine owned by his late grandfather. He is calm, sarcastic, and has the ability to rid evil spirits and is immune to most curses; this is mostly due to his ancestry and his upbringing in his grandfather's temple.",
    range: [1, 4]
  },
  {
    name: 'Kimihiro Watanuki',
    brief: "Kimihiro Watanuki (四月一日君尋, Watanuki Kimihiro) is the protagonist of xxxHOLiC. He is a typical high school student who lives on his own. He is down-to-earth and selfless, but also very irritable, especially when it comes to Yūko's lavish demands and Dōmeki's stoic attitude. Watanuki begins working for Yūko in exchange for the fulfillment of his wish to never see spirits again.",
    range: [5, 8]
  },
  {
    name: 'Himawari Kunogi',
    brief: "Himawari Kunogi (九軒 ひまわり, Kunogi Himawari) is Watanuki's love interest. She is a kind and caring girl who is often passive to Watanuki's profession of love for her.",
    range: [17, 20]
  },
  {
    name: 'Yūko Ichihara',
    brief: 'Yūko Ichihara (壱原 侑子, Ichihara Yūko) is a very powerful witch and owner of the wish shop, mostly known for her ability to send people to other dimensions and times (sometimes called "The Dimensional Witch"), and for her ability to grant any wish in exchange for an equal cost. Despite her seemingly immature and free-spirited attitude, Yūko is also sage-like and serious when the time calls for it.',
    range: [21, 24]
  }
]

const reelTween = gsap.timeline({
  ease: 'power1.inOut',
  paused: true
})

reelTween
  .from('.content', {
    rotate: 90,
    onComplete: () => {
      document.querySelector('#characters .activate').remove()
    }
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
  .to('.pointer-group', {
    opacity: 1
  }, '>')

document.querySelector('#characters .activate').addEventListener('click', () => {
  reelTween.play()
})

const buttonGroup = document.querySelectorAll('.pointer-group button')
const barGroup = gsap.utils.toArray('.mask div')
const characterName = document.querySelector('.brief h3')
const brief = document.querySelector('.brief p')

const barTween = gsap.timeline({
  paused: true
})

barTween
  .to('#characters .mask', {
    opacity: 1
  })
  .to(barGroup, {
    rotateY: 0
  }, '<')
  .to(buttonGroup, {
    opacity: 0
  })

buttonGroup.forEach((button, index) => {
  button.addEventListener('click', () => {
    barTween.play()
    characterName.textContent = characters[index].name
    brief.textContent = characters[index].brief
  })
})

document.querySelector('.brief .close').addEventListener('click', () => {
  barTween.reverse()
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
    name: "xxxHolic: A Midsummer Night's Dream",
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

document.querySelector('#episodes .activate').addEventListener('click', () => {
  document.querySelector('.deck svg').classList.add('running')

  gsap.to('#episodes .activate', {
    opacity: 0
  })

  gsap.to(prevEpisode, {
    left: '10rem'
  })

  gsap.to(nextEpisode, {
    right: '10rem'
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





// Fanart Page

const cursor = document.querySelector('.cursor')
const panel = document.querySelector('.shell')

const boxes = Array.from(panel.querySelectorAll('.box'))

boxes.forEach((box) => {
  box.addEventListener('mouseenter', () => {
    gsap.to('#fanart', {
      backgroundColor: box.dataset.color,
    })
  })

  box.addEventListener('mouseleave', () => {
    gsap.to('#fanart', {
      backgroundColor: '#eee',
    })
  })
})


panel.addEventListener('mouseenter', (e) => {
  cursor.classList.toggle('hidden')
  cursor.style.left = e.layerX + 'px'
  cursor.style.top = e.layerY + 'px'
})

panel.addEventListener('mouseleave', () => {
  cursor.classList.toggle('hidden')
})

panel.addEventListener('mousemove', (e) => {
  cursor.style.left = e.layerX + 'px'
  cursor.style.top = e.layerY + 'px'
})

document.querySelector('#fanart .activate').addEventListener('click', () => {
  gsap.to('#fanart .door-l', {
    x: '-100%',
    ease: 'power1.out'
  })

  gsap.to('#fanart .door-r', {
    x: '100%',
  })

  gsap.to('#fanart .activate', {
    opacity: 0,
    onComplete: () => {
      document.querySelector('#fanart .activate').remove()
      document.querySelector('#fanart .door').remove()
    }
  })
})



// Game Page
const image = document.querySelector('#game .hint-image')

const board = document.querySelector('#game .board')
const rows = 3
const cols = 3
const emptyPos = {
  row: rows - 1,
  col: cols - 1
}
const pieceArray = []

function createPuzzle() {
  const pieceWidth = board.offsetWidth / cols
  const pieceHeight = board.offsetHeight / rows

  function generateRandomOrderArray(length) {
    const arr = Array.from({ length }, (_, i) => i);

    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
  }

  let randomArray = generateRandomOrderArray(rows * cols - 1)
  randomArray = [7, 6, 2, 0, 5, 1, 3, 4]

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const piece = document.createElement('div')

      const randomIndex = randomArray.shift()
      const randomPos = {
        row: Math.floor(randomIndex / cols),
        col: randomIndex % cols
      }

      if (i === rows - 1 && j === cols - 1) {
        randomPos.row = rows - 1
        randomPos.col = cols - 1
        piece.classList.add('lastone')
      }

      piece.classList.add('piece')
      piece.style.width = pieceWidth + 'px'
      piece.style.height = pieceHeight + 'px'
      piece.style.backgroundImage = `url(${image.src})`
      piece.style.backgroundSize = `${board.offsetWidth}px ${board.offsetHeight}px`
      piece.style.backgroundPosition = `-${j * pieceWidth}px -${i * pieceHeight}px`
      piece.dataset.row = i
      piece.dataset.col = j
      piece.dataset.viewRow = randomPos.row
      piece.dataset.viewCol = randomPos.col
      piece.style.left = randomPos.col * pieceWidth + 'px'
      piece.style.top = randomPos.row * pieceHeight + 'px'
      piece.addEventListener('click', movePiece, false)
      pieceArray.push(piece)
    }
  }

  board.append(...pieceArray)
}

function movePiece(event) {
  if (isCompleted()) return

  const piece = event.target
  const row = parseInt(piece.dataset.viewRow)
  const col = parseInt(piece.dataset.viewCol)

  if (Math.abs(row - emptyPos.row) + Math.abs(col - emptyPos.col) === 1) {
    piece.dataset.viewRow = emptyPos.row
    piece.dataset.viewCol = emptyPos.col

    gsap.to(piece, {
      left: piece.offsetWidth * emptyPos.col + 'px',
      top: piece.offsetHeight * emptyPos.row + 'px',
      ease: 'power1.out'
    })

    emptyPos.row = row
    emptyPos.col = col

    if (isCompleted()) {
      gsap.to("#game .lastone", {
        opacity: 1,
      })

      gsap.to("#game .hint-button", {
        yPercent: 0
      })

      gsap.to("#game .hint-image", {
        opacity: 1
      })

      gsap.from("#game .bar", {
        xPercent: 100,
        opacity: 0,
        stagger: 0.05
      })

      gsap.to("#game .puzzle-result", {
        yPercent: -120
      })

      pieceArray.forEach(piece => {
        piece.style.cursor = 'default'
        piece.style.pointerEvents = 'none'
        piece.style.boxShadow = 'none'
        piece.style.border = 'none'
      })
    }
  }
}

function isCompleted() {
  return pieceArray.every(piece => {
    const row = parseInt(piece.dataset.row)
    const col = parseInt(piece.dataset.col)
    const viewRow = parseInt(piece.dataset.viewRow)
    const viewCol = parseInt(piece.dataset.viewCol)
    return row === viewRow && col === viewCol
  })
}

const initBoard = () => {
  createPuzzle()
}

initBoard()






document.querySelector('#game .activate').addEventListener('click', () => {
  gsap.to('#game .activate', {
    opacity: 0,
    onComplete: () => {
      document.querySelector('#game .activate').remove()
    }
  })

  gsap.to('#game .hint-image', {
    opacity: 0,
  })

  gsap.to('#game .hint-button', {
    yPercent: -120
  })
})

const hintButton = document.querySelector('#game .hint-button')

hintButton.addEventListener('mousedown', () => {
  gsap.to('#game .hint-image', {
    opacity: 1,
  })
})

hintButton.addEventListener('mouseup', () => {
  gsap.to('#game .hint-image', {
    opacity: 0,
  })
})


// Outro Page
const { Engine, Render, Runner, Bodies, Body, Composite, Composites, Events, Constraint, Common } = Matter

const engine = Engine.create()

const el = document.querySelector('#blowing-hair')
const worldWidth = el.offsetWidth
const worldHeight = el.offsetHeight

const render = Render.create({
  element: el,
  engine: engine,
  options: {
    width: worldWidth,
    height: worldWidth,
    wireframes: false,
    background: 'transparent',
  },
})


function createCloth(xx, yy, columns, rows, columnGap = 0, rowGap = 0, crossBrace = false, particleRadius = 1, particleOptions, constraintOptions) {

  const group = Body.nextGroup(true);

  particleOptions = Common.extend({
    inertia: Infinity,
    friction: 0.00001,
    collisionFilter: { group: group },
    render: {
      fillStyle: 'black',
      visible: rows === 1 ? false : true,
    }
  }, particleOptions);

  constraintOptions = Common.extend({
    stiffness: 1,
    render: {
      type: 'line',
      anchors: false,
      strokeStyle: 'black',
      lineWidth: 1.5,
      visible: true
    }
  }
    , constraintOptions);

  const cloth = Composites.stack(xx, yy, columns, rows, columnGap, rowGap, function (x, y) {
    return Bodies.circle(x, y, particleRadius, particleOptions);
  });

  Composites.mesh(cloth, columns, rows, crossBrace, constraintOptions);

  return cloth;
};

function createHair({
  top = 0,
  left = 0,
  width = 1,
  length = 10,
}) {
  return createCloth(
    left * worldWidth,
    top * worldHeight,
    length,
    width
  )
}

const hairGroup1 = [
  createHair({
    top: 0.12,
    left: 0.63,
    width: 1,
    length: 72
  }),
  createHair({
    top: 0.12,
    left: 0.63,
    width: 1,
    length: 68
  }),
]

const hairGroup2 = [
  createHair({
    top: 0.12,
    left: 0.64,
    width: 1,
    length: getRandomValue(65, 75, true)
  }),
  createHair({
    top: 0.125,
    left: 0.64,
    width: 1,
    length: getRandomValue(65, 75, true)
  }),
  createHair({
    top: 0.13,
    left: 0.64,
    width: 1,
    length: getRandomValue(65, 75, true)
  }),
  createHair({
    top: 0.135,
    left: 0.64,
    width: 1,
    length: getRandomValue(65, 75, true)
  }),
  createHair({
    top: 0.14,
    left: 0.64,
    width: 1,
    length: getRandomValue(65, 75, true)
  }),
  createHair({
    top: 0.145,
    left: 0.64,
    width: 1,
    length: getRandomValue(65, 75, true)
  }),
]

const hairGroup3 = [
  createHair({
    top: 0.145,
    left: 0.64,
    width: 1,
    length: getRandomValue(35, 40, true)
  }),
  createHair({
    top: 0.15,
    left: 0.64,
    width: 1,
    length: getRandomValue(35, 40, true)
  }),
  createHair({
    top: 0.155,
    left: 0.64,
    width: 2,
    length: getRandomValue(35, 40, true)
  }),
  createHair({
    top: 0.16,
    left: 0.64,
    width: 1,
    length: getRandomValue(35, 40, true)
  }),
  createHair({
    top: 0.165,
    left: 0.64,
    width: 1,
    length: getRandomValue(35, 40, true)
  }),
]

const hairGroup4 = [
  createHair({
    top: 0.17,
    left: 0.64,
    width: 1,
    length: getRandomValue(10, 12, true)
  }),
  createHair({
    top: 0.171,
    left: 0.641,
    width: 1,
    length: getRandomValue(10, 12, true)
  }),
  createHair({
    top: 0.172,
    left: 0.642,
    width: 1,
    length: getRandomValue(10, 12, true)
  }),
  createHair({
    top: 0.173,
    left: 0.643,
    width: 1,
    length: getRandomValue(10, 12, true)
  })
]

const hairGroup5 = [
  createHair({
    top: 0.18,
    left: 0.645,
    width: 1,
    length: getRandomValue(50, 55, true)
  }),
  createHair({
    top: 0.181,
    left: 0.645,
    width: 2,
    length: getRandomValue(50, 50, true)
  }),
  createHair({
    top: 0.182,
    left: 0.645,
    width: 1,
    length: getRandomValue(60, 65, true)
  }),
  createHair({
    top: 0.183,
    left: 0.645,
    width: 1,
    length: getRandomValue(60, 65, true)
  }),
  createHair({
    top: 0.184,
    left: 0.645,
    width: 1,
    length: getRandomValue(60, 65, true)
  }),
  createHair({
    top: 0.185,
    left: 0.645,
    width: 1,
    length: getRandomValue(60, 65, true)
  }),
  createHair({
    top: 0.19,
    left: 0.645,
    width: 1,
    length: getRandomValue(60, 65, true)
  }),
]

const hairGroup6 = [
  createHair({
    top: 0.3,
    left: 0.646,
    width: 1,
    length: getRandomValue(60, 65, true)
  }),
  createHair({
    top: 0.31,
    left: 0.646,
    width: 1,
    length: getRandomValue(60, 65, true)
  }),
  createHair({
    top: 0.32,
    left: 0.646,
    width: 1,
    length: getRandomValue(60, 65, true)
  }),
  createHair({
    top: 0.33,
    left: 0.646,
    width: 1,
    length: getRandomValue(60, 65, true)
  }),
]

const hairGroup7 = [
  createHair({
    top: 0.12,
    left: 0.66,
    width: 4,
    length: getRandomValue(5, 7, true)
  }),
  createHair({
    top: 0.12,
    left: 0.665,
    width: 4,
    length: getRandomValue(5, 7, true)
  }),
  createHair({
    top: 0.12,
    left: 0.67,
    width: 4,
    length: getRandomValue(5, 7, true)
  }),
  createHair({
    top: 0.12,
    left: 0.675,
    width: 4,
    length: getRandomValue(5, 7, true)
  }),
  createHair({
    top: 0.12,
    left: 0.68,
    width: 4,
    length: getRandomValue(5, 7, true)
  }),
  createHair({
    top: 0.12,
    left: 0.685,
    width: 4,
    length: getRandomValue(5, 6, true)
  }),
  createHair({
    top: 0.12,
    left: 0.69,
    width: 4,
    length: getRandomValue(5, 6, true)
  }),
  createHair({
    top: 0.12,
    left: 0.695,
    width: 4,
    length: getRandomValue(6, 6.2, true)
  }),
  createHair({
    top: 0.12,
    left: 0.7,
    width: 4,
    length: getRandomValue(5, 6, true)
  }),
  createHair({
    top: 0.12,
    left: 0.705,
    width: 4,
    length: getRandomValue(5, 7, true)
  }),
  createHair({
    top: 0.12,
    left: 0.71,
    width: 4,
    length: getRandomValue(5, 7, true)
  }),
  createHair({
    top: 0.12,
    left: 0.715,
    width: 4,
    length: getRandomValue(5, 7, true)
  }),
  createHair({
    top: 0.12,
    left: 0.718,
    width: 1,
    length: getRandomValue(5, 7, true)
  }),
]

const hairGroup8 = [
  createHair({
    top: 0.125,
    left: 0.72,
    width: 1,
    length: getRandomValue(12, 15, true)
  }),
  createHair({
    top: 0.13,
    left: 0.72,
    width: 1,
    length: getRandomValue(12, 15, true)
  }),
  createHair({
    top: 0.135,
    left: 0.72,
    width: 1,
    length: getRandomValue(12, 15, true)
  }),
]

const hairGroup9 = [
  createHair({
    top: 0.14,
    left: 0.72,
    width: 1,
    length: getRandomValue(30, 40, true)
  }),
  createHair({
    top: 0.145,
    left: 0.72,
    width: 1,
    length: getRandomValue(30, 40, true)
  }),
  createHair({
    top: 0.15,
    left: 0.72,
    width: 1,
    length: getRandomValue(30, 40, true)
  }),
  createHair({
    top: 0.155,
    left: 0.72,
    width: 1,
    length: getRandomValue(30, 40, true)
  }),
]

const hairs = [
  ...hairGroup1,
  ...hairGroup2,
  ...hairGroup3,
  ...hairGroup4,
  ...hairGroup5,
  ...hairGroup6,
  ...hairGroup7,
  ...hairGroup8,
  ...hairGroup9,
];

for (var i = 0; i < hairs.length; i++) {
  hairs[i].bodies[0].isStatic = true;
  if (hairs[i].bodies[1]) {
    hairs[i].bodies[1].isStatic = true;
  }

}



// Composite.add(engine.world, hairs);


function simulateWindSpeed() {
  // 设置风速变化的范围
  const minWindSpeed = 0;
  const maxWindSpeed = 1.5;

  // 生成随机风速
  const randomWindSpeed = Math.random() * (maxWindSpeed - minWindSpeed) + minWindSpeed;

  // 添加随机扰动，模拟风速的波动
  const noise = Math.random() * (maxWindSpeed - 1) - (maxWindSpeed - 1) / 2; // 扰动范围为-0.25到0.25
  const windSpeed = -(randomWindSpeed + noise);

  return windSpeed;
}

function getRandomValue(min, max, isInteger = false) {
  if (!isInteger) return Math.random() * (max - min) + min;

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}




Events.on(engine, 'beforeUpdate', function (e) {
  engine.gravity.x = simulateWindSpeed();
  engine.gravity.y = getRandomValue(-0.6, 1);

  hairGroup2.forEach(hair => {
    hair.bodies.forEach(body => {
      Body.applyForce(body, body.position, { x: 0, y: body.mass * getRandomValue(0.0001, 0.0005) })
    })
  })

  hairGroup2[hairGroup2.length - 1].bodies.forEach(body => {
    Body.applyForce(body, body.position, { x: 0, y: -body.mass * 0.0004 })
  })

  hairGroup3.forEach(hair => {
    hair.bodies.forEach(body => {
      Body.applyForce(body, body.position, { x: 0, y: body.mass * getRandomValue(0.0003, 0.0009) })
    })
  })

  hairGroup4.forEach(hair => {
    hair.bodies.forEach(body => {
      Body.applyForce(body, body.position, { x: 0, y: body.mass * getRandomValue(0.0003, 0.0008) })
    })
  })

  hairGroup5.forEach(hair => {
    hair.bodies.forEach(body => {
      Body.applyForce(body, body.position, { x: 0, y: body.mass * getRandomValue(0.0005, 0.001) })
    })
  })

  hairGroup6.forEach(hair => {
    hair.bodies.forEach(body => {
      Body.applyForce(body, body.position, { x: 0, y: body.mass * getRandomValue(0.0005, 0.0009) })
    })
  })

  hairGroup7.forEach(hair => {
    hair.bodies.forEach(body => {
      Body.applyForce(body, body.position, { x: 0, y: body.mass * getRandomValue(0.005, 0.005) })
    })
  })

  hairGroup8.forEach(hair => {
    hair.bodies.forEach(body => {
      Body.applyForce(body, body.position, { x: 0, y: body.mass * getRandomValue(0.003, 0.004) })
    })
  })

  hairGroup9.forEach(hair => {
    hair.bodies.forEach(body => {
      Body.applyForce(body, body.position, { x: 0, y: body.mass * getRandomValue(0.003, 0.004) })
    })
  })
})

Render.run(render)

const runner = Runner.create();
Runner.run(runner, engine);





// Scroll Menu Animation
const main = document.querySelector('main')

main.addEventListener('scroll', () => {
  if (main.scrollTop % window.innerHeight) return

  const index = main.scrollTop / window.innerHeight
  gsap.to('.menu', {
    x: index * -11.2 + 'rem'
  })
})


// Section Navigation
const links = Array.from(document.querySelectorAll('header nav a'))

links.forEach((link, index) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    gsap.to('.wheel', {
      y: '-2rem'
    })

    keyTl.play()
    keyTl.flag = true

    main.scrollTo({
      top: index * window.innerHeight,
      behavior: 'smooth'
    })
  })
})

