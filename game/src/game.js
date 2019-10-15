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

    this.ctx.imageSmoothingEnabled = true
    this.ctx.imageSmoothingQuality = 'high'

    // Assets
    Assets.add('boat', 'assets/boat.png')
    Assets.add('caravel', 'assets/caravel.png')
    Assets.add('boat_v2', 'assets/boat_v2.png')
    await Assets.load()

    // Handlers
    this.keyboard = new Keyboard()
    this.g = new Graphics(this.ctx)

    // Game components
    this.world = new World({ name: 'New World' })

    this._gameLoop()
  }

  render (g, canvas) {
    const { width, height } = canvas
    this.ctx.clearRect(0, 0, width, height)

    this.world.render(g, canvas)

    const { entities, regions } = this.world
    g.text({ x: 10, y: 10, text: `Window: ${width}x${height} (${this.fps} fps)` })
    g.text({ x: 10, y: 35, text: `Camera: ${Math.floor(Camera.x)}, ${Math.floor(Camera.y)}` })
    g.text({ x: 10, y: 60, text: `Regions: ${regions.length} // Entities: ${entities.length}` })
  }

  update (keyboard, canvas, delta = 1.0) {
    this.world.update(keyboard, canvas, delta)

    Camera.follow(this.world.player)
    Camera.update(keyboard, canvas, delta)
  }

  _gameLoop () {
    let frames = 0
    let lastLoopTime = undefined
    let lastFpsUpdate = 0

    const loop = (timestamp) => {
      requestAnimationFrame(loop)

      const delta = ((timestamp - lastLoopTime) * 0.001) || 1.0
      lastLoopTime = timestamp

      frames++
      if ((timestamp - lastFpsUpdate) >= 1000) {
        lastFpsUpdate = timestamp
        this.fps = frames
        frames = 0
      }

      this.update(this.keyboard, this.canvas, delta)
      this.render(this.g, this.canvas)
      this.keyboard.poll()
    }

    requestAnimationFrame(loop)
  }
}

export default Game
