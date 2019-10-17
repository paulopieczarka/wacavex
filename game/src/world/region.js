import Camera from '../camera'
import { hull } from '../util'
import { TILE_SIZE } from '../constants'

class Region {
  constructor ({ name, tiles, world } = {}) {
    this.name = name || 'Unamed Region'
    this.tiles = tiles || []
    this.world = world
    this.discovered = false
    this.shape = []

    this._calcRegionShape()
  }

  render (g, canvas) {
    if (this.isOnScreen(canvas)) {
    }
  }

  update ({ mouse, keyboard }, canvas, delta) {
  }

  isOnScreen (canvas) {
    if (!this.shape) {
      return false
    }

    for (let i=0; i < this.shape.length; i++) {
      const [x, y] = this.shape[i]
      if (x+Camera.x >= 0 && x+Camera.x <= canvas.width) {
        if (y+Camera.y >= 0 && y+Camera.y <= canvas.height) {
          return true
        }
      }
    }

    return false
  }

  _calcRegionShape () {
    const points = this.tiles.map(({ x, y }) => [x, y])
    const concaveHull = hull(points, 50)
    this.shape = concaveHull.map(([x, y]) => [x * TILE_SIZE, y * TILE_SIZE])
  }
}

export default Region
