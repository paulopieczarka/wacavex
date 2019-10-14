import Game from './game'

function onWindowResize (canvas) {
  return () => {
    const resW = 1080
    const resH = 920

    let f = Math.max(window.innerWidth / resW, window.innerHeight / resH)
    if (f > 1.5) {
      f = 1.5
    } else if (f < 1) {
      f = 1
    }

    canvas.width = Math.floor(window.innerWidth / f)
    canvas.height = Math.floor(window.innerHeight / f)
  }
}

async function gameComponent () {
  const canvas = document.getElementById('main-canvas')
  canvas.style.backgroundColor = 'black'
  canvas.style.transform = 'translateZ(0)'
  canvas.style.width = '100%'
  canvas.style.height = '100%'

  onWindowResize(canvas)()
  window.addEventListener('resize', onWindowResize(canvas))

  const game = new Game()
  await game.init(canvas)

  return canvas
}

window.addEventListener('load', gameComponent, false);
