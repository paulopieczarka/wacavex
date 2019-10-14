import { Graphics, Keyboard } from './util'
import World from './world'
import Camera from './camera'
import Assets from './assets'

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

  async init (canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d', { alpha: false })
    if (!this.ctx) {
      throw new Error('Could not init 2D context!')
    }

    // Assets
    Assets.add('boat', 'assets/boat.png')
    await Assets.load()

    // Handlers
    this.keyboard = new Keyboard()
    this.g = new Graphics(this.ctx)

    // Game components
    this.world = new World({ name: 'New World' })

    this._gameLoop()
  }

  render (g) {
    const { width, height } = this.canvas
    this.ctx.clearRect(0, 0, width, height)

    this.world.render(g, this.canvas)

    g.text({ x: 10, y: 10, text: `Window: ${width}x${height} (${this.fps} fps)` })
    const { tiles, entities, player, depth, ...worldProps } = this.world
    g.text({ x: 10, y: 35, text: `Camera: ${Camera.x}, ${Camera.y}` })
    g.text({ x: 10, y: 60, text: `World: ${JSON.stringify(worldProps)}` })
    g.text({ x: 10, y: 85, text: `Entities: ${entities.length}` })
  }

  update (keyboard, delta = 1.0) {
    this.world.update(keyboard, delta)
    Camera.follow(this.world.player)
    Camera.update(keyboard, this.canvas, delta)
  }

  _gameLoop () {
    requestAnimationFrame(() => this._gameLoop())
    
    this.update(this.keyboard)
    this.render(this.g)

    this.keyboard.poll()

    this.fpsCounter++
    if (this.lastUpdate+1000 <= +(new Date())) {
      this.fps = this.fpsCounter
      this.fpsCounter = 0
      this.lastUpdate = +(new Date())
    }
  }
}

export default Game
