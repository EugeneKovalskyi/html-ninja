// canvas zigzag
const canvasArray = document.querySelectorAll('.zigzag')
// sidebar
const sidebar = document.querySelector('.sidebar')
// burger
const burgerTop = document.querySelector('.header-burger__top')
const burgerMiddle = document.querySelector('.header-burger__middle')
const burgerBottom = document.querySelector('.header-burger__bottom')
// header navbar
const header = document.querySelector('header')
const navbar = document.querySelector('.header-list')
// main-header
const mainHeader = document.querySelector('.main-header')
// scroll up button
const scrollUp = document.querySelector('.scrollup')
// load more
const loadmoreButton = document.querySelector('.cases-button')
const loadmoreButtonSpan = document.querySelector('.cases-button__span')
const casesBlocksArray = document.querySelectorAll('.cases-block')
let visibleBlocksCount = 7

// canvas zigzag rendering
for (let canvas of canvasArray) {
  if (canvas.classList.contains('zigzag-pink')) {
    createZigzag(canvas, '#FF498B')
  } else if (canvas.classList.contains('zigzag-blue')) {
    createZigzag(canvas, '#3E5AE8')
  }
}
function createZigzag(canvas, color) {
  let context = canvas.getContext('2d')

  let startX = 1
  let startY = 15
  let zigzagSpacing = 11

  canvas.width = 150
  canvas.height = 25
  context.lineWidth = 4
  context.strokeStyle = color
  context.beginPath()
  context.moveTo(startX, startY)

  for (let n = 0; n < 12; n++) {
    let x = startX + (n + 1) * zigzagSpacing
    let y

    if (n % 2 === 0) {
      y = startY - 10
    } else {
      y = startY
    }

    context.lineTo(x, y)
  }

  context.stroke()
}

// header onscroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 250) {
    header.classList.add('header--scroll')
    mainHeader.classList.add('main-header--scroll')
  } else {
    header.classList.remove('header--scroll')
    mainHeader.classList.remove('main-header--scroll')
  }

  if (window.scrollY > 600) {
    scrollUp.style.visibility = 'visible'
    scrollUp.style.opacity = '1'
    scrollUp.style.bottom = '1.5rem'
  } else {
    scrollUp.style.visibility = 'hidden'
    scrollUp.style.opacity = '0'
    scrollUp.style.bottom = '-1.5rem'
  }
})

// click event
document.addEventListener('click', (event) => {
  let target = event.target

  // sidebar animation positioning
  if (
    target.classList.contains('navbar-burger') ||
    target.classList.contains('navbar-burger__layer')
  ) {
    sidebar.style.left = '0'
    sidebar.style.opacity = '1'
  } else if (!target.closest('.sidebar')) {
    sidebar.style.left = '-35rem'
    sidebar.style.opacity = '0'
  }

  // burger toggle class
  if (
    target.classList.contains('header-burger') ||
    target.classList.contains('header-burger__layer')
  ) {
    burgerTop.classList.toggle('header-burger__top--onclick')
    burgerMiddle.classList.toggle('header-burger__middle--onclick')
    burgerBottom.classList.toggle('header-burger__bottom--onclick')

    navbar.classList.toggle('header-list--onclick')
  }

  // navbar details button
  if (target.classList.contains('header-list-summary')) {
    if (target.closest('.header-list-block').hasAttribute('open')) {
      target.firstElementChild.innerHTML = '&#8897;'
    } else {
      target.firstElementChild.innerHTML = '&#8896;'
    }
  } else if (target.classList.contains('header-list-summary__button')) {
    if (target.closest('.header-list-block').hasAttribute('open')) {
      target.innerHTML = '&#8897;'
    } else {
      target.innerHTML = '&#8896;'
    }

    target.closest('.header-list-block').toggleAttribute('open')
  }

  // scroll up button
  if (target === scrollUp) {
    window.scroll(0, 0)
  }

  // load more functionality
  if (target === loadmoreButton || target === loadmoreButtonSpan) {
    for (let i = 0; i < 3; i++) {
      if (casesBlocksArray[visibleBlocksCount]) {
        casesBlocksArray[visibleBlocksCount].style.display = 'block'
        casesBlocksArray[visibleBlocksCount].style.animation = 'casesLoadmore 0.5s'
        visibleBlocksCount++
      }

      if (visibleBlocksCount === casesBlocksArray.length) {
        loadmoreButton.style.display = 'none'
      }
    }
  }
})

// business numbers counter
const counters = document.querySelectorAll('.counter')
const speed = 100
counters.forEach((counter) => {
  const updateCount = () => {
    const target = +counter.dataset.target
    const count = +counter.textContent
    const inc = Math.ceil(target / speed)
    const step = target === 20 ? 80 : target === 150 ? 20 : null

    if (count < target) {
      counter.textContent = count + inc
      setTimeout(updateCount, step)
    } else {
      counter.textContent = target
    }
  }

  updateCount()
})

// strategy-slider
$('.strategy-slider').slick({
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  arrows: false,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },

    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },

    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
})
