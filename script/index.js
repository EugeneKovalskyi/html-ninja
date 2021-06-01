import slickSliderInit from './slider.js'

const loading = document.querySelector('.loading')
const canvasArray = document.querySelectorAll('.zigzag')
const sidebar = document.querySelector('.sidebar')
const burgerTop = document.querySelector('.header-burger__top')
const burgerMiddle = document.querySelector('.header-burger__middle')
const burgerBottom = document.querySelector('.header-burger__bottom')
const header = document.querySelector('header')
const navbar = document.querySelector('.header-list')
const mainHeader = document.querySelector('.main-header')
const scrollUp = document.querySelector('.scrollup')
const loadmoreButton = document.querySelector('.cases-button')
const loadmoreButtonSpan = document.querySelector('.cases-button__span')
const casesBlocksArray = document.querySelectorAll('.cases-block')
const businessCounters = document.querySelectorAll('.business .counter')
const successCounters = document.querySelectorAll('.success .counter')
const mainImagesBlock = document.querySelector('.main .images')
const mainParallax = new Parallax(mainImagesBlock)

let isCompletedBusiness = false
let isCompletedProgress = false
let isCompletedSuccess = false
let visibleBlocksCount = 7
let loadedMoreCases = 0

for (let canvas of canvasArray) {
  if (canvas.classList.contains('zigzag-pink')) {
    createZigzag(canvas, '#FF498B')
  } else if (canvas.classList.contains('zigzag-blue')) {
    createZigzag(canvas, '#3E5AE8')
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loading.style.opacity = '0'
  loading.style.zIndex = '-1'
})

document.addEventListener('click', clickEventCallback)

window.addEventListener('scroll', scrollEventCallback)

slickSliderInit()

new WOW().init()

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

function clickEventCallback(event) {
  let target = event.target

  // sidebar animation
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

  // navbar
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

  // scrollup
  if (target === scrollUp) {
    window.scroll(0, 0)
  }

  // loadmore
  if (target === loadmoreButton || target === loadmoreButtonSpan) {
    loadedMoreCases += 440

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
}

function scrollEventCallback() {
  // header navbar
  if (window.scrollY > 250) {
    header.classList.add('header--scroll')
    mainHeader.classList.add('main-header--scroll')
  } else {
    header.classList.remove('header--scroll')
    mainHeader.classList.remove('main-header--scroll')
  }

  // scrollup
  if (window.scrollY > 600) {
    scrollUp.style.visibility = 'visible'
    scrollUp.style.opacity = '1'
    scrollUp.style.bottom = '1.5rem'
  } else {
    scrollUp.style.visibility = 'hidden'
    scrollUp.style.opacity = '0'
    scrollUp.style.bottom = '-1.5rem'
  }

  // business
  if (!isCompletedBusiness && window.scrollY > 1900) {
    const speed = 100

    businessCounters.forEach((counter) => {
      const updateCount = () => {
        const target = +counter.dataset.target
        const count = +counter.textContent
        const inc = Math.ceil(target / speed)
        let step = null

        switch (target) {
          case 20:
            step = 80
            break
          case 150:
            step = 20
            break
        }

        if (count < target) {
          counter.textContent = count + inc
          setTimeout(updateCount, step)
        } else {
          counter.textContent = target
        }
      }

      updateCount()
    })

    isCompletedBusiness = true
  }

  // success progress
  if (!isCompletedProgress && window.scrollY > 6900 + loadedMoreCases) {
    const percentArr = document.querySelectorAll('.success-progress__percent')
    const valueArr = document.querySelectorAll('.success-progress__value')

    for (const value of valueArr) {
      const target = value.dataset.target
      const incrementValue = setInterval(() => {
        if (value.value < target) {
          ++value.value

          for (const percent of percentArr) {
            percent.textContent = `(${percent.nextElementSibling.value}%)`
          }
        } else {
          clearInterval(incrementValue)
        }
      }, 10)
    }

    isCompletedProgress = true
  }

  // success
  if (!isCompletedSuccess && window.scrollY > 7200 + loadedMoreCases) {
    const speed = 100

    successCounters.forEach((counter) => {
      const updateCount = () => {
        const target = +counter.dataset.target
        const count = +counter.textContent
        const inc = Math.ceil(target / speed)
        let step = null

        switch (target) {
          case 12:
            step = 140
            break
          case 14:
            step = 120
            break
          case 30:
            step = 50
            break
          case 110:
            step = 25
            break
        }

        if (count < target) {
          counter.textContent = count + inc
          setTimeout(updateCount, step)
        } else {
          counter.textContent = target
        }
      }

      updateCount()
    })

    isCompletedSuccess = true
  }
}
