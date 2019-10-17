import { Graphics, Keyboard, Mouse } from './util'
import World from './world'
import Camera from './camera'
import Assets from './assets'
import DebugGUI from './gui/debug'
import GuiManager from './gui/manager'
import Tile from './world/tile'
import Item from './world/item'

class Game {
  constructor () {
    this.fps = 0
    this.fpsCounter = 0
    this.lastUpdate = +(new Date())
    this.canvas = undefined
    this.ctx = undefined
    this.g = undefined
    this.keyboard = undefined
    this.mouse = undefined
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
    this.mouse = new Mouse()
    this.keyboard = new Keyboard()
    this.g = new Graphics(this.ctx)
    this.handlers = ({
      mouse: this.mouse,
      keyboard: this.keyboard
    })

    // Game components
    this.world = new World({ name: 'New World' })

    // UIs
    this.debugUI = new DebugGUI(this, this.world)

    this._gameLoop()
  }

  render (g, canvas) {
    const { width, height } = canvas
    this.ctx.clearRect(0, 0, width, height)

    this.world.render(g, canvas)
    this.debugUI.render(g, canvas)

    GuiManager.render(g.ctx, canvas)
  }

  update ({ mouse, keyboard }, canvas, delta = 1.0) {
    this.world.update({ mouse, keyboard }, canvas, delta)

    Camera.follow(this.world.player)
    Camera.update({ mouse, keyboard }, canvas, delta)

    GuiManager.update(delta)
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

      this.update(this.handlers, this.canvas, delta)
      this.render(this.g, this.canvas)
      this.keyboard.poll()
      this.mouse.pool()
    }

    requestAnimationFrame(loop)
  }
}

export default Game
