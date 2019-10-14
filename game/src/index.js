import Game from './game'

function onWindowResize (canvas) {
  return ({ target }) => {
    canvas.width = target.innerWidth
    canvas.height = target.innerHeight
  }
}

async function gameComponent () {
  const canvas = document.getElementById('main-canvas')
  canvas.width = window.innerWidth || 800
  canvas.height = window.innerHeight || 600
  canvas.style.backgroundColor = 'black'
  canvas.style.transform = 'translateZ(0)'

  window.addEventListener('resize', onWindowResize(canvas))

  const game = new Game()
  await game.init(canvas)

  return canvas
}

window.addEventListener('load', gameComponent, false);
