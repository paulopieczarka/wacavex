import { Graphics, Keyboard } from "./util"
import World from "./world"


class Game {
  constructor () {
    this.fps = 0
    this.fpsCounter = 0
    this.lastUpdate = +(new Date())
    this.canvas = undefined
    this.ctx = undefined
    this.g = undefined
    this.keyboard = undefined
  }

  init (canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    if (!this.ctx) {
      throw new Error('Could not init 2D context!')
    }

    // Handlers
    this.keyboard = new Keyboard()
    this.g = new Graphics(this.ctx)

    // Game components
    this.world = new World({ name: 'New World' })

    this.tr = 0
    this._gameLoop()
  }

  render (g) {
    const { width, height } = this.canvas
    this.ctx.clearRect(0, 0, width, height)

    this.world.render(g, this.canvas)

    g.rect({ x: width/2-25, y: height/2-25, width: 50, height: 50, style: 'red', rotation: this.tr })
    g.text({ x: 10, y: 10, text: `Window: ${width}x${height} (${this.fps} fps)` })

    const { tiles, entities, ...worldProps } = this.world
    g.text({ x: 10, y: 35, text: `World: ${JSON.stringify(worldProps)}` })
    g.text({ x: 10, y: 55, text: `Entities: ${entities.length}` })
  }

  update (keyboard, delta = 1.0) {
    this.tr += .02 * delta

    this.world.update(keyboard, delta)
  }

  _gameLoop () {
    this.update(this.keyboard)
    this.render(this.g)

    this.keyboard.poll()
    window.requestAnimationFrame(() => this._gameLoop())

    this.fpsCounter++
    if (this.lastUpdate+1000 <= +(new Date())) {
      this.fps = this.fpsCounter
      this.fpsCounter = 0
      this.lastUpdate = +(new Date())
    }
  }
}

export default Game
