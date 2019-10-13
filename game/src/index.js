import Game from './game'

function onWindowResize (canvas) {
  return ({ target }) => {
    canvas.width = target.innerWidth
    canvas.height = target.innerHeight
  }
}

function gameComponent () {
  const canvas = document.createElement('canvas')
  canvas.width = window.innerWidth || 800
  canvas.height = window.innerHeight || 600
  canvas.style.backgroundColor = 'black'

  window.addEventListener('resize', onWindowResize(canvas))

  const game = new Game()
  game.init(canvas)

  return canvas;
}

document.body.appendChild(gameComponent())
