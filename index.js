// canvas zigzag
let canvasArray = document.querySelectorAll('.zigzag')
// sidebar
let sidebar = document.querySelector('.sidebar')
// burger
let burgerTop = document.querySelector('.header-burger__top')
let burgerMiddle = document.querySelector('.header-burger__middle')
let burgerBottom = document.querySelector('.header-burger__bottom')
// header navbar
let header = document.querySelector('header')
let navbar = document.querySelector('.header-list')
let navbarSummary = document.querySelector('.header-list-summary')
let navbarSummaryBtn = document.querySelector('.header-list-summary__button')
// main-header
let mainHeader = document.querySelector('.main-header')
// scroll up button
let scrollUp = document.querySelector('.scrollup')

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
  if (target === navbarSummaryBtn || target === navbarSummary) {
    if (target.closest('details').hasAttribute('open')) {
      navbarSummaryBtn.innerHTML = '&#8897;'
    } else {
      navbarSummaryBtn.innerHTML = '&#8896;'
    }

    if (target === navbarSummaryBtn) {
      target.closest('details').toggleAttribute('open')
    }
  }

  // scroll up button
  if (target === scrollUp) {
    window.scroll(0, 0)
  }
})
